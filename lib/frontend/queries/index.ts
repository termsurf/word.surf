import { combineReducers } from '@reduxjs/toolkit'
import { QueryKey } from '../services/redux'
import languages, { mappings as languageMappings } from './languages'
import pages, { mappings as pageMappings } from './pages'

const queries = {
  reducer: combineReducers({
    [languages.reducerPath]: languages.reducer,
    [pages.reducerPath]: pages.reducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(languages.middleware)
      .concat(pages.middleware),
}

// Combine all endpoints into a single type
export type Queries = typeof languages & typeof pages

// Combine all endpoints from all APIs
export const endpoints = {
  ...languages.endpoints,
  ...pages.endpoints,
  // Add other APIs here
}

export const mappings: Record<
  QueryKey,
  typeof languages | typeof pages
> = {
  ...languageMappings,
  ...pageMappings,
}

export const { useGetLanguagesQuery, useGetLanguageQuery } = languages

export const {
  useGetPageQuery,
  useUpdateDraftMutation,
  usePublishLanguageDraftMutation,
} = pages

export default queries
