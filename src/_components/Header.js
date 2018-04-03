import React, { Component } from 'react';
import UserInfo from '../_containers/UserInfo';
import PeriodSelector from '../_containers/PeriodSelector';

import '../_styles/css/header.css';

export default class Header extends Component {
	render() {
		return (
			<header>
				<UserInfo/>
				<PeriodSelector/>
			</header>
		);
	}
}