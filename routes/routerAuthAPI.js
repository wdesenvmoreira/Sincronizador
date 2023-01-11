const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../config/config.json').secret
const bcrypt = require('bcryptjs')
const crtlUsuario = require('../controller/controllerUsuarios')
const ctrlWBI = require('../controller/controllerWBI')

const rotasAuth = (app) => {

    app.post('/API/auth', async(req, res) =>{
        console.log("acessando API/auth")
        try {

            if(req.body.username.length === 0){
                res.json({message:'Necessário informar um usuário.'})
            }
            else
            {console.log('req.body:', req.body)
               if(req.body.password.length === 0){
                        res.json({message:'Necessário informar a senha.'})
                    }else{
                        const user = await crtlUsuario.findUsuario(req.body.username);
                    
                        if(user.length === 0){
                            res.json({message:'Usuário não existe.'})
                        }
                        else
                        {
                                const isValid = bcrypt.compareSync(req.body.password, user[0].senha)
                                
                            if(isValid){
                                const payload = {
                                id: user[0].id,
                                username: user[0].usuario,
                                edicao: user[0].edicao

                                }
                                await jwt.sign(payload, jwtSecret, (err, token)=>{
                                    req.session.token = token;
                                    res.json({'acesso':true,'token':token});
                                })
                                
                            }else
                                res.json({message:'Problemas no acesso. '}) 
                        }
                    }
                    
            
             }
    
        } catch (error) {
             console.log(error);
             
        }
        
    })

    app.get('/API/auth', async(req, res) =>{
        console.log("acessando API/auth")
        try {
            console.log('req: ', req.body)
            if(req.body.username.length === 0){
                res.json({message:'Necessário informar um usuário.'})
            }
            else
            {
               if(req.body.password.length === 0){
                        res.json({message:'Necessário informar a senha.'})
                    }else{
                        const user = await crtlUsuario.findUsuario(req.body.username);
                    
                        if(user.length === 0){
                            res.json({message:'Usuário não existe.'})
                        }
                        else
                        {
                                const isValid = bcrypt.compareSync(req.body.password, user[0].senha)
                                
                            if(isValid){
                                const payload = {
                                id: user[0].id,
                                username: user[0].usuario,
                                edicao: user[0].edicao

                                }
                                await jwt.sign(payload, jwtSecret, (err, token)=>{
                                    req.session.token = token;
                                    res.json(token);
                                })
                                
                            }else
                                res.json({message:'Problemas no acesso. '}) 
                        }
                    }
                    
            
             }
    
        } catch (error) {
             console.log(error);
             
        }
        
    })

    app.get('/API/usuarios/:id/',async(req, res) => {
        const busca = await crtlUsuario.findById(req.params.id)
        res.json(busca)
    })

    app.get('/API/uw/', async(req, res) => {
        let indicadores 
        let i = req.body.ind
        try {
            indicadores = await ctrlWBI.findByWBI(i)  
            if(indicadores.length > 0 || indicadores != null){
                 res.json(indicadores)
            }else{
                res.json(0)
            }
           
        } catch (error) {
            res.json(error)
        }
             
        
    })
    
}



module.exports = rotasAuth;