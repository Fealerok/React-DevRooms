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

             //Таблица RefreshTokens
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS RefreshTokens(
                     id SERIAL PRIMARY KEY,
                     token text NOT NULL,
                     id_user INTEGER NOT NULL
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
            let user = await this.db.query(`SELECT * FROM Users WHERE nickname='${login}'`);
            let userRows = user.rows;

            if (userRows.length != 0){
                const usersData = (await this.db.query(`SELECT login, password FROM UsersData WHERE id=${userRows[0].id_usersdata}`)).rows;
                
                const isMatch = await bcrypt.compare(password, usersData[0].password);

                if (!isMatch){
                    return "Неверный пароль";
                }

                return {
                    id: userRows[0].id,
                    login: usersData[0].login,
                    role: userRows[0].id_role == 2 ? "Участник" : "Администратор",
                };
            }


            else{
                return "Пользователя с таким логином не существует."
            }

        } catch (error) {
            console.log(`Ошибка при авторизации в БД: ${error}`);
        }
    }


    //Получение рефреш-токена из БД для проверки
    getRefreshToken = async (id_user) => {
        try {
            const refreshTokenRes = (await this.db.query(`SELECT token from RefreshTokens WHERE id_user=${id_user}`)).rows;

            
            if (refreshTokenRes.length == 0){
                return "Токен по такому id не найден";
            }

            return refreshTokenRes[0].token;
        } catch (error) {
            console.log(`Ошибка получения рефреш-токена из БД: ${error}`);
        }
    }

    saveRefreshToken = async (refreshToken, loginData) => {
        try {
            const idUserData = await this.db.query(`SELECT id FROM Users WHERE nickname='${loginData.login}'`);

            const idUser = idUserData.rows[0].id;


            const token = await this.db.query(`SELECT token from RefreshTokens WHERE id_user=${idUser}`);

            if (token.rows.length != 0) {
                return await this.db.query(`UPDATE RefreshTokens SET token='${refreshToken}' WHERE id_user=${idUser}`);
            }

            await this.db.query(`INSERT INTO RefreshTokens ("token", "id_user") VALUES ('${refreshToken}', ${idUser})`);
        } catch (error) {
            console.log(`Ошибка сохранения refresh-токена: ${error}`);
        }
    }

    getCategories = async () => {
        try {

            const categories = (await this.db.query(`SELECT * FROM Categories`)).rows;

            return categories;
        } catch (error) {
            console.log(`Ошибка получения категорий в БД: ${error}`);
        }
    }

    getChapters = async (nameOfCategory) => {
        try {
            
            const idCategory = (await this.db.query(`SELECT id from Categories WHERE name='${nameOfCategory}'`)).rows[0];

            const chapters = (await this.db.query(`SELECT * FROM Chapters WHERE id_category=${idCategory.id}`)).rows;
            return chapters;
        } catch (error) {
            console.log(`Ошибка получения разделов в бд: ${error}`);
        }
    }

    getTopicsInChapter = async(idChapter) => {
        try {
            const topics = (await this.db.query(`
                SELECT 
                    Topics.id, 
                    Topics.name, 
                    Topics.id_chapter, 
                    Users.nickname 
                FROM 
                    Topics 
                JOIN 
                    Users ON Topics.id_usercreator = Users.id 
                WHERE id_chapter=${idChapter}`)).rows;

            return topics;
        } catch (error) {
            console.log(`Ошибка получения тем в разделе в БД: ${error}`);
            
        }
    }

    getNameOfChapter = async (idChapter) => {
        try {
            const nameOfChapter = (await this.db.query(`SELECT name FROM Chapters WHERE id=${idChapter}`)).rows;

            return nameOfChapter[0];
        } catch (error) {
            console.log(`Ошибка получения названия раздела в БД: ${error}`);
            
        }
    }

    getTitleTopic = async (id_topic) => {
        try {
            const titleRows = (await this.db.query(`SELECT name FROM Topics WHERE id=${id_topic}`)).rows;
            return titleRows[0].name;
        } catch (error) {
            console.log(`Ошибка получения названия темы в бд: ${error}`);
            
        }
    }

    getNameOfCreator = async (id_topic) => {
        try {
            const nameRows = (await this.db.query(`SELECT nickname FROM Users WHERE id=(SELECT id_usercreator from Topics WHERE id=${id_topic})`)).rows;
            return nameRows[0].nickname;
        } catch (error) {
            console.log(`Ошибка получения имени создателя в бд: ${error}`);
            
        }
    }

    getTopicAnswers = async(id_topic) => {
        try {
            const answersRows = (await this.db.query(`SELECT * FROM Answers WHERE id_topic=${id_topic}`)).rows;
            return answersRows;
        } catch (error) {
            console.log(`Ошибка получения ответов темы в бд: ${error}`);
            
        }
    }
    
    addNewAnswer = async(idCreator, answer_text, idTopic) => {
        try {
            const nickname = (await this.db.query(`SELECT nickname FROM Users WHERE id=${idCreator}`)).rows[0].nickname;
            this.db.query(`INSERT INTO Answers ("text_answer", "id_topic", "name_creator") VALUES ('${answer_text}', ${idTopic}, '${nickname}')`)
        } catch (error) {
            console.log(`Ошибка добавления ответа в бд: ${error}`);
            
        }
    }

    getUserTopics = async (login) => {
        try {
            console.log(login);
            const idUser = (await this.db.query(`SELECT id FROM Users WHERE nickname = '${login}'`)).rows[0].id;
            const topics = (await this.db.query(`
                SELECT 
                    Topics.id, 
                    Topics.name, 
                    Topics.id_chapter, 
                    Users.nickname
                FROM 
                    Topics 
                JOIN Users ON Users.id = Topics.id_usercreator
                WHERE Topics.id_usercreator = ${idUser}
                `)).rows;

            return topics;
        } catch (error) {
            console.log(`Ошибка получения тем юзера в бд: ${error}`);
            
        }
    }

    addNewCategory = async (categoryName) => {
        try {
            await this.db.query(`INSERT INTO Categories ("name") VALUES ('${categoryName}')`);
        } catch (error) {
            console.log(`ошибка добавления категории в бд: ${categoryName}`);
        }
    }
}

//Экспортируем новый экземпляр класса Database для доступа в других местах
module.exports = new Database();