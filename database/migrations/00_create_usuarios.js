const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('usuarios', table => {
                table.increments('id').primary()
                table.string('usuario').notNullable();
                table.string('senha').notNullable();   
                table.string('nivel').notNullable();   

            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('usuarios')
}
