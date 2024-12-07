-- Main query with pagination and filters
WITH matching_permutations AS (
    -- Find matching permutations based on sorted characters and filters
    SELECT lap.id AS permutation_id
    FROM language_anagram_permutation lap
    WHERE lap.text = $1
    AND lap.language__id = $2  -- language filter
    AND lap.script__id = $3    -- script filter
),
anagram_hierarchy AS (
    -- Navigate through the permutation associations to find all related anagrams
    SELECT DISTINCT
        lapa.parent__id AS root_permutation_id,
        lapa.child__id AS leaf_permutation_id
    FROM matching_permutations mp
    JOIN language_anagram_permutation_association lapa ON
        lapa.parent__id = mp.permutation_id OR
        lapa.child__id = mp.permutation_id
),
related_anagrams AS (
    -- Get all anagrams associated with the matching permutations
    SELECT DISTINCT la.id AS anagram_id,
           la.transcription__id,
           la.component__id
    FROM anagram_hierarchy ah
    JOIN language_anagram la ON
        la.component__id IN (ah.root_permutation_id, ah.leaf_permutation_id)
),
paginated_results AS (
    -- Final query joining all the way to language_string with pagination
    SELECT DISTINCT
        ls.id AS string_id,
        lt.id AS transcription_id,
        la.id AS anagram_id,
        lap.text AS permutation_text,
        lap.language__id,
        lap.script__id
    FROM related_anagrams ra
    JOIN language_transcription lt ON lt.id = ra.transcription__id
    JOIN language_string ls ON ls.id = lt.string__id
    JOIN language_anagram la ON la.id = ra.anagram_id
    JOIN language_anagram_permutation lap ON lap.id = la.component__id
    WHERE lap.language__id = $2  -- language filter
    AND lap.script__id = $3      -- script filter
    ORDER BY lap.text
    LIMIT $4  -- limit parameter
    OFFSET $5 -- offset parameter
),
total_count AS (
    -- Count query to get total number of results
    SELECT COUNT(DISTINCT la.id) as total_count
    FROM related_anagrams ra
    JOIN language_transcription lt ON lt.id = ra.transcription__id
    JOIN language_string ls ON ls.id = lt.string__id
    JOIN language_anagram la ON la.id = ra.anagram_id
    JOIN language_anagram_permutation lap ON lap.id = la.component__id
    WHERE lap.language__id = $2  -- language filter
    AND lap.script__id = $3      -- script filter
)
-- Return both the paginated results and the total count
SELECT
    pr.*,
    tc.total_count
FROM paginated_results pr
CROSS JOIN total_count tc;
