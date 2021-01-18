CREATE VIEW cancoes_premium AS
SELECT
  (
    SELECT
      nome
    FROM
      SpotifyClone.cancao
    WHERE
      h.cancao_id = SpotifyClone.cancao.id
  ) AS nome,
  COUNT(*) AS reproducoes
FROM
  SpotifyClone.playlist_history AS h
  INNER JOIN SpotifyClone.usuario AS u ON h.usuario_id = u.plano_id
  INNER JOIN SpotifyClone.plano AS p ON p.id = u.plano_id
WHERE
  p.nome LIKE 'familiar'
  OR p.nome LIKE 'universitário'
GROUP BY
  h.cancao_id
ORDER BY
  nome;
