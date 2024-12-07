import { createSelector } from '@reduxjs/toolkit'
import { State } from '~/lib/frontend/services/redux'

export const selectLanguagesWithPreferences = createSelector(
  (state: State) => state.languages.queries['getLanguages']?.data || [],
  languages => {
    return languages
  },
)
