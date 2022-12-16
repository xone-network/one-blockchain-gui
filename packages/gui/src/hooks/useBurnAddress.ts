import { useMemo } from 'react';
import { toBech32m } from '@one/api';
import { useCurrencyCode } from '@one/core';

export default function useBurnAddress(): string | undefined {
  const feeUnit = useCurrencyCode();

  const retireAddress = useMemo(() => {
    if (!feeUnit) {
      return;
    }

    return toBech32m(
      '000000000000000000000000000000000000000000000000000000000000dead',
      feeUnit,
    );
  }, [feeUnit]);

  return retireAddress;
}
