db.voos.find({"litrosCombustivel": {$ne:null}}, { _id: 0,vooId:1,}).limit(1);
