SELECT
	0 AS delete_flg,
	20000 + d.id AS id,
	d.abbreviation AS award,
	dt_ja.translation AS ksp,
	d.name AS a_long_text
FROM degree AS d
JOIN degree_translation AS dt_ja
	ON dt_ja.id = d.tid_description
	AND dt_ja.language_iso639_code = 'ja'
ORDER BY d.id;
