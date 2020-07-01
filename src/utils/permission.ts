import _ from "lodash";
import { permissions } from "./constants";
export const hasPermission = (moduleName, role, permissionType) => {
  console.log("Inside hasPermission function");
  console.log(
    `Arguments provided, moduleName = ${moduleName}, role = ${role}, permissionType = ${permissionType}`
  );
  const module = _.get(permissions, moduleName, undefined);
  if (module === undefined) {
    console.log(`Invalid moduleName ${moduleName}`);
    return false;
  }
  const permission = _.get(module, permissionType, undefined);
  if (permission === undefined) {
    console.log(`Invalid permissionType ${permissionType}`);
    return false;
  }
  const userRole = _.includes(permission, role);
  if (userRole === true) {
    console.log("Valid User");
    return true;
  }
  return false;
};
