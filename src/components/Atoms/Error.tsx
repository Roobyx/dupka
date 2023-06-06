import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'native-base';

type Error = {
	children?: any;
};

const Error: React.FC<Error> = ({children}) => {
	const {colors} = useTheme();

	return <Text color='secondary.600'> {children} </Text>;
};

// const styles = StyleSheet.create({
// 	errorText: {
// 		color: secondary.600
// 	},
// })

export default Error;
