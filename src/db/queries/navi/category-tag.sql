SELECT
	0 AS delete_flg,
	san.study_area_id AS id,
	sat_en.translation AS name,
	sat_ja.translation AS japanese_name,
	san.sort
FROM study_area AS sa
JOIN study_area_translation AS sat_en
	ON sat_en.id = sa.tid_name
	AND sat_en.language_iso639_code = 'en'
JOIN study_area_translation AS sat_ja
	ON sat_ja.id = sa.tid_name
	AND sat_ja.language_iso639_code = 'ja'
JOIN study_area_navi AS san
	ON san.study_area_id = sa.id
ORDER BY san.study_area_id;
