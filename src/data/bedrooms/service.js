function BedroomService(BedroomModel) {
  const ITENS_PER_PAGE = 4;
  let service = {
    createBedroom,
    findAll,
    findById,
    removeById,
    updateBedroom,
  };

  function createBedroom(values) {
    let newBedroom = BedroomModel(values);
    return saveBedroom(newBedroom);
  }

  function saveBedroom(newBedroom) {
    return new Promise(function (resolve, reject) {
      newBedroom.save(function (err) {
        if (err) reject(err);
        resolve("Bedroom created!");
      });
    });
  }

  function findAll(req) {
    const { page = 1 } = req.query;
    return new Promise(function (resolve, reject) {
      BedroomModel.find({}, function (err, bedrooms) {
        if (err) reject(err);
        resolve(bedrooms);
      })
        .limit(ITENS_PER_PAGE)
        .skip((page - 1) * ITENS_PER_PAGE);
    });
  }

  function findById(id) {
    return new Promise(function (resolve, reject) {
      BedroomModel.findById(id, function (err, bedroom) {
        if (err) reject(err);
        resolve(bedroom);
      });
    });
  }

  function removeById(id) {
    return new Promise(function (resolve, reject) {
      console.log(id);
      BedroomModel.findByIdAndRemove(id, function (err) {
        console.log(err);
        if (err) reject(err);
        resolve();
      });
    });
  }

  function updateBedroom(id, values) {
    return new Promise(function (resolve, reject) {
      BedroomModel.findByIdAndUpdate(id, values, function (err, bedroom) {
        if (err) reject(err);
        resolve(bedroom);
      });
    });
  }

  return service;
}

module.exports = BedroomService;
