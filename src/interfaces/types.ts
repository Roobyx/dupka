import { Timestamp } from "@firebase/firestore"
import { LocationObject } from "expo-location"

export type NavElement = {
	navigation: any
}

export type Feed = {
	userEmail: string,
	locationText: string
}

export type Region = {
	latitude: number,
	longitude: number,
	latitudeDelta: number | 0.015,
	longitudeDelta: number | 0.0121,
}

export type MapMode = {
	mode: 'default' | 'heatmap'
}

export type TActionSheetItem = {
	itemCallback: () => void,
	text: string
}

export type photoSize = {
	width: number;
	height: number;
};