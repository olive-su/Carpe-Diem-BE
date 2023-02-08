import { Sequelize, DataTypes } from 'sequelize';

import config from '../config';
import expression from './Expression';

const db: any = {};

const sequelize: any = new Sequelize({
    host: config.db.host,
    port: 3306,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    dialect: 'mysql',
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.expression = expression(sequelize, DataTypes);

export default db;
