async function buscarRecolhimentoLD(busca){
    let dados
    
    console.log('busca antes: ', busca)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('Busca por código')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    console.log('busca?depois> ', busca)
    
        dados = await axios.get(`http://${host}/LD/Recolhimentos/api/recolhimento/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
        console.log('Resultado Busca Recolhimento: ', dados)
        return dados
}

async function buscarIDitemRecolhimentoLD(busca){
    let dados
    
    console.log('busca antes: ', busca)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('Busca por código')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    console.log('busca?depois> ', busca)
    
        dados = await axios.get(`http://${host}/LD/Recolhimentos/api/ItemRecolhimento/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function buscarDadosItemRecolhimentoLD(busca){
    let dados
    
    console.log('busca antes: ', busca)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('Busca por código')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    console.log('busca?depois> ', busca)
    
        dados = await axios.get(`http://${host}/LD/Recolhimentos/api/DadosItemRecolhimento/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}


async function verificaItensRecolhidos(busca){
    dados = await axios.get(`http://${host}/LD/Recolhimentos/api/ItemRecolhimento/buscaAutoIncRecolhimento/${busca}`)
    .then(response => {
       
        return response.data
    })
    .catch(error => {
        console.log(error)
        return error            
    })

    dados.forEach(recolhimento => {
        let btn = document.getElementById(`${recolhimento.autoinc_pedido}`)
        btn.setAttribute('class','btn btn-success')
        btn.innerHTML= '<i class="material-icons">done</i>'
        btn.disabled = true
    });
}

async function buscarOCLD(busca){
    let dados
    
    console.log('busca antes: ', busca)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('Busca por código')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    console.log('busca?depois> ', busca)
    
        dados = await axios.get(`http://${host}/LD/Recolhimentos/api/oc/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function preencherTabelaRecolhimento(busca){
    const tabelaRecolhimento = document.getElementById('tabelaRecolhimento')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarRecolhimentoLD(busca)
    sairPainelRecolhimento()
    document.getElementById('captionTabela').innerHTML = ''
    
    if(dados.length > 0){
    document.getElementById('captionTabela').innerHTML = `<div>Recolhimento: ${dados[0].recolhimento}</div> Cliente: ${dados[0].cod_cliente} - ${dados[0].razao_cliente} `

    dados.forEach(recolhimento => {
            const tr = document.createElement(`tr`)
            tr.setAttribute('id',recolhimento.pedido)
            tr.innerHTML = `<td nowrap="true"><button type="button" class="btn btn-warning" onclick='reselecao(${recolhimento.autoinc_pedido})' id=${recolhimento.autoinc_pedido}><i class="material-icons">add</i></button></td>
                            <td nowrap="true">${recolhimento.pedido}</td>
                            <td nowrap="true">${recolhimento.cod_analitico}</td>
                            <td nowrap="true">${recolhimento.desc_item}</td>
                            <td nowrap="true">${recolhimento.desc_variacao}</td>
                            <td nowrap="true">${recolhimento.desc_acabamento}</td>
                            <td nowrap="true">${recolhimento.quantidade}</td>
                            <td nowrap="true">${recolhimento.cod_motivo}</td>
                            <td nowrap="true">${recolhimento.desc_motivo}</td>
                            `
                        
            corpoTabela.appendChild(tr)
            
        })
        
        tabelaRecolhimento.style.display = 'block'
    }
    if(dados.length == 0){

        document.getElementById('tabelaRecolhimento').style.display = "none"
        M.toast({html: `<span class='blue red-dark-4' >Recolhimento: ${busca} não localizado.</span>`, classes: 'rounded'});
    }
   verificaItensRecolhidos(busca)
}

async function preencherTabelaItensRecolhidos(busca){
    const tabelaRecolhimento = document.getElementById('tabelaRecolhimento')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarIDitemRecolhimentoLD(busca)
    sairPainelRecolhimento()
    document.getElementById('captionTabela').innerHTML = ''
    
    if(dados.length > 0){
    document.getElementById('captionTabela').innerHTML = `<div>Recolhimento: ${dados[0].recolhimento}</div> Cliente: ${dados[0].cod_cliente} - ${dados[0].razao_cliente} `

    dados.forEach(recolhimento => {
            const tr = document.createElement(`tr`)
            tr.setAttribute('id',recolhimento.pedido)
            tr.innerHTML = `<form>
                            <td nowrap="true">
                               
                                <input class="" type="radio" value=""> <input type="radio" id="html" name="fav_language" value="HTML">
                                </td><form>
                            <td nowrap="true">${recolhimento.pedido}</td>
                            <td nowrap="true">${recolhimento.cod_analitico}</td>
                            <td nowrap="true">${recolhimento.desc_item}</td>
                            <td nowrap="true">${recolhimento.desc_variacao}</td>
                            <td nowrap="true">${recolhimento.desc_acabamento}</td>
                            <td nowrap="true">${recolhimento.quantidade}</td>
                            <td nowrap="true">${recolhimento.cod_motivo}</td>
                            <td nowrap="true">${recolhimento.desc_motivo}</td>
                            <td nowrap="true"><button type="button" class="btn btn-dark" onclick='deletarRecolhimento(${recolhimento.autoinc_pedido}, ${recolhimento.recolhimento})' id=${recolhimento.autoinc_pedido}><i class="material-icons">delete</i></button></td>
                            `
                        
            corpoTabela.appendChild(tr)
            
        })
        
        tabelaRecolhimento.style.display = 'block'
    }
    if(dados.length == 0){

        document.getElementById('tabelaRecolhimento').style.display = "none"
        M.toast({html: `<span class='blue red-dark-4' >Recolhimento: ${busca} não localizado.</span>`, classes: 'rounded'});
    }
   
}

function reselecao(id){
   let btn = document.getElementById(`${id}`);
   if(btn.className == 'btn btn-warning'){
       btn.setAttribute('class','btn btn-success')
       btn.innerHTML= '<i class="material-icons">done</i>'
   }else{
    btn.setAttribute('class','btn btn-warning')
    btn.innerHTML= '<i class="material-icons">add</i>'
   }
}

 async function  incluirRecolhimento(){
    let itens = document.getElementsByClassName('btn btn-success');
    let recolhimento 
    if (itens.length > 0 ){
        for (let i = 0; i < itens.length; i++) {
            console.log('Verificando itens[i].id',itens[i].id)
            let existe = await verificarItemCadastrado(itens[i].id)
           
            if(!existe)
            {
                let retorno = await buscarDadosItemRecolhimentoLD(itens[i].id)
                let dados = retorno[0]
                recolhimento = dados.recolhimento
                await axios.post(`http://${host}/LD/Recolhimentos/Incluir`,dados)
                                        .then(response => {
                                            if(response.data){
                                                divMsg.innerText='Incluido com sucesso. '
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error)
                                            return error            
                                        })
                                        console.log('cadastrou')
            }else{ M.toast({html: `<span class='blue red-dark-4' >Sem novos Itens para incluir.`, classes: 'rounded'});}

          } 
    }else{
        M.toast({html: `<span class='blue red-dark-4' >Nenhum item selecionado.`, classes: 'rounded'});
    }
    pesquisarRecolhimento(recolhimento)
    
}

