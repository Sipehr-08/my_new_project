const cloneDeep = require('lodash/cloneDeep');
/**
 * Method to check two objects by id
 * @param {Object} objAll
 * @param {Object} obj
 * @return {*}
 */
export const checkId = (objAll, obj) => {
  return objAll.map(item => (item.id === obj.id ? obj : item));
};
/**
 * Method to object keys length
 * @param {Object} obj_1
 * @param {Object} obj_2
 * @return {*}
 */
export const checkQueryLength = (obj_1, obj_2) => {
  let newObject = cloneDeep(obj_2);
  Object.keys(obj_1).length !== 0 ? (newObject = { ...newObject, ...obj_1 }) : '';
  return newObject;
};
