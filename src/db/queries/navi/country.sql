SELECT
	0 AS delete_flg,
	cn.country_iso3166_code AS code,
	ct_en.translation AS name,
	ct_ja.translation AS japanese_name,
	currency.iso4217_code AS tuition_currency,
	cn.sort
FROM country AS c
JOIN country_navi AS cn
	ON cn.country_iso3166_code = c.iso3166_code
JOIN country_translation AS ct_en
	ON ct_en.id = c.tid_name
	AND ct_en.language_iso639_code = 'en'
JOIN country_translation AS ct_ja
	ON ct_ja.id = c.tid_name
	AND ct_ja.language_iso639_code = 'ja'
JOIN currency
	ON currency.iso4217_code = cn.currency_iso4217_code
ORDER BY cn.sort;
