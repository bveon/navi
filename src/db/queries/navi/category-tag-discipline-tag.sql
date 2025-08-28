SELECT
	0 AS delete_flg,
	20000 + sssan.study_subarea_study_area_id AS id,
	san.study_area_id AS category_tag_id,
	20000 + ss.id AS discipline_tag_id,
	sssan.sort
FROM study_subarea_study_area AS sssa
JOIN study_subarea_study_area_navi AS sssan
	ON sssan.study_subarea_study_area_id = sssa.id
JOIN study_subarea AS ss
	ON ss.id = sssa.study_subarea_id
JOIN study_area_navi AS san
	ON san.study_area_id = sssa.study_area_id
ORDER BY sssan.study_subarea_study_area_id;
