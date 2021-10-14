import React, { useState } from "react"
import { onAuthStateChanged, User } from "@firebase/auth"

import { auth } from "../../firebaseSetup"
import { AuthContext } from "../context/AuthContext"


export const AuthProvider: React.FC = ({ children }) => {
	// Abstracted state for the user. Made global by the usage of a Provider
	const [user, setUser] = useState<User | null>(null)

	// Firebase onChange for the user
	onAuthStateChanged(auth, firebaseUser => {
		setUser(firebaseUser)
	})

	return (
		<AuthContext.Provider value={user}>
			{children}
		</AuthContext.Provider>
	)
}