import { LoadingButton, type LoadingButtonProps } from '@mui/lab';
import React from 'react';

export type ButtonLoadingProps = LoadingButtonProps & {
  loading?: boolean;
  mode?: 'autodisable' | 'hidecontent';
};

export default function ButtonLoading(props: ButtonLoadingProps) {
  const { color = 'secondary', loading, onClick, ...rest } = props;

  function handleClick(...args: any[]) {
    if (!loading && onClick) {
      onClick(...args);
    }
  }

  return <LoadingButton onClick={handleClick} loading={loading} color={color} {...rest} />;
}
