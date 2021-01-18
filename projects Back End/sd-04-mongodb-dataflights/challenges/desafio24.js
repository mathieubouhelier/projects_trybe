db.voos.find({"litrosCombustivel": { $exists: true, $lt: 600 },"empresa": {$nin:["GOL", "AZUL"]} }, 
{ _id: 0,vooId:1, litrosCombustivel:1, "empresa.nome":1
}).limit(1);
