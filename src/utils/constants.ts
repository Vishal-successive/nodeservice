export const moduleName = {
  getUsers: "getUsers",
};
export const permissionTypes = {
  all: "all",
  read: "read",
  write: "write",
  delete: "delete",
};
export const permissions = {
  getUsers: {
    all: ["head-trainer"],
    read: ["trainee", "trainer"],
    write: ["trainer"],
    delete: [],
  },
};
