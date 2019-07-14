import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import createUser from '../../store/actions/users';


const profileForm = FormComponent => {

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
            e.preventDefault();
            this.setState({ [e.target.name]: e.target.value });
        }
    
        handleSubmit = e => {
            e.preventDefault();
            //this.props.submit(this.state);
        }

        render () {
            console.log(this.props.users, this.props.auth)
            const { handleChange, handleSubmit } = this;
            return <FormComponent {...this.state} handleChange={handleChange} handleSubmit={handleSubmit} />
        }
    }
}


const mapStateToProps = ({ auth, users }, { id, history }) => ({ auth, users, id, history });

const mapDispatchToProps = { createUser };


const composedHoc = compose(
    connect(mapStateToProps, mapDispatchToProps),
    profileForm
)

export default composedHoc;