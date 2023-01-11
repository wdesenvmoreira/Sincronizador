const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('item_recolhido_ld', table => {
                table.increments('id').primary()
                table.integer('pedido').notNullable(); 
                table.integer('recolhimento').notNullable(); 
                table.integer('tipo_rec').notNullable(); 
                table.integer('cod_cliente').notNullable();
                table.string('razao_cliente').notNullable();  
                table.integer('autoinc_pedido').notNullable(); 
                table.integer('cod_item').notNullable(); 
                table.string('desc_item').notNullable();
                table.integer('cod_variacao').notNullable(); 
                table.string('desc_variacao').notNullable();
                table.integer('cod_acabamento').notNullable();
                table.string('desc_acabamento').notNullable();
                table.string('cod_analitico').notNullable();
                table.string('oc'); 
                table.integer('quantidade').notNullable(); 
                table.integer('cod_motivo'); 
                table.string('desc_motivo');
                table.string('observacao');
                table.string('entrada').notNullable();
                table.integer('status').notNullable()
                .references('id')
				.inTable('status')
                
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('item_recolhido_ld')
}