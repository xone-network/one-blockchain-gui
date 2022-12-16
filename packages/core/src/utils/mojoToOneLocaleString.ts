import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import oneFormatter from './oneFormatter';

export default function mojoToOneLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return oneFormatter(mojo, Unit.MOJO)
    .to(Unit.ONE)
    .toLocaleString(locale);
}
