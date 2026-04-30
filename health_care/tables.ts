// CREATE TABLE roles (
//   role_id  SERIAL NOT NULL ,
//   name VARCHAR(255) NOT NULL,
//   PRIMARY KEY(role_id) 
// );

// CREATE TABLE permissions (
//   permission_id  SERIAL NOT NULL ,
//   name VARCHAR(255) NOT NULL,
//   PRIMARY KEY(permission_id) 
// );

// CREATE TABLE roles_permissions (
//   role_id INT NOT NULL,
//  permission_id INT NOT NULL,
//   FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE,
//   FOREIGN KEY (permission_id) REFERENCES permissions (permission_id) ON DELETE CASCADE,
//   PRIMARY KEY(role_id, permission_id) 
// );


// CREATE TABLE users (
//   id SERIAL NOT NULL,
//   firstName VARCHAR(255) NOT NULL,
//   lastName VARCHAR(255) NOT NULL,
//    age int ,
//    PRIMARY KEY(id),
//   country VARCHAR(255),
//   phoneNo int UNIQUE NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   is_deleted BOOLEAN  DEFAULT FALSE,
// );

// CREATE TABLE users_roles (
//   role_id INT NOT NULL ,
//   user_id INT NOT NULL ,
//   FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE,
//   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
//   PRIMARY KEY (role_id , user_id )
// );