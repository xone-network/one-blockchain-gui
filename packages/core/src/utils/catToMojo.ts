import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import oneFormatter from './oneFormatter';

export default function catToMojo(cat: string | number | BigNumber): BigNumber {
  return oneFormatter(cat, Unit.CAT).to(Unit.MOJO).toBigNumber();
}
