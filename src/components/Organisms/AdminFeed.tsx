import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Box, Center, ScrollView, Text, Image, Heading, Button, Row, Stack, HStack } from 'native-base'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db, reportsCollectionRef } from '../../../firebaseSetup'
import { getAllReports, setReports } from '../../../redux/features/reports/reportsSlice'
import { fetchAllReports } from '../../../redux/features/reports/reportOperations'
import { useAppDispatch, useAppSelector } from '../../../redux/features/hooks'
import { Report } from '../../interfaces/interfaces'

const AdminFeed = () => {
	const dispatch = useAppDispatch()

	const updateReports = async () => {
		const fetchedReports = await fetchAllReports()
		const parsedReports = JSON.parse(JSON.stringify(fetchedReports))
		dispatch(setReports(parsedReports))
	}
	// useEffect(() => {
	// 	(async ()=> {
	// 		const reportSnap = await getDocs(reportsCollectionRef)
	// 		let reportsRes: any[] = []
	// 		reportSnap.forEach((doc) => {
	// 			// console.log('##################################')
	// 			// console.log(JSON.parse(JSON.stringify(doc.id)), JSON.parse(JSON.stringify(doc.data())))
	// 			// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

	// 			let reportId = JSON.parse(JSON.stringify(doc.id)),
	// 				reportData = JSON.parse(JSON.stringify(doc.data()))

	// 			// reportsRes.push(JSON.parse(JSON.stringify(doc.data())))
	// 			reportsRes.push({
	// 				id: reportId,
	// 				reportData
	// 			})
	// 		})

	// 		dispatch(setReports(reportsRes))
	// 	})()
	// }, [])

	const allReports: Report[] = useAppSelector(getAllReports)

	// console.log('All reports in adminFeed: ', allReports)

	const reportApprove = async (report: Report) => {
		try {
			console.log('Trying to amend  data')

			const docRef = await setDoc(doc(db, "reports", report.reportId), {
				...report,
				status: 'approved'
			})
			
			console.log("Document amended")
			updateReports()
			
		} catch(e) {
			console.log('Error in db write: ', e)
		}
	}

	const reportReject = (report: Report) => {
		
	}

	// vXgmDhJaY85rxLWNsCG2  =>  Object {
	// 	"address": "86, ulitsa \"Sredna Gora\", 1303, Sofia",
	// 	"location": Object {
	// 	  "coords": Object {
	// 		"accuracy": 20,
	// 		"altitude": 586.5638828098644,
	// 		"altitudeAccuracy": 3,
	// 		"heading": 0,
	// 		"latitude": 42.7036466,
	// 		"longitude": 23.3121946,
	// 		"speed": 0,
	// 	  },
	// 	  "mocked": false,
	// 	  "timestamp": 1635089145884,
	// 	},
	// 	"rating": 5,
	// 	"reportImage": "https://firebasestorage.googleapis.com/v0/b/dupka-d8175.appspot.com/o/reports%2FG9AyamPy6PPRJG3u13XvPLNkK2D3%2F216601a3-d245-4c9a-b0cc-7519af14e5d7?alt=media&token=22743061-ed23-48dc-943f-c89eb5e0b976",
	// 	"timestamp": Object {
	// 	  "nanoseconds": 251000000,
	// 	  "seconds": 1635101339,
	// 	},
	// 	"uid": "G9AyamPy6PPRJG3u13XvPLNkK2D3",
	//   }
	
	return (
		<ScrollView flex={1}>
			{
				allReports.map(
					(report, index) => {
						// console.log('--################## ')
						// console.log('Report: ', report)
						// console.log('------------------------------------------------------------------------ ')

						return (
							report.status === 'pending' && (
								<Box key={index} px='30'>
									<Center py='30'>
										<Heading> {report.address} </Heading>
										
										<Image source={{
											uri: report.reportImage
										}} alt='Report' size='2xl' resizeMode='contain' />
		
									</Center>

									<Center>
										<HStack space={2} alignItems="center">
											<Button bg='green.400' w='40%' onPress={() => reportApprove(report)}> Approve </Button>
											<Button bg='red.600' w='40%' onPress={() => reportReject(report)}> Reject </Button>
										</HStack>
									</Center>
								</Box>
							)
						)
					}
				)
			}
		</ScrollView>
	)
}

export default AdminFeed

const styles = StyleSheet.create({})