async function verificarItemCadastrado(id){
    let autoinc = await axios.get(`http://${host}/LD/Recolhimentos/api/ItemRecolhimento/Verifica/${id}`)
                                    .then(response => {
                                    
                                        return response.data
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        return error            
                                    })
    if (autoinc){
        console.log('já cadastrado',autoinc)
        return true
    }else{
        console.debug('Não cadastrado',autoinc)
        return false
    }

}

function setarRecolhimentoAlterar(id,recolhimento){
    let idAlterar = document.getElementById('idRecolhimentoAlterar')
    let recolhimentoAlterar = document.getElementById('descricaoAlteracao')
    recolhimentoAlterar.value = recolhimento
    idAlterar.value = id;
}

function limpartabela(){
    let tbody = document.getElementById('corpoTabela')
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
   
}

let gravar = document.getElementById('gravar')

gravar.addEventListener('click',async(event)=>{
    event.preventDefault()
    let descricao   = document.getElementById('descricao').value
   
    let divMsg  = document.getElementById('divMsg')

    let retorno


    descricao = descricao.trim()


    if(descricao != '' && descricao != undefined ){

                //document.getElementById('formRecolhimento').submit()
                retorno = await axios.post(`http://${host}/LD/Recolhimento/Incluir`,{descricao})
                console.log('retorno: ', retorno.data)
                if(retorno.data!='Duplicado'){
                    M.toast({html: `<span class='blue red-4' >Registro ${retorno.data[0]} incluído com sucesso</span>`, classes: 'rounded'});
                    limpartabela()
                    preencherTabelaRecolhimento(retorno.data[0])
                   
                    $('#modalIncluir').modal('hide')
                }else{
                    divMsg.innerText=`Base de dados já possui o Recolhimento: ${descricao}.`
                    M.toast({html: `<span class='blue red-dark-4' >Base de dados já possui o Recolhimento: ${descricao}.</span>`, classes: 'rounded'});
                }
        }else{
            divMsg.innerText='Descrição deve ser informado.'
        }
    
})

