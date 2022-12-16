import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import oneFormatter from './oneFormatter';

export default function mojoToCATLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return oneFormatter(mojo, Unit.MOJO)
    .to(Unit.CAT)
    .toLocaleString(locale);
}
