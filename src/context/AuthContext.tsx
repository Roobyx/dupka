import React from "react"
import { User } from "@firebase/auth"

// Context with a TS type for the user
export const AuthContext = React.createContext<User | null>(null);``