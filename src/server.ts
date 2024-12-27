/** Main server file  */
import express from 'express';
import path from 'path';
// import cookieparser from 'cookie-parser';
// import morgan from 'morgan';
import { logger } from './utilities/log';
import { handleError } from './utilities/error-handler';
import { AppServerConstant } from './constants/constants';
import { DatabaseConnectionManager } from './connection/databaseConnection';
import { UserRoutes } from './app/user/user.routes';
import { GroceryItemRoutes } from './app/grocery_items/grocery_items.routes';
import { OrderItemRoutes } from './app/order_items/order_item.routes';


const ENVConfig = require(`./config/${process.env.NODE_ENV}.json`);

export class Server {
    public app: express.Application;
    private retryAttempt: number;

    constructor(private readonly envConfig) {
        this.retryAttempt = 0;
        this.app = express();
    }

    public async connectToServerResources(): Promise<void> {
        try {

            const dbConnectionManager = DatabaseConnectionManager.getInstance();
            await dbConnectionManager.initializeConnection(ENVConfig.MYSQL);
        } catch (error) {
            console.log(error.message);
            logger.error(`${AppServerConstant.ERROR_MESSAGES.ERROR_SERVER_RESOURCES_CONNECTION_FAILURE} : %o`, error);
        } finally {
            this.initializeRoutes();
        }
    }

    // application routes
    private initializeRoutes(): void {

        console.log(__dirname);

        // this.app.use(morgan('dev'));

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true }));
        this.app.set('view engine','ejs');

        // this.app.use(cookieparser());

        this.app.use((req, res, next) => {
            res.setHeader(AppServerConstant.CORS.CONTENT_TYPE, AppServerConstant.CORS.APPLICATION_JSON);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_ORIGIN, AppServerConstant.CORS.ALL);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_METHODS, AppServerConstant.CORS.ALL_METHODS);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_HEADERS, AppServerConstant.CORS.ALL_HEADERS);
            next();

        }, (new UserRoutes()).router);

        this.app.use((req, res, next) => {
            res.setHeader(AppServerConstant.CORS.CONTENT_TYPE, AppServerConstant.CORS.APPLICATION_JSON);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_ORIGIN, AppServerConstant.CORS.ALL);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_METHODS, AppServerConstant.CORS.ALL_METHODS);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_HEADERS, AppServerConstant.CORS.ALL_HEADERS);
            next();

        }, (new GroceryItemRoutes()).router);

        this.app.use((req, res, next) => {
            res.setHeader(AppServerConstant.CORS.CONTENT_TYPE, AppServerConstant.CORS.APPLICATION_JSON);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_ORIGIN, AppServerConstant.CORS.ALL);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_METHODS, AppServerConstant.CORS.ALL_METHODS);
            res.header(AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_HEADERS, AppServerConstant.CORS.ALL_HEADERS);
            next();

        }, (new OrderItemRoutes()).router);

        this.app.use(async (err, req, res, next) => {


            console.log(err);
            
            if(!err.statusCode){
                err.statusCode = 500;
            }
            
            handleError(err, res);
        });
    }

}
