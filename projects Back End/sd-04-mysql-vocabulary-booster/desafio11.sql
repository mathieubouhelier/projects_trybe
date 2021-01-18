SELECT
  cu.ContactName AS `Nome`,
  cu.Country AS `País`,
  C.cnt - 1 AS `Número de compatriotas`
FROM
  w3schools.customers AS  cu
  INNER JOIN (
    SELECT
      Country,
      COUNT(*) AS cnt
    FROM
      w3schools.customers
    GROUP BY
      Country
  ) AS C ON (
    cu.Country = C.Country
    AND C.cnt - 1 <> 0
  )
ORDER BY
  `Nome`;
