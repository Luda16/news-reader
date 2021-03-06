import React, { PropTypes, Component } from 'react';
import {
	ListView,
	StyleSheet,
	View,
	Modal,
	TouchableOpacity
} from 'react-native';
import * as globalStyles from '../styles/global';

export default class NewsFeed extends Component {
	render() {
		return (
			<View style={globalStyles.COMMON_STYLES.pageContainer}>
				<ListView 
					enableEmptySections
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					style={this.props.listStyles} 
				/>				
				{this.renderModal() /*calling the modal method*/ }  
			</View>
		);
	}
}

constructor(props) {
	super(props);
	this.ds = new ListView.DataSource({
		rowHasChanged: (row1, row2) => row1.title !== row2.title
	});
	this.state = {
		dataSource: this.ds.cloneWithRows(props.news),
		modalVisible: false //modal is hidden
	};
	//bind method to this context/scope
	this.renderRow = this.renderRow.bind(this);
	this.onModalOpen = this.onModalOpen.bind(this);	
	this.onModalClose = this.onModalClose.bind(this);
}

//Rendering Modal component
renderModal() {
	return (
		//modal becomes visible or get close (event listeners of the component)
		<Modal 
		animationType="slide"
		visible={this.state.modalVisible}
		onRequestClose={this.onModalClose}
		 > 
		 	<View style={styles.modalContent}>
				<TouchableOpacity
				onPress={this.onModalClose}
				style={styles.closeButton}
				>
				<SmallText>Close</SmallText>
				</TouchableOpacity>
				<WebView
				scalesPageToFit
				source={{ uri: this.state.modalUrl }}
				/>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	newsItem: {
		marginBottom: 20
	},
	modalContent: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: 20,
		backgroundColor: globalStyles.BG_COLOR
	},
	closeButton: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		flexDirection: 'row'
	}
});


renderRow(rowData, ...rest) {
	const index = parseInt(rest[1], 10);
	return (
		<NewsItem
			//opens modal on press
			onPress={() => this.onModalOpen()}
			style={styles.newsItem}
			index={index}
			{...rowData}
		/>
	);
}



//Default data of news
NewsFeed.defaultProps = {
	news: [
		{
			title: 'React Native',
			imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
			description: 'Build Native Mobile Apps using JavaScript and React',
			date: new Date(),
			author: 'Facebook',
			location: 'Menlo Park, California',
			url: 'https://facebook.github.io/react-native'
		},
		{
			title: 'Packt Publishing',
			imageUrl:
			'https://www.packtpub.com/sites/default/files/packt_logo.png',
			description: 'Stay Relevant',
			date: new Date(),
			author: 'Packt Publishing',
			location: 'Birmingham, UK',
			url: 'https://www.packtpub.com/'
		}
	]
};