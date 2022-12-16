import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import oneFormatter from './oneFormatter';

export default function mojoToCAT(mojo: string | number | BigNumber): BigNumber {
  return oneFormatter(mojo, Unit.MOJO)
    .to(Unit.CAT)
    .toBigNumber();
}
