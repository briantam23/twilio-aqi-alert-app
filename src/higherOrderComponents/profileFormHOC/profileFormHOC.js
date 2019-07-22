import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions/auth';
import { createUser, createAlert } from '../../store/actions/users';
import axios from 'axios';
import { create } from 'domain';


const profileFormHOC = FormComponent => {

    return class StatefulForm extends Component {
        
        state = {
            username: '',
            password: '',
            phoneNumber: '',
            cityName: '',
            aqiThreshold: '',
            error: ''
        }

        componentDidUpdate = prevProps => {
            const { auth } = this.props;
            
            if(prevProps !== this.props) {
                if(auth.id) {
                    this.setState({ 
                        username: '', 
                        password: '', 
                        phoneNumber: '', 
                        error: '' 
                    });
                }
            }
        }
    
        handleChange = e => {
            //e.preventDefault();
            this.setState({ [e.target.name]: e.target.value });
        }
    
        handleSubmit = e => {
            e.preventDefault();
            const { auth, login, logout, createUser, createAlert, pathname, history } = this.props;
            const { username, password, phoneNumber, cityName, aqiThreshold } = this.state;
            
            //Create Alert
            if(cityName) {
                console.log('create alert');

                return axios.get(`https://api.waqi.info/feed/${cityName}/?token=${process.env.AIR_QUALITY_INDEX_KEY}`)
                    .then(res => res.data.data)
                    .then(data => {
                        console.log(data)
                        if(data === 'Unknown station') {
                            this.setState({ error: 'Unknown station' });
                        }
                        else {
                            const alert = {
                                cityName: data.city.name,
                                urlParamCityName: cityName,
                                aqiThreshold,
                                userId: auth.id
                            }
                            createAlert(alert);
                        }
                    })
            }

            //Create User
            else if(pathname.slice(9) === 'create') {
                createUser({ username, password, phoneNumber }, history)
                    .catch(() => {
                        this.setState({ 
                            error: 'Error! Username, password and/or phone number taken. Please try again.'
                        });
                    })
            }
            
            //Login
            else if(pathname.slice(9) === '') {
                login(this.state, history)
                    .catch(() => {
                        this.setState({ 
                            username: '', 
                            password: '',
                            error: 'Incorrect Username and/or Password. Please try again. (X)' 
                        })
                    }) 
            }

            //Logout
            else logout(history);
        }

        render () {
            const { handleChange, handleSubmit } = this;
            
            return(
                <FormComponent 
                    { ...this.state } 
                    { ...this.props } 
                    handleChange={ handleChange } 
                    handleSubmit={ handleSubmit } 
                />
            )
        }
    }
}


const mapStateToProps = ({ auth, users }, { id, pathname, history }) => ({ auth, users, id, pathname, history });

const mapDispatchToProps = { login, logout, createUser, createAlert };


const composedHOC = compose(
    connect(mapStateToProps, mapDispatchToProps),
    profileFormHOC
)

export default composedHOC;