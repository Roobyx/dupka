import React from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import { Box, Center, ScrollView, Image, Heading, Button, HStack } from 'native-base'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebaseSetup'
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
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		updateReports().then(() => setRefreshing(false))
	}, [])

	const allReports: Report[] = useAppSelector(getAllReports)

	const manageReport = async (action: string, report: Report) => {
		const status = action === 'approve' ? 'approved' : 'rejected'

		try {
			console.log('Trying to amend  data')

			const docRef = await setDoc(doc(db, "reports", report.reportId), {
				...report,
				status: status
			})
			
			console.log("Document amended")
			updateReports()

		} catch(e) {
			console.log('Error in db write: ', e)
		}
	}
	
	return (
		<ScrollView 
			flex={1} 
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}
		>
			{
				allReports.map(
					(report, index) => {

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
											<Button bg='green.400' w='40%' onPress={() => manageReport('approve', report)}> Approve </Button>
											<Button bg='red.600' w='40%' onPress={() => manageReport('reject', report)}> Reject </Button>
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
const styles = StyleSheet.create({})

export default AdminFeed