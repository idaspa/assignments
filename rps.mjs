//#region 
import * as readlinePromises from 'node:readline/promises';
const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout });
//#endregion

import { print } from './lib/output.mjs';
import { ANSI } from './lib/ansi.mjs';
import { getRandomItemFromArray } from './lib/random.mjs';
import GAME_DICTIONARY from './dictionary.mjs';


const CHOICES = { rock: 1, paper: 2, scissors: 3 };
const LIST_OF_CHOICES = [CHOICES.rock, CHOICES.paper, CHOICES.scissors];
let chosenLanguage = GAME_DICTIONARY.en
let gamerunning = false;

print(chosenLanguage.play, ANSI.COLOR.GREEN);

let gamePlay = await rl.question("");
if(gamePlay == "Y"){
    gamerunning = true;
}
while(gamerunning == true){
    
    print(ANSI.CLEAR_SCREEN);
print(chosenLanguage.title, ANSI.COLOR.YELLOW);

let player = await askForPlayerChoice();
let npc = makeAIChoice();

print(`${chosenLanguage.youPicked} ${getDesc(player)} ${chosenLanguage.aiPicked} ${getDesc(npc)}`);
print(chosenLanguage.winner + evaluateWinner (player, npc));

print(chosenLanguage.replay, ANSI.COLOR.RED);
let replayAnswer = await rl.question("");

//hvis det kommer inn N så vil ikke spilleren spille 
if(replayAnswer == "N"){
    gamerunning = false;
}
}

// ---- Game functions etc..

function evaluateWinner(p1Ch, p2Ch) {
    // Vi går ut i fra at spiller 2 vinner :)
    let result = chosenLanguage.player2;

    // Men vi må sjekke om noe annet skjedde.
    if (p1Ch == p2Ch) {
        result = chosenLanguage.draw;
    } else if (p1Ch == CHOICES.rock) {
        if (p2Ch == CHOICES.scissors) {
            result = chosenLanguage.player1;
        }
    } else if (p1Ch == CHOICES.paper) {
        if (p2Ch == CHOICES.rock) {
            result = chosenLanguage.player1;
        }
    } else if (p1Ch == CHOICES.scissors) {
        if (p2Ch == CHOICES.paper) {
            result = chosenLanguage.player1;
        }
    }

    return result;
}

function makeAIChoice() {
    return getRandomItemFromArray(LIST_OF_CHOICES);
}

function getDesc(choice) {
    return chosenLanguage.choices[choice - 1]
}

async function askForPlayerChoice() {

    let choice = null;

    do {
        print(chosenLanguage.selectionQuestion, ANSI.COLOR.BLUE);
        let rawChocie = await rl.question("");
        rawChocie = rawChocie.toUpperCase();
        choice = evaluatePlayerChoice(rawChocie);
    } while (choice == null)

    return choice;
}

function evaluatePlayerChoice(rawChocie) {
    let choice = null;

    if (rawChocie == chosenLanguage.rock) {
        choice = CHOICES.rock;
    } else if (rawChocie == chosenLanguage.paper) {
        choice = CHOICES.paper;
    } else if (rawChocie == chosenLanguage.scissors) {
        choice = CHOICES.scissors;
    }
    return choice;
}




process.exit();