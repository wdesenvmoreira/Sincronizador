const Knex =  require('knex')
const bcrypt = require('bcryptjs')
//Inserindo itens na tabela 
exports.seed = async function (knex) {
   const salt = bcrypt.genSaltSync()
   let senhawbiadm = bcrypt.hashSync('wbiadm', salt)
    let senhausuario = bcrypt.hashSync('usuario', salt)
    //let senhawbiadm = 'wbiadm'
    //let senhausuario = 'usuario'
   return await knex('usuarios').insert([
      {usuario: 'wbiadm', senha: senhawbiadm, nivel: 1},
      {usuario: 'usuario', senha: senhausuario, nivel: 2}
   ])
           
            
}