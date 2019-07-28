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

    describe('usersReducer', () => {

        let testingStore;
        beforeEach('Create testing store from reducer', () => {
            testingStore = createStore(usersReducer);
        })

        it('has an initial state as an empty array', () => {

            const currentStoreState = testingStore.getState();

            expect(currentStoreState).to.be.deep.equal([]);
        })

        it('reduces on CREATE_USER (without mutating previous state)', () => {

            const prevState = testingStore.getState();

            testingStore.dispatch({
                type: CREATE_USER,
                user
            })

            const newState = testingStore.getState();

            expect(newState.length).to.be.equal(prevState.length + 1);
            expect(newState[newState.length - 1]).to.be.deep.equal(user);
            expect(newState).to.not.be.equal(prevState);
        })

        it('handles unrecognized actions & returns the previous state', () => {

            const prevState = testingStore.getState();

            testingStore.dispatch({
                type: 'NOT_A_THING'
            })

            const newState = testingStore.getState();

            //these should be the same array in memory AND have equivalent key-value pairs
            expect(prevState).to.be.an('array');
            expect(newState).to.be.an('array');
            expect(newState).to.be.equal(prevState);
            expect(newState).to.be.deep.equal(prevState);
        })
    })
})