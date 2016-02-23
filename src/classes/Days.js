var BasicGame = BasicGame || {};
BasicGame.Days = function () {
  this.days = {
    1:  { "number": 387 },
    2:  { "number": 349 },
    3:  { "number": 313 },
    4:  { "number": 248 },
    5:  { "number": 212 },
    6:  { "number": 186 },
    7:  { "number": 171 },
    8:  { "number": 156 },
    9:  { "number": 101 },
    10: { "number": 90 ,
          "text": {
            "en": "(peaceful days)",
            "es": "(días tranquilos)"
          }
        },
    11: { "number": 83 },
    12: { "number": 74 },
    13: { "number": 68 },
    14: { "number": 65 },
    15: { "number": 59 },
    16: { "number": 47 },
    17: { "number": 35 },
    18: { "number": 28 },
    19: { "number": 16 },
    20: { "number": 11 },
    21: { "number": 9 },
    22: { "number": 8 },
    23: { "number": 7,
          "text": {
            "en": "How could I do it?...how could I?",
            "es": "¿Cómo pude hacerlo?...¿cómo pude?"
          }
        },
    24: { "number": 6 ,
          "text": {
            "en": "H: You have to calm down, I told you it wouldn't be easy. Don't!...wait there, I'll go.",
            "es": "H: Tienes que calmarte, te dije que no sería fácil. No!...espera, voy para allá."
          }
        },
    25: { "number": 5,
          "text": {
            "en": "I must talk H.",
            "es": "Tengo que hablar con H."
          }
        },
    26: { "number": 4,
          "text": {
            "en": "Don't don't don't...there must be something I can do",
            "es": "No no no no...debe haber algo que pueda hacer"
          }
        },
    27: { "number": 3,
          "text": {
            "en": "I have to tell everything...I...must...",
            "es": "Tengo que contarlo todo...tengo...que..."
          }
        },
    28: { "number": 2,
          "text": {
            "en": "...maybe it deserved it...but..who am I to judge?",
            "es": "...o tal vez sí lo merecía...pero...¿quién soy yo para juzgar?"
          }
        },
    29: { "number": 1,
          "text": {
            "en": "...did not deserve it...",
            "es": "...no se lo merecía...no..."
          }
        },
    30: { "number": 0,
          "text": {
            "en": "...oh...what I've done?",
            "es": "...pero...¿qué he hecho?"
          }
        }
  };
};

BasicGame.Days.prototype.getDay = function(dayIndex){
  if(!this.days[dayIndex]) return {"number": "???"};
  return this.days[dayIndex];
};