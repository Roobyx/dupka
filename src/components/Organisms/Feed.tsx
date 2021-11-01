import React from 'react'
import { StyleSheet, RefreshControl } from 'react-native'
import { Center, ScrollView, Image, Heading } from 'native-base'
import { getAllReports, setReports } from '../../../redux/features/reports/reportsSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/features/hooks'
import { Report } from '../../interfaces/interfaces'
import FeedItem from '../Molecules/FeedItem'
import LoadingIndicator from '../Molecules/LoadingIndicator'
import { fetchAllReports } from '../../../redux/features/reports/reportOperations'

const Feed = () => {
	const allReports: Report[] = useAppSelector(getAllReports)
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
					(report) => {
						return (
							report.status === 'approved' && (
								<Center key={report.reportId} p='30'>
									{/* <FeedItem reportId={report.reportId} address={report.address} timestamp={report.timestamp} imageUri={report.reportImage} rating={report.rating} /> */}
									<FeedItem report={report} />
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
