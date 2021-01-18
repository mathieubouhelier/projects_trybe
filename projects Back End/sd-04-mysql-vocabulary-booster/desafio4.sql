SELECT
  (
    SELECT
      JOB_TITLE
    FROM
      hr.jobs
    WHERE
      jobs.JOB_ID = hr.employees.JOB_ID
  ) AS Cargo,
  ROUND(AVG(SALARY), 2) AS 'Média salarial',
  CASE
    WHEN ROUND(AVG(SALARY), 2) < 5800 THEN 'Júnior'
    WHEN ROUND(AVG(SALARY), 2) < 7500 THEN 'Pleno'
    WHEN ROUND(AVG(SALARY), 2) < 10500 THEN 'Sênior'
    ELSE 'CEO'
  END AS 'Senioridade'
FROM
  hr.employees
GROUP BY
  Cargo
ORDER BY
ROUND(AVG(SALARY), 2);
