SELECT
  u.delete_flg,
  u.id AS university_id,
  10 AS img_total,
  u.img_version,
  u.latitude,
  u.longitude,
  u.foundation_year,
  u.management,
  u.students,
  u.international_students,
  u.ksp,
  u.url AS a_homepage_url,
  CASE WHEN u.id = 20051 THEN
    NULL
  WHEN u.id = 20058 THEN
    NULL
  WHEN u2.id != u.id THEN
    u2.url
  ELSE
    NULL
  END AS homepage_url2
FROM
  university AS u
  JOIN university AS u2 ON u2.id = u.main_university_id
ORDER BY
  u.id;
