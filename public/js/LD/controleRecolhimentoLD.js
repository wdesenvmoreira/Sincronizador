// const { consultaRecolhimento } = require("../../../controller/LD/controllerRecolhimentoLD")

async function buscarRecolhimentoLD(busca, tipo){
    let dados
    
   
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){

       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    
        dados = await axios.get(`http://${host}/LD/Recolhimentos/api/recolhimento/${busca}&${tipo}`)
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

async function buscarIDitemRecolhimentoLD(busca, codProduto){
    let dados
    let status =[0,0,0,0]
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){

       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'V'
        }
    }
    if(codProduto/1 || codProduto==0 && !codProduto.match(/^(\s)+$/) && codProduto !=''){

        codProduto = codProduto
    }else{
    
         if(codProduto == '' || codProduto == undefined ||codProduto.match(/^(\s)+$/)){
            codProduto = 'V'
         }
     }

    if(document.getElementById('st_aguardando').checked)
        status[0]= 1

    if(document.getElementById('st_concertando').checked)
        status[1] = 2

    if(document.getElementById('st_emestoque').checked)
        status[2] = 3

    if(document.getElementById('st_descartado').checked)
        status[3] = 4

    console.log('status: ', status)

        dados = await axios.get(`http://${host}/LD/Recolhimentos/api/ItemRecolhimento/${busca}&${codProduto}&${status}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function buscarDadosItemRecolhimentoLD(busca, tipo){
    let dados
    

    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){

       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }

    
        dados = await axios.get(`http://${host}/LD/Recolhimentos/api/DadosItemRecolhimento/${busca}&${tipo}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
        console.log('buscarDadosItemRecolhimento',busca, dados)
        return dados
}


