import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
  'X-RapidAPI-Key': '33812d6adcmsh58614cb6238f861p1be673jsn26e9a6872aeb',
  'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
};

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://crypto-news16.p.rapidapi.com/news',
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => createRequest(`/top/${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
