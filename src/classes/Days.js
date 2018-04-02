// levels for testing:
// 4 (free space for testing jumps)
var BasicGame = require('BasicGame');

BasicGame.Days = function () {
  this.days = {
    1: {
      "number": 387,
      "text": {
        "en": "Maybe it will be there forever",
        "es": "Tal vez siempre estará ahí"
      },
      "waitTime": 3
    },
    2: {
      "number": 349,
      "text": {
        "en": "Sometimes it comes back",
        "es": "A veces vuelve"
      },
      "waitTime": 4
    },
    3: {
      "number": 313,
      "text": {
        "en": "It is here...again",
        "es": "Aquí está...otra vez"
      },
      "waitTime": 3
    },
    4: {
      "number": 248,
      "text": {
        "en": "Why am I thinking about that?",
        "es": "¿Por qué estoy pensando en eso?"
      },
      "waitTime": 3
    },
    5: {
      "number": 212,
      "text": {
        "en": "It's here",
        "es": "Aquí está"
      },
      "waitTime": 4
    },
    6: {
      "number": 186,
      "text": {
        "en": "No again, please",
        "es": "Otra vez? no por favor"
      },
      "waitTime": 4
    },
    7: {
      "number": 171,
      "text": {
        "en": "I thought I had overcome it",
        "es": "Pensé que lo había superado"
      },
      "waitTime": 4
    },
    8: {
      "number": 156,
      "text": {
        "en": "Another day...and it's here",
        "es": "Otro día...y aquí está"
      },
      "waitTime": 4
    },
    9: {
      "number": 101,
      "text": {
        "en": "I'm thinking about it",
        "es": "Estoy pensando en eso"
      },
      "waitTime": 4
    },
    10: {
      "number": 90,
      "text": {
        "en": "(peaceful days)",
        "es": "(días tranquilos)"
      },
      "waitTime": 5
    },
    11: {
      "number": 83,
      "text": {
        "en": "What I have done is not as wrong as I thought",
        "es": "Lo que hice no es tan malo como pensaba"
      },
      "waitTime": 5
    },
    12: {
      "number": 74,
      "text": {
        "en": "I can't believe no one cares about it",
        "es": "No puedo creer que ha nadie le haya importado"
      },
      "waitTime": 5
    },
    13: {
      "number": 68,
      "text": {
        "en": "Two months has passed and no one talks about it, that's good",
        "es": "Han pasado más de dos meses y nadie ha dicho nada, eso es bueno"
      },
      "waitTime": 6
    },
    14: {
      "number": 65,
      "text": {
        "en": "I must admit it, my life has improved after that",
        "es": "Debo reconocer que mi vida a mejorado después de eso"
      },
      "waitTime": 5
    },
    15: {
      "number": 59,
      "text": {
        "en": "It is odd, is not affecting me",
        "es": "Qué extraño, empieza a no afectarme"
      },
      "waitTime": 3
    },
    16: {
      "number": 47,
      "text": {
        "en": "No one have been noticed it...could be so insignificant?",
        "es": "Aún nadie lo ha notado...¿puede ser tan insignificante?"
      },
      "waitTime": 5
    },
    17: {
      "number": 35,
      "text": {
        "en": "How could I thought it isn't wrong? It is wrong!",
        "es": "¿Cómo pude pensar que no es malo? Es muy malo!"
      },
      "waitTime": 4
    },
    18: {
      "number": 28,
      "text": {
        "en": "Maybe it isn't as wrong as I thought",
        "es": "Tal vez no es algo tan malo como pensaba"
      },
      "waitTime": 4
    },
    19: {
      "number": 16,
      "text": {
        "en": "No one cares about it, that's weird",
        "es": "Nadie lo ha notado, qué extraño"
      },
      "waitTime": 4
    },
    20: {
      "number": 11,
      "text": {
        "en": "(cool down days)",
        "es": "(dían de calma)"
      },
      "waitTime": 3
    },
    21: {
      "number": 9,
      "text": {
        "en": "I'm a bad person",
        "es": "Soy una mala persona"
      },
      "waitTime": 3
    },
    22: {
      "number": 8,
      "text": {
        "en": "What if someone goes to the appartment?",
        "es": "¿Qué tal si alguien va al apartamento?"
      },
      "waitTime": 4
    },
    23: {
      "number": 7,
      "text": {
        "en": "How could I do it?...how could I?",
        "es": "¿Cómo pude hacerlo?...¿cómo pude?"
      },
      "waitTime": 3
    },
    24: {
      "number": 6,
      "text": {
        "en": "Brother: You have to calm down, I told you it wouldn't be easy",
        "es": "Hermano: Tienes que calmarte, te dije que no sería fácil"
      },
      "waitTime": 5
    },
    25: {
      "number": 5,
      "text": {
        "en": "I must talk with my brother",
        "es": "Tengo que hablar con mi hermano"
      },
      "waitTime": 4
    },
    26: {
      "number": 4,
      "text": {
        "en": "Don't don't don't...there must be something I can do",
        "es": "No no no no!...debe haber algo que pueda hacer"
      },
      "waitTime": 6
    },
    27: {
      "number": 3,
      "text": {
        "en": "I have to tell everything...I...must...",
        "es": "Tengo que contarlo todo...tengo...que..."
      },
      "waitTime": 6
    },
    28: {
      "number": 2,
      "text": {
        "en": "...maybe she deserved it...but..who am I to judge?",
        "es": "...tal vez sí lo merecía...pero...¿quién soy yo para juzgar?"
      },
      "waitTime": 7
    },
    29: {
      "number": 1,
      "text": {
        "en": "She didn't deserve it...",
        "es": "Ella no se lo merecía..."
      },
      "waitTime": 3
    },
    30: {
      "number": 0,
      "text": {
        "en": "...oh...what I've done?",
        "es": "...pero...¿qué he hecho?"
      },
      "waitTime": 3
    }
  };
};

BasicGame.Days.prototype.getDay = function (dayIndex) {
  if (!this.days[dayIndex]) return { "number": "???" };
  return this.days[dayIndex];
};