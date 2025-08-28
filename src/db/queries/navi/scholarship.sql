SELECT
	CASE
		WHEN NOT s.is_active
		THEN 1
		ELSE 0
	END AS delete_flg,
	s.id,
	st_en.translation AS name,
	s.max AS scholarship,
	sn.scholarship_ksp_en,
	sn.scholarship_ksp,
	s.type AS scholarship_type,
	CASE
		WHEN s.type = 'base'
		THEN NULL
		ELSE s.start_date
	END AS display_start,
	CASE
		WHEN s.type = 'base'
		THEN NULL
		ELSE s.end_date
	END AS display_end
FROM scholarship AS s
JOIN scholarship_navi AS sn
	ON sn.scholarship_id = s.id
JOIN scholarship_translation AS st_en
	ON st_en.id = s.tid_name
	AND st_en.language_iso639_code = 'en'
ORDER BY s.id;
