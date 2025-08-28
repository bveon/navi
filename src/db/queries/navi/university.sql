SELECT
	CASE
		WHEN NOT un.is_active
		THEN 1
		ELSE 0
	END AS delete_flg,
	un.id,
	un.uapply_id AS u_apply_id,
	ut_en.translation AS name,
	ut_ja.translation AS japanese_name,
	u.code AS abbr3,
	un.slug,
	co2.iso3166_code AS country,
	CASE
		WHEN un2.id != un.id
		THEN co.iso3166_code
		ELSE NULL
	END AS transfer_country,
	un.non_applicable_country_code AS non_applicable_national_code,
	un2.id AS main_university_id,
	TRUE AS scholarship_flg,
	un.start_date,
	un.end_date,
	un.score
FROM university AS u
JOIN university_translation AS ut_en
	ON ut_en.id = u.tid_name
	AND ut_en.language_iso639_code = 'en'
JOIN university_translation AS ut_ja
	ON ut_ja.id = u.tid_name
	AND ut_ja.language_iso639_code = 'ja'
JOIN university_navi AS un
	ON un.university_id = u.id
JOIN city AS c
	ON c.id = u.city_id
JOIN region AS r
	ON r.id = c.region_id
JOIN country AS co
	ON co.iso3166_code = r.country_iso3166_code
JOIN university AS u2
	ON u2.id = u.primary_university_id
JOIN university_navi AS un2
	ON un2.university_id = u2.id
JOIN city AS c2
	ON c2.id = u2.city_id
JOIN region AS r2
	ON r2.id = c2.region_id
JOIN country AS co2
	ON co2.iso3166_code = r2.country_iso3166_code
ORDER BY un.id;
