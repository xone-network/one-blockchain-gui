import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Farming } from '@one/icons';
import {
  Loading,
  oneToMojo,
  mojoToOneLocaleString,
  useCurrencyCode,
} from '@one/core';
import OfferBuilderSection from './OfferBuilderSection';
import OfferBuilderWalletAmount from './OfferBuilderWalletAmount';
import useOfferBuilderContext from '../../hooks/useOfferBuilderContext';
import useStandardWallet from '../../hooks/useStandardWallet';

export type OfferBuilderXONESectionProps = {
  name: string;
  offering?: boolean;
  muted?: boolean;
};

export default function OfferBuilderXONESection(
  props: OfferBuilderXONESectionProps,
) {
  const { name, offering, muted = false } = props;
  const { wallet, loading: isLoadingWallet } = useStandardWallet();
  const currencyCode = useCurrencyCode();
  const { fields, append, remove } = useFieldArray({
    name,
  });
  const amount =
    useWatch({
      name,
    })?.[0]?.amount ?? 0; // Assume there's only 1 XONE field per trade side
  const {
    readOnly,
    requestedRoyalties,
    offeredRoyalties,
    isCalculatingRoyalties,
  } = useOfferBuilderContext();

  // Yes, this is correct. Fungible (XONE) assets used to pay royalties are from the opposite side of the trade.
  const allRoyalties = offering ? requestedRoyalties : offeredRoyalties;

  const loading = isLoadingWallet || isCalculatingRoyalties;

  const [amountWithRoyalties, royaltyPayments] = useMemo(() => {
    if (!readOnly || !allRoyalties) {
      return [];
    }

    let amountWithRoyalties = oneToMojo(amount);
    const rows: Record<string, any>[] = [];
    Object.entries(allRoyalties).forEach(([nftId, royaltyPayments]) => {
      const matchingPayment = royaltyPayments?.find(
        (payment) => payment.asset === 'xone',
      );
      if (matchingPayment) {
        amountWithRoyalties = amountWithRoyalties.plus(matchingPayment.amount);
        rows.push({
          nftId,
          payment: {
            ...matchingPayment,
            displayAmount: mojoToOneLocaleString(matchingPayment.amount),
          },
        });
      }
    });

    return [mojoToOneLocaleString(amountWithRoyalties), rows];
  }, [readOnly, allRoyalties]);

  function handleAdd() {
    if (!fields.length) {
      append({
        amount: '',
      });
    }
  }

  function handleRemove(index: number) {
    remove(index);
  }

  return (
    <OfferBuilderSection
      icon={<Farming />}
      title={currencyCode}
      subtitle={
        <Trans>
          One ({currencyCode}) is a digital currency that is secure and
          sustainable
        </Trans>
      }
      onAdd={!fields.length ? handleAdd : undefined}
      expanded={!!fields.length}
      muted={muted}
    >
      {loading ? (
        <Loading />
      ) : (
        fields.map((field, index) => (
          <OfferBuilderWalletAmount
            key={field.id}
            walletId={wallet.id}
            name={`${name}.${index}.amount`}
            onRemove={() => handleRemove(index)}
            hideBalance={!offering}
            amountWithRoyalties={amountWithRoyalties}
            royaltyPayments={royaltyPayments}
          />
        ))
      )}
    </OfferBuilderSection>
  );
}