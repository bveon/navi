WITH base_mapping AS (
  SELECT
    *
  FROM
    university_major_base
),
generated_mapping AS (
  SELECT DISTINCT
    university_id,
    major_id
  FROM
    degree
),
max_id AS (
  SELECT
    COALESCE(MAX(id), 0) AS value
  FROM
    university_major_base
),
sync_data AS (
  SELECT
    bm.id AS base_id,
    CASE WHEN bm.id IS NOT NULL THEN
      bm.university_id
    ELSE
      gm.university_id
    END AS university_id,
    CASE WHEN bm.id IS NOT NULL THEN
      bm.major_id
    ELSE
      gm.major_id
    END AS major_id,
    CASE WHEN bm.id IS NOT NULL
      AND gm.university_id IS NOT NULL THEN
      'matched'
    WHEN bm.id IS NULL THEN
      'new'
    WHEN gm.university_id IS NULL THEN
      'removed'
    END AS status
  FROM
    base_mapping AS bm
    FULL OUTER JOIN generated_mapping AS gm ON gm.university_id = bm.university_id
    AND gm.major_id = bm.major_id
)
SELECT
  CASE WHEN sd.status = 'removed'
    OR NOT EXISTS (
      SELECT
        1
      FROM
        degree AS d
      JOIN university AS u ON u.id = d.university_id
        AND u.delete_flg = 0
      JOIN degree_program AS dp ON dp.degree_id = d.id
      JOIN program AS p ON p.id = dp.program_id
        AND p.delete_flg = 0
    WHERE
      d.university_id = sd.university_id
      AND d.major_id = sd.major_id) THEN
    1
  ELSE
    0
  END AS delete_flg,
(
    CASE WHEN sd.status = 'new' THEN
      ((
          SELECT
            value
          FROM
	    max_id) + ROW_NUMBER() OVER (PARTITION BY sd.status ORDER BY
	      sd.university_id, sd.major_id))
    ELSE
      sd.base_id
    END) AS id,
  u.abbr3 || '-' || REGEXP_REPLACE(REPLACE(LOWER(m.name),
    ',', ''), ' ', '-', 'g')
    AS code,
    m.name,
    u.id AS university_id
  FROM
    sync_data AS sd
    JOIN university AS u ON u.id = sd.university_id
    JOIN major AS m ON m.id = sd.major_id
  ORDER BY
    id;
