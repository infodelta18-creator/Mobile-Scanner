import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Recommendation } from "@/types"
import type { RootState } from "./store"

interface RecommendationsState {
  recommendations: Recommendation[]
}

const initialState: RecommendationsState = {
  recommendations: [],
}

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    setRecommendations: (state, action: PayloadAction<Recommendation[]>) => {
      state.recommendations = action.payload
    },
    clearRecommendations: (state) => {
      state.recommendations = []
    },
  },
})

export const { setRecommendations, clearRecommendations } = recommendationsSlice.actions

// Selectors
export const selectRecommendations = (state: RootState) => state.recommendations.recommendations

export default recommendationsSlice.reducer
