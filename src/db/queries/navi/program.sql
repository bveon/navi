SELECT
  CASE WHEN p.delete_flg = 1
    OR u.university_id IS NULL THEN
    1
  ELSE
    0
  END AS delete_flg,
  p.id,
  p.name,
  pt.abbreviation AS type,
  CASE p.id
  WHEN '20325' THEN
    'isu-ugp-data-science'
  WHEN '20328' THEN
    'sts-fdn-nursing'
  ELSE
    u.university_code || '-' || pt.code || '-' ||
      REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(REPLACE(LOWER(p.name),
      ',', ''), ' ', '-',
      'g'), ' ?\([^)]*\)', '', 'g'),
      '-$', '', 'g')
  END AS code,
  p.ksp_en,
  p.ksp,
  p.scholarship_ksp_en,
  p.scholarship_ksp,
  p.provider,
  p.cricos,
  p.start_date,
  p.end_date,
  p.tuition,
  0 AS scholarship,
  u.university_id,
  p.ielts,
  p.ielts_r,
  p.ielts_w,
  p.ielts_l,
  p.ielts_s,
  p.toefl,
  p.toefl_r,
  p.toefl_w,
  p.toefl_l,
  p.toefl_s,
  p.gpa,
  p.gpa_sub,
  p.gpa_sub_jpn,
  p.entry_other,
  p.entry_other_jpn,
  p.math_requirement,
  p.math_1,
  p.math_a,
  p.math_2,
  p.math_b,
  p.math_3,
  p.math_c,
  p.math_avg,
  p.science_requirement,
  p.physics,
  p.biology,
  p.chemistry,
  p.science_avg,
  p.other_requirement,
  p.eat_flg,
  p.capacity_flg
FROM
  program AS p
  JOIN program_type_instance AS pti ON pti.id = p.program_type_instance_id
  JOIN program_type AS pt ON pt.code = pti.program_type_code
  LEFT JOIN LATERAL (
    SELECT
      u.id AS university_id,
      u2.abbr3 AS university_code
    FROM
      degree_program AS dp
      JOIN degree AS d ON d.id = dp.degree_id
      JOIN university AS u ON u.id = d.university_id
      JOIN university AS u2 ON u2.id = u.main_university_id
    WHERE
      dp.program_id = p.id
    LIMIT 1) AS u ON TRUE
ORDER BY
  p.id;
