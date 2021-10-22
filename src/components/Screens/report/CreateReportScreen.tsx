// Vendor
import React from 'react'
import { StyleSheet } from 'react-native'
import { Box, Center, Image, Button} from 'native-base'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

// Redux
import { getUserUid } from '../../../../redux/features/auth/authSlice'

// Firebase
import { collection, addDoc, serverTimestamp  } from 'firebase/firestore'
import { db as FBDB } from '../../../../firebaseSetup'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useAppSelector } from '../../../../redux/features/hooks'

const storage = getStorage()

type CreateReportComponent = {
	route: any
	navigation?: any,
}

const CreateReport = ({route, navigation}: CreateReportComponent) => {
	const userUid = useAppSelector(getUserUid)
	const db = FBDB

	const saveReport = async () => {
		const tempUuid = uuid()

		const uri = route.params.photoPath
		const storageFileName = `reports/${userUid}/${tempUuid}`
		const res = await fetch(uri)
		const blob = await res.blob()

		console.log('Path: ', storageFileName)

		const storage = getStorage()
		const storageRef = ref(storage, storageFileName)
		
		// 'file' comes from the Blob or File API
		const uploadTask = uploadBytesResumable(storageRef, blob)

		uploadTask.on('state_changed', (snapshot: any) => {
			// Listen for state changes, errors, and completion of the upload.
	
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				console.log('Upload is ' + progress + '% done')
				switch (snapshot.state) {
					case 'paused':
					console.log('Upload is paused')
					break
					case 'running':
					console.log('Upload is running')
					break
				}
			},  (error: any) => {
				switch (error.code) {
					case 'storage/unauthorized':
					// User doesn't have permission to access the object
					break
					case 'storage/canceled':
					// User canceled the upload
					break
					case 'storage/unknown':
					// Unknown error occurred, inspect error.serverResponse
					break
				}
			}, () => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL)
					uploadReport(downloadURL)
				})
			}
		)
	}

	const uploadReport = async (downloadUrl: string) => {
			console.log('Running uploadReport')

			try {
				const docRef = await addDoc(collection(db, "reports"), {
					uid: userUid,
					reportImage: downloadUrl,
					timestamp: serverTimestamp()
				})

				console.log("Document written with ID: ", docRef.id)
				navigation.popToTop({reportStatus: 'success'})
			} catch(e) {
				console.log('Error in db write: ', e)
			}
	}


	return (
		<Box style={styles.container}>
			{/* TODO: Export to a comp and add to take and browse photos */}
			<Center flex={1} px="3">
				<Image style={styles.photoPreview}
					source={{
						uri: route.params.photoPath,
					}}
					alt='Latest image'
				/>
			</Center>

			{/* <Button onPress={saveReport}> Save report </Button> */}
			<Button onPress={() => uploadReport('fakeDwd')}> Fake report </Button>
		</Box>
	)
}

export default CreateReport

const styles = StyleSheet.create({
	actionsRow: {
		flex: 1,
		justifyContent: 'space-around'
	},
	container: {
		flex: 10
	},
	// TODO: Better image fit
	photoPreview: {
		resizeMode: 'cover',
		height: 400,
		width: 400
	},
	text: {
		fontSize: 18,
		color: 'white',
	}
})

