import { shape, string, number, arrayOf } from 'prop-types';

export default shape({
  id: number,
  title: string,
  cards: arrayOf(number),
  createdDate: string
});
