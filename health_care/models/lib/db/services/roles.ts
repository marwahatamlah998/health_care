import pool from "@/models/lib/db";

export type Role = {
  role_id?: number;
  name: string;
};

export type Permissions = {
  permission_id?: number;
  name: string;
};

export type roles_permissions = {
  role_id: number;
  permission_id: number;
};

export const Roles = async (newRole: Role) => {
  const result = await pool.query<Role>(
    "INSERT INTO roles (name) VALUES ($1) RETURNING *",
    [newRole.name],
  );
  const role = result.rows[0];
  if (role) {
    return {
      id: role.role_id,
      name: role.name,
    };
  }
};

export const Permissions = async (newPermission: Permissions) => {
  const result = await pool.query<Permissions>(
    "INSERT INTO permissions (name) VALUES ($1) RETURNING *",
    [newPermission.name],
  );
  const permission = result.rows[0];
  if (permission) {
    return {
      id: permission.permission_id,
      name: permission.name,
    };
  }
  //console.log(permission);
};

export const roles_permissions = async (
  newRoles_permissions: roles_permissions,
) => {
  const result = await pool.query<roles_permissions>(
    "INSERT INTO roles_permissions (role_id , permission_id) VALUES ($1 , $2) RETURNING *",
    [newRoles_permissions.role_id, newRoles_permissions.permission_id],
  );
  const role_permission = result.rows[0];
  if (role_permission) {
    return {
      role_id: role_permission.role_id,
      permission_id: role_permission.permission_id,
    };
  }
  //console.log(role_permission);
};
