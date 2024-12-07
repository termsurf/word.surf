WITH phonetic_variants AS (
    SELECT
        unnest($1::text[]) AS variant,
        unnest($2::float[]) AS score
),
matched_pronunciations AS (
    SELECT DISTINCT ON (lp.string__id)
        lp.string__id,
        pv.variant,
        pv.score,
        lp.text AS full_pronunciation
    FROM phonetic_variants pv
    JOIN language_pronunciation lp ON
        lp.text = pv.variant  -- Exact match
        OR lp.text LIKE (pv.variant || '%')  -- Prefix match
    ORDER BY lp.string__id, pv.score DESC  -- Take the highest scoring match for each string_id
),
paginated_results AS (
    SELECT
        ls.id AS string_id,
        mp.full_pronunciation,
        mp.variant AS matched_variant,
        mp.score AS match_score,
        CASE
            WHEN mp.full_pronunciation = mp.variant THEN true
            ELSE false
        END AS is_exact_match,
        COUNT(*) OVER() AS total_count
    FROM language_string ls
    JOIN matched_pronunciations mp ON mp.string__id = ls.id
    ORDER BY mp.score DESC, ls.id
    LIMIT $3  -- Number of records per page
    OFFSET $4 -- Offset for pagination
)
SELECT
    string_id,
    match_score,
    total_count
FROM paginated_results;
