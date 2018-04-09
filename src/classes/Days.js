// levels for testing:
// 4 (free space for testing jumps)
var BasicGame = require('BasicGame');

BasicGame.Days = function () {
  this.days = {
    1: {
      "number": 1095,
      "text": {
        "en": "Maybe it will be there forever",
        "es": "Esto me acompañará siempre"
      },
      "waitTime": 3
    },
    2: {
      "number": 998,
      "text": {
        "en": "Sometimes it comes back",
        "es": "Un par de píldoras pueden ayudar"
      },
      "waitTime": 4
    },
    3: {
      "number": 912,
      "text": {
        "en": "It is here...again",
        "es": "Aún a veces lo recuerdo"
      },
      "waitTime": 3
    },
    4: {
      "number": 839,
      "text": {
        "en": "Why am I thinking about that?",
        "es": "Ya no necesito tantas píldoras"
      },
      "waitTime": 3
    },
    5: {
      "number": 766,
      "text": {
        "en": "It's here",
        "es": "Todos parecen haberlo olvidado"
      },
      "waitTime": 4
    },
    6: {
      "number": 730,
      "text": {
        "en": "No again, please",
        "es": "Algún día se lo contaré a alguien"
      },
      "waitTime": 4
    },
    7: {
      "number": 657,
      "text": {
        "en": "I thought I had overcome it",
        "es": "¡Noooo! No puedo volver a pensar en eso"
      },
      "waitTime": 4
    },
    8: {
      "number": 511,
      "text": {
        "en": "Another day...and it's here",
        "es": "¿Por qué estoy pensando en eso?"
      },
      "waitTime": 4
    },
    9: {
      "number": 401,
      "text": {
        "en": "I'm thinking about it",
        "es": "Pensé que ya lo había superado"
      },
      "waitTime": 4
    },
    10: {
      "number": 365,
      "text": {
        "en": "(peaceful days)",
        "es": "No puedo creer que ya haya pasado un año"
      },
      "waitTime": 5
    },
    11: {
      "number": 313,
      "text": {
        "en": "What I have done is not as wrong as I thought",
        "es": "Dentro de poco habrá pasado un año"
      },
      "waitTime": 5
    },
    12: {
      "number": 248,
      "text": {
        "en": "I can't believe no one cares about it",
        "es": "Su familia parece feliz ahora"
      },
      "waitTime": 5
    },
    13: {
      "number": 212,
      "text": {
        "en": "Two months has passed and no one talks about it, that's good",
        "es": "Pocos lo recuerdan ya"
      },
      "waitTime": 6
    },
    14: {
      "number": 186,
      "text": {
        "en": "I must admit it, my life has improved after that",
        "es": "Se lo merecía, lo sé"
      },
      "waitTime": 5
    },
    15: {
      "number": 171,
      "text": {
        "en": "It is odd, is not affecting me",
        "es": "He estado pensando en eso, no puedo concentrarme"
      },
      "waitTime": 3
    },
    16: {
      "number": 156,
      "text": {
        "en": "No one have been noticed it...could be so insignificant?",
        "es": "Tengo que consumir menos pastillas"
      },
      "waitTime": 5
    },
    17: {
      "number": 101,
      "text": {
        "en": "How could I thought it isn't wrong? It is wrong!",
        "es": "...ughh...ughhh...sólo fue una pesadilla...tranquila"
      },
      "waitTime": 4
    },
    18: {
      "number": 90,
      "text": {
        "en": "Maybe it isn't as wrong as I thought",
        "es": "Han pasado casi 3 meses, no puedo creerlo"
      },
      "waitTime": 4
    },
    19: {
      "number": 74,
      "text": {
        "en": "No one cares about it, that's weird",
        "es": "Una banda fue culpada. No van a seguir buscando, tranquila"
      },
      "waitTime": 4
    },
    20: {
      "number": 35,
      "text": {
        "en": "(cool down days)",
        "es": "Mi mamá ya notó lo de las pastillas"
      },
      "waitTime": 3
    },
    21: {
      "number": 9,
      "text": {
        "en": "I'm a bad person",
        "es": "Hoy supe que tienen pistas..."
      },
      "waitTime": 3
    },
    22: {
      "number": 8,
      "text": {
        "en": "What if someone goes to the appartment?",
        "es": "En las noticias dijeron que fue un robo"
      },
      "waitTime": 4
    },
    23: {
      "number": 7,
      "text": {
        "en": "How could I do it?...how could I?",
        "es": "Su familia está sufriendo..."
      },
      "waitTime": 3
    },
    24: {
      "number": 6,
      "text": {
        "en": "Brother: You have to calm down, I told you it wouldn't be easy",
        "es": "Hoy me pareció verlo en la calle. ¡Eso no puede ser!"
      },
      "waitTime": 5
    },
    25: {
      "number": 5,
      "text": {
        "en": "I must talk with my brother",
        "es": "¡No puedo más! Tengo que confesar lo que hice"
      },
      "waitTime": 4
    },
    26: {
      "number": 4,
      "text": {
        "en": "Don't don't don't...there must be something I can do",
        "es": "Ernesto era un maldito borracho bueno para nada"
      },
      "waitTime": 6
    },
    27: {
      "number": 3,
      "text": {
        "en": "I have to tell everything...I...must...",
        "es": "La policía ha estado preguntando cosas, ¿qué voy a hacer?"
      },
      "waitTime": 6
    },
    28: {
      "number": 2,
      "text": {
        "en": "...maybe she deserved it...but..who am I to judge?",
        "es": "Tranquila, sabes que él lo merecía"
      },
      "waitTime": 7
    },
    29: {
      "number": 1,
      "text": {
        "en": "She didn't deserve it...",
        "es": "Tengo que...confesar...te...tengo que..."
      },
      "waitTime": 3
    },
    30: {
      "number": 0,
      "text": {
        "en": "...oh...what I've done?",
        "es": "¿Qué he hecho? ¿¡QUÉ HE HECHOOO!?"
      },
      "waitTime": 3
    }
  };
};

BasicGame.Days.prototype.getDay = function (dayIndex) {
  if (!this.days[dayIndex]) return { "number": "???" };
  return this.days[dayIndex];
};