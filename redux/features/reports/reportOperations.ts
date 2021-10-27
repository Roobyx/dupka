import { getDocs } from "@firebase/firestore"
import { reportsCollectionRef } from "../../../firebaseSetup"

export const fetchAllReports = async () => {
	const reportSnap = await getDocs(reportsCollectionRef)
	let reportsRes: any[] = []

	reportSnap.forEach((doc) => {
		let reportId = doc.id,
			reportData = doc.data()

		reportsRes.push({
			reportId,
			...reportData
		})
	})

	return reportsRes
}