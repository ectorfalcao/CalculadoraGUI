// Interface JavaScript para Calculadora Científica

//let é uma variável que pode mudar de valor
//calc é o nome que atraibuímos para a a instância que vamos usar para chamar os metódos
//new é usado para criar uma nova instância de uma classe
//CalculadoraCientifica é a classe que criamos em calculadora.js
//history RECEBE um array que vai guardar o histórico
//"= []" é "recebe um array vazio"
let calc = new CalculadoraCientifica();
let history = [];

// Elementos da interface

// Elementos da interface
//aqui definimos variáveis para os elementos que vamos usar em HTML
//const pois são variáveis constantes + o nome que atribuímos a elas
//document retorna uma referência do documento
//getElementById retorna o ID do elemento
//então estamos armazenando nas variáveis os elementos do HTML
//display é a telinha da calculadora
//display info o que está escrito na telinha (pede para calcular e diz que calculou ou não, etc.)
//os inputs são os botões para input, history é o histórico
//error é a div pra quando der erro
const display = document.getElementById('display');
const displayInfo = document.getElementById('displayInfo');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const historyDiv = document.getElementById('history');
const errorDiv = document.getElementById('error');

// Funções de interface

//botãozinho para alterar o modo de ângulo
//o parametro mode é uma variável para o modo que a função vai receber
//usaremos essa função frente para definir se vai ser graus ou radianos
//da seguinte forma: setAngleMode("graus ou radianos")
function setAngleMode(mode) {
    
    //calc a gente viu lá em cima
    //alterarModoAngulo é o método que criamos lá na calculadora.js
    //aqui estamos chamando o método alterarModoAngulo e passando o mode para ele
    //dai a calculadora vai saber que pediu para mudar
    calc.alterarModoAngulo(mode);
    
    // Atualizar botões visuais

    //document a gente viu lá em cima
    //querySelectorAll seleciona todos os elementos que correspondem a um seletor
    //"angle mode button" é o seletor CSS que estamos usando
    //forEach é um método que executa uma função para cada elemento do array
    //btn é o parâmetro que representa cada botão
    //classList é uma propriedade que retorna a lista de classes do elemento
    //remove remove uma classe da lista
    //então estamos removendo a classe "active" de todos os botões
    document.querySelectorAll('.angle-mode button').forEach(btn => {
        btn.classList.remove('active');
    });
    //retorno visual do botão

    //event é um objeto que representa o evento que ocorreu
    //target é a propriedade que retorna o elemento que disparou o evento
    //classList é uma propriedade que retorna a lista de classes do elemento
    //add adiciona uma classe na lista
    //então estamos adicionando a classe "active" ao botão que foi clicado
    //daí o retorno visual do botão selecionado
    event.target.classList.add('active');
    
    // Atualizar display info(telinha)

    //updateDisplayInfo é o nome da função
    //ela atualiza o display info com o que modo que acabou de ser alterado
    //aqui estamos passando uma string formatada com o modo atual
    //toUpperCase transforma o texto em maiúsculo
    //${mode.toUpperCase()} é uma template string que insere o valor de mode em maiúsculo
    //dai vai aparecer na telinha: Modo: RAD/DEG
    updateDisplayInfo(`Modo: ${mode.toUpperCase()}`);
}

