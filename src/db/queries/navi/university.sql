SELECT
  u.delete_flg,
  u.id,
  u.u_apply_id,
  u.name,
  u.japanese_name,
  u.abbr3,
  u.slug,
  u2.country AS country,
  CASE WHEN u2.id != u.id THEN
    u.country
  ELSE
    NULL
  END AS transfer_country,
  u.non_applicable_national_code,
  u.main_university_id,
  TRUE AS scholarship_flg,
  u.start_date,
  u.end_date,
  u.score
FROM
  university AS u
  JOIN university AS u2 ON u2.id = u.main_university_id
ORDER BY
  id;
