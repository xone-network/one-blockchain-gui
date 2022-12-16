import { createApi } from '@reduxjs/toolkit/query/react';
import oneLazyBaseQuery from './oneLazyBaseQuery';

export const baseQuery = oneLazyBaseQuery({});

export default createApi({
  reducerPath: 'oneApi',
  baseQuery,
  endpoints: () => ({}),
});
