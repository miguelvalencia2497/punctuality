import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import '../_styles/css/user-info.css';

class UserInfo extends Component {
	render() {
		var imageStyle = {
			backgroundImage: 'url(' + this.props.userInfo.imgUrl + ')',
			backgroundSize: 'cover'
		}
		return (
			<div className="user-info">
				<div className="user-image" style={imageStyle}></div>
				<h2>{this.props.userInfo.name}</h2>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		userInfo: state.userInfo
	}
}

export default connect(mapStateToProps)(UserInfo);
