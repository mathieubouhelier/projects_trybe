qty = db.voos.find({"empresa.nome": "LATAM AIRLINES BRASIL", "natureza": "Doméstica"}).count();
db.resumoVoos.insert({"empresa": "LATAM AIRLINES BRASIL", "totalVoosDomesticos" : qty });
db.resumoVoos.find({empresa: "LATAM AIRLINES BRASIL"}, { _id: 0,"empresa":1,"totalVoosDomesticos":1});
