CREATE VIEW perfil_artistas AS
SELECT
  (
    SELECT
      nome
    FROM
      SpotifyClone.artista
    WHERE
      SpotifyClone.artista.id = SpotifyClone.album.artista_id
  ) AS artista,
  nome AS album,
  (
    SELECT
      COUNT(usuario_id)
    FROM
      SpotifyClone.artiste_followed
    WHERE
      SpotifyClone.artiste_followed.artista_id = SpotifyClone.album.artista_id
  ) AS seguidores
FROM
  SpotifyClone.album
ORDER BY
  seguidores DESC,
  artista;