async function verificaItensRecolhidos(busca){
    let tipo = document.getElementById(`inc+${busca}`)
    dados = await axios.get(`http://${host}/LD/Recolhimentos/api/ItemRecolhimento/buscaAutoIncRecolhimento/${busca}&${tipo}`)
    .then(response => {
       
        return response.data
    })
    .catch(error => {
        console.log(error)
        return error            
    })
console.log('verificaItensRecolhidos: ','item: ', busca, 'dados:',  dados)
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

async function preencherTabelaRecolhimento(busca, tipo){
    const tabelaRecolhimento = document.getElementById('tabelaRecolhimento')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarRecolhimentoLD(busca, tipo)
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
                            <td nowrap="true"><input type='hidden' id=inc${recolhimento.autoinc_pedido} value=${recolhimento.tipo_rec}>${recolhimento.tipo_rec==10?'<B>D</B>': '<B>R</B>'}</td>
                            `
                        
            corpoTabela.appendChild(tr)
            
        })
        
        tabelaRecolhimento.style.display = 'block'
    }
    if(dados.length == 0){

        document.getElementById('tabelaRecolhimento').style.display = "none"
        M.toast({html: `<span class='blue red-dark-4' >Documento: ${busca} não localizado.</span>`, classes: 'rounded'});
    }
   verificaItensRecolhidos(busca)
}

async function preencherTabelaItensRecolhidos(busca, codProduto){
    const tabelaRecolhimento = document.getElementById('tabelaRecolhimento')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarIDitemRecolhimentoLD(busca,codProduto)
    sairPainelRecolhimento()
    document.getElementById('captionTabela').innerHTML = ''
    
    if(dados.length > 0){
    // document.getElementById('captionTabela').innerHTML = `<div>Recolhimento: ${dados[0].recolhimento}</div> Cliente: ${dados[0].cod_cliente} - ${dados[0].razao_cliente} `

    dados.forEach(recolhimento => {

            let coraguardo      = 'grey-text text-lighten-2'
            let corestoque      = 'grey-text text-lighten-2'
            let corconcertando  = 'grey-text text-lighten-2'
            let cordescarte     = 'grey-text text-lighten-2'

            if(recolhimento.status == 1){
                coraguardo      = 'yellow-text text-lighten-3'
            }
            if(recolhimento.status == 2){
                corconcertando  = 'green-text text-accent-3'
            }
            if(recolhimento.status == 3){
                corestoque      = 'brown-text text-lighten-2'
                
            }
            if(recolhimento.status == 4){
                cordescarte      = 'orange-text  text-darken-1'
                
            }

            const tr = document.createElement(`tr`)
            tr.setAttribute('id',recolhimento.pedido)
            tr.innerHTML = `
                            <td class="z-depth-1 subIcon" id="col1${recolhimento.autoinc_pedido}" onclick="setarStatus(${recolhimento.autoinc_pedido}, 1, ia${recolhimento.autoinc_pedido})"><i id="ia${recolhimento.autoinc_pedido}" class="material-icons ${coraguardo}">      pending               </i></td>
                            <td class="z-depth-1 subIcon" id="col2${recolhimento.autoinc_pedido}" onclick="setarStatus(${recolhimento.autoinc_pedido}, 2, ic${recolhimento.autoinc_pedido})"><a ><i id="ic${recolhimento.autoinc_pedido}" class="material-icons ${corconcertando}" > published_with_changes</i></a></td>
                            <td class="z-depth-1 subIcon" id="col3${recolhimento.autoinc_pedido}" onclick="setarStatus(${recolhimento.autoinc_pedido}, 3, ie${recolhimento.autoinc_pedido})"><a ><i id="ie${recolhimento.autoinc_pedido}" class="material-icons ${corestoque}">      view_in_ar            </i></a></td>
                            <td nowrap="true">${recolhimento.recolhimento}</td>
                            <td nowrap="true" onmouseout="esconderInfoCli(${recolhimento.autoinc_pedido})"   onclick="mostrarInfCli(${recolhimento.autoinc_pedido})">${recolhimento.pedido}<p id="infoCli${recolhimento.autoinc_pedido}" class="z-depth-2 infocli" id="1">CLiente: ${recolhimento.cod_cliente} : ${recolhimento.razao_cliente}</p></td>
                            <td nowrap="true"><input type="hidden" id=tp${recolhimento.pedido} value=${recolhimento.tipo_rec}>${recolhimento.tipo_rec==10?'<B>D</B>': '<B>R</B>'}</td>
                            <td nowrap="true">${recolhimento.cod_analitico}</td>
                            <td nowrap="true">${recolhimento.desc_item}</td>
                            <td nowrap="true">${recolhimento.desc_variacao}</td>
                            <td nowrap="true">${recolhimento.desc_acabamento}</td>
                            <td nowrap="true">${recolhimento.quantidade}</td>
                            <td nowrap="true">${recolhimento.desc_motivo}</td>
                            <td class="z-depth-1 subIcon" id="col4${recolhimento.autoinc_pedido}" onclick="setarStatus(${recolhimento.autoinc_pedido}, 4, id${recolhimento.autoinc_pedido})"><a ><i id="id${recolhimento.autoinc_pedido}" class="material-icons ${cordescarte}">remove_shopping_cart</i></a></td>
                            <td nowrap="true"><button type="button" class="btn btn-dark" onclick='deletarRecolhimento(${recolhimento.autoinc_pedido}, ${recolhimento.recolhimento})' id=${recolhimento.autoinc_pedido}><i class="material-icons">delete</i></button></td>
                            
                            `
                        
            corpoTabela.appendChild(tr)
            if(recolhimento.status == 3){
                document.getElementById(`col1${recolhimento.autoinc_pedido}`).disabled = true;
                document.getElementById(`col2${recolhimento.autoinc_pedido}`).disabled = true;
                
            }
            if(recolhimento.status == 4){
                document.getElementById(`col1${recolhimento.autoinc_pedido}`).disabled = true;
                document.getElementById(`col2${recolhimento.autoinc_pedido}`).disabled = true;
                document.getElementById(`col3${recolhimento.autoinc_pedido}`).disabled = true;
                
            }
        })
        
        tabelaRecolhimento.style.display = 'block'
    }
    if(dados.length == 0){

        document.getElementById('tabelaRecolhimento').style.display = "none"
        M.toast({html: `<span class='blue red-dark-4' >Documento: ${busca} não localizado.</span>`, classes: 'rounded'});
    }
   
}
function mostrarInfCli(id){
    document.getElementById(`infoCli${id}`).style.display = "block"
}
function esconderInfoCli(id){
    document.getElementById(`infoCli${id}`).style.display = "none"
}

async function setarStatus(autoinc, novostatus, e){


     let retorno = await axios.get(`http://${host}/LD/Recolhimento/api/Alterar/Status/${autoinc}&${novostatus}`)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })

    let inativa = 'material-icons grey-text text-lighten-2'
   
    if(retorno==1){
        document.getElementById(`ia${autoinc}`).setAttribute('class', inativa )
        document.getElementById(`ic${autoinc}`).setAttribute('class', inativa )
        document.getElementById(`ie${autoinc}`).setAttribute('class', inativa )
        document.getElementById(`id${autoinc}`).setAttribute('class', inativa )
        
        if(novostatus == 1){
            document.getElementById(`ia${autoinc}`).setAttribute('class', 'material-icons  yellow-text text-lighten-3' )
        }
        if(novostatus == 2){
            document.getElementById(`ic${autoinc}`).setAttribute('class', 'material-icons  green-text text-accent-3' )
        }
        if(novostatus == 3){
            document.getElementById(`ie${autoinc}`).setAttribute('class', 'material-icons  brown-text text-lighten-2' )
            document.getElementById(`col1${autoinc}`).disabled = true;
            document.getElementById(`col2${autoinc}`).disabled = true;
        }
        if(novostatus == 4){
            if(confirm('Confirma descartar este item?')){
                document.getElementById(`id${autoinc}`).setAttribute('class', 'material-icons orange-text  text-darken-1' )
                document.getElementById(`col1${autoinc}`).disabled = true;
                document.getElementById(`col2${autoinc}`).disabled = true;
                document.getElementById(`col3${autoinc}`).disabled = true;
            }

        }
     
    }else{
        M.toast({html: `<span class='blue red-dark-4' >Erro ao alterar Status do item.`, classes: 'rounded'});
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
            let id = itens[i].id
            console.log('id: ', id)
            let tipo = document.getElementById('inc'+id).value
            console.log('Verificando itens[i].id',itens[i].id, 'tipo: ', tipo)
            let existe = await verificarItemCadastrado(itens[i].id,tipo)
           
            if(!existe)
            {
                let retorno = await buscarDadosItemRecolhimentoLD(itens[i].id, tipo)
                let dados = retorno[0]
                console.log('dados: ', dados)
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
                    window.location.href = `http://${host}/LD/Recolhimentos`;
          } 
    }else{
        M.toast({html: `<span class='blue red-dark-4' >Nenhum item selecionado.`, classes: 'rounded'});
    }
    // pesquisarRecolhimento(recolhimento)
    
    
}
async function  incluirRecolhimentAvulso(){
    let item = document.getElementById('itemAvulso').value;
    let desc_item = document.getElementById('desc_itemAvulso').value;
    let variacao = document.getElementById('variacao').value;
    let desc_variacao = document.getElementById('desc_variacao').value;
    let acabamento = document.getElementById('acabamento').value;
    let desc_acabamento = document.getElementById('desc_acabamento').value;
    let cod_motivo = document.getElementById('cod_motivo').value;
    let desc_motivo = document.getElementById('desc_motivo').value;
    let quantidade = document.getElementById('quantidade').value;
    let observacao = document.getElementById('observacao').value;
    let validado = false;
    
    if(item == '' || item == undefined ||item.match(/^(\s)+$/)){
        M.toast({html: `<span class='blue red-dark-4' >Informe um código de ITEM.`, classes: 'rounded'});
    }else{
            if(variacao == '' || variacao == undefined ||variacao.match(/^(\s)+$/)){
                M.toast({html: `<span class='blue red-dark-4' >Informe um código de VARIAÇÃO`, classes: 'rounded'});
            }else{
                if(acabamento == '' || acabamento == undefined ||acabamento.match(/^(\s)+$/)){
                    M.toast({html: `<span class='blue red-dark-4' >Informe um código de ACABAMENTO`, classes: 'rounded'});
                }else{
                    if(quantidade == 0 || quantidade == '' || quantidade == undefined ||quantidade.match(/^(\s)+$/)){
                        M.toast({html: `<span class='blue red-dark-4' >Informe um valor para QUANTIDADE`, classes: 'rounded'});
                    }else{
                        validado = true
                    } 
                } 
            } 
        }
    //Precisa validar item, variação, acabameno, motivo, quantidade
    //Buscar as descrições de item, variação, acabamento, motivo
    //Gerar o código analítico

    if (validado){
                let cod_analitico = item + '.' + variacao + '.' + acabamento;
                let today = new Date();
                let entrada = formatDate(today, 'mm/dd/aa');
                console.log('entrada: ', entrada)
                console.log("quantidade: ", quantidade)
                let dados = {
                    "pedido": 0,
                    "recolhimento":0,
                    "tipo_rec": 0,
                    "cod_cliente":0,
                    "razao_cliente":"Avulso",
                    "autoinc_pedido": 0,
                    "cod_item": item,
                    "desc_item": desc_item,
                    "cod_variacao":variacao,
                    "desc_variacao": desc_variacao,
                    "cod_acabamento": acabamento,
                    "desc_acabamento": desc_acabamento,
                    "cod_analitico": cod_analitico,
                    "oc": "",
                    "quantidade": quantidade,
                    "cod_motivo": cod_motivo,
                    "desc_motivo": desc_motivo,
                    "observacao": observacao,
                    "entrada": entrada,
                    "status": 1
                }
                console.log('dados: ', dados)
               
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
            
                    //window.location.href = `http://${host}/LD/Recolhimentos`;
          
    }else{
        M.toast({html: `<span class='blue red-dark-4' >Nenhum item selecionado.`, classes: 'rounded'});
    }
    // pesquisarRecolhimento(recolhimento)
    
    
}
function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        aa: date.getFullYear().toString().slice(-2),
        aaaa: date.getFullYear()
    }

    return format.replace(/mm|dd|aa|aaaa/gi, matched => map[matched])
}

