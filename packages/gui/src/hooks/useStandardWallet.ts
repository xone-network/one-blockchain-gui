import { useMemo } from 'react';
import type { Wallet } from '@one/api';
import { WalletType } from '@one/api';
import { useGetWalletsQuery, useGetWalletBalanceQuery } from '@one/api-react';

export default function useStandardWallet(): {
  loading: boolean;
  wallet?: Wallet;
  balance?: number;
} {
  const { data: wallets, isLoading: isLoadingGetWallets } =
    useGetWalletsQuery();
  const { data: balance, isLoading: isLoadingWalletBalance } =
    useGetWalletBalanceQuery({
      walletId: 1,
    });

  const isLoading = isLoadingGetWallets || isLoadingWalletBalance;

  const wallet = useMemo(() => {
    return wallets?.find(
      (item: Wallet) => item?.type === WalletType.STANDARD_WALLET,
    );
  }, [wallets]);

  return {
    loading: isLoading,
    wallet,
    balance: balance?.confirmedWalletBalance,
  };
}
