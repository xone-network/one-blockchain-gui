import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps } from '@mui/material';
import { One } from '@one/icons';

const StyledOne = styled(One)`
  max-width: 100%;
  width: auto;
  height: auto;
`;

export default function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <StyledOne />
    </Box>
  );
}
