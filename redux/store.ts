import { configureStore } from "@reduxjs/toolkit"
import vulnerabilitiesReducer from "./vulnerabilities-slice"
import recommendationsReducer from "./recommendations-slice"

export const store = configureStore({
  reducer: {
    vulnerabilities: vulnerabilitiesReducer,
    recommendations: recommendationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
