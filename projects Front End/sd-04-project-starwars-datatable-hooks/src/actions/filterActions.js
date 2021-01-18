export const NUMERICAL_FILTER = 'NUMERICAL_FILTER';
export const DELETE_FILTER = 'DELETE_FILTER';

export const numericalFilter = (value) => ({
  type: NUMERICAL_FILTER,
  value,
});


export const deleteFilter = (index) => ({
  type: DELETE_FILTER,
  index,
});
// console.log('test Action Filter', value)
