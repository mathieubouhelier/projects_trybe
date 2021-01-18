qty = db.voos.find({"empresa.nome": "PASSAREDO", "natureza": "Doméstica"}).count();
db.voos.insert({"empresa": "PASSAREDO", "totalVoosDomesticos" : qty });
db.voos.find({"empresa": "PASSAREDO", "totalVoosDomesticos" : 4187 }, { _id: 0,"empresa":1,"totalVoosDomesticos":1});
