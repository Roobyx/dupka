// Vendor
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {
	Button,
	Center,
	Pressable,
	Text,
	Heading,
	Box,
	Container,
} from 'native-base';

// Assets
import icon from '../../../../assets/icon.png';

// Templates
import {Screen} from '../../../interfaces/interfaces';
import AuthWrapper from '../../Templates/AuthWrapper';
import {signInAnonymously} from '@firebase/auth';
import {auth} from '../../../../firebaseSetup';
import {
	setActiveUser,
	setLoading,
} from '../../../../redux/features/auth/authSlice';
import {useAppDispatch} from '../../../../redux/features/hooks';

const Landing: React.FC<Screen> = ({navigation}) => {
	const dispatch = useAppDispatch();
	// const IconImage = Image.resolveAssetSource(icon)

	const onAnonymus = async () => {
		setLoading(true);
		try {
			const res = await signInAnonymously(auth);
			const user = JSON.parse(JSON.stringify(res.user));

			if (user) {
				// console.log('successfully logged user: ', res.user.email)
				dispatch(setActiveUser(user));
				navigation.navigate('Home');
			}
		} catch (e: any) {
			console.log('Error: ', e.code, e.message);
		}
	};

	return (
		<AuthWrapper>
			<Box style={styles.container}>
				<Box>
					<Button style={styles.button} my={4} onPress={onAnonymus}>
						Continue without logging in
					</Button>
					<Button
						style={styles.button}
						onPress={() => navigation.navigate('Login')}
					>
						Log in
					</Button>
				</Box>

				<Center>
					<Pressable
						pt='2'
						onPress={() => navigation.navigate('Register')}
					>
						<Text color={'#fff'}> Don't have an account? </Text>
					</Pressable>
				</Center>
			</Box>
		</AuthWrapper>
	);
};

export default Landing;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	iconImage: {
		flex: 1,
	},
	button: {
		// height: 40,
		borderWidth: 1,
		padding: 10,
		borderRadius: 50,
	},
});
