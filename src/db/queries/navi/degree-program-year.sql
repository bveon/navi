WITH base_mapping AS (
  SELECT
    *
  FROM
    degree_program_year_base
),
generated_mapping AS (
  SELECT DISTINCT
    d.id AS degree_id,
    pt.code AS program_type_code,
    pti.duration,
    pti.course_offset,
    d.duration_ug,
    d.duration_pg,
    u.id AS university_id
  FROM
    degree_program AS dp
    JOIN degree AS d ON d.id = dp.degree_id
    JOIN university AS u ON u.id = d.university_id
    JOIN program AS p ON p.id = dp.program_id
    JOIN program_type_instance AS pti ON pti.id = p.program_type_instance_id
    JOIN program_type AS pt ON pt.code = pti.program_type_code
),
max_id AS (
  SELECT
    COALESCE(MAX(id), 0) AS value
  FROM
    degree_program_year_base
),
sync_data AS (
  SELECT
    bm.id AS base_id,
    COALESCE(bm.degree_id, gm.degree_id) AS degree_id,
    COALESCE(bm.program_type_code, gm.program_type_code) AS program_type_code,
  gm.duration,
  gm.course_offset,
  gm.duration_ug,
  gm.duration_pg,
  gm.university_id,
  CASE WHEN bm.id IS NOT NULL
    AND gm.degree_id IS NOT NULL THEN
    'matched'
  WHEN bm.id IS NULL THEN
    'new'
  WHEN gm.degree_id IS NULL THEN
    'removed'
  END AS status
FROM
  base_mapping AS bm
  FULL OUTER JOIN generated_mapping AS gm ON bm.degree_id = gm.degree_id
  AND bm.program_type_code = gm.program_type_code
)
SELECT
  CASE WHEN status = 'removed' THEN
    1
  ELSE
    0
  END AS delete_flg,
  CASE WHEN status = 'new' THEN
    ((
        SELECT
          value
        FROM
          max_id) + ROW_NUMBER() OVER (PARTITION BY status ORDER BY degree_id, program_type_code))
  ELSE
    base_id
  END AS id,
  degree_id,
  pt.abbreviation AS program_type,
  sd.duration AS preparation_year,
  CASE WHEN sd.university_id = 20029
    AND sd.program_type_code = 'fdn'
    AND sd.duration_ug = 3 THEN
    3
  WHEN sd.university_id = 20029
    AND sd.program_type_code = 'dip'
    AND sd.duration_ug = 3 THEN
    2
  ELSE
    (sd.duration_ug - sd.course_offset)
  END AS undergraduate_year,
    sd.duration_pg AS masters_year,
(
      CASE WHEN sd.university_id = 20029
        AND sd.program_type_code = 'fdn'
        AND sd.duration_ug = 3 THEN
        3
      WHEN sd.university_id = 20029
        AND sd.program_type_code = 'dip'
        AND sd.duration_ug = 3 THEN
        2
      ELSE
        (sd.duration_ug - sd.course_offset)
      END + sd.duration_pg + sd.duration) AS total_year
  FROM
    sync_data AS sd
  JOIN program_type AS pt ON pt.code = sd.program_type_code
ORDER BY
  id;
