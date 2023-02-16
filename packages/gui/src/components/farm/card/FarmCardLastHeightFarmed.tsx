import { useGetFarmedAmountQuery } from '@xone-network/api-react';
import { FormatLargeNumber, CardSimple } from '@xone-network/core';
import { Trans } from '@lingui/macro';
import React from 'react';

export default function FarmCardLastHeightFarmed() {
  const { data, isLoading, error } = useGetFarmedAmountQuery();

  const lastHeightFarmed = data?.lastHeightFarmed;

  return (
    <CardSimple
      title={<Trans>Last Height Farmed</Trans>}
      value={<FormatLargeNumber value={lastHeightFarmed} />}
      description={!lastHeightFarmed && <Trans>No blocks farmed yet</Trans>}
      loading={isLoading}
      error={error}
    />
  );
}
