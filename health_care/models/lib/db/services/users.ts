import pool from "@/models/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";

export type RegisterUser = {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  country: string;
  phoneNo: string;
  email: string;
  password: string;
  role_id: number;
  is_deleted: 0;
};

export type users_roles = {
  role_id: number;
  user_id: number;
};

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const Register = async (newUser: RegisterUser) => {
  const result = await pool.query<RegisterUser>(
    `INSERT INTO users (firstName , lastName, age, country, phoneNo ,email , password , role_id) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8) RETURNING *`,
    [
      newUser.firstName.toLocaleLowerCase(),
      newUser.lastName,
      newUser.age,
      newUser.country.toLocaleLowerCase(),
      newUser.phoneNo,
      newUser.email.toLocaleLowerCase(),
      await hashPassword(newUser.password),
      2,
    ],
  );
  const user = result.rows[0];
  //console.log(user); debbugging
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role_id },
    process.env.NEXTAUTH_SECRET as Secret,
    {
      expiresIn: "1h",
    },
  );
  if (user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      country: user.country,
      email: user.email,
      password: user.password,
      role_id: user.role_id,
      is_deleted: false,
      token: token,
    };
  }
};

export const users_roles = async (newUsers_roles: users_roles) => {
  const result = await pool.query<users_roles>(
    "INSERT INTO users_roles (role_id,  user_id) VALUES ($1 , $2) RETURNING *",
    [newUsers_roles.role_id, newUsers_roles.user_id],
  );
  const user_role = result.rows[0];
  if (user_role) {
    return {
      role_id: user_role.role_id,
      user_id: user_role.user_id,
    };
  }
  //console.log(user_role);
};
