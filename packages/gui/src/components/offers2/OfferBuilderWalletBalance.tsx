import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { WalletType } from '@one/api';
import { useGetWalletBalanceQuery } from '@one/api-react';
import {
  FormatLargeNumber,
  mojoToCATLocaleString,
  mojoToOneLocaleString,
  useLocale,
} from '@one/core';
import { useWallet } from '@one/wallets';

export type OfferBuilderWalletBalanceProps = {
  walletId: number;
};

export default function OfferBuilderWalletBalance(
  props: OfferBuilderWalletBalanceProps,
) {
  const { walletId } = props;
  const [locale] = useLocale();
  const { data: walletBalance, isLoading: isLoadingWalletBalance } =
    useGetWalletBalanceQuery({
      walletId,
    });

  const { unit, wallet, loading } = useWallet(walletId);

  const isLoading = isLoadingWalletBalance || loading;

  const xoneBalance = useMemo(() => {
    if (
      isLoading ||
      !wallet ||
      !walletBalance ||
      !('spendableBalance' in walletBalance)
    ) {
      return undefined;
    }

    if (wallet.type === WalletType.STANDARD_WALLET) {
      return mojoToOneLocaleString(walletBalance.spendableBalance, locale);
    }

    if (wallet.type === WalletType.CAT) {
      return mojoToCATLocaleString(walletBalance.spendableBalance, locale);
    }

    return undefined;
  }, [
    isLoading,
    wallet,
    walletBalance,
    walletBalance?.spendableBalance,
    locale,
  ]);

  if (!isLoading && xoneBalance === undefined) {
    return null;
  }

  return (
    <Trans>
      Spendable Balance:{' '}
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {xoneBalance}
          &nbsp;
          {unit?.toUpperCase()}
        </>
      )}
    </Trans>
  );
}
