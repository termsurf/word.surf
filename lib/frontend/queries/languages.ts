import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TAG_TYPES } from '~/lib/frontend/constants/tags'
import {
  array,
  query,
  tags,
  transformResponse,
} from '~/lib/frontend/utilities/query'
import {
  GetLanguageStringListQueryParams,
  GetLanguageStringListResponse,
  GetLanguageStringListsResponse,
} from '~/lib/shared/queries/language-string-lists'
import {
  GetLanguageStringAnagramsResponse,
  GetLanguageStringInflectionsResponse,
  GetLanguageStringQueryParams,
  GetLanguageStringResponse,
  GetLanguageStringsResponse,
} from '~/lib/shared/queries/language-strings'
import {
  CreateLanguageResponse,
  GetLanguageQueryParams,
  GetLanguageResponse,
  GetLanguages,
  GetLanguagesResponse,
  NewLanguage,
} from '~/lib/shared/queries/languages'
import {
  GetScriptQueryParams,
  GetScriptResponse,
  GetScriptsResponse,
} from '~/lib/shared/queries/scripts'
import {
  GetUserProfileResponse,
  GetUsersQueryParams,
  GetUsersResponse,
} from '~/lib/shared/queries/users'
import { BASE_QUERY_PATH } from '~/lib/shared/utilities/host'

const queries = createApi({
  reducerPath: 'languages', // The key in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: BASE_QUERY_PATH }),
  tagTypes: TAG_TYPES, // Tags for caching and invalidation
  endpoints: builder => ({
    getLanguages: builder.query<
      GetLanguagesResponse,
      GetLanguages | void
    >({
      query: params => query('/languages', params),
      providesTags: ['language'],
      transformResponse,
    }),
    getLanguage: builder.query<
      GetLanguageResponse,
      GetLanguageQueryParams
    >({
      query: ({ slug }) => `/languages/${slug}`,
      providesTags: (r, e, { slug }) => [
        { type: 'language', id: slug },
      ],
      transformResponse,
    }),
    getLanguageStrings: builder.query<
      GetLanguageStringsResponse,
      GetLanguageQueryParams
    >({
      query: ({ slug, roles, isHead }) =>
        query(`/languages/${slug}`, { roles, head: isHead }),
      providesTags: tags(({ slug, roles, isHead }) => [
        { type: 'language', id: slug },
        ...array(roles, role => ({
          type: 'language-string-role',
          id: role,
        })),
        { type: 'language-string-head', id: String(isHead) },
      ]),
      transformResponse,
    }),
    getLanguageString: builder.query<
      GetLanguageStringResponse,
      GetLanguageStringQueryParams
    >({
      query: ({ languageSlug, stringSlug }) =>
        `/languages/${languageSlug}/strings/${stringSlug}`,
      providesTags: tags(({ languageSlug, stringSlug }) => [
        { type: 'language', id: languageSlug },
        { type: 'language-string', id: stringSlug },
      ]),
      transformResponse,
    }),
    getLanguageLists: builder.query<
      GetLanguageStringListsResponse,
      GetLanguageQueryParams
    >({
      query: ({ slug }) => `/languages/${slug}`,
      providesTags: (r, e, { slug }) => [
        { type: 'language', id: slug },
      ],
      transformResponse,
    }),
    getLanguageList: builder.query<
      GetLanguageStringListResponse,
      GetLanguageStringListQueryParams
    >({
      query: ({ languageSlug, listPath }) =>
        `/languages/${languageSlug}/lists/${listPath}`,
      providesTags: tags(({ languageSlug, listPath }) => [
        { type: 'language', id: languageSlug },
        { type: 'language-string-list', id: listPath },
      ]),
      transformResponse,
    }),
    getLanguageStringInflections: builder.query<
      GetLanguageStringInflectionsResponse,
      GetLanguageStringQueryParams
    >({
      query: ({ languageSlug, stringSlug }) =>
        `/languages/${languageSlug}/strings/${stringSlug}/inflections`,
      providesTags: tags(({ languageSlug, stringSlug }) => [
        { type: 'language', id: languageSlug },
        { type: 'language-string', id: stringSlug },
      ]),
      transformResponse,
    }),
    getLanguageStringAnagrams: builder.query<
      GetLanguageStringAnagramsResponse,
      GetLanguageStringQueryParams
    >({
      query: ({ languageSlug, stringSlug }) =>
        `/languages/${languageSlug}/strings/${stringSlug}/anagrams`,
      providesTags: tags(({ languageSlug, stringSlug }) => [
        { type: 'language', id: languageSlug },
        { type: 'language-string', id: stringSlug },
      ]),
      transformResponse,
    }),
    getScripts: builder.query<GetScriptsResponse, void>({
      query: () => '/scripts',
      providesTags: ['script'],
      transformResponse,
    }),
    getScript: builder.query<GetScriptResponse, GetScriptQueryParams>({
      query: ({ scriptSlug }) => `/scripts/${scriptSlug}`,
      providesTags: tags(({ scriptSlug }) => [
        { type: 'script', id: scriptSlug },
      ]),
      transformResponse,
    }),
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => `/users`,
      providesTags: ['user'],
      transformResponse,
    }),
    getUser: builder.query<GetUserProfileResponse, GetUsersQueryParams>(
      {
        query: ({ slug }) => `/users/${slug}`,
        providesTags: tags(({ slug }) => [{ type: 'user', id: slug }]),
        transformResponse,
      },
    ),
    createLanguage: builder.mutation<
      CreateLanguageResponse,
      NewLanguage
    >({
      query: language => ({
        url: '/languages',
        method: 'POST',
        body: language,
      }),
      invalidatesTags: ['language'], // Invalidate cache to refetch posts
    }),
  }),
})

export const mappings = {
  getLanguages: queries,
  getLanguage: queries,
  getLanguageStrings: queries,
  getLanguageString: queries,
  getLanguageLists: queries,
  getLanguageList: queries,
  getLanguageStringInflections: queries,
  getLanguageStringAnagrams: queries,
  getScripts: queries,
  getScript: queries,
  getUsers: queries,
  getUser: queries,
  createLanguage: queries,
}

export const {
  useGetLanguagesQuery,
  useGetLanguageQuery,
  useGetScriptsQuery,
  useGetScriptQuery,
  useCreateLanguageMutation,
} = queries

export default queries
