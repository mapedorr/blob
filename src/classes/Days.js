// levels for testing:
// 4 (free space for testing jumps)
var BasicGame = require('BasicGame');

BasicGame.Days = function () {
  this.days = {
    1: {
      'number': 1095,
      'text': {
        'en': 'This will always be with me',
        'es': 'Esto me acompañará siempre'
      },
      'waitTime': 3
    },
    2: {
      'number': 998,
      'text': {
        'en': 'A couple of pills could help',
        'es': 'Un par de píldoras pueden ayudar'
      },
      'waitTime': 4
    },
    3: {
      'number': 912,
      'text': {
        'en': 'Sometimes I still remember it',
        'es': 'Aún a veces lo recuerdo'
      },
      'waitTime': 3
    },
    4: {
      'number': 839,
      'text': {
        'en': 'I no longer need so many pills',
        'es': 'Ya no necesito tantas píldoras'
      },
      'waitTime': 3
    },
    5: {
      'number': 766,
      'text': {
        'en': 'Everyone seems to have forgotten it',
        'es': 'Todos parecen haberlo olvidado'
      },
      'waitTime': 4
    },
    6: {
      'number': 730,
      'text': {
        'en': 'Someday I will tell someone',
        'es': 'Algún día se lo contaré a alguien'
      },
      'waitTime': 4
    },
    7: {
      'number': 657,
      'text': {
        'en': 'Noooo! I can\'t be thinking about that again',
        'es': '¡Noooo! No puedo estar pensando en eso'
      },
      'waitTime': 4
    },
    8: {
      'number': 511,
      'text': {
        'en': 'Why am I thinking about that?',
        'es': '¿Por qué estoy pensando en eso?'
      },
      'waitTime': 4
    },
    9: {
      'number': 401,
      'text': {
        'en': 'I thought I had already passed it',
        'es': 'Pensé que ya lo había superado'
      },
      'waitTime': 4
    },
    10: {
      'number': 365,
      'text': {
        'en': 'I can\'t believe that one year has passed',
        'es': 'No puedo creer que ya haya pasado un año'
      },
      'waitTime': 5
    },
    11: {
      'number': 313,
      'text': {
        'en': 'Soon, a year will have been passed',
        'es': 'Dentro de poco habrá pasado un año'
      },
      'waitTime': 5
    },
    12: {
      'number': 248,
      'text': {
        'en': 'His family seems happy now',
        'es': 'Su familia parece feliz ahora'
      },
      'waitTime': 5
    },
    13: {
      'number': 212,
      'text': {
        'en': 'Few remember him already',
        'es': 'Pocos lo recuerdan ya'
      },
      'waitTime': 6
    },
    14: {
      'number': 186,
      'text': {
        'en': 'He deserved it, I know',
        'es': 'Se lo merecía, lo sé'
      },
      'waitTime': 5
    },
    15: {
      'number': 171,
      'text': {
        'en': 'I\'ve been thinking about that, I can\'t concentrate',
        'es': 'He estado pensando en eso, no puedo concentrarme'
      },
      'waitTime': 3
    },
    16: {
      'number': 156,
      'text': {
        'en': 'I\'ve to consume less pills',
        'es': 'Tengo que consumir menos pastillas'
      },
      'waitTime': 5
    },
    17: {
      'number': 101,
      'text': {
        'en': '...ughh ...ughhh ...it was just a nightmare...',
        'es': '...ughh...ughhh...sólo fue una pesadilla...'
      },
      'waitTime': 4
    },
    18: {
      'number': 90,
      'text': {
        'en': 'Almost 3 months have passed, I can\'t believe it',
        'es': 'Han pasado casi 3 meses, no puedo creerlo'
      },
      'waitTime': 4
    },
    19: {
      'number': 74,
      'text': {
        'en': 'A band was blamed, they wont keep looking',
        'es': 'Una banda fue culpada, no van a seguir buscando'
      },
      'waitTime': 4
    },
    20: {
      'number': 35,
      'text': {
        'en': 'My mom already noticed about the pills',
        'es': 'Mi mamá ya notó lo de las pastillas'
      },
      'waitTime': 3
    },
    21: {
      'number': 9,
      'text': {
        'en': 'Today I found out they have clues...',
        'es': 'Hoy supe que tienen pistas...'
      },
      'waitTime': 3
    },
    22: {
      'number': 8,
      'text': {
        'en': 'The news said it was a robbery',
        'es': 'En las noticias dijeron que fue un robo'
      },
      'waitTime': 4
    },
    23: {
      'number': 7,
      'text': {
        'en': 'His family is suffering...',
        'es': 'Su familia está sufriendo...'
      },
      'waitTime': 3
    },
    24: {
      'number': 6,
      'text': {
        'en': 'I saw him on the street today. That can\'t be!!!',
        'es': 'Hoy me pareció verlo en la calle. ¡ESO NO PUEDE SER!'
      },
      'waitTime': 5
    },
    25: {
      'number': 5,
      'text': {
        'en': 'I can\'t take it anymore! I have to confess what I did',
        'es': '¡No puedo más! Tengo que confesar lo que hice'
      },
      'waitTime': 4
    },
    26: {
      'number': 4,
      'text': {
        'en': 'Bill was a damn drunk good for nothing! I had to do it',
        'es': '¡Ernesto era un maldito borracho bueno para nada! Tenía que hacerlo'
      },
      'waitTime': 6
    },
    27: {
      'number': 3,
      'text': {
        'en': 'The police have been asking questions, WHAT AM I GOING TO DO!!!???',
        'es': 'La policía ha estado preguntando cosas, ¿¡QUÉ VOY A HACER!?'
      },
      'waitTime': 6
    },
    28: {
      'number': 2,
      'text': {
        'en': 'Reassure yourself, you know he deserved it',
        'es': 'Tranquila, sabes que él lo merecía'
      },
      'waitTime': 7
    },
    29: {
      'number': 1,
      'text': {
        'en': 'I have to...confess...I...I have to...',
        'es': 'Tengo que...confesar...te...tengo que...'
      },
      'waitTime': 3
    },
    30: {
      'number': 0,
      'text': {
        'en': 'What have I done? WHAT HAVE I DONE!!!???',
        'es': '¿Qué he hecho? ¿¡QUÉ HE HECHOOO!?'
      },
      'waitTime': 3
    }
  };
};

BasicGame.Days.prototype.getDay = function (dayIndex) {
  if (!this.days[dayIndex]) return { 'number': '???' };
  return this.days[dayIndex];
};