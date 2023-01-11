const ctrlUW = require('../controller/controllerUsuarioWbi')
const ctrlUsuarios = require('../controller/controllerUsuarios')


const rotasUW = (app)=>{

    // Verifica Se o WBI esta vinculado a algum usuário 
    app.get('/uwind/:id',async(req, res)=>{

        let usuarios = await ctrlUsuarios.listarUsuarios()
        let uwind = await ctrlUW.listarByInd(req.params.id)
        
        console.log('usuarios: ', usuarios)
        console.log('uwind: ', uwind)

        let retorno = []
        let p 
            usuarios.forEach( user  => {
                p = 0
                if(uwind.length ===0){
                    retorno.push({
                        id_usuario: user.id, 
                        usuario: user.usuario,
                        checkd: false,
                        iduw: 0
                    })  
                }else{
                    uwind.forEach(w =>{
                        if(p==0){
                            if(user.id === w.id_usuario){
                                    retorno.push({
                                id_usuario: user.id, 
                                usuario: user.usuario,
                                checkd: true,
                                iduw: w.id
                                }) 
                                 p = 1  
                               }
                        }
                   
                    })
                    if(p==0){
                        retorno.push({
                            id_usuario: user.id, 
                            usuario: user.usuario,
                            checkd: false,
                            iduw: 0
                        }) 
                    }
                    
                }
                
            
            });  
 
        console.log('Retorno após verificação de usuarios x indicadores: ', retorno)
        
        res.json(retorno)
    })

    app.get('/uw/:id',async(req, res)=>{
        let retorno = await ctrlUW.listaWbiUsuario(req.params.id)
        res.json(retorno)
    })

    app.put('/uw/alterar',async(req, res)=>{
        let retorno = await ctrlUW.alterar(req.body.id, req.body)
        res.json(retorno)
    })

    app.put('/uw/gravarUsuarios', async(req, res)=>{
     let user = req.body
     console.log('usuarios api: ', user);

        incluir = await ctrlUW.create({id_usuario: parseInt(user.id_usuario), id_indicador: parseInt(user.id_indicador), incluir: false, editar: false, excluir: false})
        res.json(incluir)
    })


    app.delete('/uw/delete/:iduw',async(req, res) => {
        console.log('Entrou na rota para deleção: ', req.params.iduw)
        const deletar = await ctrlUW.deletar(req.params.iduw)
        if(deletar==1){          
           res.json(deletar) 
        }else{
            res.json(deletar.msg)
        }
        
    })



}

module.exports = rotasUW