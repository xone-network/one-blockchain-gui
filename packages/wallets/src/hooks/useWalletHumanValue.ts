import { useMemo } from 'react';
import type { Wallet } from '@one/api';
import { WalletType } from '@one/api';
import BigNumber from 'bignumber.js';
import { mojoToCATLocaleString, mojoToOneLocaleString, useLocale } from '@one/core';

export default function useWalletHumanValue(wallet: Wallet, value?: string | number | BigNumber, unit?: string): string {
  const [locale] = useLocale();

  return useMemo(() => {
    if (wallet && value !== undefined) {
      const localisedValue = wallet.type === WalletType.CAT
        ? mojoToCATLocaleString(value, locale)
        : mojoToOneLocaleString(value, locale);

      return `${localisedValue} ${unit}`;
    }

    return '';
  }, [wallet, value, unit, locale]);
}
