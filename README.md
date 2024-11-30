# Juegos en JavaScript

Este repositorio contiene tres juegos desarrollados en JavaScript: Air Hockey, Breakout y Twin Stick Shooter. Cada juego tiene su propia carpeta con todos los archivos necesarios para ejecutarlo.

## Contenido

- [Air Hockey](#air-hockey)
- [Breakout](#breakout)
- [Twin Stick Shooter](#twin-stick-shooter)

## Air Hockey

Un juego de hockey de aire implementado en JavaScript.

Este juego utiliza la librería Box2D para la simulación de físicas.

### Cómo jugar

El juego está diseñado para 2 jugadores. Uno de ellos controlará a traves de las de las flechas y el otro a traves del WASD.

### Cómo Ejecutar

1. Abre el archivo `index.html` en tu navegador web.
2. El juego debería comenzar automáticamente.

### Archivos Principales

- `index.html`: Archivo principal HTML que carga todos los scripts y estilos necesarios.
- `src/engine.js`: Contiene la lógica principal del juego, incluyendo el bucle de juego y la gestión de estados.
- `src/game.js`: Contiene la lógica específica del juego.
- `src/menu.js`: Contiene la lógica del menú del juego.
- `src/gameOver.js`: Contiene la lógica de la pantalla de fin del juego.

## Breakout

Un juego de romper ladrillos implementado en JavaScript.

### Cómo jugar

Utiliza las flechas izquierda y derecha o las teclas A y D para moverse de izquierda a derecha.

### Cómo Ejecutar

1. Abre el archivo `index.html` en tu navegador web.
2. El juego debería comenzar automáticamente.

### Archivos Principales

- `index.html`: Archivo principal HTML que carga todos los scripts y estilos necesarios.
- `src/code.js`: Contiene la lógica principal del juego, incluyendo el bucle de juego y la gestión de estados.
- `src/player.js`: Contiene la lógica del jugador.
- `src/ball.js`: Contiene la lógica de la pelota.
- `src/brick.js`: Contiene la lógica de los ladrillos.

## Twin Stick Shooter

Un juego de disparos con una nave espacial implementado en JavaScript.

### Cómo jugar

El jugador puede disparar pulsando el ESPACIO y moverse a traves del WASD o las flechas.

### Cómo Ejecutar

1. Abre el archivo `index.html` en tu navegador web.
2. El juego debería comenzar automáticamente.

### Archivos Principales

- `index.html`: Archivo principal HTML que carga todos los scripts y estilos necesarios.
- `src/engine.js`: Contiene la lógica principal del juego, incluyendo el bucle de juego y la gestión de estados.
- `src/game.js`: Contiene la lógica específica del juego.
- `src/player.js`: Contiene la lógica del jugador.
- `src/bullet.js`: Contiene la lógica de las balas.
- `src/enemy.js`: Contiene la lógica de los enemigos.
