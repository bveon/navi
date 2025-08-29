WITH university_major_view AS (
  WITH base_mapping AS (
    SELECT
      *
    FROM
      university_major_base),
    generated_mapping AS (
      SELECT DISTINCT
        university_id,
        major_id
      FROM
        degree),
      max_id AS (
        SELECT
          COALESCE(MAX(id), 0) AS value
        FROM
          university_major_base),
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
          CASE WHEN sd.status = 'new' THEN
            ((
                SELECT
                  value
                FROM
                  max_id) + ROW_NUMBER() OVER (PARTITION BY sd.status ORDER BY sd.university_id,
                  sd.major_id))
          ELSE
            sd.base_id
          END AS id,
          sd.university_id,
          sd.major_id
        FROM
          sync_data AS sd
),
base_mapping AS (
  SELECT
    *
  FROM
    university_major_discipline_tag_base
),
generated_mapping AS (
  SELECT DISTINCT
    umv.id AS university_major_base_id,
    mdt.discipline_tag_id
  FROM
    university_major_view AS umv
  JOIN major_discipline_tag AS mdt ON mdt.major_id = umv.major_id
),
max_id AS (
  SELECT
    COALESCE(MAX(id), 0) AS value
  FROM
    university_major_discipline_tag_base
),
sync_data AS (
  SELECT
    bm.id AS base_id,
    CASE WHEN bm.id IS NOT NULL THEN
      bm.university_major_base_id
    ELSE
      gm.university_major_base_id
    END AS university_major_base_id,
    CASE WHEN bm.id IS NOT NULL THEN
      bm.discipline_tag_id
    ELSE
      gm.discipline_tag_id
    END AS discipline_tag_id,
    CASE WHEN bm.id IS NOT NULL
      AND gm.university_major_base_id IS NOT NULL THEN
      'matched'
    WHEN bm.id IS NULL THEN
      'new'
    WHEN gm.university_major_base_id IS NULL THEN
      'removed'
    END AS status
  FROM
    base_mapping AS bm
  FULL OUTER JOIN generated_mapping AS gm ON gm.university_major_base_id =
    bm.university_major_base_id
  AND gm.discipline_tag_id = bm.discipline_tag_id
)
SELECT
  CASE WHEN status = 'removed' THEN
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
	      sd.university_major_base_id, sd.discipline_tag_id))
    ELSE
      sd.base_id
    END) AS id,
  sd.university_major_base_id AS major_id,
  sd.discipline_tag_id,
  1 AS sort
FROM
  sync_data AS sd
ORDER BY
  id;
