SELECT
	0 AS delete_flg,
	20000 + ss.id AS id,
	sst_en.translation AS name,
	sst_ja.translation AS japanese_name
FROM study_subarea AS ss
JOIN study_subarea_translation AS sst_en
	ON sst_en.id = ss.tid_name
	AND sst_en.language_iso639_code = 'en'
JOIN study_subarea_translation AS sst_ja
	ON sst_ja.id = ss.tid_name
	AND sst_ja.language_iso639_code = 'ja'
ORDER BY ss.id;
