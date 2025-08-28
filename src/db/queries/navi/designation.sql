SELECT
	0 AS delete_flg,
	20000 + udn.university_designation_id AS id,
	udt_name_en.translation AS name,
	udt_name_ja.translation AS japanese_name,
	udn.icon_url,
	udt_description_ja.translation AS description,
	udn.a_code
FROM university_designation AS ud
JOIN university_designation_navi AS udn
	ON udn.university_designation_id = ud.id
JOIN university_designation_translation AS udt_name_en
	ON udt_name_en.id = ud.tid_name
	AND udt_name_en.language_iso639_code = 'en'
JOIN university_designation_translation AS udt_name_ja
	ON udt_name_ja.id = ud.tid_name
	AND udt_name_ja.language_iso639_code = 'ja'
JOIN university_designation_translation AS udt_description_ja
	ON udt_description_ja.id = ud.tid_description
	AND udt_description_ja.language_iso639_code = 'ja'
ORDER BY udn.university_designation_id;
