import { LocationObject } from "expo-location";
import { Timestamp } from "firebase/firestore";
import { IFabProps } from "native-base/lib/typescript/components/composites/Fab/types";
import { TActionSheetItem } from "./types";

export interface Page {
	navigation?: any,
	route?: any
}

export interface Report {
	address: string,
	location: LocationObject,
	rating: number,
	reportImage: string,
	approved: boolean,
	timestamp: Timestamp,
	uid: string
}

export interface IFabMenu {
	fab: IFabProps,
	actionSheetTitle: string,
	actionSheetItems: TActionSheetItem[]
}

export interface INavigate {
	(screen: string): void
}