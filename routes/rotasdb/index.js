const rotasIndicadores = require();
const rotas = (app) =>{
    
    app.get('/', (req, res)=>{
        res.render('login', {message:''})
    }) 
    rotasLogout(app)
    rotasAuth(app)

   rotasPrincipal(app)
   rotasWBI(app)
   rotasUsuarios(app)
   rotasUW(app)

}

module.exports = rotas