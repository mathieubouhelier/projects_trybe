db.produtos.find(
  { vendidos: { $mod: [5, 0] } },
  { _id: 0, nome: true, vendidos: 1 }
);
