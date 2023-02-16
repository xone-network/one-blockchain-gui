import { WalletType } from '@xone-network/api';
import type { Wallet } from '@xone-network/api';

export default function getWalletPrimaryTitle(wallet: Wallet): string {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'One';
    default:
      return wallet.meta?.name ?? wallet.name;
  }
}
