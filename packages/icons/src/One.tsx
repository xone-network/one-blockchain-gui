import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

import OneIcon from './images/one.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={OneIcon} viewBox="0 0 300 300" {...props} />;
}
