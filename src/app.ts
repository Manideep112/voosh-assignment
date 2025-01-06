import * as cors from 'cors'
import * as helmet from 'helmet';
import * as express from 'express';
import { database } from './database';
import * as bodyParser from 'body-parser';
import { response } from './utils/response';
import { endpoints } from './routes/endpoints';

class Server {
    public expressApp: express.Application

    constructor() {
        this.expressApp = express()
        this.startServer()
    }

    // starting the server
    startServer = () => {
        this.expressApp.listen(process.env.PORT, () => {
            console.log({ descryption: `Server is running at ${process.env.PORT}` });
        })

        this.configureApp()
    }

    configureApp = () => {
        this.expressApp.use(helmet())
        this.expressApp.use((req, res, next) => {
            bodyParser.json()(req, res, err => {
                if (err) {
                    return res.sendStatus(400); // Bad request
                }
                this.expressApp.use(bodyParser.json({ limit: '15mb' }));
                next();
            });
        });
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));

        const corsOptions: any = {
            origin: '*'
        };

        if (process.env.ACCESS_CONTROL_ALLOW_METHODS) {
            corsOptions.methods = process.env.ACCESS_CONTROL_ALLOW_METHODS;
        }

        if (process.env.ACCESS_CONTROL_ALLOW_HEADERS) {
            corsOptions.allowedHeaders = process.env.ACCESS_CONTROL_ALLOW_HEADERS;
        }
        this.expressApp.use(cors(corsOptions));

        this.connectToMySql()
    }

    connectToMySql = async () => {
        database.connectMySql()
            .then(() => {
                this.configureRoutes()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    configureRoutes() {

        this.expressApp.route('/v1/check').get((req, res) => {
            return response.send(req, res, null, 'VPRT IS RUNNING', 201, null);
        })

        this.expressApp.use('', endpoints.configureRoutes())
    }
}

export const server = new Server()