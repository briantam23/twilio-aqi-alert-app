import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions/auth';
import { createUser, createAlert } from '../../store/actions/users';
import { findUserAlerts, specialCharRegex } from '../../util/profileUtil';
import axios from 'axios';


const profileFormHOC = FormComponent => {

    return class StatefulForm extends Component {
        
        state = { username: '', password: '', phoneNumber: '', cityName: '', aqiThreshold: '', error: '' };

        componentDidUpdate = prevProps => {
            if(prevProps !== this.props) {
                if(this.props.auth.id) this.setState({ username: '', password: '', phoneNumber: '', error: '' });
                else this.setState({ error: '' });
            }
        }
    
        handleChange = e => this.setState({ [e.target.name]: e.target.value });
    
        handleSubmit = e => {
            e.preventDefault();
            const { auth, users, login, logout, createUser, createAlert, history } = this.props;
            let { pathname } = this.props;
            const { username, password, phoneNumber, aqiThreshold } = this.state;
            const cityName = this.state.cityName.trim();
            const numAlerts = findUserAlerts(auth, users).length;
            if(pathname) pathname = this.props.pathname.slice(9);
            

            if(cityName) {  //User creates alert 

                if(numAlerts >= 5) return this.setState({ error: 'Limit 5 Alerts! (X)' });

                return axios.get(`https://api.waqi.info/feed/${cityName}/?token=${process.env.AIR_QUALITY_INDEX_KEY}`)
                    .then(res => res.data.data)
                    .then(data => {
                        if(data === 'Unknown station') this.setState({ error: 'Unknown Station! (X)' });
                        else {
                            const alert = {
                                cityName: data.city.name,
                                urlParamCityName: cityName,
                                aqiThreshold,
                                userId: auth.id
                            }
                            createAlert(alert)
                                .catch(() => this.setState({ error: 'Invalid AQI Threshold! (X)' }))
                        }
                    })
            }

            else if(pathname === 'create') {   //User creates account
                if(!specialCharRegex(password)) return this.setState({ error: 'Error! Password must have at least 1 special character. (X)' });
                
                createUser({ username, password, phoneNumber }, history)
                    .catch(() => this.setState({ error: 'Error! Username taken. Please try again. (X)' }))
            }
            
            else if(pathname === '') {  //User logins
                login(this.state, history)
                    .catch(() => this.setState({ username: '', password: '', error: 'Invalid credentials! Please try again. (X)' })) 
            }

            else logout(history);  //User logouts
        }

        handleClearError = () => this.setState({ error: '' });

        render () {
            const { handleChange, handleSubmit, handleClearError } = this;
            
            return(
                <FormComponent 
                    { ...this.state } 
                    { ...this.props } 
                    handleChange={ handleChange } 
                    handleSubmit={ handleSubmit }
                    handleClearError={ handleClearError } 
                />
            )
        }
    }
}


const mapStateToProps = ({ auth, users }, { id, pathname, history }) => ({ auth, users, id, pathname, history });

const mapDispatchToProps = { login, logout, createUser, createAlert };


const composedHOC = compose(connect(mapStateToProps, mapDispatchToProps), profileFormHOC);

export default composedHOC;