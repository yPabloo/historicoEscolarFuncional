//ALUNO: PABLO ALVES FREIRE TURMA 04

//Criando lista para armazenar os dados dos inputs do HTML e das funções também
const array_ano = []
const array_codigo = []
const array_ch = []
const array_freq = []
const array_nota = []
const array_aprovacao = []
const array_reprovacao = []
const array_departamento =[]

//Função que recebe as informações dos inputs do HTML através do "button" 
//E assim, ajuda a formar as tabelas com os dados e serve como dados para outras funções aconteçam a partir dela.
const dadosPessoais = (ano,codigo,ch,freq,nota) => {
    const cargaH = document.getElementById("cargaH").value
    const periodo = document.getElementById("ano_periodo").value
    const note = document.getElementById("nota").value
    const frequencia = document.getElementById("frequencia").value
    const codig = document.getElementById("codigoDisciplina").value
    const dados = document.getElementById("tabInf")
    const numLinha = dados.rows.length
    const linha = dados.insertRow(numLinha)         
        
    const colunaAno = linha.insertCell(0)
    const colunaCodigo = linha.insertCell(1)
    const colunaCargaH = linha.insertCell(2)
    const colunaFreq = linha.insertCell(3)
    const colunaNota = linha.insertCell(4)
    //Adiciona os dados na tabela    
    colunaAno.innerHTML = ano
    colunaCodigo.innerHTML = codigo
    colunaCargaH.innerHTML = ch + "h"
    colunaFreq.innerHTML = freq + "%"
    colunaNota.innerHTML = nota
    //retorna as funções feitas abaixo com os dados passados pelos inputs.
    return dizerQuantPeriodo(periodo), mediaCH(cargaH), desvioP(note), aprovacao_reprovacao(note,codig,frequencia), mediaDepar(codig,note)
    
}

//Função com o objetivo de dizer a quantidade de períodos cursados pelo respectivo aluno que está no sita.
const dizerQuantPeriodo = (periodo) => {

    if (array_ano.indexOf(periodo) == -1) {
        array_ano.push(periodo)

    } else return

    document.getElementById('quantPeriodo').innerHTML = `${array_ano.length} período(s).`

}

//Função para calcular a média geral ponderada pela carga horária.
const mediaCH = (cargaHoraria) => {
    array_ch.push(cargaHoraria)
    listaTotal = array_ch.reduce((acc,x) => Number(acc)+Number(x),0)
    const divMedia = listaTotal / array_ch.length

    if (Number.isInteger(divMedia)) {
        document.getElementById('ponderadaCh').innerHTML = `${divMedia} horas.`
    } else {
        document.getElementById('poderadaCh').innerHTML = `${divMedia.toFixed(2)} horas.`
    }

    document.getElementById('chTotal').innerHTML = `${listaTotal} horas.`

}

//Função para calcular o desvio padrão da média geral.
const desvioP = (nota) => {
    array_nota.push(nota)
    const somaNotas = array_nota.reduce((acc, x) => acc + x,0)
    const media = somaNotas / array_nota.length
    const primeiroPasso = array_nota.map((x) => x - media)
    const segundoPasso= primeiroPasso.map((x) => x**2)
    const somarSegundoPasso = segundoPasso.reduce((acc, x) => acc + x,0)
    const mediaSegundoPasso = somarSegundoPasso / (array_nota.length)
    const finalDesvio = Math.sqrt(mediaSegundoPasso)

    if (finalDesvio == 0) {
        document.getElementById('desvioPadrao').innerHTML = `0`
    } else if (Number.isInteger(finalDesvio)) {
        document.getElementById('desvioPadrao').innerHTML = `${finalDesvio}`
    } else {
        document.getElementById('desvioPadrao').innerHTML = `É  aproximadamente ${finalDesvio.toFixed(2)}`
    }

}

//Função que tem como o papel de dizer quais disciplinas estão em situação de aprovação ou reporvação.
const aprovacao_reprovacao = (nota, codigo, freq) => {

    if (nota >= 5 && freq >= 75 ) {
        array_aprovacao.push(codigo)

    } else {
        if(array_reprovacao.indexOf(codigo) == -1) {

            array_reprovacao.push(codigo)

        }
    }

    if (array_aprovacao.length == 0) {

        document.getElementById('aprovacao').innerHTML = "Nenhuma disciplina com aprovação!"

    } else {
        document.getElementById('aprovacao').innerHTML = `${array_aprovacao.map((x) => x)} está(ão) aprovada(s)!`

    }


    if (array_reprovacao.length == 0) {

        document.getElementById('reprovacao').innerHTML = "Você não tem nenhuma disciplina reprovada!"
    } else {
        document.getElementById('reprovacao').innerHTML = `${array_reprovacao.map((x) => x)} está(ão) reprovada(as)!`
    }

}

//Função para calcular a média ponderada das disciplinas de cada departamento diferente.
const mediaDepar = (codigo, nota) => {
    const Primeiro = codigo.split('')
    const listaNumeros = ['0','1','2','3','4','5','6','7','8','9']
    const filtro = (x) => listaNumeros.indexOf(x) == -1
    const listaComFiltro = Primeiro.filter(filtro)
    const listaJuncao = listaComFiltro.join('')
    array_departamento.push({
        Nome: listaJuncao,
        Nota: nota
    })

    const filtrardepartamento = array_departamento.filter((x) => x.Nome == listaJuncao)
    const somarFiltro = filtrardepartamento.reduce((acc, x) => acc + x.Nota, 0)
    const separacao = document.getElementById('departamento').textContent.split(' ')
    if (separacao.indexOf(`${listaJuncao}:`) == -1) {
        document.getElementById('departamento').innerHTML += `<p id='${listaJuncao}'> Média de ${listaJuncao}: é ${(somarFiltro / filtrardepartamento.length).toFixed(2)} </p>`
    } else {
        document.getElementById(`${listaJuncao}`).innerHTML = `Média de ${listaJuncao}: é ${(somarFiltro / filtrardepartamento.length).toFixed(2)}`
    }
}
