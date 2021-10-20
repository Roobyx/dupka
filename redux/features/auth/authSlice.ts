import { createSlice, createDraftSafeSelector, createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { PURGE } from 'redux-persist'

type authState = {
	user: any,
	loggedIn: boolean
}

const initialAuthState: authState = {
	user: {},
	loggedIn: false
}

export const authSlice = createSlice({
	name: "authContext",
	initialState: initialAuthState,
	reducers: {
		setActiveUser: (state, { payload }) => {
			state.user = payload
			state.loggedIn = true
			console.log('Current user set to: ', state.user)
			console.log('Current auth login state: ', state.loggedIn)
		},
		setLoggedOut: (state) => {
			state = initialAuthState
			state.loggedIn = false
		}
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(PURGE, (state) => {
	// 		authSlice.removeAll(state)
	// 	})
	// }
})

export const { setActiveUser, setLoggedOut } = authSlice.actions

const selectSelf = (state: RootState) => state

export const getFullUserData = createSelector(
	selectSelf,
	state => state.auth.user
)

export const getUserEmail = createSelector(
	selectSelf,
	(state: RootState) => state.auth.user.email
)

export const getLoggedState = createSelector(
	selectSelf,
	(state: RootState) => state.auth.loggedIn
)

export default authSlice.reducer