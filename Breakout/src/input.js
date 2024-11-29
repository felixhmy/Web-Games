//Hoja de la asignación de teclas y su introducción en el programa
var lastPress = null;

//Las teclas usadas en este caso son
const KEY_LEFT   = 37, KEY_A = 65;
const KEY_RIGHT  = 39, KEY_D = 68;
const KEY_SPACE  = 32;


var Input = {
  
    keyboard: {
        keyup: {},
        keypressed: {},
        keydown: {}
    },
    //Se detecta la tecla sigue pulsada
    IsKeyPressed: function(keycode) {
        return this.keyboard.keypressed[keycode];
    },
    //Se detecta cuando se pulsa una tecla
    IsKeyDown: function(keycode) {
        return this.keyboard.keydown[keycode];
    },
    //Se detecta cuando se termina de pulsar una tecla
    IsKeyUp: function (keycode) {
        return this.keyboard.keyup[keycode];
    },

    PostUpdate: function () {
        // Se borra el evento de la pulsacion de una tecla
        for (var property in this.keyboard.keydown) {
            if (this.keyboard.keydown.hasOwnProperty(property)) {
                this.keyboard.keydown[property] = false;
            }
        }

        // Se borra el evento del fin de la pulsación de una tecla
        for (var property in this.keyboard.keyup) {
            if (this.keyboard.keyup.hasOwnProperty(property)) {
                this.keyboard.keyup[property] = false;
            }
        }
    }
};

function SetupKeyboardEvents ()
{
    AddEvent(document, "keydown", function (e) {


        if (!e.repeat) {
            Input.keyboard.keydown[e.keyCode] = true;
            Input.keyboard.keypressed[e.keyCode] = true;
        }
    } );

    AddEvent(document, "keyup", function (e) {
        Input.keyboard.keyup[e.keyCode] = true;
        Input.keyboard.keypressed[e.keyCode] = false;
    } );

    function AddEvent (element, eventName, func)
    {
        if (element.addEventListener)
            element.addEventListener(eventName, func, false);
        else if (element.attachEvent)
            element.attachEvent(eventName, func);
    }
}