import { createSlice, PayloadAction, createDraftSafeSelector } from "@reduxjs/toolkit"
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

export const getAllReports = createDraftSafeSelector(
	selectSelf,
	state => {
		return state.reports.allReports
	}
)

export const getUnnaprovedReportsCount = createDraftSafeSelector(
	selectSelf,
	state => {
		let unapproved = 0

		state.reports.allReports.forEach((report: Report) => {
			if (report.status === 'pending') {
				unapproved++
			}
		})

		return unapproved
	}
)

export default reportsSlice.reducer