SELECT
	CASE
		WHEN NOT uud.is_active
		THEN 1
		ELSE 0
	END AS delete_flg,
	20000 + uud.id AS id,
	un.id AS university_id,
	20000 + udn.university_designation_id AS designation_id
FROM university AS u
JOIN university_navi AS un
	ON un.university_id = u.id
JOIN university_university_designation AS uud
	ON uud.university_id = u.id
JOIN university_designation AS ud
	ON ud.id = uud.university_designation_id
JOIN university_designation_navi AS udn
	ON udn.university_designation_id = ud.id
ORDER BY uud.id;
