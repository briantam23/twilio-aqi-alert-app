import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
            const { history, createUser } = this.props;
            const { username, password, phoneNumber } = this.state
            
            createUser({ username, password, phoneNumber }, history)
                .catch(() => this.setState({ error: 'Error! Username, password and/or phone number taken. Please try again.'}))
        }

        render () {
            const { handleChange, handleSubmit } = this;
            return <FormComponent {...this.state} handleChange={handleChange} handleSubmit={handleSubmit} />
        }
    }
}


const mapStateToProps = ({ auth, users }, { id, history }) => ({ auth, users, id, history });

const mapDispatchToProps = { createUser };


const composedHOC = compose(
    connect(mapStateToProps, mapDispatchToProps),
    profileFormHOC
)

export default composedHOC;