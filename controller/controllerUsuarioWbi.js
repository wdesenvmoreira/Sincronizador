const knex = require('../database/connection')



const listaWbiUsuario = async(id) => {
    return await knex.select('indicadores_usuarios.id','usuario', 'usuarios.id', 'id_indicador', 'incluir', 'editar', 'excluir', 'nome', 'titulo', 'modulo').from('indicadores')
        .leftJoin('indicadores_usuarios', 'indicadores.id', 'indicadores_usuarios.id_indicador')
       // .innerJoin('usuarios', 'usuarios.id','=','indicadores_usarios.id_usuario' )
        .leftJoin('usuarios', 'usuarios.id', 'indicadores_usuarios.id_usuario')
        //.leftJoin('usuarios', 'usuarios.id', 'indicadores_usuarios.id_usuario')
        .where('usuarios.id',id)

}
const listaWbiNomeUsuario = async(user) => {
    return await knex.select('indicadores_usuarios.id','usuario', 'usuarios.id', 'id_indicador', 'incluir', 'editar', 'excluir', 'nome', 'titulo', 'modulo').from('indicadores')
        .leftJoin('indicadores_usuarios', 'indicadores.id', 'indicadores_usuarios.id_indicador')
       // .innerJoin('usuarios', 'usuarios.id','=','indicadores_usarios.id_usuario' )
        .leftJoin('usuarios', 'usuarios.id', 'indicadores_usuarios.id_usuario')
        //.leftJoin('usuarios', 'usuarios.id', 'indicadores_usuarios.id_usuario')
        .where('usuario',user)

}

const listarByInd = async(id) => {
    return await knex.select('indicadores_usuarios.id','usuario', 'id_usuario', 'id_indicador', 'incluir', 'editar', 'excluir', 'nome', 'titulo', 'modulo').from('indicadores')
        .leftJoin('indicadores_usuarios', 'indicadores.id', 'indicadores_usuarios.id_indicador')
       // .innerJoin('usuarios', 'usuarios.id','=','indicadores_usarios.id_usuario' )
        .leftJoin('usuarios', 'usuarios.id', 'indicadores_usuarios.id_usuario')
        //.leftJoin('usuarios', 'usuarios.id', 'indicadores_usuarios.id_usuario')
        .where('id_indicador',id)

}

const verificarExistente = async(iduw, idu) =>{
    
    let uw =  await knex.select('indicadores_usuarios.id', 'id_usuario', 'id_indicador' ).from('indicadores_usuarios')
        .where('id_usuario',idu)
    console.log('na verificação iduw: ', iduw, ' - idu: ', idu)
    console.log('Na verificação o retorno da pesquisa: ', uw)
    uw.forEach(u_w =>{
        console.log('u_w.id_indicador: ', u_w.id_indicador)
        if(u_w.id_indicador == iduw){
            console.log('Verificação : exite')
            return true
        }
    })
    console.log('Verificação :Não exite')
          
    return false
}

const alterar = async(id, dados) => {   
    try {
        return await knex('indicadores_usuarios')
                .where({ id })
                .update({...dados})
    } catch (error) {
        return error
    }
}

const create = async(user) => {   
    console.log('user no create: ', user)
console.log('Existe: ', verificarExistente(user.id_indicador, user.id_usuario))
        if(!verificarExistente(user.id_indicador, user.id_usuario)){
            console.log('Verificou que usuario já esta cadastrado. ')
            return false
        }else{ console.log('Verificou que não exite')
            try {
            let retorno    
            retorno = await knex('indicadores_usuarios').insert([
                {id_usuario: parseInt(user.id_usuario), id_indicador: parseInt(user.id_indicador), incluir: false, editar: false, excluir: false} 
            ])
            return retorno

            } catch (error) {
                console.log('Error: ', error)
                return error
            }
        }
        
   
 }
 
 
 const deletar = async(id) =>{
     console.log('No CtrlUsuarioWbi id a ser excluído é: ', id)
     if(id != 1){
         try {
         return await knex('indicadores_usuarios')
                         .where({ id })
                         .del()
         } catch (error) {
             return error
         }
     }else{
         return {"msg":'Este WBI não pode ser excluido!'}
     }
     
 
 }

module.exports={ listaWbiUsuario,listaWbiNomeUsuario, alterar, listarByInd, create, deletar}                   