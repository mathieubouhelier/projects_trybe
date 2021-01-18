DELIMITER $ $ CREATE PROCEDURE albuns_do_artista(IN artist_name VARCHAR(100)) BEGIN
SELECT
  (
    SELECT
      nome
    FROM
      SpotifyClone.artista
    WHERE
      SpotifyClone.artista.id = SpotifyClone.album.artista_id
  ) AS artista,
  nome AS album
FROM
  SpotifyClone.album
WHERE
  artista_id = (
    SELECT
      id
    FROM
      SpotifyClone.artista
    WHERE
      SpotifyClone.artista.nome like artist_name
  );
END $ $ DELIMITER;
