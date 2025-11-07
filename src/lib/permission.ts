import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
import { createAccessControl } from "better-auth/plugins/access";

/**
 * Define the access control statements for various resources in the application.
 * Each resource can have multiple actions that can be performed on it.
 */
const statement = {
  ...defaultStatements,
  appointment: ["create", "list", "view", "share", "update", "delete"],
  vaccination: ["create", "list", "view", "update", "delete"],
  facility: ["create", "list", "view", "update", "delete"],
  inventory: ["create", "list", "view", "update", "delete"],
  analytics: ["view"],
  report: ["create", "list", "view", "delete", "export"],
} as const;

export const ac = createAccessControl(statement);

export const su = ac.newRole(Object());

const admin = ac.newRole({
  user: ["create", "list", "set-role", "ban", "delete", "set-password", "get", "update"],
  appointment: ["create", "list", "view", "update", "delete"],
  vaccination: ["create", "list", "view", "update", "delete"],
  facility: ["create", "list", "view", "update", "delete"],
  inventory: ["create", "list", "view", "update", "delete"],
  analytics: ["view"],
  report: ["create", "list", "view", "delete", "export"],
});

const doctor = ac.newRole({
  appointment: ["view", "list", "update"],
  vaccination: ["create", "view", "update", "delete"],
  facility: ["view"],
  inventory: ["view"],
});

const inventoryManager = ac.newRole({
  inventory: ["create", "view", "update", "delete"],
  facility: ["view"],
});

const receptionist = ac.newRole({
  appointment: ["view", "list", "update"],
  vaccination: ["view", "list", "update"],
  facility: ["view", "list", "update"],
  inventory: ["view", "list", "update"],
});

const auditor = ac.newRole({
  user: ["create", "list", "set-role", "ban", "delete", "set-password", "get", "update"],
  appointment: ["list", "update", "delete"],
  vaccination: ["list", "update", "delete"],
  facility: ["list", "update", "delete"],
  inventory: ["list", "update", "delete"],
  analytics: ["view"],
  report: ["list", "delete", "export"],
});

export const userRoles = { su, admin, doctor, inventoryManager, receptionist, auditor };
