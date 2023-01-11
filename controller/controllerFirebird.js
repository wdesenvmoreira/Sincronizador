const dbFirebird = require('../module/dbFirebird/firebird')

const consultar = async(sql) =>{
    
    try {
        return await dbFirebird.consulta(sql)
    } catch (error) {
        return error
    }
    
} 
module.exports = { consultar }