//Verifica se o código de recolhimento foi informando. Caso tenha sido informado aciona a função busca com o código. 
 function pesquisarRecolhimento (){
    limpartabela()
    let codRecolhimento   = document.getElementById('codRecolhimento').value
    codRecolhimento = codRecolhimento.trim()
    if(codRecolhimento != '' && codRecolhimento != undefined ){
        preencherTabelaRecolhimento(codRecolhimento)
        
    }else{
        M.toast({html: `<span class='blue red-4' >Código de recolhimento não informado. </span>`, classes: 'rounded'});
        document.getElementById('tabelaRecolhimento').style.display = "none"
        document.getElementById('captionTabela').innerHTML = ''
    }
}
function pesquisarItensRecolhimento (){
    limpartabela()
    let codRecolhimento   = document.getElementById('codRecolhimento').value
    codRecolhimento = codRecolhimento.trim()
    if(codRecolhimento != '' && codRecolhimento != undefined ){
        preencherTabelaItensRecolhidos(codRecolhimento)
        
    }else{
        M.toast({html: `<span class='blue red-4' >Código de recolhimento não informado. </span>`, classes: 'rounded'});
        document.getElementById('tabelaRecolhimento').style.display = "none"
        document.getElementById('captionTabela').innerHTML = ''
    }
}


function limparFormulario(){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    document.getElementById('formRecolhimento').reset() 
}

async function deletarRecolhimento(id, recolhimento){
    let retorno = await axios.delete(`http://${host}/LD/Recolhimento/Delete/${id}`)
    .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno deletar: ', retorno)
    if(retorno==1){
        M.toast({html: `<span class='blue red-4' >Registro deletado com sucesso</span>`, classes: 'rounded'});
        limpartabela()
        preencherTabelaItensRecolhidos(recolhimento)
    }else{
        M.toast({html: `<span class='blue red-4' >${retorno}</span>`, classes: 'rounded'});
    }
    
}


async function alteracaoRecolhimento(){
    
    let descricao = document.getElementById('descricaoAlteracao').value
    let idRecolhimento = document.getElementById('idRecolhimentoAlterar').value
    
    let recolhimento ={
        id: idRecolhimento,
        descricao: descricao
    }
    console.log('alteração Recolhimento: ', descricao)
     let retorno = await axios.post(`http://${host}/LD/Recolhimento/Alterar`, recolhimento)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno da alteração: ', retorno)
    if(retorno==1){
        $('#modalAlterar').modal('hide')
        M.toast({html: `<span class='blue red-4' >Registro ${idRecolhimento} Alterado com sucesso</span>`, classes: 'rounded'});
         limpartabela()
         preencherTabelaRecolhimento(idRecolhimento)
     
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${idRecolhimento}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelaRecolhimento(id)
    }
    
}


function sairPainelRecolhimento(){
    // let conteudoRecolhimento = document.getElementById('conteudoRecolhimento')
    let tabelaRecolhimento =document.getElementById('tabelaRecolhimento') 

    // conteudoRecolhimento.style.display = 'none'
    tabelaRecolhimento.style.display = 'none'
}


