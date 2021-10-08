import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, useColorScheme, Button } from 'react-native'

type pageType = {
	list: boolean
	navigation?: any
}

const BasicTemplate: React.FC<pageType> = ({navigation, list, children}) => {
	const isDarkMode = useColorScheme() === 'dark',
		backgroundStyle = { }

	return ( <>

	{
		list ? (
			<SafeAreaView style={backgroundStyle}>
				<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
				<ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
					
					<View>
						{ children }
					
							<Button title="Go to profile"
								onPress={() =>
									navigation.navigate('Profile', { name: 'Jane' })
								}
							/>
						
					</View>
				</ScrollView>
			</SafeAreaView>
		) : (
			<View>
					{ children }
			</View>
		)}
	</>)
}

export default BasicTemplate
