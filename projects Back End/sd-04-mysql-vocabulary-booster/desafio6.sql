SELECT
  (
    SELECT
      CONCAT(FIRST_NAME, ' ', LAST_NAME)
    FROM
      hr.employees
    WHERE
      employees.EMPLOYEE_ID = hr.job_history.EMPLOYEE_ID
  ) AS `Nome completo`,
  (
    SELECT
      JOB_TITLE
    FROM
      hr.jobs
    WHERE
      jobs.JOB_ID = hr.job_history.JOB_ID
  ) AS Cargo,
  START_DATE AS `Data de início do cargo`,
  (
    SELECT
      DEPARTMENT_NAME
    FROM
      hr.departments
    WHERE
      departments.DEPARTMENT_ID = hr.job_history.DEPARTMENT_ID
  ) AS Departamento
FROM
  hr.job_history
WHERE
  EMPLOYEE_ID <> 0
ORDER BY
  `Nome completo` DESC,
  CARGO;
