SELECT
  (
    SELECT
      ProductName
    FROM
      w3schools.products
    WHERE
      products.ProductID = w3schools.order_details.ProductID
  ) AS `Produto`,
  (
    SELECT
      Price
    FROM
      w3schools.products
    WHERE
      products.ProductID = w3schools.order_details.ProductID
  ) AS `Preço`
FROM
  w3schools.order_details
WHERE
  quantity > 80
ORDER BY
  `Produto`;
