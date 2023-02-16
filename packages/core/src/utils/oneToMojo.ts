import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import oneFormatter from './oneFormatter';

export default function oneToMojo(one: string | number | BigNumber): BigNumber {
  return oneFormatter(one, Unit.ONE).to(Unit.MOJO).toBigNumber();
}
