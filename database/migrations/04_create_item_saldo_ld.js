const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('item_saldo_ld', table => {
                table.increments('id').primary()
                table.integer('codio').notNullable(); 
                table.string('descricao').notNullable();
                table.integer('variacao').notNullable(); 
                table.string('desc_variacao').notNullable();
                table.integer('acabamento').notNullable(); 
                table.string('desc_acabamento').notNullable();
                table.integer('quantidade').notNullable(); 
                
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('item_saldo_ld')
}
