SELECT
  (
    SELECT
      ContactName
    FROM
      w3schools.customers
    Where
      customers.CustomerID = w3schools.orders.CustomerID
  ) AS `Nome de contato`,
  (
    SELECT
      ShipperName
    FROM
      w3schools.shippers
    Where
      shippers.ShipperID = w3schools.orders.ShipperID
  ) AS `Empresa que fez o envio`,
  OrderDate AS `Data do pedido`
FROM
  w3schools.orders
WHERE
  ShipperID = 1
  OR ShipperID = 2
ORDER BY
  `Nome de contato`,
  `Empresa que fez o envio`,
  `Data do pedido`;
