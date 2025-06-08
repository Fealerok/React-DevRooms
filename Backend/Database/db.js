const { Pool } = require("pg");
require("dotenv").config();
const env = process.env;

const bcrypt = require("bcryptjs");
const salt = 5;

class Database {
    // Создание поля БД для обращения к ней
    db = new Pool({
        user: env.DB_USER,
        host: env.DB_HOST,
        database: env.DB,
        password: env.DB_PASSWORD,
        port: env.DB_PORT,
    });

    constructor() {
        this.#startDB();
    }

    // Метод для создания необходимых таблиц внутри базы данных
    #createTables = async () => {
        try {

            // Таблица Roles
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS Roles(
         id SERIAL PRIMARY KEY,
         name TEXT UNIQUE
    )
    `
);
// Таблица UsersData
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS UsersData(
         id SERIAL PRIMARY KEY,
         login TEXT NOT NULL UNIQUE,
         password TEXT NOT NULL
    )
    `
);
            // Таблица Users
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS Users(
         id SERIAL PRIMARY KEY NOT NULL,
         nickname TEXT NOT NULL UNIQUE,
         email TEXT NOT NULL,
         skills JSONB,
         id_role INTEGER NOT NULL,
         id_usersData INTEGER NOT NULL,
         FOREIGN KEY (id_role) REFERENCES Roles(id) ON DELETE CASCADE,
         FOREIGN KEY (id_usersData) REFERENCES UsersData(id) ON DELETE CASCADE
    )
    `
);


// Таблица Categories
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS Categories(
         id SERIAL PRIMARY KEY,
         name TEXT
    )
    `
);

// Таблица Chapters
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

// Таблица Topics
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS Topics(
         id SERIAL PRIMARY KEY,
         name TEXT,
         id_chapter INTEGER NOT NULL,
         id_usercreator INTEGER NOT NULL,
         FOREIGN KEY (id_chapter) REFERENCES chapters(id) ON DELETE CASCADE,
         FOREIGN KEY (id_usercreator) REFERENCES Users(id) ON DELETE CASCADE
    )
    `
);

// Таблица Answers
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS Answers(
         id SERIAL PRIMARY KEY,
         text_answer TEXT,
         id_topic INTEGER NOT NULL,
         name_creator TEXT NOT NULL,
         FOREIGN KEY (id_topic) REFERENCES topics(id) ON DELETE CASCADE,
         FOREIGN KEY (name_creator) REFERENCES Users(nickname) ON DELETE CASCADE
    )
    `
);


// Таблица RefreshTokens
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS RefreshTokens(
         id SERIAL PRIMARY KEY,
         token TEXT NOT NULL,
         id_user INTEGER NOT NULL,
         FOREIGN KEY (id_user) REFERENCES Users(id) ON DELETE CASCADE
    )
    `
);

// Таблица Companies
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS Companies(
         id SERIAL PRIMARY KEY,
         name TEXT NOT NULL,
         description TEXT NOT NULL
    )
    `
);

// Таблица Specializations
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS Specializations(
         id SERIAL PRIMARY KEY,
         name TEXT NOT NULL UNIQUE
    )
    `
);

// Таблица SubSpecializations
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

// Таблица Qualifications
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS Qualifications(
         id SERIAL PRIMARY KEY,
         name TEXT NOT NULL UNIQUE
    )
    `
);

// Таблица TypesOfEmployment
await this.db.query(
    `
    CREATE TABLE IF NOT EXISTS TypesOfEmployment(
         id SERIAL PRIMARY KEY,
         name TEXT NOT NULL UNIQUE
    )
    `
);

