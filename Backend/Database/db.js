const {Pool} = require("pg");
require("dotenv").config();
const env = process.env;

const bcrypt = require("bcryptjs");
const salt = 5;

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

              //Таблица Answers
              await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Answers(
                     id SERIAL PRIMARY KEY,
                     text_answer TEXT,
                     id_topic INTEGER NOT NULL,
                     id_userCreator INTEGER NOT NULL
                )
                `
             );

             //Таблица Topics
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Topics(
                     id SERIAL PRIMARY KEY,
                     name TEXT,
                     id_chapter INTEGER NOT NULL,
                     id_userCreator INTEGER NOT NULL
                )
                `
             );

             //Таблица Chapters
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Chapters(
                     id SERIAL PRIMARY KEY,
                     name TEXT,
                     id_category INTEGER NOT NULL
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
                    return;
                });
            });
        }

        catch(e){
            console.log(`Ошибка startDB: ${e}`);
        }
    }

    //Регистрация пользователя
    registerNewUser = async (login, password, email) => {
        try {

            //Ищем из БД пользователя с введенным логином
            let userObject = await this.db.query(`SELECT * FROM UsersData WHERE login='${login}'`);
            let userRows = userObject.rows;

            if (userRows.length != 0){
                return "Пользователь с таким логином уже существует.";
            }

            else{

                //Если пользователя с таким логином нет, то хешируем пароль и добавляем его в таблицы
                const hashedPassword = await bcrypt.hash(password, salt);
                await this.db.query(`INSERT INTO UsersData ("login", "password") VALUES ('${login}', '${hashedPassword}')`);

                //Получаем ID созданного пользователя
                userObject = await this.db.query(`SELECT id FROM UsersData WHERE login='${login}'`);
                userRows = userObject.rows;


                await this.db.query(`
                    INSERT INTO Users ("nickname", "email", "id_role", "id_usersdata")
                    SELECT login, '${email}', (SELECT id FROM Roles WHERE name='Участник'), id
                    FROM UsersData
                    WHERE id=${userRows[0].id}
                `);
                
                return "Регистрация прошла успешно!";
            }

            
            
        } catch (e) {
            console.log(`Ошибка регистрации пользователя: ${e}`);
        }
    }

    //Авторизация пользователя
    loginUser = async(login, password) => {
        try {
            let userData = await this.db.query(`SELECT id_usersdata FROM Users WHERE login='${login}'`);
            let userDataRows = userData.rows;

            if (userDataRows.length != 0){
                
            }

            else{
                return "Пользователя с таким логином не существует."
            }

        } catch (error) {
            
        }
    }
}

//Экспортируем новый экземпляр класса Database для доступа в других местах
module.exports = new Database();