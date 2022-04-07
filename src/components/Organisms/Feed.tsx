import React from 'react'
import { StyleSheet, RefreshControl } from 'react-native'
import { Center, ScrollView } from 'native-base'
import { getAllReports, setReports } from '../../../redux/features/reports/reportsSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/features/hooks'
import { Report } from '../../interfaces/interfaces'
import FeedItem from '../Molecules/FeedItem'
// import LoadingIndicator from '../Molecules/LoadingIndicator'
import { fetchAllReports } from '../../../redux/features/reports/reportOperations'
import { LinearGradient } from 'expo-linear-gradient'
import { orderBy } from 'lodash'

const Feed = () => {
	const allReports: Report[] = useAppSelector(getAllReports)
	const dispatch = useAppDispatch()

	const updateReports = async () => {
		const fetchedReports = await fetchAllReports()
		let parsedReports = JSON.parse(JSON.stringify(fetchedReports))
		parsedReports = orderBy(parsedReports, ['timestamp.seconds'], ['asc'])
		dispatch(setReports(parsedReports))
	}
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		updateReports().then(() => setRefreshing(false))
	}, [])

	return (
		<LinearGradient
			colors={['#2c5364', '#203a43', '#0f2027']}
			style={styles.background}
		>
			<ScrollView
				// flex={1}
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
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
	},
})

export default Feed