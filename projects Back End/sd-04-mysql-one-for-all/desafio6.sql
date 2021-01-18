CREATE VIEW faturamento_atual AS
SELECT
  MIN(
    (
      SELECT
        valor
      FROM
        SpotifyClone.plano
      WHERE
        SpotifyClone.usuario.plano_id = SpotifyClone.plano.id
    )
  ) AS faturamento_minimo,
  MAX(
    (
      SELECT
        valor
      FROM
        SpotifyClone.plano
      WHERE
        SpotifyClone.usuario.plano_id = SpotifyClone.plano.id
    )
  ) AS faturamento_maximo,
  ROUND(
    AVG(
      (
        SELECT
          valor
        FROM
          SpotifyClone.plano
        WHERE
          SpotifyClone.usuario.plano_id = SpotifyClone.plano.id
      )
    ),
    2
  ) AS faturamento_medio,
  ROUND(
    SUM(
      (
        SELECT
          valor
        FROM
          SpotifyClone.plano
        WHERE
          SpotifyClone.usuario.plano_id = SpotifyClone.plano.id
      )
    ),
    2
  ) AS faturamento_total
FROM
  SpotifyClone.usuario;
