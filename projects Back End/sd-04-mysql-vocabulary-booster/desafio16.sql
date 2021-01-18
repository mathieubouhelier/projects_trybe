USE hr;
DELIMITER $ $ CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(email VARCHAR(100)) RETURNS INT READS SQL DATA BEGIN DECLARE JOB_QTY INT;
SELECT
  COUNT(SALARY)
FROM
  hr.employees AS e
  INNER JOIN hr.job_history AS h ON e.EMPLOYEE_ID = h.EMPLOYEE_ID
WHERE
  e.EMAIL LIKE email INTO JOB_QTY;
RETURN JOB_QTY;
END $ $ DELIMITER;
-- Usando Subquery
-- USE hr;
-- DELIMITER $$
-- CREATE FUNCTION test2( email VARCHAR(100))
-- RETURNS INT READS SQL DATA
-- BEGIN
--   DECLARE jobs INT;
-- SELECT
--     COUNT(*)
-- INTO jobs FROM
--     hr.job_history
-- WHERE
--     EMPLOYEE_ID = (SELECT
--             EMPLOYEE_ID
--         FROM
--             hr.employees AS e
--         WHERE
--             e.EMAIL LIKE email);
--   RETURN jobs;
-- END $$ DELIMITER ;
