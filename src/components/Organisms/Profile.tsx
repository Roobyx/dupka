import React, { Fragment, ReactChildren } from 'react'
import { StyleSheet, Image, Pressable } from 'react-native'
import { Box, Button, Text, Center, Icon, ScrollView, HStack, Divider, Heading, Link } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { getFullUserData, logUserOut } from '../../../redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/features/hooks'
import Ionicon from 'react-native-vector-icons/Ionicons'

type Props = {
	text?: string
	borders?: boolean
	topBorderOnly?: boolean
	bottomBorderOnly?: boolean
	iconName?: string
	action?: () => void
	href?: string
};

const Action: React.FC<Props> = ({
	text,
	action,
	iconName,
	href,
	borders = false,
	topBorderOnly = false,
	bottomBorderOnly = false,
}) => {
	
	const content = () => (
		<>
			{ (borders || topBorderOnly) && <Divider my="2" /> }
			<HStack
				justifyContent={'space-between'}
			>
				<HStack>
					{
						iconName && (
							<Icon mr="1.5" color={'#fff'} size='sm' as={
								<Ionicon name={iconName} />
							} />
						)
					}

					{text}
				</HStack>

				{
					iconName && (
						<Icon mr="1.5" color={'#fff'} size='sm' as={
							<Ionicon name={'chevron-forward-outline'} />
						} />
					)
				}
			</HStack>
			{ (borders || bottomBorderOnly) && <Divider my="2" /> }
		</>
	)

	if (action) {
		return (
			<Box my="3">
				{ content }
			</Box>
		)
	} else if(href) {
		return (
			<Link 
				_text={{
					color: "#fff"
				}}
				href={href}
			>
				{ content }
			</Link>
		)
	} else {
		return (
			<>
				{ content }
			</>
		)
	}

}

const Profile = () => {
	const dispatch = useAppDispatch()
	const loggedInUser = useAppSelector(getFullUserData)
	const logout = () => {
		dispatch(logUserOut())
	}
	console.log('UseR: ', loggedInUser.isAnonymous);

	return (
		<LinearGradient
			colors={['#2c5364', '#203a43', '#0f2027']}
			style={styles.background}
		>
			<ScrollView
				p={10}
			>
				<Box>
					{/* <HStack>
						<Icon color={'#fff'} size='xl' as={
							<Ionicon name="person-circle-outline" />
						} />
						{ loggedInUser.isAnonymous && <Text> Anonymous </Text> }
					</HStack> */}

					<Action>
						<>
							<Icon color={'#fff'} size='xl' as={
								<Ionicon name="person-circle-outline" />
							} />
							{ loggedInUser.isAnonymous && (
								<Text fontSize="2xl" color={'#fff'}> Anonymous </Text>
							)}
						</>
					</Action>


					<Heading 
						my="5"
						color="#fff"
					>
						Legal
					</Heading>

					<Action 
						bottomBorderOnly
						iconName='link'
						text='Privacy Policy'
						href='#'
					>
					</Action>
					<Action 
						bottomBorderOnly
						iconName='link'
						text='Terms and conditions'
						href='#'
					>
					</Action>
					
					<Heading 
						my="5"
						color="#fff"
					>
						Actions
					</Heading>

					<Action 
						bottomBorderOnly
						iconName='log-out-outline'
						action={() => logout() }
						text='Logout'
					>
					</Action>
				</Box>
				
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
	iconImage: {
		flex: 1
	},
})
export default Profile