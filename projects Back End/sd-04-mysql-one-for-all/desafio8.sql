USE SpotifyClone;
DELIMITER $ $ CREATE TRIGGER trigger_usuario_delete BEFORE DELETE ON usuario FOR EACH ROW BEGIN
DELETE FROM
  artiste_followed
WHERE
  artiste_followed.usuario_id = OLD.id;
DELETE FROM
  playlist_history
WHERE
  playlist_history.usuario_id = OLD.id;
END;
$ $ DELIMITER;
