 let Usuario = class {

 
     constructor (usuario, senha, edicao) {
         this.usuario = usuario
         this.senha = senha
         this.edicao = edicao
     }
     getUsuario(){
        return this.usuario
     }
     setUsuario(usuario){
        this.usuario = usuario
     }

     getUsuario(){
        return this.senha
     }
     setUsuario(senha){
        this.senha = senha
     }
     
     getUsuario(){
        return this.edicao
     }
     setUsuario(edicao){
        this.edicao = edicao
     }

}
exports = Usuario