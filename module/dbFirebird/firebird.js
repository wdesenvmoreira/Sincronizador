var cors = require('cors')
var firebird = require('node-firebird');
const conexao = require('../../config/conexao')
let options = conexao;

var pool = firebird.pool(5, options);

console.log('conexão: ', conexao)
let consulta = function(SQL) {


    return new Promise((resolve, reject) => {


        pool.get(function(err, db) {

            if (err) {
                console.log('Erro ao conectar à base de dados.',err)
                throw err;
            }

            // db = DATABASE
            db.query(SQL, function(err, result) {


                // console.log('SQL:', SQL)

                db.detach();
                // console.log('result: ', result)
                resolve(result);

            })
        });
    });
}


module.exports = { consulta }