db.voos.find({"empresa.nome": { $in: ["DELTA AIRLINES", "AMERICAN AIRLINES"] },
"aeroportoOrigem.sigla": "SBGR",
"aeroportoDestino.sigla": "KJFK"
}, { _id: 0,vooId:1,}).limit(1);
