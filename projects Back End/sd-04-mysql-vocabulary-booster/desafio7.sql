SELECT
  (
    SELECT
      UCASE (CONCAT(FIRST_NAME, ' ', LAST_NAME))
    FROM
      hr.employees
    WHERE
      employees.EMPLOYEE_ID = hr.job_history.EMPLOYEE_ID
  ) AS `Nome completo`,
  START_DATE AS `Data de início`,
  (
    SELECT
      SALARY
    FROM
      hr.employees
    WHERE
      employees.EMPLOYEE_ID = hr.job_history.EMPLOYEE_ID
  ) AS `Salário`
FROM
  hr.job_history
WHERE
  EMPLOYEE_ID <> 0
  AND MONTH(START_DATE) BETWEEN 01
  AND 03
ORDER BY
  `Nome completo`,
  START_DATE;
