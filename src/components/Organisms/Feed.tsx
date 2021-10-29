import React from 'react'
import { StyleSheet } from 'react-native'
import { Center, ScrollView, Image, Heading } from 'native-base'
import { getAllReports } from '../../../redux/features/reports/reportsSlice'
import { useAppSelector } from '../../../redux/features/hooks'
import { Report } from '../../interfaces/interfaces'
import FeedItem from '../Molecules/FeedItem'

const Feed = () => {
	const allReports: Report[] = useAppSelector(getAllReports)
	
	return (
		<ScrollView flex={1}>
			{
				allReports.map(
					(report) => {
						return (
							report.status === 'approved' && (
								<Center key={report.reportId} p='30'>
									<FeedItem address={report.address} timestamp={report.timestamp} imageUri={report.reportImage} rating={report.rating} />
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
