SELECT
	CASE
		WHEN NOT s.is_active
		THEN 1
		ELSE 0
	END AS delete_flg,
	ps.id,
	pn.id AS program_id,
	s.id AS scholarship_id,
	CASE
		WHEN s.is_capacity
		THEN 1
		ELSE 0
	END AS capacity_flg
FROM program_scholarship AS ps
JOIN program AS p
	ON p.id = ps.program_id
JOIN program_navi AS pn
	ON pn.program_id = p.id
JOIN scholarship AS s
	ON s.id = ps.scholarship_id
JOIN scholarship_navi AS sn
	ON sn.scholarship_id = s.id
ORDER BY ps.id;
