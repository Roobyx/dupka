import React from 'react'
import { StyleSheet } from 'react-native'
import { Center, ScrollView, Image, Heading } from 'native-base'
import { getAllReports } from '../../../redux/features/reports/reportsSlice'
import { useAppSelector } from '../../../redux/features/hooks'
import { Report } from '../../interfaces/interfaces'

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
