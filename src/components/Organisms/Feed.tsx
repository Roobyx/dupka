import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Box, Center, ScrollView, Text, Image, Heading } from 'native-base'
import { getDocs } from 'firebase/firestore'
import { reportsCollectionRef } from '../../../firebaseSetup'
import { getAllReports, setReports } from '../../../redux/features/reports/reportsSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/features/hooks'
import { Report } from '../../interfaces/interfaces'

const Feed = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		(async ()=> {
			const reportSnap = await getDocs(reportsCollectionRef)
			let reportsRes: any[] = []
			reportSnap.forEach((doc) => {
				reportsRes.push(JSON.parse(JSON.stringify(doc.data())))
			})

			dispatch(setReports(reportsRes))
		})()
	}, [])

	const allReports: Report[] = useAppSelector(getAllReports)
	// console.log('Reps: ', allReports)


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
						return (
							report.approved && (
								<Center key={index} p='30'>
									<Heading> {report.address} </Heading>
									
									<Image source={{
										uri: report.reportImage
									}} alt={report.address} size='2xl' resizeMode='contain' />
	
									{/* <Text> {()=> {new Date(report.timestamp).toLocaleString()}} </Text> */}
								</Center>
							)
						)
					}
				)
			}
		</ScrollView>
	)
}

export default Feed

const styles = StyleSheet.create({})
