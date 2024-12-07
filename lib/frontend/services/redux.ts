import { configureStore } from '@reduxjs/toolkit'
import {
  ApiEndpointQuery,
  QueryDefinition,
} from '@reduxjs/toolkit/query'
import queries, { endpoints } from '~/lib/frontend/queries'

const store = configureStore(queries)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export type QueryKey = NonNullable<keyof typeof endpoints>
export type Queries = {
  [K in keyof typeof endpoints]?: (typeof endpoints)[K] extends ApiEndpointQuery<
    infer Definition,
    any
  >
    ? Definition extends QueryDefinition<
        any,
        any,
        any,
        infer ResultType,
        any
      >
      ? ResultType
      : never
    : never
}

export default store
