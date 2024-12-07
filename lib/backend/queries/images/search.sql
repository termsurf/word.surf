-- https://claude.ai/chat/452248a1-2ee5-4890-94f9-412db52b48f7
WITH RECURSIVE search_nodes AS (
  SELECT
    jsonb_array_elements_text($1::jsonb) AS node,
    row_number() OVER () AS search_pos
),
matched_images AS (
  SELECT
    id,
    jsonb_array_elements_text(path) AS path_node,
    row_number() OVER (PARTITION BY id) AS path_pos
  FROM image
),
path_matches AS (
  -- Base case: match first search term
  SELECT
    mn.id,
    mn.path_pos as last_pos,
    1 as terms_matched
  FROM search_nodes sn
  JOIN matched_images mn
    ON similarity(sn.node, mn.path_node) > 0.3
  WHERE sn.search_pos = 1

  UNION ALL

  -- Recursive case: match subsequent terms
  SELECT
    mn.id,
    mn.path_pos,
    pm.terms_matched + 1
  FROM path_matches pm
  JOIN search_nodes sn
    ON sn.search_pos = pm.terms_matched + 1
  JOIN matched_images mn
    ON mn.id = pm.id
    AND similarity(sn.node, mn.path_node) > 0.3
    AND mn.path_pos > pm.last_pos
)
SELECT DISTINCT id
FROM path_matches
WHERE terms_matched = (SELECT COUNT(*) FROM search_nodes);
LIMIT $2
