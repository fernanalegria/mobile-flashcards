export const isEmptyObject = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export const getNumberOfCards = cards =>
  `${cards.length} ${cards.length === 1 ? 'card' : 'cards'}`;
