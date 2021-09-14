import { Sequelize } from 'sequelize';
import { LOCAL_HOST,TYPE_BD,BD,USER_BD,PASS_BD } from "../config/env";
const dnasequenceModel = require('../models/dnasequence');
const sequelize = new Sequelize(BD, USER_BD, PASS_BD, {
    host: LOCAL_HOST,
    dialect: 'mysql',
    port: 3806,
});
//Puedo sincronizar ahora con mi base de datos
const dnasequence  = dnasequenceModel(sequelize,Sequelize);
sequelize.sync({force:false}).then(()=> {
    console.log('Tablas sincronizadas')
})
//Vamos a exportar para utilizar los objetos que necesite
//para poder ocuparlo despues
module.exports = {
    dnasequence
}