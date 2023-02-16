import BigNumber from 'bignumber.js';
import React from 'react';

import useCurrencyCode from '../../hooks/useCurrencyCode';
import mojoToOne from '../../utils/mojoToOneLocaleString';
import FormatLargeNumber from '../FormatLargeNumber';

export type MojoToOneProps = {
  value: number | BigNumber;
};

export default function MojoToOne(props: MojoToOneProps) {
  const { value } = props;
  const currencyCode = useCurrencyCode();
  const updatedValue = mojoToOne(value);

  return (
    <>
      <FormatLargeNumber value={updatedValue} />
      &nbsp;{currencyCode ?? ''}
    </>
  );
}
