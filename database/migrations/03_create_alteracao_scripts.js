const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('alteracao_scripts', table => {
                table.increments('id').primary();
                table.integer('id_script').notNullable()
                .references('id')
				.inTable('scripts');
                table.string('script_alterado').notNullable();
                table.string('usuario').notNullable();
                table.string('alteracao').notNullable();
               
                   
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('indicadores_usuarios')
}

