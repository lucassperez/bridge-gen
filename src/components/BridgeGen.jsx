import './BridgeGen.css';
import React, { useState } from 'react'
import ResultsTable from './ResultsTable';

import calculateScore from './resultsUtils/calculateScore';
import checkImps from './resultsUtils/checkImps';

function BridgeGen () {
  const suitTranscription = {
    'N': 'NT ', 'n': 'NT ',
    'S': '♠', 's': '♠',
    'H': '♥', 'h': '♥',
    'D': '♦', 'd': '♦',
    'C': '♣', 'c': '♣'
  }

  const [results, setResults] = useState([]);
  const [boardNum, setBoardNum] = useState(1);
  const [impsAccumulator, setImpAccumulator] = useState(0);

  const generateRandomResult = () => {
    let suit = ['P', 'N', 'n', 'S', 's', 'H', 'h', 'D', 'd', 'C', 'c'][Math.floor(Math.random() * 11)]; // makes a pass out less likely
    if (suit === 'P')
      return { table: 'Pass', score: 0 };

    let level = Math.floor(Math.random() * 7) + 1; // number from 1 to 7
    let tricks = Math.floor(Math.random() * 14); // number from 0 to 13
    let result = tricks - (level + 6);
    let resultString;
    if (result < 0)
      resultString = `${result}`;
    else if (result === 0)
      resultString = '=';
    else
      resultString = `+${result}`;

    let declarer = ['N', 'S', 'E', 'W'][Math.floor(Math.random() * 4)];
    let doubled;
    let doubleSeed = Math.random();
    if (doubleSeed <= 0.4)
      doubled = '';
    else if (doubleSeed <= 0.8)
      doubled = 'x';
    else
      doubled = 'xx';

    const contract = `${level}${suitTranscription[suit]}${declarer}${doubled}${resultString}`; // Example: 3DNx-2 = 3 diamonds by north doubled 2 down
    const score = calculateScore(level, suit, declarer, doubled, result, boardNum);
    return { table: contract, score: score }
  }

  const handleGenerate = () => {
    setBoardNum(prev => prev + 1);
    let finalResult = {
      board: boardNum,
      your_table: '',
      your_score: 0,
      other_table: '',
      other_score: 0,
      diff: 0,
      imps: 0
    };
    let r1 = generateRandomResult();
    let r2 = generateRandomResult();
    finalResult.your_table = r1.table;
    finalResult.your_score = r1.score;
    finalResult.other_table = r2.table;
    finalResult.other_score = r2.score;
    let diff = r1.score - r2.score;
    let imps = checkImps(diff);
    imps = diff < 0 ? -imps : imps;
    finalResult.diff = diff;
    finalResult.imps = imps;
    setResults(prev => [...prev, finalResult]);
    setImpAccumulator(prev => prev + imps);
  }

  const handleReset = () => {
    setResults([]);
    setBoardNum(1);
    setImpAccumulator(0);
  }
  return (
    <div>
      <div className="buttonArea">
        <button onClick={() => handleGenerate()}>Generate!</button>
        <button onClick={() => handleReset()}>Clear Table</button>
        <br/>
        <div className="impsAccumulator">
          {impsAccumulator ? <span>Total de imps: <b>{impsAccumulator}</b></span> : ''}
        </div>
      </div>
      <div className="resultsArea">
        <ResultsTable data={results} />
      </div>
    </div>
  );
}

export default BridgeGen;
