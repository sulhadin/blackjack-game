import { createArrayFromRange } from "../../lib/fn";

export const suits = Object.freeze(['club', 'diamond', 'heart', 'spade']);

const A = 'A';
const J = 'J';
const Q = 'Q';
const K = 'K';

export const ranks = Object.freeze([A, '2', '3', '4', '5', '6', '7', '8', '9', '10', J, Q, K]);

export const isAce = card => card.rank === A;

export const isFace = card => Array.from([J, Q, K]).indexOf(card.rank) > 0;

export const isBlackJack = (cards) => {
  const _cards = cards.slice(0, 2);
  return _cards.some(card => isAce(card)) && _cards.some(card => isFace(card));
}

export const card = (suit, rank, rankIndex) => ({ suit, rank, value: rank === A ? 11 : Math.min(10, rankIndex + 1) });

const cardOfSuit = suit => (rank, rankIndex) => card(suit, rank, rankIndex);

export const deck =
  (suits, ranks) => {
    const initialValue = [];
    return suits.reduce(
      (cards, suit) => {
        const completeSuit = ranks.map(cardOfSuit(suit))
        return cards.concat(completeSuit)
      },
      initialValue
    )
  };

export const shuffle = array => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export const generateIndices = (deck, deckCount) => {
  const totalCardAmount = deckCount * deck.length;
  return createArrayFromRange(totalCardAmount);
}

const getCardIndexInDeck = (deck, index) => index % deck.length;

export const drawFromDeck = (deck, indices, nextPick) => (Object.assign({}, deck[getCardIndexInDeck(deck, indices[nextPick])]));
