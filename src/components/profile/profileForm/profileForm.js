import React, { Component } from 'react';


const profileForm = FormComponent => {

    return class StatefulForm extends Component {
        
        state = {
            username: 'btam',
            password: '',
            error: ''
        }

        componentDidUpdate = prevProps => {
            const { auth } = this.props;
            if(prevProps !== this.props) {
                if(auth.id) this.setState({ username: '', password: '', error: '' });
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
            const { handleChange, handleSubmit } = this;
            return <FormComponent {...this.state} handleChange={handleChange} handleSubmit={handleSubmit} />
        }
    }
}


export default profileForm;