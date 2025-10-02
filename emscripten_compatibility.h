// Arquivo de compatibilidade para compilação sem Emscripten instalado
#ifndef EMSCRIPTEN_COMPATIBILITY_H
#define EMSCRIPTEN_COMPATIBILITY_H

// Definições básicas para quando Emscripten não estiver disponível
#ifndef __EMSCRIPTEN__
    #define EMSCRIPTEN_KEEPALIVE
#endif

// Includes padrão do C
#include <stdio.h>
#include <math.h>
#include <stdlib.h>

// Constantes matemáticas se não estiverem definidas
#ifndef M_PI
    #define M_PI 3.14159265358979323846
#endif

#ifndef NAN
    #define NAN (0.0/0.0)
#endif

#endif // EMSCRIPTEN_COMPATIBILITY_H