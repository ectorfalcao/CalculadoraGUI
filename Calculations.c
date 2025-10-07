#include "emscripten_compatibility.h"
//ifdef é uma instrução do pré processador que permite a compilação condicional
//o texto entre ifdef e endif será compilado (se a macro estiver definida)
//_EMSCRIPPTEN_ é definido automaticamente pelo compilador Emscripten 
#ifdef __EMSCRIPTEN__
    #include <emscripten/emscripten.h>
#endif

// Exportar funções para WebAssembly****
//_cplusplus verifica se o código está sendo compilado como C++ ou C
//extern "C" é usado para evitar a name mangling (modificação de nomes) em C++
//isso garante que as funções possam ser chamadas corretamente do JavaScript
#ifdef __cplusplus
extern "C" {
#endif

// 1 - Adição

//EMSCRIPTEN_KEEPALIVE garante que a função não será eliminada durante a otimização
// em outras palavras, elimina problemas com o JS
//sem isso, a otimização do compilador poderia remover funções que não estão em C
EMSCRIPTEN_KEEPALIVE
double adicao(double a, double b) {
    return a + b;
}

// 2 - Subtração
EMSCRIPTEN_KEEPALIVE
double subtracao(double a, double b) {
    return a - b;
}

// 3 - Multiplicação
EMSCRIPTEN_KEEPALIVE
double multiplicacao(double a, double b) {
    return a * b;
}

// 4 - Divisão
EMSCRIPTEN_KEEPALIVE
double divisao(double a, double b) {
    if (b == 0) {
        return NAN; // Retorna NaN para divisão por zero
    }
    return a / b;
}

// 5 - Potenciação
EMSCRIPTEN_KEEPALIVE
double potenciacao(double base, double expoente) {
    return pow(base, expoente);
}

// 6 - Radiciação (raiz n-ésima)
EMSCRIPTEN_KEEPALIVE
double radiciacao(double radicando, double indice) {
    if (indice == 0) {
        return NAN;
    }
    return pow(radicando, 1.0 / indice);
}

// 7 - Raiz quadrada
EMSCRIPTEN_KEEPALIVE
double raiz_quadrada(double x) {
    if (x < 0) {
        return NAN;
    }
    return sqrt(x);
}

// 8 - Seno
EMSCRIPTEN_KEEPALIVE
double seno(double x) {
    return sin(x);
}

// 9 - Cosseno
EMSCRIPTEN_KEEPALIVE
double cosseno(double x) {
    return cos(x);
}

// 10 - Tangente
EMSCRIPTEN_KEEPALIVE
double tangente(double x) {
    return tan(x);
}

// 11 - Arco Seno
EMSCRIPTEN_KEEPALIVE
double arco_seno(double x) {
    if (x < -1 || x > 1) {
        return NAN;
    }
    return asin(x);
}

// 12 - Arco Cosseno
EMSCRIPTEN_KEEPALIVE
double arco_cosseno(double x) {
    if (x < -1 || x > 1) {
        return NAN;
    }
    return acos(x);
}

// 13 - Arco Tangente
EMSCRIPTEN_KEEPALIVE
double arco_tangente(double x) {
    return atan(x);
}

// 14 - Derivada (aproximação numérica simples)
EMSCRIPTEN_KEEPALIVE
double derivada_simples(double x, double h) {
    // Derivada aproximada de x² usando diferenças finitas
    if (h == 0) h = 0.0001;
    double f_x_h = (x + h) * (x + h);
    double f_x = x * x;
    return (f_x_h - f_x) / h;
}

// 15 - Aplicar Fatorial
EMSCRIPTEN_KEEPALIVE
double fatorial(double n) {
    if (n < 0 || n != floor(n)) {
        return NAN; // Fatorial só para números naturais
    }
    if (n == 0 || n == 1) {
        return 1;
    }
    double resultado = 1;
    for (int i = 2; i <= (int)n; i++) {
        resultado *= i;
    }
    return resultado;
}

// 16 - Logaritmo natural
EMSCRIPTEN_KEEPALIVE
double logaritmo_natural(double x) {
    if (x <= 0) {
        return NAN;
    }
    return log(x);
}

// 17 - Logaritmo base 10
EMSCRIPTEN_KEEPALIVE
double logaritmo_base10(double x) {
    if (x <= 0) {
        return NAN;
    }
    return log10(x);
}

// 18 - Logaritmo base 2
EMSCRIPTEN_KEEPALIVE
double logaritmo_base2(double x) {
    if (x <= 0) {
        return NAN;
    }
    return log2(x);
}

// 19 - Mantissa e Expoente (retorna mantissa)
EMSCRIPTEN_KEEPALIVE
double obter_mantissa(double x) {
    int exp;
    return frexp(x, &exp);
}

// 19 - Obter expoente
EMSCRIPTEN_KEEPALIVE
int obter_expoente(double x) {
    int exp;
    frexp(x, &exp);
    return exp;
}

// 20 - Resto de Divisão
EMSCRIPTEN_KEEPALIVE
double resto_divisao(double a, double b) {
    if (b == 0) {
        return NAN;
    }
    return fmod(a, b);
}

// 21 - Raiz Cúbica
EMSCRIPTEN_KEEPALIVE
double raiz_cubica(double x) {
    return cbrt(x);
}

// 22 - Diferença Positiva Entre Valores
EMSCRIPTEN_KEEPALIVE
double diferenca_positiva(double a, double b) {
    return fdim(a, b);
}

// 23 - Seno Hiperbólico
EMSCRIPTEN_KEEPALIVE
double seno_hiperbolico(double x) {
    return sinh(x);
}

// 24 - Cosseno Hiperbólico
EMSCRIPTEN_KEEPALIVE
double cosseno_hiperbolico(double x) {
    return cosh(x);
}

// 25 - Tangente Hiperbólica
EMSCRIPTEN_KEEPALIVE
double tangente_hiperbolica(double x) {
    return tanh(x);
}

// Função para converter graus para radianos
EMSCRIPTEN_KEEPALIVE
double graus_para_radianos(double graus) {
    return graus * M_PI / 180.0;
}

// Função para converter radianos para graus
EMSCRIPTEN_KEEPALIVE
double radianos_para_graus(double radianos) {
    return radianos * 180.0 / M_PI;
}

#ifdef __cplusplus
}
#endif

int main() {
    printf("Calculadora Científica em C rodando no WebAssembly!\n");
    printf("25 operações científicas disponíveis!\n");
    return 0;
}
