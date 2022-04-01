import React from 'react'
import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native'

type Input = {
	onChangeText: (text:string) => void
	placeholder: string | undefined,
	keyboardType: KeyboardTypeOptions
	value?: string | undefined
	secure?: boolean
}

const Input: React.FC<Input> = ({value, onChangeText, placeholder, keyboardType, secure}) => {
	return (
		<TextInput
			style={styles.input}
			onChangeText={onChangeText}
			value={value}
			placeholder={placeholder}
			keyboardType={keyboardType}
			secureTextEntry={secure}
		/>
	)
}


const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 50,
		borderColor: '#fff',
		backgroundColor: '#fff'
	},
})

export default Input
