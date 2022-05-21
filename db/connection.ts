import { Sequelize } from'sequelize';
const db = new Sequelize('tsusuario', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});
export default db;
