import { intersection } from 'lodash';

export function isArrayWithLength(arr) {
 return (Array.isArray(arr) && arr.length)
}

export function getAllowedRoutes(routes, roles) {
 return routes.filter(({ permission }) => {
  if(!permission) return true;
  else if(!isArrayWithLength(permission)) return true;
  else return intersection(permission, roles).length;
 });
}