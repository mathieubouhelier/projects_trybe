USE hr;
DELIMITER $ $ CREATE PROCEDURE buscar_media_por_cargo(IN cargoName VARCHAR(100)) BEGIN
SELECT
  ROUND(AVG (SALARY), 2) AS `Média salarial`
FROM
  hr.employees
WHERE
  JOB_ID LIKE (
    SELECT
      JOB_ID
    FROM
      hr.jobs
    WHERE
      JOB_TITLE = cargoName
  );
END $ $ DELIMITER;