async function verificarItemCadastrado(id,tipo){
    let autoinc = await axios.get(`http://${host}/LD/Recolhimentos/api/ItemRecolhimento/Verifica/${id}&${tipo}`)
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
//Informa a descrição da Variação no campo variação. Pegando diretamente da base de dados da Tek.
let edVariacao = document.getElementById('variacao')

edVariacao.addEventListener('focusout',async(event)=>{
    event.preventDefault()
    let dados
    let id = edVariacao.value;
    console.log('id: ', id)
    console.log('this.id', this.value)
    if(id/1 || id==0 ){
        
        dados = await axios.get(`http://${host}/LD/variacao/${id}`);
        console.log('retorno da variação: ', dados.data)
        document.getElementById('desc_variacao').value = dados.data.DESCRICAO_VARIACAO;
    }else{
        document.getElementById('desc_variacao').value = '';
        M.toast({html: `<span class='blue red-dark-4' >Código precisa ser um número válido.</span>`, classes: 'rounded'});
        edVariacao.focus()
        edVariacao.select()
    }
    
})
//Informa a descrição do acabamento no campo de descrição acabamento. Dados extraido diretamente do banco da tek 
let edAcabamento = document.getElementById('acabamento')

edAcabamento.addEventListener('focusout',async(event)=>{
    event.preventDefault()
    let dados
    let id = edAcabamento.value;
    if(id/1 || id==0 ){
        console.log('id: ', id)
        dados = await axios.get(`http://${host}/LD/acabamento/${id}`);
        console.log('retorno da acabamento: ', dados.data)
        document.getElementById('desc_acabamento').value = dados.data.DESCRICAO_ACABAMENTO;
    }else{
        document.getElementById('desc_acabamento').value = '';
        M.toast({html: `<span class='blue red-dark-4' >Código precisa ser um número válido.</span>`, classes: 'rounded'});
        edVariacao.focus()
        edVariacao.select()
    }
    
})

//Informa a descrição do Item no campo de descrição Item. Dados extraido diretamente do banco da tek 
let edItem= document.getElementById('itemAvulso')

edItem.addEventListener('focusout',async(event)=>{
    event.preventDefault()
    let dados
    let id = edItem.value;
    if(id/1 || id==0 ){
        console.log('id: ', id)
        dados = await axios.get(`http://${host}/LD/item/${id}`);
        console.log('retorno da Item: ', dados.data)
        document.getElementById('desc_itemAvulso').value = dados.data.DESCRICAO_ITEM;
    }else{
        document.getElementById('desc_itemAvulso').value = '';
        M.toast({html: `<span class='blue red-dark-4' >Código precisa ser um número válido.</span>`, classes: 'rounded'});
        edVariacao.focus()
        edVariacao.select()
    }
    
})

//Informa a descrição do Motivo no campo de descrição Motivo. Dados extraido diretamente do banco da tek 
let edMotivo= document.getElementById('cod_motivo')

edMotivo.addEventListener('focusout',async(event)=>{
    event.preventDefault()
    let dados
    let id = edMotivo.value;
    if(id/1 || id==0 ){
        console.log('id: ', id)
        dados = await axios.get(`http://${host}/LD/motivo/${id}`);
        console.log('retorno da Motivo: ', dados.data)
        document.getElementById('desc_motivo').value = dados.data.DESCRICAO_MOTIVO;
    }else{
        document.getElementById('desc_motivo').value = '';
        M.toast({html: `<span class='blue red-dark-4' >Código precisa ser um número válido.</span>`, classes: 'rounded'});
        edVariacao.focus()
        edVariacao.select()
    }
    
})

//Verifica se o código de recolhimento foi informando. Caso tenha sido informado aciona a função busca com o código. 
 function pesquisarRecolhimento (){
    limpartabela()
    let codRecolhimento   = document.getElementById('codRecolhimento').value
    let tiposDocumento = document.getElementsByName('tipoDocumento')
    let tipo =''
    
    for (let index = 0; index < tiposDocumento.length; index++) {
        
        if(tiposDocumento[index].checked){
            tipo = tiposDocumento[index].value
        }
        
    }

    codRecolhimento = codRecolhimento.trim()
    if(codRecolhimento != '' && codRecolhimento != undefined ){

        preencherTabelaRecolhimento(codRecolhimento, tipo)
        
    }else{
        M.toast({html: `<span class='blue red-4' >Código de Documento não informado. </span>`, classes: 'rounded'});
        document.getElementById('tabelaRecolhimento').style.display = "none"
        document.getElementById('captionTabela').innerHTML = ''
    }
}
function pesquisarItensRecolhimento (){
    limpartabela()
    let codRecolhimento   = document.getElementById('codRecolhimento').value
    let codProduto   = document.getElementById('codProduto').value
    codRecolhimento = codRecolhimento.trim()
    preencherTabelaItensRecolhidos(codRecolhimento,codProduto)

}


function limparFormulario(){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    document.getElementById('formRecolhimento').reset() 
}

async function deletarRecolhimento(id, recolhimento){
    if(confirm('Tem certeza que deseja remover este item? ')){
        let retorno = await axios.delete(`http://${host}/LD/Recolhimento/Delete/${id}`)
        .then(response => response.data)
        .catch((error) => {
        throw error.response.data
        })
        console.log('retorno deletar: ', retorno)
        if(retorno==1){
            M.toast({html: `<span class='blue red-4' >Registro removido com sucesso</span>`, classes: 'rounded'});
            limpartabela()
            preencherTabelaItensRecolhidos(recolhimento)
        }else{
            M.toast({html: `<span class='blue red-4' >${retorno}</span>`, classes: 'rounded'});
        }
    }
    
    
}

function direcionar(end){
    window.location.href=`http://${host}${end}`
    console.log(`http://${host}/${end}`)
}

function sairPainelRecolhimento(){
    // let conteudoRecolhimento = document.getElementById('conteudoRecolhimento')
    let tabelaRecolhimento =document.getElementById('tabelaRecolhimento') 

    // conteudoRecolhimento.style.display = 'none'
    tabelaRecolhimento.style.display = 'none'
}

document.getElementById("codRecolhimento").focus()