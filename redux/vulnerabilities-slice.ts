import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Vulnerability } from "@/types"
import type { RootState } from "./store"

interface VulnerabilitiesState {
  vulnerabilities: Vulnerability[]
  isAnalyzing: boolean
}

const initialState: VulnerabilitiesState = {
  vulnerabilities: [],
  isAnalyzing: false,
}

const vulnerabilitiesSlice = createSlice({
  name: "vulnerabilities",
  initialState,
  reducers: {
    setVulnerabilities: (state, action: PayloadAction<Vulnerability[]>) => {
      state.vulnerabilities = action.payload
      state.isAnalyzing = false
    },
    startAnalyzing: (state) => {
      state.isAnalyzing = true
    },
    clearVulnerabilities: (state) => {
      state.vulnerabilities = []
      state.isAnalyzing = false
    },
  },
})

export const { setVulnerabilities, startAnalyzing, clearVulnerabilities } = vulnerabilitiesSlice.actions

// Selectors
export const selectVulnerabilities = (state: RootState) => state.vulnerabilities.vulnerabilities
export const selectIsAnalyzing = (state: RootState) => state.vulnerabilities.isAnalyzing

export default vulnerabilitiesSlice.reducer
