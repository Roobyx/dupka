import { createSlice, createSelector, PayloadAction, createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { Report } from '../../../src/interfaces/interfaces'

type ReportsState = {
	allReports: Report[]
}

const initialReportState = {
	allReports: []
}

export const reportsSlice = createSlice({
	name: "reportsContext",
	initialState: initialReportState,
	reducers: {
		setReports: (state, action: PayloadAction<any | null>) => {
			state.allReports = action.payload
		}
	}
})

export const { setReports } = reportsSlice.actions

const selectSelf = (state: RootState) => state

export const getAllReports = createSelector(
	selectSelf,
	state => state.reports.allReports
)

// export const getUserEmail = createSelector(
// 	selectSelf,
// 	(state: RootState) => state.auth.user.email
// )

// export const getUserUid = createSelector(
// 	selectSelf,
// 	(state: RootState) => state.auth.user.uid
// )

// export const getLoggedState = createDraftSafeSelector(
// 	selectSelf,
// 	(state: RootState) => state.auth.loggedIn
// )

// export const getLoadingState = createDraftSafeSelector(
// 	selectSelf,
// 	(state: RootState) => state.auth.loading
// )

export default reportsSlice.reducer