import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions/auth';
import { createUser } from '../../store/actions/users';


const profileFormHOC = FormComponent => {

    return class StatefulForm extends Component {
        
        state = {
            username: '',
            password: '',
            phoneNumber: '',
            error: ''
        }

        componentDidUpdate = prevProps => {
            const { auth } = this.props;
            if(prevProps !== this.props) {
                if(auth.id) this.setState({ username: '', password: '', phoneNumber: '', error: '' });
            }
        }
    
        handleChange = e => {
            //e.preventDefault();
            this.setState({ [e.target.name]: e.target.value });
        }
    
        handleSubmit = e => {
            e.preventDefault();
            const { auth, login, logout, createUser, pathname, history } = this.props;
            const { username, password, phoneNumber } = this.state
            
            if(pathname.slice(9) === 'create') {
                createUser({ username, password, phoneNumber }, history)
                    .catch(() => this.setState({ error: 'Error! Username, password and/or phone number taken. Please try again.'}))
            }
        
            else if(pathname.slice(9) === '') {
                login(this.state, history)
                    .catch(() => this.setState({ 
                        username: '', 
                        password: '',
                        error: 'Incorrect Username and/or Password. Please try again. (X)' 
                    })) 
            }

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

const mapDispatchToProps = { login, logout, createUser };


const composedHOC = compose(
    connect(mapStateToProps, mapDispatchToProps),
    profileFormHOC
)

export default composedHOC;