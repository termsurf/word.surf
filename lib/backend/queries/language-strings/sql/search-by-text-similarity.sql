WITH similarity_scores AS (
  SELECT
    component__id,
    similarity(text, $1::text) as sim_score
  FROM language_component_search
)
SELECT component__id
FROM similarity_scores
WHERE sim_score > $2
ORDER BY sim_score DESC
LIMIT $3;
