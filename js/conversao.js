//funcao para converter as moedas

async function obtemTaxas(moedaOrigem, moedaDestino) {
    const url = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data)
        let retorno = data[`${moedaOrigem}${moedaDestino}`].bid
        return retorno
    } catch (error) {
        console.error(error)
        return null
    }
}

// console.log(obtemTaxas('BRL', 'USD'))
// console.log(obtemTaxas('USD', 'BRL'))

async function calculaConversao(valor, moedaOrigem, moedaDestino){
    const valorNumerico = parseFloat(valor)
    if (!isNaN(valorNumerico)){
        resultado.textContent = 'O Valor deve ser um número válido!'
    }
    if (valor>0 && moedaOrigem && moedaDestino && moedaOrigem !== moedaDestino){
        const taxaConversao = await obtemTaxas(moedaOrigem, moedaDestino)
        const valorConvertido = (valorNumerico * taxaConversao).toFixed(2)
        resultado.textContent = `O valor convertido é ${moedaDestino} ${valorConvertido}`
    } else {
        resultado.textContent = ''
    }
}

const moedaOrigem = document.getElementById('moedaOrigem')
const moedaDestino = document.getElementById('moedaDestino')
const valor = document.getElementById('valor')
const resultado = document.getElementById('resultado')

moedaOrigem.addEventListener('change', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})

moedaDestino.addEventListener('change', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})

valor.addEventListener('input', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})         