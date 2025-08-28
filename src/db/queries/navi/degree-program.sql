SELECT
	CASE
		WHEN NOT pc.is_active
		THEN 1
		ELSE 0
	END AS delete_flg,
	20000 + pc.id AS id,
	cn.id AS degree_id,
	pn.id AS program_id
FROM program_course AS pc
JOIN program AS p
	ON p.id = pc.program_id
JOIN program_navi AS pn
	ON pn.program_id = p.id
JOIN course AS c
	ON c.id = pc.course_id
JOIN course_navi AS cn
	ON cn.course_id = c.id
ORDER BY pc.id;
