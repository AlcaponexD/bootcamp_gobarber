/**
 * Created by Jeison Pedroso on 23/01/2020.
 */
import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database{
    constructor(){
        this.init();
    }
    init(){
        this.connection = new Sequelize(databaseConfig);
        models.map(models => models.init(this.connection));
    }
}


export default new Database();