import { expect } from 'chai';
import { createStore } from 'redux';
import { _createUser } from '../src/store/actions/users';
import { CREATE_USER } from '../src/store/constants';
import usersReducer from '../src/store/reducers/users';


describe('The `User` Redux store', () => {

    const user = {
        id: "58599dc9-0ed3-4620-8b86-15e2ffc9059d",
        alerts: [
            { cityName: "Chicago", aqiThreshold: 50 },
            { cityName: "New York", aqiThreshold: 60 },
        ]
    }

    describe('action creator', () => {

        it('returns properly formatted action', () => {

            expect(_createUser(user)).to.be.deep.equal({
                type: CREATE_USER,
                user
            })
        })
    })
})