import { shape, string, number } from 'prop-types';

export default shape({
  id: number,
  question: string,
  answer: string,
  createdDate: string
});
