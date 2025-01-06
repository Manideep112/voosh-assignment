import { Sequelize } from 'sequelize-typescript';
import { allModels } from './models/allModels';
require('dotenv').config();
const username: string = process.env.SQL_DB_USERNAME ? process.env.SQL_DB_USERNAME : ''
const password: string = process.env.SQL_DB_PASSWORD ? process.env.SQL_DB_PASSWORD : '';
const db: string = process.env.SQL_DB_NAME ? process.env.SQL_DB_NAME : '';
const host: string = process.env.SQL_DB_URL ? process.env.SQL_DB_URL : '';
const port: number = process.env.SQL_DB_PORT ? Number(process.env.SQL_DB_PORT) : 3306;

class Database {

    public sequelizeInstance: any

    connectMySql() {
        return new Promise((resolve, reject) => {
            const sequelize = new Sequelize({
                username,
                password,
                database: db,
                dialect: 'postgres',
                host,
                port: port,
                models: allModels,
                timezone: '+05:30',
                pool: {
                    min: 1,
                    max: 20,
                    idle: 3000,
                    evict: 2000,
                    acquire: 2000
                },
                dialectOptions: {
                    requestTimeout: 5000,
                    ssl: {
                        require: true,
                        rejectUnauthorized: false, // Use false if unsure or for self-signed certificates
                    },
                },
                logging: true
            });
            
            sequelize.authenticate().then((err: any) => {
                if (err) throw err
                console.log('postgresql connected');
                return resolve(true)
            }).catch((err) => {
                console.log(err, 'sql connection Error')
                return reject('mysql not connected.Please check DB Connection details')
            })

            this.sequelizeInstance = sequelize;
            // this.createTables();
        })
    }
    
    createTables() {
        this.sequelizeInstance.sync({ alter: true })
    }
    
    getInstance() {
        return this.sequelizeInstance;
    }


}

export const database = new Database()
