SELECT
	0 AS delete_flg,
	20000 + r.id AS id,
	r.ranking_body_code || '_' || r.scope AS name,
	r.year,
	CASE
		WHEN r.max = 0
		THEN r.min::text
		WHEN r.max = -1
		THEN r.min::text || '+'
		ELSE r.min::text || '-' || r.max::text
	END AS ranking,
	un.id AS university_id,
	r.is_active AS display_flg
FROM ranking AS r
JOIN university AS u
	ON u.id = r.university_id
JOIN university_navi AS un
	ON un.university_id = u.id
ORDER BY r.id;
