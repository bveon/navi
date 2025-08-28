WITH
	generated_mapping AS (
		SELECT DISTINCT
			cn.id AS course_navi_id,
			ptn.code AS program_type_navi_code,
			pti.duration,
			pti.course_offset,
			c.duration_ug,
			c.duration_pg,
			u.id AS university_id
		FROM program_course AS pc
		JOIN course AS c
			ON c.id = pc.course_id
		JOIN course_navi AS cn
			ON cn.course_id = c.id
		JOIN university AS u
			ON u.id = c.university_id
		JOIN program AS p
			ON p.id = pc.program_id
		JOIN program_type_instance AS pti
			ON pti.id = p.program_type_instance_id
		JOIN program_type AS pt
			ON pt.code = pti.program_type_code
		JOIN program_type_navi AS ptn
			ON ptn.program_type_code = pt.code
	),
	existing_mapping AS (
		SELECT
			id,
			course_navi_id,
			program_type_navi_code
		FROM program_course_year_navi
	),
	max_id AS (
		SELECT
			COALESCE(MAX(id), 0) AS value
		FROM program_course_year_navi
	),
	sync_data AS (
		SELECT
			em.id AS existing_id,
			COALESCE(em.course_navi_id, gm.course_navi_id) AS course_navi_id,
			COALESCE(em.program_type_navi_code, gm.program_type_navi_code) AS program_type_navi_code,
			gm.duration,
			gm.course_offset,
			gm.duration_ug,
			gm.duration_pg,
			gm.university_id,
			CASE
				WHEN
					em.id IS NOT NULL
					AND gm.course_navi_id IS NOT NULL
				THEN 'matched'
				WHEN em.id IS NULL
				THEN 'new'
				WHEN gm.course_navi_id IS NULL
				THEN 'removed'
			END AS status
		FROM existing_mapping em
		FULL OUTER JOIN generated_mapping gm
			ON em.course_navi_id = gm.course_navi_id
			AND em.program_type_navi_code = gm.program_type_navi_code
	)
SELECT
	CASE
		WHEN status = 'removed'
		THEN 1
		ELSE 0
	END AS delete_flg,
	CASE
		WHEN status = 'new'
		THEN (
			(
				SELECT
					value
				FROM max_id
			) + ROW_NUMBER() OVER (PARTITION BY status ORDER BY course_navi_id, program_type_navi_code)
		)
		ELSE existing_id
	END AS id,
	course_navi_id AS degree_id,
	ptn.abbreviation AS program_type,
	duration AS preparation_year,
	CASE
		WHEN
			university_id = 29
			AND program_type_navi_code = 'fdn'
		THEN 3
		ELSE (duration_ug - course_offset)
	END AS undergraduate_year,
	duration_pg AS masters_year,
	(
		CASE
			WHEN
				university_id = 29
				AND program_type_navi_code = 'fdn'
			THEN 3
			ELSE (duration_ug - course_offset)
		END
		+ duration_pg + duration
	) AS total_year
FROM sync_data AS sd
JOIN program_type_navi AS ptn
	ON ptn.code = sd.program_type_navi_code
ORDER BY id;
