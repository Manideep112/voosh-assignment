import { Sequelize } from 'sequelize-typescript';
import { allModels } from './models/allModels';
require('dotenv').config();
class Database {

    public sequelizeInstance: any

    connectMySql() {
        return new Promise((resolve, reject) => {
            const sequelize = new Sequelize({
                username: 'root',
                password: 'Root@123',
                database: 'voosh-assignment',
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
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
                    requestTimeout: 5000
                },
                logging: true
            });

            sequelize.authenticate().then((err: any) => {
                if (err) throw err
                console.log('mysql connected');
                return resolve(true)
            }).catch((err) => {
                console.log(err, 'Mysql connection Error')
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
