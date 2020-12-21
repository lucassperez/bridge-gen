//    EXAMPLE
// 4SEx-1:  level = 4
//          suit = S
//          declarer = E
//          doubled = x
//          result = -1
// board is going to be a number, use vulTable.js to find vul with it

import vulTable from './vulTable';
import downTable from './downTable';

function calculateScore(level, suit, declarer, doubled, result, board) {
  doubled = !doubled ? // '' is the most common, so I test it first. '' returns false, so !'' will return true
            'plain' :
            doubled === 'x' ?
            'doubled' :
            'redoubled';
  suit = suit.toUpperCase();

  const declarerSideTranscription = { N: 'NS', S: 'NS', E: 'EW', W: 'EW' };
  const declarerSide = declarerSideTranscription[declarer];
  const vul = vulTable[(board - 1) % 16 + 1][declarerSide] ? 'vul' : 'nv';

  if (result < 0) { // went down
    let score = downTable[vul][-result][doubled];
    return declarerSide === 'EW' ? score : -score; 
  }

  // anything after this point is assumed to be on a contract that made
  let multiplier;
  switch (doubled) {
    case 'plain':
      multiplier = 1;
      break;
    case 'doubled':
      multiplier = 2;
      break;
    case 'redoubled':
      multiplier = 4;
      break;
    default: break;
  }

  let singleTrick, trickScore; // trickScore does not include overtricks
  if (suit === 'C' || suit === 'D') { // minor suit contract
    singleTrick = 20;
    trickScore = (20 * level) * multiplier;
  } else if (suit === 'H' || suit === 'S') { // major suit contract
    singleTrick = 30;
    trickScore = (30 * level) * multiplier;
  } else { // no trump contract
    singleTrick = 30; // the +10 offset is accounted at trickScore below
    trickScore = ((30 * level) + 10) * multiplier;
  }

  let contractType;
  switch (level) {
    case 7:
      contractType = 'grand';
      break;
    case 6:
      contractType = 'petit';
      break;
    default:
      contractType = trickScore >= 100 ? 'game' : 'partial'
      break;
  }

  let bonus;
  switch (contractType) {
    case 'grand':
      bonus = vul === 'vul' ? 1500 : 1000;
      break;
    case 'petit':
      bonus = vul === 'vul' ? 750 : 500;
      break;
    case 'game' :
      bonus = vul === 'vul' ? 500 : 300;
      break;
    default: 
      bonus = 50; // if partial will get the 50 bonus after the switch case ends
      break;
  }
  bonus += doubled === 'plain' ? 0 : 25 * multiplier // 50 more if doubled and 100 more if redoubled

  let overTricksScore;
  switch (doubled) {
    case 'redoubled':
      overTricksScore = vul === 'vul' ? 400 : 200;
      break;
    case 'doubled':
      overTricksScore = vul === 'vul' ? 200 : 100;
      break;
    default:
      overTricksScore = singleTrick;
      break;
  }

  let score = trickScore + bonus + overTricksScore * result;
  return declarerSide === 'NS' ? score : -score;
}

export default calculateScore;
