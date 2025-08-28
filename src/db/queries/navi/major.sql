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
		WHEN
			sd.status = 'removed'
			OR NOT EXISTS (
				SELECT 1
				FROM course AS c
				JOIN university AS u
					ON u.id = c.university_id
					AND u.is_active
				JOIN program_course AS pc
					ON pc.course_id = c.id
				JOIN program AS p
					ON p.id = pc.program_id
					AND p.is_active
				WHERE c.university_id = sd.university_id
					AND c.major_id = sd.major_id
			)
		THEN 1
		ELSE 0
	END AS delete_flg,
	(
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
		END + 20000
	) AS id,
	u.code || '-' || REGEXP_REPLACE(REPLACE(LOWER(m.name), ',', ''), ' ', '-', 'g') AS code,
	m.name,
	un.id AS university_id
FROM sync_data AS sd
JOIN university AS u
	ON u.id = sd.university_id
JOIN university_navi AS un
	ON un.university_id = u.id
JOIN major AS m
	ON m.id = sd.major_id
ORDER BY id;
