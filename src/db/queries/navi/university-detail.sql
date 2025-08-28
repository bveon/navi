SELECT
	CASE
		WHEN NOT un.is_active
		THEN 1
		ELSE 0
	END AS delete_flg,
	un.id AS university_id,
	un.img_total,
	un.img_version,
	u.latitude,
	u.longitude,
	u.founding_year AS foundation_year,
	(
		SELECT
			utt_ja.translation
		FROM university_type AS ut
		JOIN university_type_translation AS utt_ja
			ON utt_ja.id = ut.tid_name
			AND utt_ja.language_iso639_code = 'ja'
		JOIN university_university_type AS uut
			ON uut.university_type_id = ut.id
		WHERE uut.university_id = u.id
		ORDER BY ut.id DESC
		LIMIT 1
	) AS management,
	u.students,
	u.international_students,
	ut_ja.translation AS ksp,
	u.url AS a_homepage_url,
	CASE
		WHEN
			un.id = 20051
			OR un.id = 20058
		THEN NULL
		WHEN un2.id != un.id
		THEN u2.url
		ELSE NULL
	END AS homepage_url2
FROM university AS u
JOIN university_translation AS ut_ja
	ON ut_ja.id = u.tid_description
	AND ut_ja.language_iso639_code = 'ja'
JOIN university_navi AS un
	ON un.university_id = u.id
JOIN university AS u2
	ON u2.id = u.primary_university_id
JOIN university_navi AS un2
	ON un2.university_id = u2.id
ORDER BY un.id;
