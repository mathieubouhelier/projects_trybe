DELIMITER $ $ CREATE FUNCTION quantidade_musicas_no_historico(id INT) RETURNS INT READS SQL DATA BEGIN DECLARE qty INT;
SELECT
  COUNT(*)
FROM
  SpotifyClone.playlist_history
WHERE
  usuario_id = id INTO qty;
RETURN qty;
END $ $ DELIMITER;
