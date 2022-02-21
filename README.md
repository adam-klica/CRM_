Full-Stack CRM Project

1. npm install to install all necessary dependencies
2. Create database (remember name of database for next.configs.js)
3. Use this code to create 2 tables in database :

   CREATE TABLE `users` (
   `id` varchar(60) NOT NULL,
   `name` varchar(30) NOT NULL,
   `email` varchar(40) NOT NULL,
   `hash` varchar(200) NOT NULL,
   `salt` varchar(200) NOT NULL,
   `role` varchar(40) NOT NULL,
   PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `project` (
`id` varchar(60) NOT NULL,
`email` varchar(40) NOT NULL,
`title` varchar(40) NOT NULL,
`descr` varchar(80) NOT NULL,
`date` varchar(40) NOT NULL,
`status` varchar(40) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

4. Edit 'next.config.js' (provide all data from your end)

module.exports = {
env: {
MYSQL_HOST: "", 
MYSQL_PORT: "", 
MYSQL_DATABASE: "",
MYSQL_USER: "",
MYSQL_PASSWORD: "",
},
};

5. npm run dev and open: http://localhost:3000/add-user. Add new user, and if everyhing goes well, you should have client in your database and client will receive email to resset password. 

6. Change role from 'client' to 'admin' in order to have functions to create new users and see their projects(mySQL)

7. Edit add-user.js file to block other users from accesing (uncomment and delete few lines)
