SELECT
  (
    SELECT
      CONCAT (FirstName,' ',LastName)
    From
      w3schools.employees
    Where
      employees.employeeID = w3schools.orders.employeeID
  ) AS `Nome completo`,
  COUNT(*) AS `Total de pedidos`
FROM
  w3schools.orders
GROUP BY
  EmployeeID
  ORDER BY `Total de pedidos`;
