 const ctrlUsuario = require('../../controller/controllerUsuarios')
const ctrlAPI = require('../../controller/API')
 const ctrlUW = require('../../controller/controllerUsuarioWbi')
const passport = require('passport')
const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../../config/config.json').secret
const bcrypt = require('bcryptjs')
const { json } = require('body-parser')


const rotaUsuario = (app) =>{
// Seleção dos pedidos do cliente no periodo
    app.get('/api/consultar/detalhamentoindicador/cliente/:id', async(req, res) => {
        const busca = await ctrlAPI.consultarDetalhamentocliente(req.params.id)	
        console.debug('retorno da consulta detalhamentocliente ', busca)
        res.json(busca)
    })
// Seleção do total de faturamento dos clientes no periodo
    app.get('/api/consultar/detalhamentoindicador/clientes', async(req, res) => {
        // console.log('id: ', req.params.id)
        const busca = await ctrlAPI.consultarDetalhamentoindicador(1)	
        res.send(busca)
    })
   

    app.get('/api/consultar/dadosindicador/:id', async(req, res) => {
        console.log('dados indicador: ', req.params.id)
        const busca = await ctrlAPI.consultarDadosIndicador(req.params.id)	
        res.send(busca)
    }) 

    app.get('/api/faturamento/consultar', async(req, res) => {
        console.log("entrou no usuarios todos")
        const busca = await ctrlAPI.consultar('id_indicador','ty')	
        res.json(busca)
    })
    app.get('/api/consultar/:id', async(req, res) => {
        console.log('id: ', req.params.id)
        const busca = await ctrlAPI.consultar(req.params.id,'ty')	
        res.json(busca)
    })  


    
    //Busca dados do Indicador por usuário.
    app.get('/api/consultaWBIUser', async(req, res) => {
        console.log('req.query.user: ', req.query.user)
        let wbisUser = await ctrlUW.listaWbiNomeUsuario(req.query.user)
        console.log('wbisUser: ', wbisUser)
        res.json(wbisUser)
    })


    app.post('/api/auth', async(req, res) =>{
        try {

            if(req.body.username.length === 0){
                res.json({
                    acesso: false,
                    token:'',
                    menssagem:'Necessário informar um usuário.'})
            }
            else
            {
               if(req.body.password.length === 0){
                        res.json({
                            acesso: false,
                            token:'',
                            menssagem:'Necessário informar a senha.'})
                    }else{
                        const user = await ctrlUsuario.findUsuario(req.body.username);
                    
                        if(user.length === 0){
                            res.json({
                                acesso: false,
                                token:'',
                                menssagem:'Usuário não existe.'})
                        }
                        else
                        {
                                const isValid = bcrypt.compareSync(req.body.password, user[0].senha)
                                console.log('isValid:' , isValid)
                            if(isValid){
                                const payload = {
                                id: user[0].id,
                                username: user[0].usuario,
                                edicao: user[0].edicao

                                }
                                jwt.sign(payload, jwtSecret, (err, token)=>{
                                    req.session.token = token;
                                    // res.redirect('/principal');
                                    res.json(
                                        {
                                            acesso: true,
                                            token:token,
                                            user: user[0].usuario,
                                            menssagem:'Usuário não existe.'})
                                })
                                
                            }else
                                res.json({
                                    acesso: false,
                                    token:'',
                                    menssagem:'Usuário e Senha não conferem.'})
                                // res.render('login',{success: false, message:'Problemas no acesso. '}) 
                        }
                    }
                    
            
             }
    
        } catch (error) {
             console.log(error);
             
        }
        
    })
    app.post('/api/validate', async(req, res) =>{
        const token = req.body.token
        try {

            if(token === 0){
                res.json(false)
            }
            else
            {jwt.verify(token, jwtSecret, (err, decoded)=>{
                if(err){
                    res.json(false)
                }else{
                    res.json({acesso: true,id: decoded.id,user: decoded.username })
                }
            })
                    
            
             }
    
        } catch (error) {
             console.log(error);
             
        }
        
    })

    app.post('/api/logout', async(req, res) =>{
        res.json(true)
    })

   
}




module.exports = rotaUsuario