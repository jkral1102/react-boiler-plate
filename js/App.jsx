// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Styled from 'styled-components';
import Landing from './Landing';
import Login from './Login';
import '../public/scss/styles.scss';
import AppBar from './AppBar';


const FourOhFour = () => <h1>404</h1>;

const AppWrapper = Styled.div`
background-color: #6D6875;
height: 100vh;
color: white;
font-family: verdana;
`;

class App extends React.Component {
	constructor() {
		super();
		this.state = { data: null };
  }


	render() {
		return (
			<BrowserRouter>

					<AppWrapper id="wrapper">

            <AppBar/>
							<Switch>
								<Route exact path="/" component={Landing} />
								<Route exact path="/login" component={Login} />
								<Route component={FourOhFour} />
							</Switch>
					</AppWrapper>
			</BrowserRouter>
		);
	}
}

export default App;
