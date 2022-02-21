# Full-Stack CRM Project

1. Run "npm install" to install all necessary dependencies
2. Create database (remember name of database for next.configs.js)
3. Use this code to create 2 tables in database :

```sql
CREATE TABLE `users` (
   `id` varchar(60) NOT NULL,
   `name` varchar(30) NOT NULL,
   `email` varchar(40) NOT NULL,
   `hash` varchar(200) NOT NULL,
   `salt` varchar(200) NOT NULL,
   `role` varchar(40) NOT NULL,
   PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

   INSERT INTO users (id, name, email, hash, salt, role) VALUES ("ece58541-4720-4a57-a110-96039c519161", "Admin", "admin@gmail.com", "61274e24a966db060358c1041bdd09a9eab4676b13039e9a9eb3e56602e76356b66c84cd4667de48c7e9b32526d1f8ab4ee0ef344c3427a156a8721a34045332", "b6d3b57b2474edf273abac44fd8b1eb3", "admin");

CREATE TABLE `project` (
`id` varchar(60) NOT NULL,
`email` varchar(40) NOT NULL,
`title` varchar(40) NOT NULL,
`descr` varchar(80) NOT NULL,
`date` varchar(40) NOT NULL,
`status` varchar(40) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

4. Edit file at directory of project named: 'next.config.js'.

```js
module.exports = {
  env: {
    MYSQL_HOST: "host", // 127.0.0.1 is default
    MYSQL_PORT: "port", // 3306 is default
    MYSQL_DATABASE: "name of database you just created",
    MYSQL_USER: "username",
    MYSQL_PASSWORD: "password",
  },
};
```

5. Run "npm run dev" and open: http://localhost:3000/

6. Login as :
   email: admin@gmail.com
   password: admin
