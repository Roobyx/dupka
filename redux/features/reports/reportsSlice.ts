import { createSlice, PayloadAction, createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { Report } from '../../../src/interfaces/interfaces'

// type ReportsState = {
// 	allReports: Report[]
// }

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

export const getAllReports = createDraftSafeSelector(
	selectSelf,
	state => state.reports.allReports
)

export const getUnnaprovedReportsCount = createDraftSafeSelector(
	selectSelf,
	state => state.reports.allReports.filter((report: Report) => report.status === 'pending').length
)

export default reportsSlice.reducer