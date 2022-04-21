import { LocationObject } from "expo-location";
import { Timestamp } from "firebase/firestore";
import { IFabProps } from "native-base/lib/typescript/components/composites/Fab/types";
import { TActionSheetItem } from "./types";

export interface Screen {
	navigation?: any,
	route?: any
}

export interface Report {
	reportId: string,
	address: string,
	location: LocationObject,
	rating: number,
	rates: string[],
	reportImage: string,
	likes: string[],
	status: 'approved' | 'pending' | 'rejected',
	timestamp: Timestamp
}

export interface IFabMenu {
	fab: IFabProps,
	actionSheetTitle: string,
	actionSheetItems: TActionSheetItem[]
}

export interface IActionMenuContainer {
	actionSheetTitle: string,
	actionSheetItems: TActionSheetItem[]
}

export interface INavigate {
	(screen: string): void
}