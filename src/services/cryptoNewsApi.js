import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://crypto-news16.p.rapidapi.com";

const newsHeaders = {
	"X-RapidAPI-Key": "b15af858femsh027900c5b2fd6f9p1ea827jsn3a053e863883",
	"X-RapidAPI-Host": "crypto-news16.p.rapidapi.com",
};

const createRequest = (url) => ({
	url,
	headers: newsHeaders,
});

export const cryptoNewsApi = createApi({
	reducerPath: "cryptoNewsApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptoNews: builder.query({
			query: ({ newsCategory, count }) =>
				createRequest(`/news/${newsCategory}/${count}`),
		}),
	}),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