//limpando tudo, simplesmente as variáveis recebem seus valores iniciais para serem utilizadas novamente
function clearAll() {
    input1.value = '';
    input2.value = '';
    display.textContent = '0';
    displayInfo.textContent = 'Pronto para calcular';
    errorDiv.style.display = 'none';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function updateDisplay(value) {
    if (typeof value === 'number') {
        if (isNaN(value)) {
            display.textContent = 'Erro';
            return;
        }
        
        // Formatação de números grandes/pequenos
        if (Math.abs(value) > 1e12 || (Math.abs(value) < 1e-6 && value !== 0)) {
            display.textContent = value.toExponential(6);
        } else {
            display.textContent = value.toString().substring(0, 15);
        }
    } else {
        display.textContent = value;
    }
}

function updateDisplayInfo(info) {
    displayInfo.textContent = info;
}

function addToHistory(operation, inputs, result) {
    const historyItem = {
        operation,
        inputs,
        result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    history.unshift(historyItem);
    if (history.length > 10) {
        history.pop();
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyDiv.innerHTML = '';
    
    if (history.length === 0) {
        historyDiv.innerHTML = '<p style="color: #999; text-align: center;">Nenhum cálculo realizado</p>';
        return;
    }
    
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        let inputsText = '';
        if (item.inputs.length === 1) {
            inputsText = item.inputs[0];
        } else {
            inputsText = item.inputs.join(', ');
        }
        
        div.innerHTML = `
            <strong>${item.operation}</strong>(${inputsText}) = ${item.result}
            <br><small>${item.timestamp}</small>
        `;
        historyDiv.appendChild(div);
    });
}

function getInputValues() {
    const val1 = parseFloat(input1.value);
    const val2 = parseFloat(input2.value);
    
    return {
        val1: isNaN(val1) ? 0 : val1,
        val2: isNaN(val2) ? 0 : val2,
        hasVal1: !isNaN(val1) && input1.value !== '',
        hasVal2: !isNaN(val2) && input2.value !== ''
    };
}

// Função principal de cálculo
function calcular(operacao) {
    try {
        const inputs = getInputValues();
        let resultado;
        let inputsUsed = [];
        let nomeOperacao = '';
        
        // Validação de entrada básica
        if (!inputs.hasVal1) {
            showError('Por favor, insira pelo menos o primeiro número');
            return;
        }
        
        switch(operacao) {
            // Operações básicas (2 operandos)
            case 'adicao':
                if (!inputs.hasVal2) {
                    showError('Adição requer dois números');
                    return;
                }
                resultado = calc.adicao(inputs.val1, inputs.val2);
                inputsUsed = [inputs.val1, inputs.val2];
                nomeOperacao = 'Adição';
                break;
                
            case 'subtracao':
                if (!inputs.hasVal2) {
                    showError('Subtração requer dois números');
                    return;
                }
                resultado = calc.subtracao(inputs.val1, inputs.val2);
                inputsUsed = [inputs.val1, inputs.val2];
                nomeOperacao = 'Subtração';
                break;
                
            case 'multiplicacao':
                if (!inputs.hasVal2) {
                    showError('Multiplicação requer dois números');
                    return;
                }
                resultado = calc.multiplicacao(inputs.val1, inputs.val2);
                inputsUsed = [inputs.val1, inputs.val2];
                nomeOperacao = 'Multiplicação';
                break;
                
            case 'divisao':
                if (!inputs.hasVal2) {
                    showError('Divisão requer dois números');
                    return;
                }
                resultado = calc.divisao(inputs.val1, inputs.val2);
                inputsUsed = [inputs.val1, inputs.val2];
                nomeOperacao = 'Divisão';
                break;
                
            case 'potenciacao':
                if (!inputs.hasVal2) {
                    showError('Potenciação requer base e expoente');
                    return;
                }
                resultado = calc.potenciacao(inputs.val1, inputs.val2);
                inputsUsed = [inputs.val1, inputs.val2];
                nomeOperacao = 'Potenciação';
                break;
                
            case 'radiciacao':
                if (!inputs.hasVal2) {
                    showError('Radiciação requer radicando e índice');
                    return;
                }
                resultado = calc.radiciacao(inputs.val1, inputs.val2);
                inputsUsed = [inputs.val1, inputs.val2];
                nomeOperacao = 'Radiciação';
                break;
                
            case 'restoDivisao':
                if (!inputs.hasVal2) {
                    showError('Resto da divisão requer dois números');
                    return;
                }
                resultado = calc.restoDivisao(inputs.val1, inputs.val2);
                inputsUsed = [inputs.val1, inputs.val2];
                nomeOperacao = 'Resto da Divisão';
                break;
                
            case 'diferencaPositiva':
                if (!inputs.hasVal2) {
                    showError('Diferença positiva requer dois números');
                    return;
                }
                resultado = calc.diferencaPositiva(inputs.val1, inputs.val2);
                inputsUsed = [inputs.val1, inputs.val2];
                nomeOperacao = 'Diferença Positiva';
                break;
                
            case 'derivadaSimples':
                const h = inputs.hasVal2 ? inputs.val2 : 0.0001;
                resultado = calc.derivadaSimples(inputs.val1, h);
                inputsUsed = inputs.hasVal2 ? [inputs.val1, inputs.val2] : [inputs.val1];
                nomeOperacao = 'Derivada (x²)';
                break;
                
            // Operações de um operando
            case 'raizQuadrada':
                resultado = calc.raizQuadrada(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Raiz Quadrada';
                break;
                
            case 'raizCubica':
                resultado = calc.raizCubica(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Raiz Cúbica';
                break;
                
            case 'seno':
                resultado = calc.seno(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = `Seno (${calc.obterModoAngulo().toUpperCase()})`;
                break;
                
            case 'cosseno':
                resultado = calc.cosseno(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = `Cosseno (${calc.obterModoAngulo().toUpperCase()})`;
                break;
                
            case 'tangente':
                resultado = calc.tangente(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = `Tangente (${calc.obterModoAngulo().toUpperCase()})`;
                break;
                
            case 'arcoSeno':
                resultado = calc.arcoSeno(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = `Arco Seno (${calc.obterModoAngulo().toUpperCase()})`;
                break;
                
            case 'arcoCosseno':
                resultado = calc.arcoCosseno(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = `Arco Cosseno (${calc.obterModoAngulo().toUpperCase()})`;
                break;
                
            case 'arcoTangente':
                resultado = calc.arcoTangente(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = `Arco Tangente (${calc.obterModoAngulo().toUpperCase()})`;
                break;
                
            case 'senoHiperbolico':
                resultado = calc.senoHiperbolico(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Seno Hiperbólico';
                break;
                
            case 'cossenoHiperbolico':
                resultado = calc.cossenoHiperbolico(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Cosseno Hiperbólico';
                break;
                
            case 'tangenteHiperbolica':
                resultado = calc.tangenteHiperbolica(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Tangente Hiperbólica';
                break;
                
            case 'logaritmoNatural':
                resultado = calc.logaritmoNatural(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Logaritmo Natural';
                break;
                
            case 'logaritmoBase10':
                resultado = calc.logaritmoBase10(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Logaritmo Base 10';
                break;
                
            case 'logaritmoBase2':
                resultado = calc.logaritmoBase2(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Logaritmo Base 2';
                break;
                
            case 'fatorial':
                resultado = calc.fatorial(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Fatorial';
                break;
                
            case 'obterMantissa':
                resultado = calc.obterMantissa(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Mantissa';
                break;
                
            case 'obterExpoente':
                resultado = calc.obterExpoente(inputs.val1);
                inputsUsed = [inputs.val1];
                nomeOperacao = 'Expoente';
                break;
                
            default:
                showError('Operação não reconhecida');
                return;
        }
        
        // Atualizar display e histórico
        updateDisplay(resultado);
        updateDisplayInfo(`${nomeOperacao} calculada com sucesso`);
        addToHistory(nomeOperacao, inputsUsed, resultado);
        
        // Colocar resultado no primeiro input para facilitar cálculos em cadeia
        input1.value = resultado;
        input2.value = '';
        
    } catch (error) {
        showError(error.message);
        updateDisplay('Erro');
        updateDisplayInfo('Erro no cálculo');
    }
}

// Inicializar histórico vazio
updateHistoryDisplay();

// Permitir cálculo com Enter nos inputs
input1.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        input2.focus();
    }
});

input2.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        // Se houver valor nos dois inputs, tentar operação padrão (adição)
        if (input1.value && input2.value) {
            calcular('adicao');
        }
    }
});

// Focar no primeiro input ao carregar
window.addEventListener('load', function() {
    input1.focus();
    updateDisplayInfo('Digite números e escolha uma operação');

});




