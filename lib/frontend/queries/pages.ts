import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TAG_TYPES } from '~/lib/frontend/constants/tags'
import { tags, transformResponse } from '~/lib/frontend/utilities/query'
import {
  CreateLanguageDraft,
  CreateLanguageDraftResponse,
  DeletePage,
  DeletePageResponse,
  GetPageQueryParams,
  GetPageResponse,
  Page,
  PublishLanguageDraft,
  PublishLanguageDraftResponse,
  UndeletePage,
  UndeletePageResponse,
  UnpublishLanguagePage,
  UnpublishLanguagePageResponse,
  UpdatePage,
} from '~/lib/shared/queries/pages'
import { BASE_QUERY_PATH } from '~/lib/shared/utilities/host'

const queries = createApi({
  reducerPath: 'pages', // The key in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: BASE_QUERY_PATH }),
  tagTypes: TAG_TYPES, // Tags for caching and invalidation
  endpoints: builder => ({
    getPage: builder.query<GetPageResponse, GetPageQueryParams>({
      query: ({ path }) => `/pages${path}`,
      providesTags: tags(({ path }) => [{ type: 'page', id: path }]),
      transformResponse,
    }),
    updateDraft: builder.mutation<Page, UpdatePage>({
      query: page => ({
        url: `/pages/drafts/${page.id}`,
        method: 'PATCH',
        body: page,
      }),
      invalidatesTags: ['page'], // Invalidate cache to refetch posts
    }),
    createLanguageDraft: builder.mutation<
      CreateLanguageDraftResponse,
      CreateLanguageDraft
    >({
      query: page => ({
        url: '/pages/drafts',
        method: 'POST',
        body: page,
      }),
      invalidatesTags: ['page'], // Invalidate cache to refetch posts
    }),
    publishLanguageDraft: builder.mutation<
      PublishLanguageDraftResponse,
      PublishLanguageDraft
    >({
      query: page => ({
        url: `/pages/drafts/${page.id}/publish`,
        method: 'POST',
        body: page,
      }),
      invalidatesTags: ['page'], // Invalidate cache to refetch posts
    }),
    unpublishLanguagePage: builder.mutation<
      UnpublishLanguagePageResponse,
      UnpublishLanguagePage
    >({
      query: page => ({
        url: `/pages/${page.id}/unpublish`,
        method: 'POST',
        body: page,
      }),
      invalidatesTags: ['page'], // Invalidate cache to refetch posts
    }),
    deletePage: builder.mutation<DeletePageResponse, DeletePage>({
      query: page => ({
        url: `/pages/${page.id}`,
        method: 'DELETE',
        body: page,
      }),
      invalidatesTags: ['page'], // Invalidate cache to refetch posts
    }),
    undeletePage: builder.mutation<UndeletePageResponse, UndeletePage>({
      query: page => ({
        url: `/pages/${page.id}/undelete`,
        method: 'PATCH',
        body: page,
      }),
      invalidatesTags: ['page'], // Invalidate cache to refetch posts
    }),
  }),
})

export const mappings = {
  getPage: queries,
  updateDraft: queries,
  createLanguageDraft: queries,
  publishLanguageDraft: queries,
  unpublishLanguagePage: queries,
  deletePage: queries,
  undeletePage: queries,
}

export const {
  useGetPageQuery,
  useCreateLanguageDraftMutation,
  useUpdateDraftMutation,
  usePublishLanguageDraftMutation,
  useUnpublishLanguagePageMutation,
} = queries

export default queries
