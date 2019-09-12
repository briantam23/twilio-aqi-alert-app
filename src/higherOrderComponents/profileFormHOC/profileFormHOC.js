import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions/auth';
import { createUser, createAlert } from '../../store/actions/users';
import { findUserAlerts, specialCharRegex } from '../../util/profileUtil';
import axios from 'axios';


const profileFormHOC = FormComponent => (

    class StatefulForm extends Component {
        
        state = { username: '', password: '', phoneNumber: '', cityName: '', aqiThreshold: '', error: '', isLoading: false };

        componentDidUpdate = prevProps => {
            if(prevProps !== this.props) {
                if(this.props.auth.id) this.setState({ username: '', password: '', phoneNumber: '', error: '' });
                else this.setState({ error: '' });
            }
        }
    
        handleChange = e => this.setState({ [e.target.name]: e.target.value });

        handleCreateAlert = e => {
            e.preventDefault();
            const { auth, numAlerts, createAlert, history } = this.props;
            const cityName = this.state.cityName.trim();

            if(numAlerts >= 5) return this.setState({ error: 'Limit 5 Alerts! (X)' });

            this.setState({ isLoading: true });
            axios.get(`https://api.waqi.info/feed/${cityName}/?token=${process.env.AIR_QUALITY_INDEX_KEY}`)
                .then(res => res.data.data)
                .then(data => {
                    if(data === 'Unknown station') this.setState({ error: 'Unknown Station! (X)', isLoading: false });
                    else {
                        const alert = {
                            cityName: data.city.name,
                            urlParamCityName: cityName,
                            aqiThreshold: this.state.aqiThreshold,
                            userId: auth.id
                        }
                        createAlert(alert)
                            .then(() => this.setState({ cityName: '', aqiThreshold: '', isLoading: false }))
                            .catch(() => this.setState({ error: 'Invalid AQI Threshold! (X)', isLoading: false }))
                    }
                })
        }

        handleCreateUser = e => {
            e.preventDefault();
            const { createUser, login, history } = this.props;
            const { username, password, phoneNumber } = this.state;

            if(!specialCharRegex(password)) {
                return this.setState({ error: 'Error! Password must have at least 1 special character. (X)' });
            }
             
            this.setState({ isLoading: true });
            createUser({ username, password, phoneNumber })
                .then(() => login({ username, password }, history))
                .then(() => this.setState({ isLoading: false }))
                .catch(() => this.setState({ error: 'Error! Username taken. Please try again. (X)', isLoading: false }))
        }

        handleLogin = e => {
            e.preventDefault();
            const { login, history } = this.props;
            const { username, password } = this.state;

            this.setState({ isLoading: true });
            login({ username, password }, history)
                .then(() => this.setState({ isLoading: false }))
                .catch(() => {
                    this.setState({ 
                        username: '', 
                        password: '', 
                        error: 'Invalid credentials! Please try again. (X)',
                        isLoading: false 
                    })
                }) 
        }

        handleLogout = e => {
            e.preventDefault();
            const { logout, history } = this.props;

            logout(history);
        }

        handleClearError = () => this.setState({ error: '' });

        render () {
            return(
                <FormComponent { ...this.state } { ...this.props } { ...this }/>
            )
        }
    }
)


const mapStateToProps = ({ auth, users }, { history }) => { 
    const numAlerts = findUserAlerts(auth, users).length;
    return { auth, numAlerts, history };
}

const mapDispatchToProps = { login, logout, createUser, createAlert };


const composedHOC = compose(connect(mapStateToProps, mapDispatchToProps), profileFormHOC);

export default composedHOC;