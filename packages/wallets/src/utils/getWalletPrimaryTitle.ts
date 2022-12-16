import { WalletType } from '@one/api';
import type { Wallet } from '@one/api';

export default function getWalletPrimaryTitle(wallet: Wallet): string {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'One';
    default:
      return wallet.meta?.name ?? wallet.name;
  }
}
