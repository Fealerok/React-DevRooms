const {Pool} = require("pg");
require("dotenv").config();
const env = process.env;

class Database{

    //Создание поля БД для обращения к ней
    db = new Pool({
        user: env.DB_USER,
        host: env.DB_HOST,
        database: env.DB,
        password: env.DB_PASSWORD,
        port: env.DB_PORT,
    });

    constructor(){
        this.#startDB();
    }

    //Метод для создания необходимых таблиц внутри базы данных
    #createTables = async () => {
        try {

            //Таблица Users
            await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Users(
                     id SERIAL PRIMARY KEY NOT NULL,
                     nickname TEXT NOT NULL,
                     email TEXt NOT NULL,
                     skills JSONB,
                     id_role INTEGER NOT NULL,
                     id_usersData INTEGER NOT NULL
                )
                `
             );

             //Таблица UsersData
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS UsersData(
                     id SERIAL PRIMARY KEY,
                     login TEXT NOT NULL,
                     password TEXT NOT NULL
                )
                `
             );

             //Таблица Topics
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Topics(
                     id SERIAL PRIMARY KEY,
                     name TEXT,
                     id_category INTEGER NOT NULL,
                     id_userCreator INTEGER NOT NULL
                )
                `
             );

             //Таблица Categories
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Categories(
                     id SERIAL PRIMARY KEY,
                     name TEXT
                )
                `
             );

             //Таблица Roles
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Roles(
                     id SERIAL PRIMARY KEY,
                     name TEXT
                )
                `
             );

        } catch (e) {
            console.log(`Ошибка createTables: ${e}`);
            
        }
        
    }

    //Первоначальный запуск метода после запуска сервера, что бы в БД создать таблицы
    #startDB = async () => {

        try{
             //Открываем асинхронно соединение с БД
            await this.db.connect().then(() => {
                this.#createTables()

                //После выполнения метода выплняется then() с выводом в консоль об успехе и закрываем соединение
                .then(res => {
                    console.log("Таблицы успешно созданы!");
                    return this.db.end();
                });
            });
        }

        catch(e){
            console.log(`Ошибка startDB: ${e}`);
        }
       
    }
}

//Экспортируем новый экземпляр класса Database для доступа в других местах
module.exports = new Database();