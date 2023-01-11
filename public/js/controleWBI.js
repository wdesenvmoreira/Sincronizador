

async function buscarWBI(busca){
    let dados

    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){

       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'todos'
        }
    }

    
        dados = await axios.get(`http://${host}/wbi/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function preencherTabela(busca){
    const tabelaWBI = document.getElementById('tabelaWBI')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarWBI(busca)

    sairPainelUW()

   await dados.forEach(wbi => {
        const tr = document.createElement(`tr`)
        tr.setAttribute('id',wbi.id)
        tr.innerHTML = `<td>${wbi.id}</td>
                        <td>${wbi.nome}</td>
                        <td>${wbi.titulo}</td>
                        <td>${wbi.dados}</td>
                        <td>${wbi.width}</td>
                        <td>${wbi.height}</td>
                        <td>${wbi.chartType}</td>
                        <td>${wbi.options}</td>
                         <td >
                            <a onclick="setarWBIAlterar(${wbi.id})" data-toggle="modal" data-target="#modalEditar">
                                <i class="material-icons prefix">apps</i> 
                            </a>
                        </td>
                        <td >
                        <a onclick="listaWBIUsuario(${wbi.id},'${wbi.nome}')" data-toggle="modal" data-target="#modalWBIUsuario">
                        <i class="small material-icons">insert_chart</i>
                        </a>
                    </td>
                        <td><a onclick="deletarWBI(${wbi.id})"><i class="material-icons prefix">delete</i></a></td>`
                    
        corpoTabela.appendChild(tr)
        
    })
    tabelaWBI.style.display = 'block'
}


async function  setarWBIAlterar(id){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    let formEdicaoWBI = document.getElementById('formEdicaoWBI')
    formEdicaoWBI.reset() 

    let dadosbusca = await buscarWBI(id)
    let dados = dadosbusca[0]
    
    formEdicaoWBI.id.value = id
    formEdicaoWBI.nome.value = dados.nome
    formEdicaoWBI.titulo.value = dados.titulo
    formEdicaoWBI.width.value = dados.width
    formEdicaoWBI.height.value = dados.height
    formEdicaoWBI.dados.value = dados.dados
    formEdicaoWBI.options.value = dados.options
    formEdicaoWBI.modulo.value = dados.modulo
    formEdicaoWBI.chartType.value = dados.chartType
}

function limpartabela(){
    let tbody = document.getElementById('corpoTabela')
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
    //document.getElementById('tabelawbis').style.display = 'none'
}

document.getElementById("pesquisaWBI").addEventListener("input", ()=>{
    limpartabela()
    preencherTabela(document.getElementById("pesquisaWBI").value)
});



let gravar = document.getElementById('gravar')

gravar.addEventListener('click',async(event)=>{
    event.preventDefault()
    let nome = document.getElementById('nome').value
    let titulo   = document.getElementById('titulo').value
    let dados  = document.getElementById('dados').value
    let width = document.getElementById('width').value
    let height = document.getElementById('height').value
    let chartType = document.getElementById('chartType').value
    let modulo = document.getElementById('modulo').value
    let options = document.getElementById('options').value
    
    let divMsg  = document.getElementById('divMsg')

    let retorno

    nome  = nome.trim()
    titulo = titulo.trim()
    dados = dados.trim()
    width = width.trim()
    height = height.trim()
    chartType = chartType.trim()
    modulo = modulo.trim()
    options = options.trim()

    if(nome != '' && nome != undefined ){
        if(titulo != '' && titulo != undefined ){
                //document.getElementById('formwbi').submit()
                try {
                     retorno = await axios.post(`http://${host}/wbi/incluir`,{nome, titulo, dados, width, height, chartType, options,modulo})
                
                } catch (error) {
                    divMsg.innerText='[ctrlWBI!]. Erro ao cadastrar indicador: ', error;
                }
                
               
                if(retorno.data!='Duplicado'){
                    M.toast({html: `<span class='blue red-4' >Registro ${retorno.data[0]} incluído com sucesso</span>`, classes: 'rounded'});
                    limpartabela()
                    preencherTabela(retorno.data[0])
                   
                    $('#modalIncluir').modal('hide')
                }else{
                    divMsg.innerText=`WBI ${nome} Já Cadastrado.`
                    M.toast({html: `<span class='blue red-dark-4' >WBI ${nome}, já esta cadastrado.</span>`, classes: 'rounded'});
                }
        }else{
            divMsg.innerText='Título deve ser informado.'
        }
    }else{
        divMsg.innerText='Nome deve ser informado.'
    }
})

function limparFormulario(){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    document.getElementById('formWBI').reset() 
}

async function deletarWBI(id){
    let retorno = await axios.delete(`http://${host}/wbi/delete/${id}`)
    .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
   
    if(retorno==1){
        M.toast({html: `<span class='blue red-4' >Registro ${id} deletado com sucesso</span>`, classes: 'rounded'});
        limpartabela()
        preencherTabela()
    }else{
        M.toast({html: `<span class='blue red-4' >${retorno}</span>`, classes: 'rounded'});
    }
    
}


