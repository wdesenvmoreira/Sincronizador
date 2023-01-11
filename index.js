const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const rotas = require('./routes')
const session = require('express-session')
//const flash = require('connect-flash')
const passport = require('passport')
//var cookieParser = require('cookie-parser');
let config = require('./config/config.json')

const app = express()

const port = 3000
//Iniciando a sessão. 



app.use(express.static('public'))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3000);

app.use(cors());

app.use((req, res, next) => {
    //console.log("Acessou o Middleware!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};

app.use(session({
    secret: config.secret,
    resave: false, 
    saveUninitialized: false,
    cookie: {maxAge: 10 * 60 * 60000}

}))

//Configurando o connect-flash
app.use(passport.initialize())
app.use(passport.session())
// app.use(flash())

rotas(app);
console.log('port: ',port)
app.listen(port, () => {
    console.log(`Iniciado servidor na porta: ${port} appserver`);
});