// Таблица Vacancies
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
         phone TEXT,
         FOREIGN KEY (id_qualification) REFERENCES Qualifications(id) ON DELETE SET NULL,
         FOREIGN KEY (id_typeOfEmployment) REFERENCES TypesOfEmployment(id) ON DELETE SET NULL
    )
    `
);

            // Добавление ролей
            await this.db.query(
                `
                INSERT INTO Roles (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Администратор']
            );
            await this.db.query(
                `
                INSERT INTO Roles (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Участник']
            );

            // Добавление админских аккаунтов
            await this.db.query(
                `
                INSERT INTO UsersData (login, password)
                VALUES ($1, $2)
                ON CONFLICT (login) DO NOTHING
                `,
                ['Fealer', await bcrypt.hash("admin1", salt)]
            );
            await this.db.query(
                `
                INSERT INTO UsersData (login, password)
                VALUES ($1, $2)
                ON CONFLICT (login) DO NOTHING
                `,
                ['Rimirana', await bcrypt.hash("admin2", salt)]
            );

            // Добавление специализаций
            await this.db.query(
                `
                INSERT INTO Specializations (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Разработка']
            );
            await this.db.query(
                `
                INSERT INTO Specializations (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Дизайн']
            );
            await this.db.query(
                `
                INSERT INTO Specializations (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Тестирование']
            );
            await this.db.query(
                `
                INSERT INTO Specializations (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Безопасность']
            );

            // Добавление квалификаций
            await this.db.query(
                `
                INSERT INTO Qualifications (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Junior']
            );
            await this.db.query(
                `
                INSERT INTO Qualifications (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Middle']
            );
            await this.db.query(
                `
                INSERT INTO Qualifications (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Senior']
            );
            await this.db.query(
                `
                INSERT INTO Qualifications (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['TeamLead']
            );

            // Добавление типов занятости
            await this.db.query(
                `
                INSERT INTO TypesOfEmployment (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Полная занятость']
            );
            await this.db.query(
                `
                INSERT INTO TypesOfEmployment (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Частичная занятость']
            );
            await this.db.query(
                `
                INSERT INTO TypesOfEmployment (name)
                VALUES ($1)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Удаленная работа']
            );

            // Добавление подспециализаций
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Разработка', 'Разработчик ПО']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Разработка', 'Фронтенд разработчик']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Разработка', 'Бэкенд разработчик']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Разработка', 'Разработчик игр']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Разработка', 'Разработчик баз данных']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Дизайн', 'Веб дизайнер']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Дизайн', 'Дизайнер ПО']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Дизайн', 'Дизайнер игр']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Дизайн', '3d-аниматор']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Дизайн', '3d-моделлер']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Тестирование', 'UX-тестировщик']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Тестирование', 'Автоматическое тестирование']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Тестирование', 'Ручное тестирование']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Тестирование', 'Обеспечение качества']
            );
            await this.db.query(
                `
                INSERT INTO SubSpecializations (id_specialization, name)
                VALUES ((SELECT id FROM Specializations WHERE name=$1), $2)
                ON CONFLICT (name) DO NOTHING
                `,
                ['Тестирование', 'Инженер по производительности']
            );

            const getIdUsersData = async (login) => {
                const id = (await this.db.query(`SELECT id FROM UsersData WHERE login=$1`, [login])).rows[0].id;
                return id;
            };

            const getIdRole = async (role_name) => {
                const id_rows = (await this.db.query(`SELECT id FROM Roles WHERE name=$1`, [role_name])).rows;
                return id_rows[0].id;
            };

            // Добавление админских аккаунтов
            await this.db.query(
                `
                INSERT INTO Users (nickname, email, skills, id_role, id_usersdata)
                VALUES ($1, $2, $3::jsonb, $4, $5)
                ON CONFLICT (nickname) DO NOTHING
                `,
                [
                    'Fealer',
                    'CreepPlay@mail.ru',
                    '{"C#": 0, "CSS": 0, "React": 0, "C++": 0, "JavaScript": 0, "Python": 0}',
                    await getIdRole("Администратор"),
                    await getIdUsersData("Fealer")
                ]
            );
            await this.db.query(
                `
                INSERT INTO Users (nickname, email, skills, id_role, id_usersdata)
                VALUES ($1, $2, $3::jsonb, $4, $5)
                ON CONFLICT (nickname) DO NOTHING
                `,
                [
                    'Rimirana',
                    'Rimirana@mail.ru',
                    '{"C#": 0, "CSS": 0, "React": 0, "C++": 0, "JavaScript": 0, "Python": 0}',
                    await getIdRole("Администратор"),
                    await getIdUsersData("Rimirana")
                ]
            );
        } catch (e) {
            console.log(`Ошибка createTables: ${e}`);
        }
    };

    // Первоначальный запуск метода после запуска сервера, чтобы в БД создать таблицы
    #startDB = async () => {
        try {
            await this.db.connect().then(() => {
                this.#createTables()
                    .then(res => {
                        console.log("Таблицы успешно созданы!");
                        return;
                    });
            });
        } catch (e) {
            console.log(`Ошибка startDB: ${e}`);
        }
    };

    // Регистрация пользователя
    registerNewUser = async (login, password, email) => {
        try {
            let userObject = await this.db.query(`SELECT * FROM UsersData WHERE login=$1`, [login]);
            let userRows = userObject.rows;

            if (userRows.length != 0) {
                return "Пользователь с таким логином уже существует.";
            } else {
                const hashedPassword = await bcrypt.hash(password, salt);
                await this.db.query(`INSERT INTO UsersData (login, password) VALUES ($1, $2)`, [login, hashedPassword]);

                userObject = await this.db.query(`SELECT id FROM UsersData WHERE login=$1`, [login]);
                userRows = userObject.rows;

                await this.db.query(
                    `
                    INSERT INTO Users (nickname, email, id_role, id_usersdata, skills)
                    SELECT $1, $2, (SELECT id FROM Roles WHERE name=$3), $4, $5::jsonb
                    FROM UsersData
                    WHERE id=$6
                    `,
                    [
                        login,
                        email,
                        'Участник',
                        userRows[0].id,
                        '{"C#": 0, "CSS": 0, "React": 0, "C++": 0, "JavaScript": 0, "Python": 0}',
                        userRows[0].id
                    ]
                );

                return "Регистрация прошла успешно!";
            }
        } catch (e) {
            console.log(`Ошибка регистрации пользователя: ${e}`);
        }
    };

    // Авторизация пользователя
    loginUser = async (login, password) => {
        try {
            let user = await this.db.query(`SELECT * FROM Users WHERE nickname=$1`, [login]);
            let userRows = user.rows;

            if (userRows.length != 0) {
                const usersData = (await this.db.query(`SELECT login, password FROM UsersData WHERE id=$1`, [userRows[0].id_usersdata])).rows;

                const isMatch = await bcrypt.compare(password, usersData[0].password);

                if (!isMatch) {
                    return "Неверный пароль";
                }

                return {
                    id: userRows[0].id,
                    login: usersData[0].login,
                    role: userRows[0].id_role == 2 ? "Участник" : "Администратор",
                };
            } else {
                return "Пользователя с таким логином не существует.";
            }
        } catch (error) {
            console.log(`Ошибка при авторизации в БД: ${error}`);
        }
    };

    // Получение рефреш-токена из БД для проверки
    getRefreshToken = async (id_user) => {
        try {
            const refreshTokenRes = (await this.db.query(`SELECT token FROM RefreshTokens WHERE id_user=$1`, [id_user])).rows;

            if (refreshTokenRes.length == 0) {
                return "Токен по такому id не найден";
            }

            return refreshTokenRes[0].token;
        } catch (error) {
            console.log(`Ошибка получения рефреш-токена из БД: ${error}`);
        }
    };

    saveRefreshToken = async (refreshToken, loginData) => {
        try {
            const idUserData = await this.db.query(`SELECT id FROM Users WHERE nickname=$1`, [loginData.login]);

            const idUser = idUserData.rows[0].id;

            const token = await this.db.query(`SELECT token FROM RefreshTokens WHERE id_user=$1`, [idUser]);

            if (token.rows.length != 0) {
                return await this.db.query(`UPDATE RefreshTokens SET token=$1 WHERE id_user=$2`, [refreshToken, idUser]);
            }

            await this.db.query(`INSERT INTO RefreshTokens (token, id_user) VALUES ($1, $2)`, [refreshToken, idUser]);
        } catch (error) {
            console.log(`Ошибка сохранения refresh-токена: ${error}`);
        }
    };

    getCategories = async () => {
        try {
            const categories = (await this.db.query(`SELECT * FROM Categories`)).rows;
            return categories;
        } catch (error) {
            console.log(`Ошибка получения категорий в БД: ${error}`);
        }
    };

    getChapters = async (nameOfCategory) => {
        try {
            const idCategory = (await this.db.query(`SELECT id FROM Categories WHERE name=$1`, [nameOfCategory])).rows[0];

            const chapters = (await this.db.query(`SELECT * FROM Chapters WHERE id_category=$1`, [idCategory.id])).rows;
            return chapters;
        } catch (error) {
            console.log(`Ошибка получения разделов в бд: ${error}`);
        }
    };

    getTopicsInChapter = async (idChapter) => {
        try {
            const topics = (await this.db.query(
                `
                SELECT 
                    Topics.id, 
                    Topics.name, 
                    Topics.id_chapter, 
                    Users.nickname 
                FROM 
                    Topics 
                JOIN 
                    Users ON Topics.id_usercreator = Users.id 
                WHERE id_chapter=$1
                `,
                [idChapter]
            )).rows;

            return topics;
        } catch (error) {
            console.log(`Ошибка получения тем в разделе в БД: ${error}`);
        }
    };

    getNameOfChapter = async (idChapter) => {
        try {
            const nameOfChapter = (await this.db.query(`SELECT name FROM Chapters WHERE id=$1`, [idChapter])).rows;
            return nameOfChapter[0];
        } catch (error) {
            console.log(`Ошибка получения названия раздела в БД: ${error}`);
        }
    };

    getTitleTopic = async (id_topic) => {
        try {
            const titleRows = (await this.db.query(`SELECT name FROM Topics WHERE id=$1`, [id_topic])).rows;
            return titleRows[0].name;
        } catch (error) {
            console.log(`Ошибка получения названия темы в бд: ${error}`);
        }
    };

    getNameOfCreator = async (id_topic) => {
        try {
            const nameRows = (await this.db.query(
                `SELECT nickname FROM Users WHERE id=(SELECT id_usercreator FROM Topics WHERE id=$1)`,
                [id_topic]
            )).rows;
            return nameRows[0].nickname;
        } catch (error) {
            console.log(`Ошибка получения имени создателя в бд: ${error}`);
        }
    };

    getTopicAnswers = async (id_topic) => {
        try {
            const answersRows = (await this.db.query(`SELECT * FROM Answers WHERE id_topic=$1`, [id_topic])).rows;
            return answersRows;
        } catch (error) {
            console.log(`Ошибка получения ответов темы в бд: ${error}`);
        }
    };

    addNewAnswer = async (idCreator, answer_text, idTopic) => {
        try {
            const nickname = (await this.db.query(`SELECT nickname FROM Users WHERE id=$1`, [idCreator])).rows[0].nickname;
            await this.db.query(
                `INSERT INTO Answers (text_answer, id_topic, name_creator) VALUES ($1, $2, $3)`,
                [answer_text, idTopic, nickname]
            );
        } catch (error) {
            console.log(`Ошибка добавления ответа в бд: ${error}`);
        }
    };

    getUserTopics = async (login) => {
        try {
            const idUser = (await this.db.query(`SELECT id FROM Users WHERE nickname = $1`, [login])).rows[0].id;

            console.log(login);

            const topics = (await this.db.query(
                `
                SELECT 
                    Topics.id, 
                    Topics.name, 
                    Topics.id_chapter, 
                    Users.nickname
                FROM 
                    Topics 
                JOIN Users ON Users.id = Topics.id_usercreator
                WHERE Topics.id_usercreator = $1
                `,
                [idUser]
            )).rows;

            return topics;
        } catch (error) {
            console.log(`Ошибка получения тем юзера в бд: ${error}`);
        }
    };

    addNewCategory = async (categoryName) => {
        try {
            await this.db.query(`INSERT INTO Categories (name) VALUES ($1)`, [categoryName]);
        } catch (error) {
            console.log(`ошибка добавления категории в бд: ${categoryName}`);
        }
    };

    addNewChapter = async (categoryName, chapterName) => {
        try {
            const idCategory = (await this.db.query(`SELECT id FROM categories WHERE name=$1`, [categoryName])).rows[0].id;
            await this.db.query(`INSERT INTO Chapters (name, id_category) VALUES ($1, $2)`, [chapterName, idCategory]);
        } catch (error) {
            console.log(`ошибка добавления раздела в бд: ${error}`);
        }
    };

    addNewTopic = async (idChapter, topicName, idUser) => {
        try {
            await this.db.query(
                `INSERT INTO Topics (name, id_chapter, id_usercreator) VALUES ($1, $2, $3)`,
                [topicName, idChapter, idUser]
            );
        } catch (error) {
            console.log(`ошибка добавления раздела в бд: ${error}`);
        }
    };

    getProfileStatistic = async (nickname) => {
        try {
            const idUser = (await this.db.query(`SELECT id FROM Users WHERE nickname=$1`, [nickname])).rows[0].id;
            const statistic = (await this.db.query(
                `
                SELECT 
                    Users.id, 
                    Users.nickname, 
                    Users.email, 
                    Users.skills,
                    Users.id_usersdata,
                    Roles.name as role_name 
                FROM Users
                JOIN Roles 
                    ON Users.id_role = Roles.id 
                WHERE Users.id=$1
                `,
                [idUser]
            )).rows[0];

            const topics_count = (await this.db.query(
                `SELECT Count(*) FROM Topics WHERE id_usercreator=$1`,
                [idUser]
            )).rows[0].count;

            const answers_count = (await this.db.query(
                `SELECT Count(*) FROM Answers WHERE name_creator=$1`,
                [nickname]
            )).rows[0].count;

            const statistic2 = [
                {
                    topics_count: topics_count || 0,
                    answers_count: answers_count || 0
                }
            ];

            return {
                statistic,
                statistic2
            };
        } catch (error) {
            console.log(`Ошибка получения статистики профиля в бд: ${error}`);
        }
    };

    updateProfileSkills = async (idUser, newSkills) => {
        try {
            const skillsJson = JSON.stringify(newSkills);
            await this.db.query(`UPDATE Users SET skills=$1 WHERE id=$2`, [skillsJson, idUser]);
        } catch (error) {
            console.log(`Ошибка обновления умений в бд: ${error}`);
        }
    };

    getPopularTopics = async () => {
        try {
            const popularTopics = (await this.db.query(
                `
                SELECT Topics.id, Topics.name, Users.nickname, COUNT(*) AS count
                FROM Topics
                JOIN Answers ON Topics.id = Answers.id_topic
                JOIN Users ON Users.id = Topics.id_usercreator
                GROUP BY Topics.id, Topics.name, Users.nickname
                ORDER BY count DESC
                LIMIT 5
                `
            )).rows;

            return popularTopics;
        } catch (error) {
            console.log(`Ошибка получения популярных тем в бд: ${error}`);
        }
    };

    getPopularUsers = async () => {
        try {
            const popularUsers = (await this.db.query(
                `
                SELECT Answers.name_creator, Users.id, Count(*) as count 
                FROM Answers 
                JOIN Users ON Users.nickname = Answers.name_creator 
                GROUP BY Answers.name_creator, Users.id
                ORDER BY count DESC
                LIMIT 5
                `
            )).rows;
            return popularUsers;
        } catch (error) {
            console.log(`Ошибка получения активных пользователей в бд: ${error}`);
        }
    };

    deleteTopic = async (topicId) => {
        try {
            await this.db.query(`DELETE FROM Answers WHERE id_topic = $1`, [topicId]);
            await this.db.query(`DELETE FROM Topics WHERE id=$1`, [topicId]);
        } catch (error) {
            console.log(`Ошибка удаления темы в бд: ${error}`);
        }
    };

    deleteChapter = async (chapterId) => {
        try {
            await this.db.query(`DELETE FROM Chapters WHERE id=$1`, [chapterId]);
        } catch (error) {
            console.log(`Ошибка удаления раздела в бд: ${error}`);
        }
    };

    deleteCategory = async (categoryName) => {
        try {
            const categoryId = (await this.db.query(`SELECT id FROM Categories WHERE name=$1`, [categoryName])).rows[0].id;
            await this.db.query(`DELETE FROM Categories WHERE id=$1`, [categoryId]);
        } catch (error) {
            console.log(`Ошибка удаления раздела в бд: ${error}`);
        }
    };

    createCompany = async (nameCompany, descriprionCompany) => {
        try {
            await this.db.query(`INSERT INTO Companies (name, description) VALUES ($1, $2)`, [nameCompany, descriprionCompany]);
        } catch (error) {
            console.log(`Ошибка создания компании в бд: ${error}`);
        }
    };

    getCompanies = async () => {
        try {
            const companies = (await this.db.query(`SELECT * FROM Companies`)).rows;
            return companies;
        } catch (error) {
            console.log(`Ошибка получения компаний в бд: ${error}`);
        }
    };

    deleteCompany = async (idCompany) => {
        try {
            await this.db.query(`DELETE FROM Companies WHERE id=$1`, [idCompany]);
        } catch (error) {
            console.log(`Ошибка удаления компании в бд: ${error}`);
        }
    };

    getQualifications = async () => {
        try {
            const qualifications = (await this.db.query(`SELECT * FROM Qualifications`)).rows;
            return qualifications;
        } catch (error) {
            console.log(`Ошибка получения квалификаций в БД: ${error}`);
        }
    };

    getTypesOfEmployment = async () => {
        try {
            const typesOfEmployment = (await this.db.query(`SELECT * FROM TypesOfEmployment`)).rows;
            return typesOfEmployment;
        } catch (error) {
            console.log(`Ошибка получения типов занятости в БД: ${error}`);
        }
    };

    getSpecializations = async () => {
        try {
            const specializations = (await this.db.query(
                `SELECT s.id as s_id, s.name as s_name, sub.id as sub_id, sub.name as sub_name 
                FROM Specializations s 
                JOIN SubSpecializations sub ON s.id = sub.id_specialization`
            )).rows;
            return specializations;
        } catch (error) {
            console.log(`Ошибка получения специализаций в БД: ${error}`);
        }
    };

    addVacancy = async (createdVacancy) => {
        try {
            await this.db.query(
                `
                INSERT INTO Vacancies(name_company, name_vacancy, id_qualification, specializations, salary, location, id_typeofemployment, description, phone)
                VALUES ($1, $2, (SELECT id FROM Qualifications WHERE name=$3), $4, $5, $6, (SELECT id FROM TypesOfEmployment WHERE name=$7), $8, $9)
                `,
                [
                    createdVacancy.selectedCompany,
                    createdVacancy.selectedName,
                    createdVacancy.selectedQualification,
                    createdVacancy.selectedSubspecializations,
                    createdVacancy.selectedSalary,
                    createdVacancy.selectedLocation,
                    createdVacancy.selectedTypeOfEmployment,
                    createdVacancy.description,
                    createdVacancy.phone
                ]
            );
        } catch (error) {
            console.log(`Ошибка добавления вакансии в БД: ${error}`);
        }
    };

    getVacancies = async () => {
        try {
            const vacancies = (await this.db.query(
                `
                SELECT v.id as id, v.name_company, v.name_vacancy, q.name as name_qualification, v.specializations, v.salary, v.location, t.name as name_typeOfEmployment, v.description, v.phone 
                FROM Vacancies v
                JOIN Qualifications q ON q.id = v.id_qualification
                JOIN TypesOfEmployment t ON t.id = v.id_typeofemployment
                `
            )).rows;
            return vacancies;
        } catch (error) {
            console.log(`Ошибка получения вакансий в БД: ${error}`);
        }
    };

    deleteVacancy = async (id) => {
        try {
            await this.db.query(`DELETE FROM Vacancies WHERE id=$1`, [id]);
        } catch (error) {
            console.log(`Ошибка удаления вакансии в БД: ${error}`);
        }
    };

    getVacancyInfo = async (id) => {
        try {
            const vacancyInfo = (await this.db.query(
                `
                SELECT v.id as id, v.name_company, v.name_vacancy, q.name as name_qualification, v.specializations, v.salary, v.location, t.name as name_typeOfEmployment, v.description, v.phone, c.description as description_company 
                FROM Vacancies v
                JOIN Qualifications q ON q.id = v.id_qualification
                JOIN TypesOfEmployment t ON t.id = v.id_typeofemployment
                JOIN Companies c ON c.name = v.name_company
                WHERE v.id = $1
                `,
                [id]
            )).rows[0];

            return vacancyInfo;
        } catch (error) {
            console.log(`Ошибка получения информации вакансии в БД: ${error}`);
        }
    };
}

module.exports = new Database();