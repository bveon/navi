WITH university_major_view AS (
  WITH base_mapping AS (
    SELECT
      *
    FROM
      university_major_base),
    generated_mapping AS (
      SELECT DISTINCT
        university_id,
        major_id
      FROM
        degree),
      max_id AS (
        SELECT
          COALESCE(MAX(id), 0) AS value
        FROM
          university_major_base),
        sync_data AS (
          SELECT
            bm.id AS base_id,
            CASE WHEN bm.id IS NOT NULL THEN
              bm.university_id
            ELSE
              gm.university_id
            END AS university_id,
            CASE WHEN bm.id IS NOT NULL THEN
              bm.major_id
            ELSE
              gm.major_id
            END AS major_id,
            CASE WHEN bm.id IS NOT NULL
              AND gm.university_id IS NOT NULL THEN
              'matched'
            WHEN bm.id IS NULL THEN
              'new'
            WHEN gm.university_id IS NULL THEN
              'removed'
            END AS status
          FROM
            base_mapping AS bm
          FULL OUTER JOIN generated_mapping AS gm ON gm.university_id = bm.university_id
          AND gm.major_id = bm.major_id
)
        SELECT
          CASE WHEN sd.status = 'new' THEN
            ((
                SELECT
                  value
                FROM
                  max_id) + ROW_NUMBER() OVER (PARTITION BY sd.status ORDER BY sd.university_id,
                  sd.major_id))
          ELSE
            sd.base_id
          END AS id,
          sd.university_id,
          sd.major_id
        FROM
          sync_data AS sd
)
    SELECT
      CASE WHEN d.delete_flg = 1
        OR NOT EXISTS (
          SELECT
            1
          FROM
            degree AS d2
          JOIN degree_program AS dp ON dp.degree_id = d2.id
          JOIN program AS p ON p.id = dp.program_id
        WHERE
          d2.id = d.id
          AND p.id IS NOT NULL
          AND p.delete_flg = 0) THEN
        1
      ELSE
        0
      END AS delete_flg,
      d.id,
      CASE WHEN d.concentration IS NOT NULL
        AND d.hons THEN
        m.name || ' - ' || a.award || ' (Hons) - ' || d.concentration
      WHEN d.concentration IS NULL
        AND d.hons THEN
        m.name || ' - ' || a.award || ' (Hons)'
      WHEN d.concentration IS NOT NULL
        AND NOT d.hons THEN
        m.name || ' - ' || a.award || ' - ' || d.concentration
      ELSE
        m.name || ' - ' || a.award
      END AS name,
      umv.id AS major_id,
      d.concentration,
      d.award_id,
      d.hons,
      d.cricos,
      d.intakes,
      d.start_date,
      d.end_date,
      u.id AS university_id,
      d.entry_other,
      d.entry_other_jpn
    FROM
      degree AS d
      JOIN university AS u ON u.id = d.university_id
      JOIN award AS a ON a.id = d.award_id
      JOIN major AS m ON m.id = d.major_id
      JOIN university_major_view AS umv ON umv.university_id = u.id
        AND umv.major_id = m.id
      ORDER BY
        d.id;
