SELECT
	CASE
		WHEN
			NOT p.is_active
			OR u.university_id IS NULL
		THEN 1
		ELSE 0
	END AS delete_flg,
	pn.id,
	p.name,
	ptn.abbreviation AS type,
	CASE pn.id
		WHEN '20325'
		THEN 'isu-ugp-data-science'
		WHEN '20328'
		THEN 'sts-fdn-nursing'
		ELSE u.university_code || '-' || ptn.code || '-' || REGEXP_REPLACE(
			REGEXP_REPLACE(
				REGEXP_REPLACE(REPLACE(LOWER(p.name), ',', ''), ' ', '-', 'g'),
				' ?\([^)]*\)', '', 'g'
			),
			'-$', '', 'g'
		)
	END AS code,
	pn.ksp_en,
	pn.ksp,
	NULL AS scholarship_ksp_en,
	pn.scholarship_ksp,
	CASE
		WHEN pr.type = 'direct'
		THEN 'direct'
		ELSE pr.abbreviation
	END AS provider,
	p.cricos_code AS cricos,
	pn.start_date,
	pn.end_date,
	pp.price AS tuition,
	0 AS scholarship,
	un.id AS university_id,
	p.ielts,
	p.ielts_reading AS ielts_r,
	p.ielts_writing AS ielts_w,
	p.ielts_listening AS ielts_l,
	p.ielts_speaking AS ielts_s,
	p.toefl,
	p.toefl_reading AS toefl_r,
	p.toefl_writing AS toefl_w,
	p.toefl_listening AS toefl_l,
	p.toefl_speaking AS toefl_s,
	par.gpa,
	part_course_en.translation AS gpa_sub,
	' ' || part_course_ja.translation AS gpa_sub_jpn,
	part_other_en.translation AS entry_other,
	part_other_ja.translation AS entry_other_jpn,
	pn.math_requirement,
	pn.math_1,
	pn.math_a,
	pn.math_2,
	pn.math_b,
	pn.math_3,
	pn.math_c,
	pn.math_avg,
	pn.science_requirement,
	pn.physics,
	pn.biology,
	pn.chemistry,
	pn.science_avg,
	pn.other_requirement,
	pn.eat_flg,
	p.is_capacity AS capacity_flg
FROM program AS p
JOIN program_navi AS pn
	ON pn.program_id = p.id
JOIN program_type_instance AS pti
	ON pti.id = p.program_type_instance_id
JOIN program_type_navi AS ptn
	ON ptn.program_type_code = pti.program_type_code
JOIN provider AS pr
	ON pr.id = p.provider_id
JOIN (
	SELECT
		program_id,
		price,
		ROW_NUMBER() OVER (PARTITION BY program_id ORDER BY academic_year DESC) AS rn
	FROM program_price
	WHERE academic_year IN ('2526', '2425')
) AS pp
	ON pp.program_id = p.id
	AND pp.rn = 1
JOIN program_academic_requirement AS par
	ON par.program_id = p.id
	AND country_gpa_scale_id = 1
LEFT JOIN program_academic_requirement_translation AS part_course_en
	ON part_course_en.id = par.tid_course_requirements
	AND part_course_en.language_iso639_code = 'en'
LEFT JOIN program_academic_requirement_translation AS part_course_ja
	ON part_course_ja.id = par.tid_course_requirements
	AND part_course_ja.language_iso639_code = 'ja'
LEFT JOIN program_academic_requirement_translation AS part_other_en
	ON part_other_en.id = par.tid_other_requirements
	AND part_other_en.language_iso639_code = 'en'
LEFT JOIN program_academic_requirement_translation AS part_other_ja
	ON part_other_ja.id = par.tid_other_requirements
	AND part_other_ja.language_iso639_code = 'ja'
LEFT JOIN LATERAL (
	SELECT
		u.id AS university_id,
		u2.code AS university_code
	FROM program_course AS pc
	JOIN course AS c
		ON c.id = pc.course_id
	JOIN university AS u
		ON u.id = c.university_id
	JOIN university AS u2
		ON u2.id = u.primary_university_id
	WHERE pc.program_id = p.id
	LIMIT 1
) AS u
	ON true
LEFT JOIN university_navi AS un
	ON un.university_id = u.university_id
ORDER BY pn.id;
