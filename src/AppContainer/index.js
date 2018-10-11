import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';

class AppContainer extends Component {
    static PropTypes = {
        store: PropTypes.object.isRequired
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <Router scenes={scenes} />
            </Provider>
        )
    }
}

export default AppContainer;