async function alteracaoWBI(){
      let formEdicaoWBI = document.getElementById('formEdicaoWBI')
      let id      = formEdicaoWBI.id.value
      let nome    = formEdicaoWBI.nome.value 
      let titulo  = formEdicaoWBI.titulo.value 
      let width   = formEdicaoWBI.width.value 
      let height  = formEdicaoWBI.height.value 
      let dados   = formEdicaoWBI.dados.value 
      let options = formEdicaoWBI.options.value 
      let chartType = formEdicaoWBI.chartType.value 
      let modulo    = formEdicaoWBI.modulo.value 
    
    let wbi ={
        id: id,
       nome: nome,
       titulo: titulo, 
       dados: dados,
       width : width,
       height : height,
       chartType: chartType,
       modulo: modulo,
       options : options
    }

   
     let retorno = await axios.post(`http://${host}/wbi/alterar`, wbi)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    
    if(retorno==1){
        
        // document.getElementById(`edicaoUsuario${id}`).checked=edicao
        M.toast({html: `<span class='blue red-4' >Registro ${id} Alterado com sucesso</span>`, classes: 'rounded'});
        
        
        
        $('#modalEditar').modal('hide')
        limpartabela()
        preencherTabela(id)
         
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelaUsuarios(id)
    }
    
}

async function listaWBIUsuario (id, nome){
     
    const ListaUsuarios = document.getElementById('ListaUsuarios')
    let label = document.getElementById('labelWbi')
    label.innerHTML =  `<span>${id} - ${nome}</span>`
    document.getElementById('idUWind').value = id
    
    sairPainelUW()

    while (ListaUsuarios.childElementCount >0) {
        ListaUsuarios.removeChild(ListaUsuarios.children[0])
    }

    
    let retorno = await axios.get(`http://${host}/uwind/${id}`)
    .then(response => response.data)
    .catch( (error)=> {
        throw error.response.data
    })
   console.log('retorno: ', retorno)
  
    if(retorno.length > 0){
         
        retorno.forEach(uw => {
            const p = document.createElement('p')
            
            let ckd =''
             if(uw.checkd ){ckd = 'checked'}
            p.innerHTML = `
                            <label class="eUsuario">
                                <input id=ckd${uw.id_usuario} type="checkbox" class="filled-in" ${ckd}  onclick="vinculoUW(${uw.iduw} , ckd${uw.id_usuario}, ${uw.id_usuario}, ${id}, '${nome}' )"/>
                                <span>${uw.usuario}</span>
                                <input type='hidden' id="uw${uw.id_usuario}" value="${uw.iduw}">
                                <input type='hidden' id="user${uw.id_usuario}" value="${uw.usuario}">
                            </label>
                            
                        `
                        ListaUsuarios.appendChild(p)
        })
        
    }else{
        M.toast({html: `<span class='purple darken-4 text-blue-dark-4' >Não há WBI para esse usuario. </span>`,  classes: 'rounded'});
    }
}


async function alterarUW(id, op){
    let uwbi = {
    }
    uwbi.id = id
  
    switch (op) {
        case 1:
           let incluir = document.getElementById(`incluirwbi${id}`).checked
           uwbi.incluir = incluir
            break;
        case 2:
            let editar = document.getElementById(`editarwbi${id}`).checked
           uwbi.editar = editar
        break;
        case 3:
            let excluir = document.getElementById(`excluirwbi${id}`).checked
            uwbi.excluir = excluir
                break;
        default:
            break;
    }
   

     let retorno = await axios.put(`http://${host}/uw/alterar`, uwbi)
     .then(response => response.data)
     .catch((error) => {
      throw error.response.data
    })
   
    if(retorno==1){
        // document.getElementById(`edicaoUsuario${id}`).checked=edicao
        M.toast({html: `<span class='blue red-4' >Registro ${id} Alterado com sucesso</span>`, classes: 'rounded'});
        // limpartabela()
        // preencherTabelaUsuarios(id)
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelaUsuarios(id)
    }
    
}

function sairPainelUW(){
    let conteudoUW = document.getElementById('conteudoUW')
    let tabelaUW =document.getElementById('tabelaUW') 

    conteudoUW.style.display = 'none'
    tabelaUW.style.display = 'none'
}


async function gravarUW(id, iduser){
    let retorno

        let usuarios = {
                id_indicador: parseInt(id),
                id_usuario: iduser
            }
             retorno = await axios.put(`http://${host}/uw/gravarUsuarios`, usuarios)
            .then(response => response.data)
            .catch((error) => {
            throw error.response.data
            
        })
           
            if(retorno){
                // document.getElementById(`edicaoUsuario${id}`).checked=edicao
                M.toast({html: `<span class='blue red-4' >Indicador vinculado ao usuário, ${iduser}  com sucesso</span>`, classes: 'rounded'});
                // limpartabela()
                // preencherTabelaUsuarios(id)
            }else{
                M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao vincular indicador ao usuário, ${iduser}. Verifique </span>`, classes: 'rounded'});
            // limpartabela()
            // preencherTabelaUsuarios(id) 
            }
  
}

async function deletaruW(id){

    let retorno

        let iduw = parseInt(id)
       
        retorno = await axios.delete(`http://${host}/uw/delete/${iduw}`)
        .then(response => response.data)
        .catch((error) => {
        throw error.response.data
   })

    if(retorno==1){
        // document.getElementById(`edicaoUsuario${id}`).checked=edicao
        M.toast({html: `<span class='blue red-4' >Retirado vinculo do indicador ao usuário ${id}  com sucesso</span>`, classes: 'rounded'});
        // limpartabela()
        // preencherTabelaUsuarios(id)
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Vincular Indicador ao Usuario ${id}. Verifique </span>`, classes: 'rounded'});
    // limpartabela()
    // preencherTabelaUsuarios(id)
    }

}

function vinculoUW(uw, el, induser, id, nome){
    
    let indicador = parseInt(document.getElementById('idUWind').value)
    let usuario = parseInt(induser)
    let iuw = parseInt(uw)
  
    if(el.checked){

        gravarUW(indicador, usuario)
    }else{

        if(iuw != 0){
            deletaruW(iuw)
        }else{
            console.log('Esta tentando excluir um registro inexistente. Informe ao Administrador!!!')
        }

        
    }
    listaWBIUsuario(id, nome)

}
