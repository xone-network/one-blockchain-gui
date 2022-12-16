import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { useCurrencyCode, mojoToOneLocaleString, CardSimple, useLocale } from '@one/core';
import { useGetFarmedAmountQuery } from '@one/api-react';

export default function FarmCardTotalOneFarmed() {
  const currencyCode = useCurrencyCode();
  const [locale] = useLocale();
  const { data, isLoading, error } = useGetFarmedAmountQuery();

  const farmedAmount = data?.farmedAmount;

  const totalOneFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      return (
        <>
          {mojoToOneLocaleString(farmedAmount, locale)}
          &nbsp;
          {currencyCode}
        </>
      );
    }
  }, [farmedAmount, locale, currencyCode]);

  return (
    <CardSimple
      title={<Trans>Total One Farmed</Trans>}
      value={totalOneFarmed}
      loading={isLoading}
      error={error}
    />
  );
}
