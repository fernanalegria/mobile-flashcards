import { shape, string, number, objectOf } from 'prop-types';

export default shape({
  id: number,
  deck: number,
  results: objectOf(number),
  startDate: string
});
