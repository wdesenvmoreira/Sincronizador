const knex = require('../database/connection') // Onde connection é o arquivo de conexão dentro da pasta database
const bcrypt = require('bcryptjs')
//const flash = require('connect-flash')
const localStrategy = require('passport-local').Strategy 
const passport = require('passport')

const findAll = async() =>{
    
    try {
        return await knex('indicadores').select('id', 'nome', 'titulo', `dados`,`width`, `height`, `chartType`, `options`, `modulo` )
      
    }
    catch (error) {
        return error
    }
} 

// Pesquisa WBI por  sua id. 
const findById = async(id) =>{
    try {
  
           const registro = await knex('indicadores')
                            .where('id', id)
                            .select('id', 'nome', 'titulo', `dados`,`width`, `height`, `chartType`, `options`, `modulo` )
                            .first()     
            return registro
    } catch (error) {
        return error
    }
      
   
}

// Irá verificar se o WBI existe através da id do WBI ou do nome do usuário. 
// Caso digite um valor que seja inteiro a pesquisa será por id utilizando a função findByWBI senão a pesquisa será por nome de ususario . 
const findByWBI = async(ind) => {
    
    if(ind / 1 || ind == 0){

        let wbi = []
        wbi.push(await findById(ind))
        return wbi
         
    }else{
        try {
            
            ind = ind.trim()
            return await knex('indicadores')
            .where('titulo', 'like', `%${ind}%`)
            .select('id', 'nome', 'titulo', `dados`,`width`, `height`, `chartType`, `options`,`modulo`)
        
        } catch (error) {
            return error
        }
    }
}


// Irá verificar se o usuario existe através da id do usuario ou do nome do usuário. 
// Caso digite um valor que seja inteiro a pesquisa será por id utilizando a função findByUsuario senão a pesquisa será por nome de ususario . 
const verificarWBI = async(ind) => {
    console.log('Verificando WBI: ', ind)
    try {
         const verificacao = await knex('indicadores')
        .where('nome', 'like', `%${ind}%`)
        .first()  
        return verificacao
    } catch (error) {
        return error
    }
}


const create = async(novosdados) => {   

   const wbiExiste = await verificarWBI(novosdados.nome)
    if (!wbiExiste) {
        try {
           
            const wbi = await knex('indicadores').insert({
            ...novosdados
        }) 
        // return ids ? true : false
        return wbi
    } catch (error) {
        console.log('Error: ', error)
        return error
    }
   } else {
       return 'Duplicado'
   }
  
}

const update = async(id, dados) => {   
    try {
        return await knex('indicadores')
                .where({ id })
                .update({...dados})
    } catch (error) {
        return error
    }
}

const deletar = async(id) =>{
    if(id != 1){
        try {
        return await knex('indicadores')
                        .where({ id })
                        .del()
        } catch (error) {
            return error
        }
    }else{
        return {"msg":'Este WBI não pode ser excluido!'}
    }
    

}

module.exports = { findAll, findById, create, deletar, update, findByWBI,  verificarWBI}