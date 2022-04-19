var cards = ["1c","2c","3c","4c","5c","6c","7c","8c","9c","10c","Jc","Qc","Kc",
            "1t","2t","3t","4t","5t","6t","7t","8t","9t","10t","Jt","Qt","Kt",
            "1p","2p","3p","4p","5p","6p","7p","8p","9p","10p","Jp","Qp","Kp",
            "1ca","2ca","3ca","4ca","5ca","6ca","7ca","8ca","9ca","10ca","Jca","Qca","Kca"]

var joueur1 = [document.getElementById("joueurs1"),[],true,100,true];
var joueur2 = [document.getElementById("joueurs2"),[],false,100,true];
var joueur3 = [document.getElementById("joueurs3"),[],false,100,true];
var joueur4 = [document.getElementById("joueurs4"),[],false,100,true];
var joueur5 = [document.getElementById("joueurs5"),[],false,100,true];
var tapis = document.getElementById("tapis_cards");

var liste_joueurs = [joueur1,joueur2,joueur3,joueur4,joueur5];

var gameOver = false;


var pot =0;
var pot_tapis = document.getElementById("pot");
var miseHistorique = [0];
console.log(deck.children);

function melangeCartes(deck) {
    var i, j, tmp;
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = deck[i];
        deck[i] = deck[j];
        deck[j] = tmp;
    }
    return deck;
}

function startGame() {
    
    melangeCartes(cards);
    giveCards();
    whoPlays();
    
}

function giveCards() {
    for (let j = 0; j<2; j++){
        for (let i = 0; i<liste_joueurs.length; i++){
            liste_joueurs[i][0].children[j].src = "public/img/cards/" + cards[0]+".png";
            cards.shift();
        }
    }

}
function flopCards() {
    for(let i = 0; i < 3;i++) {
        tapis.children[i].src = "public/img/cards/" + cards[0]+".png";
        cards.shift();
    }
}

function turnCards() {
    cards.shift();
    tapis.children[3].src = "public/img/cards/" + cards[0]+".png";
    cards.shift();
}

function riverCards() {
    cards.shift();
    tapis.children[4].src = "public/img/cards/" + cards[0]+".png";
    cards.shift();
}

function whoPlays() {
    
    for (let i = 0; i<liste_joueurs.length; i++){
       if (liste_joueurs[i][2] == false || liste_joueurs[i][4] == false) {
            document.getElementsByClassName('control_game')[i].style.display = "none";
       }
       else {
            document.getElementsByClassName('control_game')[i].style.display = "block";
       }
        
    }
}

function playerTime() {

}

function followMise(id) {
    last_mise = miseHistorique.pop();
    liste_joueurs[id.substr(-1)-1][3] -= last_mise;
    pot += last_mise;
    console.log(liste_joueurs);
    miseHistorique.push(last_mise);    
    console.log(miseHistorique);
    pot_tapis.innerHTML = pot.toString();
    liste_joueurs[id.substr(-1)-1][2] = false;
    liste_joueurs[id.substr(-1)][2] = true;
    //document.getElementById("follow_mise"+id.substr(-1)).innerHTML = miseHistorique.substr(-1);
    cashUpdate(id.substr(-1));
    whoPlays();
    
}
function foldCards(id) {
    liste_joueurs[id.substr(-1)-1][0].children[0].src = "public/img/cards/back_card.png";
    liste_joueurs[id.substr(-1)-1][0].children[1].src = "public/img/cards/back_card.png";
    liste_joueurs[id.substr(-1)-1][4] = false;
    liste_joueurs[id.substr(-1)-1][2] = false;
    liste_joueurs[id.substr(-1)][2] = true;
    cashUpdate(id.substr(-1));
    whoPlays();
    
}

function miseCash(id) {
    let mise =  document.getElementById("mise_cash"+ id.substr(-1)).valueAsNumber;
    pot += mise;
    console.log(mise);
    console.log(liste_joueurs);
    miseHistorique.push(mise);    
    console.log(miseHistorique);
    liste_joueurs[id.substr(-1)-1][3] -= mise;
    pot_tapis.innerHTML = pot.toString();
    liste_joueurs[id.substr(-1)-1][2] = false;
    liste_joueurs[id.substr(-1)][2] = true;
    //document.getElementById("follow_mise"+id.substr(-1)).innerHTML = miseHistorique.substr(-1);
    cashUpdate(id.substr(-1));
    whoPlays();
   
}




function cashUpdate(id) {
    document.getElementById("cash"+id).innerHTML = liste_joueurs[id-1][3];
    
}

/*   var deck = document.getElementById("deck");

for (let i = 0; i<cards.length; i++){
    let card = document.createElement("img");
    card.src = "public/img/cards/" + cards[i]+".png";
    card.className+="deck_img";
    deck.appendChild(card);
}

*/