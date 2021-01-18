CREATE VIEW historico_reproducao_usuarios AS
SELECT
  u.nome AS usuario,
  c.nome AS nome
FROM
  SpotifyClone.usuario AS u
  INNER JOIN SpotifyClone.playlist_history AS h on u.id = h.usuario_id
  INNER JOIN SpotifyClone.cancao as c ON c.id = h.cancao_id
ORDER BY
  usuario,
  nome;
