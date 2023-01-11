const ctrlUsuarios = require('../controller/controllerUsuarios')
const ctrlUW = require('../controller/controllerUsuarioWbi')
//const ctrlIndicadores = require('../controller/controllerIndicadores')
const passport = require('passport')

const rotaIndicadores = async(app) =>{
    app.get('/indicadores', (req,res)=>{
        console.log('req.local: ', req.local)
        console.log('req.session: ', req.session)
       // let indicadores = await ctrlIndicadores.findAll();
        res.render('indicadores/indicadores',{})
    })
    app.get('/indicadores/todos/', async(req, res) => {
        const busca = await ctrlIndicadores.findAll()	
        res.json(busca)
    })

    app.get('/indicadores/:id/',async(req, res) => {
        console.log('req.params.id: ',req.params.id)
        const busca = await ctrlIndicadores.findById(req.params.id)
        res.json(busca)
    })

    app.get('/indicadores/:user', async(req, res) => {
        console.log('user: ',req.params.user)
        let usuario = await ctrlIndicadores.verificarUsuario(req.params.user)
        console.log('usuario por nome? ', usuario)

        res.json(usuario)
    })
    app.get('/usuariosapi/:user', async(req, res) => {
        let usuario 
        
        if(req.params.user == 'todos'){
             usuario = await ctrlIndicadores.findAll(req.params.user)
        }else{
             usuario = await ctrlIndicadores.findByUsuario(req.params.user)
             
        }
        res.json(usuario)
    })

    app.post('/indicadores/incluir', async(req, res) => {
        //req.body.edicao=='Sim'?req.body.edicao=true:req.body.edicao=false
        console.log('req.body: ', req.body)
        const indicadores = { ...req.body}
        console.log('Indicadores depois: ',indicadores)
        const incluir = await ctrlIndicadores.create(indicadores)

            console.log('retorno inclui Indicadores: ',incluir)
            res.json(incluir)
        
        
    })



    app.delete('/indicadores/delete/:id',async(req, res) => {
        const deletar = await ctrlIndicadores.deletar(req.params.id)
        if(deletar==1){          
           res.json(deletar) 
        }else{
            res.json(deletar.msg)
        }
        
    })

  
app.post('/indicadores/alterar', async(req, res)=>{
    console.log('req.body altearar: ', req.body)
    let alterar = await ctrlIndicadores.update(req.body.id, req.body)
    if(alterar){
        res.json(alterar)
    }else{
        res.send('Registro não alterado. ')
    }
})

   app.post('/usuarios/acessar',
    passport.authenticate('local', { 
                                        successFlash : "Hey, Welcome back",
                                        //successRedirect: '/usuarios/todos',
                                        failureRedirect: '/',
                                        failureFlash: false ,
                                     }),(req, res)=>{
                                         res.locals.user = req.user
                                         console.log('dentro do req local user: ', res.locals.user)
                                         //console.log('dentro do res: ', res)
                                         
                                    res.render('login')
                                }
                                    
                        
   
   
    )


}




module.exports = rotaIndicadores