// Vendor
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Share} from 'react-native';
import {
	Box,
	Heading,
	Text,
	Image,
	AspectRatio,
	Icon,
	Stack,
	HStack,
	Button,
	Modal,
	Spacer,
} from 'native-base';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Ionicon from 'react-native-vector-icons/Ionicons';

// Firebase
import {doc, setDoc, Timestamp} from 'firebase/firestore';
import {db} from '../../../firebaseSetup';
// import { linkWithRedirect } from '@firebase/auth'

// Redux
import {useAppDispatch, useAppSelector} from '../../../redux/features/hooks';
import {getUserId} from '../../../redux/features/auth/authSlice';
import {fetchAllReports} from '../../../redux/features/reports/reportOperations';
import {setReports} from '../../../redux/features/reports/reportsSlice';

// Custom
import LoadingIndicator from './LoadingIndicator';
import {Report} from '../../interfaces/interfaces';
import StarRating from 'react-native-star-rating-widget';

type TFeedItem = {
	report: Report;
};

const FeedItem = ({report}: TFeedItem) => {
	const userId = useAppSelector(getUserId);
	const dispatch = useAppDispatch();
	// const dispatch2 = useAppDispatch();
	const [showModal, setShowModal] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [rating, setRating] = useState(0);

	const updateReports = async () => {
		const fetchedReports = await fetchAllReports();
		const parsedReports = JSON.parse(JSON.stringify(fetchedReports));
		dispatch(setReports(parsedReports));
	};

	let reportLiked = useRef(false);
	let reportRated = useRef(false);

	useEffect(() => {
		if (report.likes) {
			reportLiked.current = report.likes.includes(userId);
		}

		if (report.rates) {
			reportRated.current = report.rates.includes(userId);
		}
	}, [report]);

	const onShare = async () => {
		const baseUrl = 'https://dupka-web.vercel.app/r:';

		try {
			const result = await Share.share({
				message: baseUrl + report.reportId,
			});

			console.log('Share URL: ', baseUrl + report.reportId);

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			alert(error.message);
		}
	};

	const getTime = (seconds: number) => {
		const time = new Date(Date.UTC(1970, 0, 1));
		time.setSeconds(seconds);
		const monthString = new Intl.DateTimeFormat('bg-BG', {
			month: 'long',
		}).format(time);
		const timeString =
			time.getDate() +
			' ' +
			monthString +
			' ' +
			time.getHours() +
			':' +
			time.getMinutes();
		return timeString;
	};

	const reportTime = getTime(report.timestamp.seconds);

	const likeAction = async (doLike: boolean) => {
		let newLikes = [userId];
		setRefreshing(true);

		if (doLike) {
			if (report.likes.length) {
				newLikes = newLikes.concat(report.likes);
			}
		} else {
			newLikes = newLikes.filter(id => {
				return id !== userId;
			});
		}

		try {
			console.log('Trying to amend  data');
			await setDoc(doc(db, 'reports', report.reportId), {
				...report,
				likes: newLikes,
			});

			console.log('Like amended');
			updateReports().then(() => setRefreshing(false));
		} catch (e) {
			console.log('Error in db write: ', e);
			setRefreshing(false);
		}
	};

	const rateAction = async () => {
		let currentRates = [userId];
		let newRating = 0;
		setRefreshing(true);

		if (!reportRated.current) {
			if (report.rates.length) {
				console.log('Report already rated');
				currentRates = currentRates.concat(report.rates);
				newRating =
					(report.rating * report.rates.length + rating) /
					(report.rates.length + 1);
			}

			try {
				console.log('Trying to amend  data');
				await setDoc(doc(db, 'reports', report.reportId), {
					...report,
					rates: currentRates,
					rating: newRating,
				});

				console.log('Report amended');
				updateReports().then(() => setRefreshing(false));
			} catch (e) {
				console.log('Error in db write: ', e);
				setRefreshing(false);
			}
		}
	};

	return (
		<Box
			rounded='lg'
			overflow='hidden'
			width='110%'
			shadow={1}
			_light={{backgroundColor: 'gray.50'}}
			_dark={{backgroundColor: 'gray.700'}}
			style={{position: 'relative', marginBottom: -30}}
		>
			{/* zIndex: '100' -> cannot be parsed */}
			{refreshing && (
				<LoadingIndicator
					spinnerOnly={true}
					style={{position: 'absolute'}}
				/>
			)}
			<Box>
				<AspectRatio ratio={1 / 1}>
					<Image source={{uri: report.reportImage}} alt='image' />
				</AspectRatio>

				{/* <Center
					bg="violet.500"
					roundedTopRight='lg'
					_text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
					position="absolute"
					bottom={0}
					px="5"
					py="2.5"
				>
					<Text color={'white'}>
						{ Math.round(report.rating * 100) / 100 } *
					</Text>
				</Center> */}

				{/* {
					report.likes && (
						<Center
							bg='emerald.500'
							roundedTopLeft='lg'
							_text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
							position="absolute"
							bottom={0}
							right={0}
							px="5"
							py="2.5"
						>
							<Text color={'white'}>
								Likes: { report.likes.length }
							</Text>
						</Center>
					)
				} */}
			</Box>

			<Stack p='4' space={3} background={'#2c5364'}>
				<Heading size='md' ml='-1' color={'#fff'}>
					{report.address}
				</Heading>

				<HStack space={3} alignItems='center'>
					<Text
						fontSize='xs'
						_light={{color: '#fff'}}
						_dark={{color: '#fff'}}
						fontWeight='500'
						ml='-0.5'
						mt='-1'
					>
						{reportTime}
					</Text>

					<Spacer />

					<HStack>
						<Text
							fontSize='xs'
							_light={{color: '#fff'}}
							_dark={{color: '#fff'}}
							fontWeight='500'
							ml='-0.5'
							mt='-1'
						>
							{Math.round(report.rating * 100) / 100}
						</Text>
						<Icon
							style={styles.starIcon}
							color={'amber.400'}
							size='xs'
							as={<Ionicon name='star' />}
						/>
					</HStack>
				</HStack>
			</Stack>

			<HStack alignItems='center'>
				{/* Temp removal of the like system */}
				{/* <Button rounded='none' w='33.33%' onPress={ () => { reportLiked.current ? likeAction(false) : likeAction(true)}}> 
					{ reportLiked.current ? 'Dislike' : 'Like' }
				</Button> */}
				<Button
					rounded='none'
					w='50%'
					borderRightWidth={'1'}
					borderRightColor={'#0f2027'}
					style={reportRated.current && styles.buttonDisabled}
					disabled={reportRated.current}
					onPress={() => setShowModal(true)}
				>
					{reportRated.current ? 'Rated' : 'Rate'}
				</Button>

				<Button rounded='none' w='50%' onPress={onShare}>
					Share
				</Button>
			</HStack>

			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content maxWidth='400px'>
					<Modal.CloseButton />
					<Modal.Header>Rate it</Modal.Header>

					<Modal.Body>
						<StarRating rating={rating} onChange={setRating} />
					</Modal.Body>

					<Modal.Footer>
						<Button.Group space={2}>
							<Button
								variant='ghost'
								colorScheme='blueGray'
								onPress={() => setShowModal(false)}
							>
								Cancel
							</Button>

							<Button
								onPress={() => {
									setShowModal(false);
									rateAction();
								}}
							>
								Submit
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</Box>
	);
};

export default FeedItem;

const styles = StyleSheet.create({
	buttonDisabled: {
		backgroundColor: '#4a7880',
		opacity: 0.5,
	},
	starIcon: {
		marginLeft: 4,
		marginTop: -4,
	},
});
