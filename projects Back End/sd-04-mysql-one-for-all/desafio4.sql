CREATE VIEW top_3_artistas AS
SELECT
  (
    SELECT
      nome
    FROM
      SpotifyClone.artista
    WHERE
      id = SpotifyClone.artiste_followed.artista_id
  ) AS artista,
  COUNT(artista_id) AS seguidores
FROM
  SpotifyClone.artiste_followed
group by
  artista_id
ORDER BY
  seguidores DESC, artista
LIMIT
  3
