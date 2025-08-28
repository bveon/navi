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
			sd.major_id
		FROM sync_data AS sd
	),
	existing_mapping AS (
		SELECT
			*
		FROM university_major_study_subarea_navi
	),
	generated_mapping AS (
		SELECT DISTINCT
			umnv.id AS university_major_navi_id,
			mss.study_subarea_id
		FROM university_major_navi_view AS umnv
		JOIN major_study_subarea AS mss
			ON mss.major_id = umnv.major_id
	),
	max_id AS (
		SELECT
			COALESCE(MAX(umssn.id), 0) AS value
		FROM university_major_study_subarea_navi AS umssn
	),
	sync_data AS (
		SELECT
			em.id AS existing_id,
			CASE
				WHEN em.id IS NOT NULL
				THEN em.university_major_navi_id
				ELSE gm.university_major_navi_id
			END AS university_major_navi_id,
			CASE
				WHEN em.id IS NOT NULL
				THEN em.study_subarea_id
				ELSE gm.study_subarea_id
			END AS study_subarea_id,
			CASE
				WHEN
					em.id IS NOT NULL
					AND gm.university_major_navi_id IS NOT NULL
				THEN 'matched'
				WHEN em.id IS NULL
				THEN 'new'
				WHEN gm.university_major_navi_id IS NULL
				THEN 'removed'
			END AS status
		FROM existing_mapping AS em
		FULL OUTER JOIN generated_mapping AS gm
			ON gm.university_major_navi_id = em.university_major_navi_id
			AND gm.study_subarea_id = em.study_subarea_id
	)
SELECT
	CASE
		WHEN status = 'removed'
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
						sd.university_major_navi_id,
						sd.study_subarea_id
				)
			)
			ELSE sd.existing_id
		END + 20000
	) AS id,
	20000 + sd.university_major_navi_id AS major_id,
	20000 + sd.study_subarea_id AS discipline_tag_id,
	1 AS sort
FROM sync_data AS sd
ORDER BY id;
