const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('scripts', table => {
                table.increments('id').primary()
                table.string('script').notNullable();
                table.string('titulo').notNullable();   
                table.string('usuario').notNullable();   
                table.string('inclusao').notNullable();
                table.string('alteracao').notNullable();
                table.string('modulo').notNullable();  
                table.integer('status').notNullable();              
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('scripts')
}

