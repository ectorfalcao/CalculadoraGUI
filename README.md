# 🧮 Calculadora Científica em C/WebAssembly

Uma calculadora científica completa com **25 operações matemáticas**, implementada em C e executando no navegador através de WebAssembly, com interface responsiva moderna.

## 💡 A Ousadia: Além do Terminal

Este projeto nasceu de uma atividade acadêmica da disciplina de **Algoritmos e Pensamento Computacional**. O requisito original era desenvolver uma calculadora simples, baseada em texto, rodando no console.

No entanto, decidi transformar o exercício em uma oportunidade de integrar o baixo nível (C) com o desenvolvimento web moderno. A filosofia deste projeto pode ser resumida na seguinte frase:

> **"Isto aqui calcula em C, porque é o que a professora me pediu, mas implementa uma interface pois é o desafio que eu escolhi."**

Desta forma, mantive o *core* matemático robusto em C (atendendo ao requisito acadêmico), mas o envolvi em uma camada de WebAssembly e HTML5 para criar uma experiência de usuário real.

## ✨ Funcionalidades

### 📊 25 Operações Científicas Disponíveis:

#### 🔢 **Operações Básicas**
1. **Adição** (+)
2. **Subtração** (-)
3. **Multiplicação** (×)  
4. **Divisão** (÷)

#### 🔋 **Potências e Raízes**
5. **Potenciação** (x^y)
6. **Radiciação** (ⁿ√x)
7. **Raiz Quadrada** (√x)
21. **Raiz Cúbica** (∛x)

#### 📐 **Funções Trigonométricas**
8. **Seno** (sen)
9. **Cosseno** (cos)
10. **Tangente** (tan)
11. **Arco Seno** (asen)
12. **Arco Cosseno** (acos)
13. **Arco Tangente** (atan)

#### 📈 **Funções Hiperbólicas**
23. **Seno Hiperbólico** (senh)
24. **Cosseno Hiperbólico** (cosh)
25. **Tangente Hiperbólica** (tanh)

#### 📊 **Funções Logarítmicas**
16. **Logaritmo Natural** (ln)
17. **Logaritmo Base 10** (log)
18. **Logaritmo Base 2** (log₂)

#### ⭐ **Funções Especiais**
14. **Derivada Simples** (f'(x) de x²)
15. **Fatorial** (n!)
19. **Mantissa** (parte fracionária normalizada)
19. **Expoente** (parte exponencial)
20. **Resto de Divisão** (mod)
22. **Diferença Positiva** (fdim)

## 🚀 Como Usar

### 📱 **Interface Web**
1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Digite os números nos campos de entrada
3. Escolha a operação desejada clicando nos botões
4. Veja o resultado no display principal
5. Acompanhe o histórico de cálculos

### ⚙️ **Controles**
- **RAD/DEG**: Alterna entre radianos e graus para funções trigonométricas
- **Limpar Tudo**: Reseta todos os campos e histórico
- **Enter**: Navega entre campos ou executa adição automática

## 🛠️ Estrutura do Projeto

```
calculadora-wasm/
├── calculations.c           # Implementação em C (25 funções)
├── calculator-functions.js  # Implementação JavaScript das funções
├── calculator-ui.js         # Interface e controle da aplicação
├── index.html              # Interface HTML responsiva
├── calculations.html       # (arquivo original do emscripten)
├── calculations.js         # (arquivo original do emscripten)
└── calculations.wasm       # (arquivo original do emscripten)
```

## 🔧 Compilação WebAssembly (Opcional)

Para compilar o código C para WebAssembly, você precisará do Emscripten:

### 1️⃣ **Instalar Emscripten**
```bash
# Baixar e instalar Emscripten
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

### 2️⃣ **Compilar o Projeto**
```bash
emcc calculations.c -o calculations.js \
  -s EXPORTED_FUNCTIONS="['_adicao','_subtracao','_multiplicacao','_divisao','_potenciacao','_radiciacao','_raiz_quadrada','_seno','_cosseno','_tangente','_arco_seno','_arco_cosseno','_arco_tangente','_derivada_simples','_fatorial','_logaritmo_natural','_logaritmo_base10','_logaritmo_base2','_obter_mantissa','_obter_expoente','_resto_divisao','_raiz_cubica','_diferenca_positiva','_seno_hiperbolico','_cosseno_hiperbolico','_tangente_hiperbolica','_graus_para_radianos','_radianos_para_graus']" \
  -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap']" \
  -s MODULARIZE=1 \
  -s EXPORT_NAME="CalculatorModule"
```

### 3️⃣ **Integrar WebAssembly (Opcional)**
Para usar a versão WebAssembly em vez da JavaScript, modifique o `calculator-ui.js` para carregar e usar as funções compiladas.

## 🎨 Interface Responsiva

- ✅ **Design Moderno**: Interface limpa com gradientes e efeitos visuais
- ✅ **Responsivo**: Funciona perfeitamente em mobile e desktop
- ✅ **Acessível**: Teclado navegável e feedback visual claro
- ✅ **Histórico**: Mantém os últimos 10 cálculos realizados
- ✅ **Validação**: Tratamento robusto de erros matemáticos
- ✅ **Temas**: Interface científica profissional com cores categorizadas

## 🧪 Exemplos de Uso

### **Operações Básicas**
- `5 + 3 = 8`
- `10 - 4 = 6`
- `7 × 6 = 42`
- `15 ÷ 3 = 5`

### **Trigonometria**
- `sen(30°) = 0.5` (modo DEG)
- `cos(π/3) ≈ 0.5` (modo RAD)
- `tan(45°) = 1` (modo DEG)

### **Potências e Raízes**
- `2^8 = 256`
- `√16 = 4`
- `∛27 = 3`
- `16^(1/4) = 2` (quarta raiz)

### **Logaritmos**
- `ln(e) = 1`
- `log(100) = 2`
- `log₂(8) = 3`

### **Especiais**
- `5! = 120`
- `derivada de x² em x=3 ≈ 6`

## ⚡ Performance

- **JavaScript**: Execução imediata, sem carregamento adicional
- **WebAssembly**: Performance próxima ao código nativo C
- **Interface**: Otimizada para mobile e desktop
- **Histórico**: Mantém apenas últimos 10 resultados para economia de memória

Este projeto está sob licença MIT. Use livremente para projetos pessoais e comerciais.
