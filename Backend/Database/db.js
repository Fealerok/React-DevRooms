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
                     nickname TEXT NOT NULL UNIQUE,
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
                     login TEXT NOT NULL UNIQUE,
                     password TEXT NOT NULL
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
           

             //Таблица Chapters
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Chapters(
                     id SERIAL PRIMARY KEY,
                     name TEXT,
                     id_category INTEGER NOT NULL,
                      FOREIGN KEY (id_category) REFERENCES categories(id) ON DELETE CASCADE
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
                     id_usercreator INTEGER NOT NULL,
                     FOREIGN KEY (id_chapter) REFERENCES chapters(id) ON DELETE CASCADE
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
                     name_creator TEXT NOT NULL,
                     FOREIGN KEY (id_topic) REFERENCES topics(id) ON DELETE CASCADE
                )
                `
             );



             //Таблица Roles
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Roles(
                     id SERIAL PRIMARY KEY,
                     name TEXT UNIQUE
                )
                `
             );

             //Таблица RefreshTokens
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS RefreshTokens(
                     id SERIAL PRIMARY KEY,
                     token TEXT NOT NULL,
                     id_user INTEGER NOT NULL
                )
                `
             );

             //Таблица Companies
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Companies(
                     id SERIAL PRIMARY KEY,
                     name TEXT NOT NULL,
                     description TEXT NOT NULL
                )
                `
             );

             //Таблица Specializations
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Specializations(
                     id SERIAL PRIMARY KEY,
                     name TEXT NOT NULL UNIQUE
                )
                `
             );

             //Таблица SubSpecializations
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS SubSpecializations(
                     id SERIAL PRIMARY KEY,
                     id_specialization int,
                     name TEXT NOT NULL UNIQUE,
                     FOREIGN KEY (id_specialization) REFERENCES Specializations(id) ON DELETE CASCADE
                )
                `
             );

             //Таблица Qualifications
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Qualifications(
                     id SERIAL PRIMARY KEY,
                     name TEXT NOT NULL UNIQUE
                )
                `
             );

             //Таблица TypesOfEmployemnt
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS TypesOfEmployment(
                     id SERIAL PRIMARY KEY,
                     name TEXT NOT NULL UNIQUE
                )
                `
             );

             //Таблица Vacancies
             await this.db.query(
                `
                CREATE TABLE IF NOT EXISTS Vacancies(
                     id SERIAL PRIMARY KEY,
                     name_company TEXT,
                     name_vacancy TEXT,
                     id_qualification int,
                     specializations TEXT,
                     salary TEXT,
                     location TEXT,
                     id_typeOfEmployment int,
                     description TEXT,
                     phone TEXT
                )
                `
             );

             //Добавление ролей
             await this.db.query(
                `
                INSERT INTO Roles ("name")
                    VALUES ('Администратор')
                    ON CONFLICT ("name") DO NOTHING;

                    INSERT INTO Roles ("name")
                    VALUES ('Участник')
                    ON CONFLICT ("name") DO NOTHING;
                `
             );

             //Добавление админских аккаунтов
             await this.db.query(
                `
                INSERT INTO UsersData ("login", "password") VALUES ('Fealer', '${await bcrypt.hash("admin1", salt)}') ON CONFLICT ("login") DO NOTHING;
                INSERT INTO UsersData ("login", "password") VALUES ('Rimirana', '${await bcrypt.hash("admin2", salt)}') ON CONFLICT ("login") DO NOTHING;
                `
             );

             //Добавление специализаций
             await this.db.query(
                `
                INSERT INTO Specializations ("name") VALUES ('Разработка') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO Specializations ("name") VALUES ('Дизайн') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO Specializations ("name") VALUES ('Тестирование') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO Specializations ("name") VALUES ('Безопасность') ON CONFLICT ("name") DO NOTHING;
                `
             );

             //Добавление квалификаций
             await this.db.query(
                `
                INSERT INTO Qualifications ("name") VALUES ('Junior') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO Qualifications ("name") VALUES ('Middle') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO Qualifications ("name") VALUES ('Senior') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO Qualifications ("name") VALUES ('TeamLead') ON CONFLICT ("name") DO NOTHING;
                `
             );

             //Добавление типов занятсти
             await this.db.query(
                `
                INSERT INTO TypesOfEmployment ("name") VALUES ('Полная занятость') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO TypesOfEmployment ("name") VALUES ('Частичная занятость') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO TypesOfEmployment ("name") VALUES ('Удаленная работа') ON CONFLICT ("name") DO NOTHING;
                `
             );

             //Добавление подспециализаций
             await this.db.query(
                `
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Разработка'), 'Разработчик ПО') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Разработка'), 'Фронтенд разработчик') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Разработка'), 'Бэкенд разработчик') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Разработка'), 'Разработчик игр') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Разработка'), 'Разработчик баз данных') ON CONFLICT ("name") DO NOTHING;
                
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Дизайн'), 'Веб дизайнер') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Дизайн'), 'Дизайнер ПО') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Дизайн'), 'Дизайнер игр') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Дизайн'), '3d-аниматор') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Дизайн'), '3d-моделлер') ON CONFLICT ("name") DO NOTHING;
                
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Тестирование'), 'UX-тестировщик') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Тестирование'), 'Автоматическое тестирование') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Тестирование'), 'Ручное тестирование') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Тестирование'), 'Обеспечение качества') ON CONFLICT ("name") DO NOTHING;
                INSERT INTO SubSpecializations ("id_specialization", "name") VALUES ((SELECT id FROM Specializations WHERE name='Тестирование'), 'Инженер по производительности') ON CONFLICT ("name") DO NOTHING;
                `
             );

             const getIdUsersData = async (login) => {
                const id = (await this.db.query(`SELECT id FROM UsersData WHERE login='${login}'`)).rows[0].id
                return id;
                
             }

             const getIdRole = async (role_name) => {
                const id_rows = (await this.db.query(`SELECT id FROM Roles WHERE name='${role_name}'`)).rows;
            
                return id_rows[0].id;
             }

             

             //Добавление админских аккаунтов
             await this.db.query(
                `
                INSERT INTO Users ("nickname", "email", "skills", "id_role", "id_usersdata") 
                VALUES ('Fealer', 'CreepPlay@mail.ru', '{"C#": 0, "CSS": 0, "React": 0, "C++": 0, "JavaScript": 0, "Python": 0}'::jsonb, ${await getIdRole("Администратор")}, ${await getIdUsersData("Fealer")} ) 
                ON CONFLICT ("nickname") DO NOTHING;

                INSERT INTO Users ("nickname", "email", "skills", "id_role", "id_usersdata") 
                VALUES ('Rimirana', 'Rimirana@mail.ru', '{"C#": 0, "CSS": 0, "React": 0, "C++": 0, "JavaScript": 0, "Python": 0}'::jsonb, ${await getIdRole("Администратор")}, ${await getIdUsersData("Rimirana")} ) 
                ON CONFLICT ("nickname") DO NOTHING;
                
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
                    INSERT INTO Users ("nickname", "email", "id_role", "id_usersdata", "skills")
                    SELECT login, '${email}', (SELECT id FROM Roles WHERE name='Участник'), id, '{"C#": 0, "CSS": 0, "React": 0, "C++": 0, "JavaScript": 0, "Python": 0}'::jsonb
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
            
            const idUser = (await this.db.query(`SELECT id FROM Users WHERE nickname = '${login}'`)).rows[0].id;

            console.log(login);

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

    addNewChapter = async (categoryName, chapterName) => {
        try {
            
            const idCategory = (await this.db.query(`SELECT id from categories where name='${categoryName}'`)).rows[0].id;
           await this.db.query(`INSERT INTO Chapters ("name", "id_category") VALUES ('${chapterName}', ${idCategory})`);
        } catch (error) {
            console.log(`ошибка добавления раздела в бд: ${error}`);
        }
    }

    addNewTopic = async (idChapter, topicName, idUser) => {
        try {
            
           await this.db.query(`INSERT INTO Topics ("name", "id_chapter", "id_usercreator") VALUES ('${topicName}', ${idChapter}, ${idUser})`);
        } catch (error) {
            console.log(`ошибка добавления раздела в бд: ${error}`);
        }
    }

    getProfileStatistic = async (nickname) => {
        try {
            const idUser = (await this.db.query(`SELECT id FROM Users WHERE nickname='${nickname}'`)).rows[0].id;
            const statistic = (await this.db.query(`
                SELECT 
                    Users.id, 
                    Users.nickname, 
                    Users.email, 
                    Users.skills,
                    Users.id_usersdata,
                    Roles.name as role_name FROM Users
                JOIN Roles 
                    ON Users.id_role = Roles.id 
                WHERE Users.id=${idUser}`)).rows[0];

                
                const topics_count = (await this.db.query(`SELECT Count(*) 
                    FROM Topics count_topics
                WHERE id_usercreator=${idUser}`)).rows[0].count;
                
                    const answers_count = (await this.db.query(`SELECT Count(*) 
                    FROM Answers as count_messages
                WHERE name_creator='${nickname}'`)).rows[0].count;
            
                if (!topics_count) topics_count = 0;
                if (!answers_count) answers_count = 0;

                const statistic2 = [
                    {
                        topics_count, 
                        answers_count
                    }
                ]
           return {
            statistic,
            statistic2
           };
        } catch (error) {
            console.log(`Ошибка получения статистики профиля в бд: ${error}`);
            
        }
    }

    updateProfileSkills = async (idUser, newSkills) => {
        try {
            // Преобразуем newSkills в строку JSON
            const skillsJson = JSON.stringify(newSkills);
            await this.db.query(`UPDATE Users SET skills=$1 WHERE id=$2`, [skillsJson, idUser]);
        } catch (error) {
            console.log(`Ошибка обновления умений в бд: ${error}`);
        }
    }

    getPopularTopics = async () => {
        try {
            const popularTopics = (await this.db.query(`
                SELECT Topics.id, Topics.name, Users.nickname, COUNT(*) AS count
                FROM Topics
                JOIN Answers ON Topics.id = Answers.id_topic
                JOIN Users ON Users.id = Topics.id_usercreator
                GROUP BY Topics.id, Topics.name, Users.nickname
                ORDER BY count DESC
                LIMIT 5;`)).rows;

            return popularTopics;
        } catch (error) {
            console.log(`Ошибка получения популярных тем в бд: ${error}`);
            
        }
    }

    getPopularUsers = async () => {
        try {
            const popularUsers = (await this.db.query(`
                SELECT Answers.name_creator, Users.id, Count(*) as count 
                FROM Answers 
                JOIN Users ON Users.nickname = Answers.name_creator 
                GROUP BY Answers.name_creator, Users.id
				ORDER By count DESC
                LIMIT 5;
                `)).rows;
            return popularUsers;
        } catch (error) {
            console.log(`Ошибка получения активных пользователей в бд: ${error}`);
            
        }
    }

    deleteTopic = async (topicId) => {
        try {
            await this.db.query(`DELETE FROM Answers WHERE id_topic = ${topicId}`);
            await this.db.query(`DELETE FROM Topics WHERE id=${topicId}`);
        } catch (error) {
            console.log(`Ошибка удаления темы в бд: ${error}`);
            
        }
    }

    deleteChapter = async (chapterId) => {
        try {
            await this.db.query(`DELETE FROM Chapters WHERE id=${chapterId}`);
        } catch (error) {
            console.log(`Ошибка удаления раздела в бд: ${error}`);
            
        }
    }

    deleteCategory = async (categoryName) => {
        try {
            
            const categoryId = (await this.db.query(`SELECT id FROM Categories WHERE name='${categoryName}'`)).rows[0].id;
            console.log(categoryId);
            await this.db.query(`DELETE FROM Categories WHERE id=${categoryId}`);
        } catch (error) {
            console.log(`Ошибка удаления раздела в бд: ${error}`);
            
        }
    }

    createCompany = async (nameCompany, descriprionCompany) => {
        try {
            console.log(nameCompany);
            await this.db.query(`INSERT INTO Companies ("name", "description") VALUES ($1, $2)`, [nameCompany, descriprionCompany]);
        } catch (error) {
            console.log(`Ошибка создания компании в бд: ${error}`);
            
        }
    }

    getCompanies = async () => {
        try {
            const companies = (await this.db.query("SELECT * FROM Companies")).rows;

            console.log(companies)
            return companies;
        } catch (error) {
            console.log(`Ошибка получения компаний в бд: ${error}`);
            
        }
    }

    deleteCompany = async (idCompany) => {
        try {
            await this.db.query("DELETE FROM Companies WHERE id=$1", [idCompany]);
        } catch (error) {
            console.log(`Ошибка удаления компании в бд: ${error}`);
            
        }
    }

    getQualifications = async () => {
        try {
            const qualifications = (await this.db.query("SELECT * FROM Qualifications")).rows;

            return qualifications;
        } catch (error) {
            console.log(`Ошибка получения квалификаций в БД: ${error}`);
            
        }
    }

    getTypesOfEmployment = async () => {
        try {
            const typesOfEmployment = (await this.db.query("SELECT * FROM TypesOfEmployment")).rows;

            return typesOfEmployment;
        } catch (error) {
            console.log(`Ошибка получения типов занятости в БД: ${error}`);
            
        }
    }

    getSpecializations = async () => {
        try {
            const specializations = (await this.db.query(`SELECT s.id as s_id, s.name as s_name, sub.id as sub_id, sub.name as sub_name FROM Specializations s JOIN SubSpecializations sub ON s.id = sub.id_specialization`)).rows;
            return specializations;
        } catch (error) {
            console.log(`Ошибка получения специализаций в БД: ${error}`);
            
        }
    }

    addVacancy = async (createdVacancy) => {
        try {
           await this.db.query(`INSERT INTO Vacancies("name_company", "name_vacancy", "id_qualification", "specializations", "salary", "location", "id_typeofemployment", "description", "phone") 
                                VALUES ($1, $2, (SELECT id FROM Qualifications WHERE name=$3), $4, $5, $6, (SELECT id FROM TypesOfEmployment WHERE name=$7), $8, $9)`, [
                                    createdVacancy.selectedCompany,
                                    createdVacancy.selectedName,
                                    createdVacancy.selectedQualification,
                                    createdVacancy.selectedSubspecializations,
                                    createdVacancy.selectedSalary,
                                    createdVacancy.selectedLocation,
                                    createdVacancy.selectedTypeOfEmployment,
                                    createdVacancy.description,
                                    createdVacancy.phone
                                ]);
        } catch (error) {
            console.log(`Ошибка добавления вакансии в БД: ${error}`);
            
        }
    }
    
    getVacancies = async () => {
        try {
            const vacancies = (await this.db.query(`SELECT v.id as id, v.name_company, v.name_vacancy, q.name as name_qualification, v.specializations, v.salary, v.location, t.name as name_typeOfEmployment, v.description, v.phone FROM Vacancies v
                                                    JOIN Qualifications q ON q.id = v.id_qualification
                                                    JOIN TypesOfEmployment t ON t.id = v.id_typeofemployment`)).rows;

            return vacancies;
        } catch (error) {
            console.log(`Ошибка получения вакансий в БД: ${error}`);
            
        }
    }

    deleteVacancy = async (id) => {
        try {
           await this.db.query("DELETE FROM Vacancies WHERE id=$1", [id]);
        } catch (error) {
            console.log(`Ошибка удаления вакансии в БД: ${error}`);
            
        }
    }

    getVacancyInfo = async(id) => {
        try {
            const vacancyInfo = (await this.db.query(`SELECT v.id as id, v.name_company, v.name_vacancy, q.name as name_qualification, v.specializations, v.salary, v.location, t.name as name_typeOfEmployment, v.description, v.phone, c.description as description_company FROM Vacancies v
                JOIN Qualifications q ON q.id = v.id_qualification
                JOIN TypesOfEmployment t ON t.id = v.id_typeofemployment
                JOIN Companies c ON c.name = v.name_company
                WHERE v.id = $1`, [id])).rows[0];

        return vacancyInfo;
        } catch (error) {
            console.log(`Ошибка получения информации вакансии в БД: ${error}`);
        }
    }
    
}

//Экспортируем новый экземпляр класса Database для доступа в других местах
module.exports = new Database();