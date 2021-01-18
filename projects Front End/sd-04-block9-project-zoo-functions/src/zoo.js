/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  // if (!ids) return [];
  const output = data.animals.filter(animal => ids.includes(animal.id));
  return output;
}



function animalsOlderThan(animal, age) {
  // seu código aqui
  const output2 = data.animals.filter(element => element.name === animal);
  const output = output2[0].residents.every(x => x.age > age);
  return output;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const output = data.employees.find(
    element =>
      employeeName === element.firstName || employeeName === element.lastName);
  return output;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // return output = Object.assign({}, personalInfo,associatedWith);
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  // Pode fazer com MAP ??????????
  // Create array of id of all managers
  const allManagersIds = [];
  data.employees.forEach(element => allManagersIds.push(...element.managers));
  // chek if at leat on id (input) is inside the array of id of all managers
  const output = allManagersIds.some(allManagersId => allManagersId === id);
  return output;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  // Pode fazer com default value? => sim colloque isso com input managers = [],
  if (!managers) managers = [];
  if (!responsibleFor) responsibleFor = [];
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}
console.log(data.employees);
function animalCount(species) {
    // // seu código aqui
  const allAnimalCountResult = data.animals.reduce((object, animal) => {
    object[animal.name] = animal.residents.length;
    return object;
  }, {});
  if (!species) return allAnimalCountResult;
  return data.animals.find(element => element.name === species).residents.length;
}



// function entryCalculator(entrants) {
//   // seu código aqui
//   if (!entrants) return 0;
//   if (Object.keys(entrants).length === 0) return 0;
//   return (
//     (data.prices.Adult * entrants.Adult) +
//     (data.prices.Child * entrants.Child) +
//     (data.prices.Senior * entrants.Senior)
//   );
// }

const entryCalculator = (entrants) => {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce(
    (price, person) => price + (entrants[person] * data.prices[person]),
    0,
  );
};

  const animaFiltered = (direction => data.animals.filter(animal => animal.location === direction));

const noParameters = (direction => animaFiltered(direction).reduce((acc, cur) => {
  acc.push(cur.name);
  return acc;
}, [])
);

const listNameAnimals = (animal => animal.residents.reduce((acc, cur) => {
  acc.push(cur.name);
  return acc;
}, [])
);

const listNameAnimalsSexFiltered = (animal, sexFilter) =>
  animal.residents
    .filter(animalToFiltre => animalToFiltre.sex === sexFilter)
    .reduce((acc, cur) => {
      acc.push(cur.name);
      return acc;
    }, []);

const includeNames = (direction =>
  animaFiltered(direction).map(animal =>
    ({ [animal.name]: listNameAnimals(animal) }),
  ));

const includeNamesSorted = (direction =>
  animaFiltered(direction).map(animal =>
    ({ [animal.name]: listNameAnimals(animal).sort() }),
  ));

const includeNamessexFilter = ((direction, sexFilter) =>
  animaFiltered(direction).map(animal =>
    ({ [animal.name]: listNameAnimalsSexFiltered(animal, sexFilter) }),
  ));

const includeNamessexFilter2 = ((direction, sexFilter) =>
  animaFiltered(direction).map(animal =>
    animal.name,
  ));


const coord = ['NE', 'NW', 'SE', 'SW'];
const map = {};
const mapCreate = (options, mapValueIndex) => {
  for (let index = 0; index < coord.length; index += 1) {
    let mapValue = {};
    const array = [
      noParameters(coord[index]),
      includeNames(coord[index]),
      includeNamesSorted(coord[index]),
      includeNamessexFilter(coord[index], 'female'),
      includeNamessexFilter(coord[index], 'male'),
      includeNamessexFilter2(coord[index], 'female'),
      includeNamessexFilter2(coord[index], 'male'),
    ];
    mapValue = array[mapValueIndex];
    map[coord[index]] = mapValue;
  }
  return map;
};

function animalMap(options) {
  let mapValueIndex = 0;
  switch (true) {
    case typeof options === 'undefined':
      mapValueIndex = 0;
      break;
    case options.includeNames && options.sorted:
      mapValueIndex = 2;
      break;
    case options.includeNames && options.sex === 'female':
      mapValueIndex = 3;
      break;
    case options.includeNames === true && options.sex === 'male':
      mapValueIndex = 4;
      break;
    case options.includeNames && !options.sorted:
      mapValueIndex = 1;
      break;
    case options.sex === 'female' && !options.includeNames:
      mapValueIndex = 5;
      break;
    default : mapValueIndex = 6;
  }
  return mapCreate(options, mapValueIndex);
}

function schedule(dayName) {
  const scheduleFull = {};
  let dayopenHours = '';
  Object.keys(data.hours).forEach((days) => {
    if (days === 'Monday') {
      dayopenHours = 'CLOSED';
    } else {
      dayopenHours = `Open from ${data.hours[days].open}am until ${
        data.hours[days].close - 12
      }pm`;
    }
    scheduleFull[days] = dayopenHours;
  });
  const scheduleOneDay = {};
  const daychecked = Object.keys(scheduleFull).find(
    key => key === dayName,
  );
  scheduleOneDay[daychecked] = scheduleFull[daychecked];
  if (!dayName) return scheduleFull;
  return scheduleOneDay;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeFilteredById = data.employees.filter(employee => id.includes(employee.id));
  const firstSpeciesId = employeeFilteredById[0].responsibleFor[0];
  const firstSpeciesObject = data.animals.filter(animal => animal.id.includes(firstSpeciesId));
  const firstSpeciesResidentArray = firstSpeciesObject[0].residents;
  const oldResidentFoundArray = firstSpeciesResidentArray.reduce(
    (prev, curr) => {
      prev = prev.age >= curr.age ? prev : curr;
      return prev;
    }, {});
  return [oldResidentFoundArray.name, oldResidentFoundArray.sex, oldResidentFoundArray.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const priceList = data.prices;
  const coef = (percentage + 100) / 100;
  Object.keys(priceList).forEach(function (visitor) {
    priceList[visitor] = Math.round(priceList[visitor] * coef * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const employeeList = data.employees.reduce((employeeListObject, employe) => {
    employeeListObject[`${employe.firstName} ${employe.lastName}`] = employe.responsibleFor.map(
    ids => data.animals.find(({ id }) => (id === ids)).name);
    return employeeListObject;
  }, {});
  const arr = data.employees.find(
    ({ id, firstName, lastName }) =>
      id === idOrName || firstName === idOrName || lastName === idOrName,
  );
  if (!idOrName) return employeeList;
  return { [`${arr.firstName} ${arr.lastName}`]: employeeList[`${arr.firstName} ${arr.lastName}`] };
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
