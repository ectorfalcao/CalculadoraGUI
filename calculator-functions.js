// Calculadora Científica - Funções JavaScript
// Implementação das 25 operações científicas

class CalculadoraCientifica {
    constructor() {
        this.angleMode = 'rad'; // 'rad' ou 'deg'
    }

    // Utilitários para conversão de ângulos
    grausParaRadianos(graus) {
        return graus * Math.PI / 180;
    }

    radianosParaGraus(radianos) {
        return radianos * 180 / Math.PI;
    }

    // Converte ângulo baseado no modo atual
    converterAngulo(angulo) {
        return this.angleMode === 'deg' ? this.grausParaRadianos(angulo) : angulo;
    }

    // 1 - Adição
    adicao(a, b) {
        return a + b;
    }

    // 2 - Subtração
    subtracao(a, b) {
        return a - b;
    }

    // 3 - Multiplicação
    multiplicacao(a, b) {
        return a * b;
    }

    // 4 - Divisão
    divisao(a, b) {
        if (b === 0) {
            throw new Error('Divisão por zero');
        }
        return a / b;
    }

    // 5 - Potenciação
    potenciacao(base, expoente) {
        return Math.pow(base, expoente);
    }

    // 6 - Radiciação (raiz n-ésima)
    radiciacao(radicando, indice) {
        if (indice === 0) {
            throw new Error('Índice não pode ser zero');
        }
        return Math.pow(radicando, 1 / indice);
    }

    // 7 - Raiz quadrada
    raizQuadrada(x) {
        if (x < 0) {
            throw new Error('Raiz quadrada de número negativo');
        }
        return Math.sqrt(x);
    }

    // 8 - Seno
    seno(x) {
        return Math.sin(this.converterAngulo(x));
    }

    // 9 - Cosseno
    cosseno(x) {
        return Math.cos(this.converterAngulo(x));
    }

    // 10 - Tangente
    tangente(x) {
        return Math.tan(this.converterAngulo(x));
    }

    // 11 - Arco Seno
    arcoSeno(x) {
        if (x < -1 || x > 1) {
            throw new Error('Valor fora do domínio [-1, 1]');
        }
        const resultado = Math.asin(x);
        return this.angleMode === 'deg' ? this.radianosParaGraus(resultado) : resultado;
    }

    // 12 - Arco Cosseno
    arcoCosseno(x) {
        if (x < -1 || x > 1) {
            throw new Error('Valor fora do domínio [-1, 1]');
        }
        const resultado = Math.acos(x);
        return this.angleMode === 'deg' ? this.radianosParaGraus(resultado) : resultado;
    }

    // 13 - Arco Tangente
    arcoTangente(x) {
        const resultado = Math.atan(x);
        return this.angleMode === 'deg' ? this.radianosParaGraus(resultado) : resultado;
    }

    // 14 - Derivada (aproximação numérica simples de x²)
    derivadaSimples(x, h = 0.0001) {
        const fXH = Math.pow(x + h, 2);
        const fX = Math.pow(x, 2);
        return (fXH - fX) / h;
    }

    // 15 - Fatorial
    fatorial(n) {
        if (n < 0 || n !== Math.floor(n)) {
            throw new Error('Fatorial só para números naturais');
        }
        if (n === 0 || n === 1) return 1;
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }

    // 16 - Logaritmo natural
    logaritmoNatural(x) {
        if (x <= 0) {
            throw new Error('Logaritmo só para números positivos');
        }
        return Math.log(x);
    }

    // 17 - Logaritmo base 10
    logaritmoBase10(x) {
        if (x <= 0) {
            throw new Error('Logaritmo só para números positivos');
        }
        return Math.log10(x);
    }

    // 18 - Logaritmo base 2
    logaritmoBase2(x) {
        if (x <= 0) {
            throw new Error('Logaritmo só para números positivos');
        }
        return Math.log2(x);
    }

    // 19 - Mantissa (parte fracionária normalizada)
    obterMantissa(x) {
        if (x === 0) return 0;
        const exp = Math.floor(Math.log10(Math.abs(x)));
        return x / Math.pow(10, exp);
    }

    // 19 - Expoente
    obterExpoente(x) {
        if (x === 0) return 0;
        return Math.floor(Math.log10(Math.abs(x)));
    }

    // 20 - Resto de Divisão
    restoDivisao(a, b) {
        if (b === 0) {
            throw new Error('Divisão por zero');
        }
        return a % b;
    }

    // 21 - Raiz Cúbica
    raizCubica(x) {
        return Math.cbrt(x);
    }

    // 22 - Diferença Positiva Entre Valores
    diferencaPositiva(a, b) {
        return Math.max(a - b, 0);
    }

    // 23 - Seno Hiperbólico
    senoHiperbolico(x) {
        return Math.sinh(x);
    }

    // 24 - Cosseno Hiperbólico
    cossenoHiperbolico(x) {
        return Math.cosh(x);
    }

    // 25 - Tangente Hiperbólica
    tangenteHiperbolica(x) {
        return Math.tanh(x);
    }

    // Função para alterar modo de ângulo
    alterarModoAngulo(modo) {
        this.angleMode = modo;
    }

    // Função para obter modo atual
    obterModoAngulo() {
        return this.angleMode;
    }
}

// Exportar a classe para uso global
window.CalculadoraCientifica = CalculadoraCientifica;