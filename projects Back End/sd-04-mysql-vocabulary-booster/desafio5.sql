SELECT
  JOB_TITLE AS `Cargo`,
  ROUND((MAX_SALARY - MIN_SALARY), 0) AS `Variação Salarial`,
  ROUND((MIN_SALARY / 12), 2) AS `Média mínima mensal`,
  ROUND((MAX_SALARY / 12), 2) AS `Média máxima mensal`
FROM
  hr.jobs
ORDER BY
  `Variação Salarial`,
  `Cargo`;
