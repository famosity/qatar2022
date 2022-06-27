import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import 'dotenv/config'
import cors from "cors";
import dbConnection from "./database";

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { createRoles } from "./libs/initialSetup";

const app = express();
createRoles();

app.set('pkg', pkg);

app.use(express.json());

app.use(morgan("dev"));

//configurar la base de datos
    dbConnection()
//

//configurar cors
    app.use(cors());
//

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        autor: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

//apis
    app.use('/api/auth', authRoutes)
    app.use('/api/user', userRoutes)
//

export default app;