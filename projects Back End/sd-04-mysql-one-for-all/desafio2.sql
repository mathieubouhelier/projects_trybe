CREATE VIEW estatisticas_musicais AS
SELECT
  Count(DISTINCT SpotifyClone.cancao.nome) AS cancoes,
  COUNT(DISTINCT SpotifyClone.artista.nome) AS artistas,
  COUNT(DISTINCT SpotifyClone.album.nome) AS albuns
FROM
  SpotifyClone.cancao
  INNER JOIN SpotifyClone.artista
  INNER JOIN SpotifyClone.album;

-- Altervative solution
-- SELECT
--   Count(DISTINCT nome) AS cancoes,
--   (SELECT 
--   COUNT(DISTINCT nome)
--   FROM SpotifyClone.artista) 
--   AS artistas,
--     (SELECT 
--     COUNT(DISTINCT nome) 
-- FROM SpotifyClone.album) AS albuns
-- FROM SpotifyClone.cancao;
