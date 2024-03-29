import { createSlice, createSelector, PayloadAction, createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../../store"

type authState = {
	user: any | null,
	loggedIn: boolean,
	loading: boolean
}

const initialAuthState: authState = {
	user: null,
	loggedIn: false,
	loading: true
}

export const authSlice = createSlice({
	name: "authContext",
	initialState: initialAuthState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setActiveUser: (state, action: PayloadAction<any | null>) => {
			state.user = action.payload
			state.loggedIn = true

			console.log('Current user set to: ', state.user)
			console.log('Current auth login state: ', state.loggedIn)
		},
		logUserOut: (state) => {
			state.user = null
			state.loggedIn = false
		}
	}
})

export const { setActiveUser, setLoading, logUserOut } = authSlice.actions

const selectSelf = (state: RootState) => state

export const getFullUserData = createSelector(
	selectSelf,
	state => state.auth.user
)

export const getUserEmail = createSelector(
	selectSelf,
	(state: RootState) => state.auth.user.email
)

export const getUserId = createSelector(
	selectSelf,
	(state: RootState) => state.auth.user.uid
)

export const getLoggedState = createDraftSafeSelector(
	selectSelf,
	(state: RootState) => state.auth.loggedIn
)

export const getLoadingState = createDraftSafeSelector(
	selectSelf,
	(state: RootState) => state.auth.loading
)

export const checkIsAdmin = createDraftSafeSelector(
	selectSelf,
	(state: RootState) => {
		if (state.auth.loggedIn) {
			const adminUID = process.env.CFG_adminUID
			return state.auth.user.uid === adminUID
		} else {
			return false
		}
	}

)
export default authSlice.reducer