import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
} from 'react-native';

const Label = (props) => {
	return (
		<Text 
			style={props.styles && props.styles.textLabel ? props.styles.textLabel : styles.textLabel}
		>
			{props.text}
		</Text>
	);
}

const styles = StyleSheet.create({
	textLabel: {
		fontSize: 3,
		fontWeight: 'bold',
		fontFamily: 'Verdana',
		marginBottom: 5,
		color: '#595856'
	}
});

export default Label;