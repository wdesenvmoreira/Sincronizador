const ctrlUsuarios = require('../controller/controllerUsuarios')
const ctrlUW = require('../controller/controllerUsuarioWbi')
const passport = require('passport')
const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../config/config.json').secret

const rotaUsuario = (app) =>{
    app.use(async(req, res, next)=>{
            const token = req.session.token;
            if(token){
                try {
                    const payload = jwt.verify(token, jwtSecret)
                    if(payload.nivel = 1){
                      next();  
                    }else{
                        console.log('Não possui permissão para acessar esta pagina. Retornando para : ',req.headers.host+'\\'+req.path)
                       res.redirect(req.headers.host+'\\'+req.path);
                    }
                    
                } catch (error) {
                    res.render('login',{message: 'Erro ao acessar. Acesse novamente.'});
                }
            }else{
               
                res.render('login',{message: 'Realize o login.'})
            }
        });

    app.get('/usuarios', (req,res)=>{
        res.render('Usuarios/usuarios')
    })
    app.get('/usuarios/todos/', async(req, res) => {
        const busca = await ctrlUsuarios.findAll()	
        res.json(busca)
    })

    app.get('/usuarios/:id/',async(req, res) => {
        console.log('req.params.id: ',req.params.id)
        const busca = await ctrlUsuarios.findById(req.params.id)
        res.json(busca)
    })

    app.get('/usuarios/usuario/:user', async(req, res) => {
        console.log('user: ',req.params.user)
        let usuario = await ctrlUsuarios.verificarUsuario(req.params.user)
        console.log('usuario por nome? ', usuario)

        res.json(usuario)
    })
    app.get('/usuariosapi/:user', async(req, res) => {
        let usuario 
        
        if(req.params.user == 'todos'){
             usuario = await ctrlUsuarios.findAll(req.params.user)
        }else{
             usuario = await ctrlUsuarios.findByUsuario(req.params.user)
             
        }
        res.json(usuario)
    })

    app.post('/usuarios/incluir', async(req, res) => {

        const usuario = { ...req.body}
        const incluir = await ctrlUsuarios.create(usuario)
            res.json(incluir)
        
        
    })



    app.delete('/usuarios/delete/:id',async(req, res) => {
        const deletar = await ctrlUsuarios.deletar(req.params.id)
        if(deletar==1){          
           res.json(deletar) 
        }else{
            res.json(deletar.msg)
        }
        
    })
  
app.post('/usuarios/alterar', async(req, res)=>{
    console.log('req.body altearar: ', req.body)
    let alterar = await ctrlUsuarios.update(req.body.id, req.body)
    if(alterar){
        res.json(alterar)
    }else{
        res.send('Registro não alterado. ')
    }
})

   app.post('/usuarios/acessar',
    passport.authenticate('local', { 
                                        successFlash : "Hey, Welcome back",
                                        successRedirect: '/usuarios/todos',
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




module.exports = rotaUsuario