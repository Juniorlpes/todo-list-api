import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import appRoutes from './routes';
import corsOptions from './cors-options'
import './database';

class App {
    public express: express.Application;

    public constructor() {
        this.express = express()

        this.middlewares()
        this.database()
        this.routes()
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(morgan("dev"));
        this.express.use(cors(corsOptions))
    }

    private database(): void {
        //feito no import './database';
    }

    private routes(): void {
        this.express.use(appRoutes);
    }
}

export default new App().express;