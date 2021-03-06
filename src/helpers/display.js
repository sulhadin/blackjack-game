import { deepClone } from "../../lib/fn";

export const displayPlayer = (playerName, cards, score, displayer = console.log) => {
  displayer(playerName);
  displayer('Hand: ',
    cards.reduce((handText, { suit, rank }) => handText + `${suit} - ${rank}, `, ''),
    'Score: ',
    score);
};

export const displayDealer = (playerName, cards, score, displayer = console.log) => {
  const [firstCard, ...restOfTheCards] = deepClone(cards);
  let _score = score;

  // If cards length is two, then dealer still didn't start drawing cards,
  // which means player didn't stand yet
  if(cards.length === 2) {
    firstCard.rank = '*'
    firstCard.value = '*'
    firstCard.suit = '*'
    _score = score - firstCard.value;
  }

  displayPlayer(playerName,[firstCard, ...restOfTheCards], _score, displayer)
}
