WITH
	university_major_navi_view AS (
		WITH
			existing_mapping AS (
				SELECT
					*
				FROM university_major_navi
			),
			generated_mapping AS (
				SELECT DISTINCT
					c.university_id,
					c.major_id
				FROM course AS c
			),
			max_id AS (
				SELECT
					COALESCE(MAX(umn.id), 0) AS value
				FROM university_major_navi AS umn
			),
			sync_data AS (
				SELECT
					em.id AS existing_id,
					CASE
						WHEN em.id IS NOT NULL
						THEN em.university_id
						ELSE gm.university_id
					END AS university_id,
					CASE
						WHEN em.id IS NOT NULL
						THEN em.major_id
						ELSE gm.major_id
					END AS major_id,
					CASE
						WHEN
							em.id IS NOT NULL
							AND gm.university_id IS NOT NULL
						THEN 'matched'
						WHEN em.id IS NULL
						THEN 'new'
						WHEN gm.university_id IS NULL
						THEN 'removed'
					END AS status
				FROM existing_mapping AS em
				FULL OUTER JOIN generated_mapping AS gm
					ON gm.university_id = em.university_id
					AND gm.major_id = em.major_id
			)
		SELECT
			CASE
				WHEN sd.status = 'new'
				THEN (
					(
						SELECT
							value
						FROM max_id
					) + ROW_NUMBER() OVER (
						PARTITION BY sd.status
						ORDER BY
							sd.university_id,
							sd.major_id
					)
				)
				ELSE sd.existing_id
			END AS id,
			sd.university_id,
			sd.major_id
		FROM sync_data AS sd
	)
SELECT
	CASE
		WHEN
			NOT c.is_active
			OR NOT EXISTS (
				SELECT 1
				FROM course AS c2
				JOIN program_course AS pc
					ON pc.course_id = c2.id
				JOIN program AS p
					ON p.id = pc.program_id
				WHERE c2.id = c.id
					AND p.id IS NOT NULL
					AND p.is_active
			)
		THEN 1
		ELSE 0
	END AS delete_flg,
	cn.id,
	CASE
		WHEN
			c.concentration IS NOT NULL
			AND c.honors
		THEN m.name || ' - ' || d.abbreviation || ' (Hons) - ' || c.concentration
		WHEN
			c.concentration IS NULL
			AND c.honors
		THEN m.name || ' - ' || d.abbreviation || ' (Hons)'
		WHEN
			c.concentration IS NOT NULL
			AND NOT c.honors
		THEN m.name || ' - ' || d.abbreviation || ' - ' || c.concentration
		ELSE m.name || ' - ' || d.abbreviation
	END AS name,
	20000 + umnv.id AS major_id,
	c.concentration,
	20000 + d.id AS award_id,
	c.honors AS hons,
	c.cricos_code AS cricos,
	cn.intakes,
	cn.start_date,
	cn.end_date,
	un.id AS university_id,
	cn.entry_other,
	cn.entry_other_jpn
FROM course AS c
JOIN course_navi AS cn
	ON cn.course_id = c.id
JOIN university AS u
	ON u.id = c.university_id
JOIN university_navi AS un
	ON un.university_id = u.id
JOIN degree AS d
	ON d.id = c.degree_id
JOIN major AS m
	ON m.id = c.major_id
JOIN university_major_navi_view AS umnv
	ON umnv.university_id = u.id
	AND umnv.major_id = m.id
ORDER BY cn.id;
