import { expect } from 'chai';
import sinon from 'sinon';
import { findUserAlerts } from '../src/util/profileUtil';


describe('The Utility Functions', () => {
    
    describe('findUserAlerts function', () => {

        const auth = { id: "f3adf49e-01f7-45fd-b96c-eea2deea35ed" };
        const users = [
            {
                id: "58599dc9-0ed3-4620-8b86-15e2ffc9059d",
                alerts: [
                    { cityName: "Chicago", aqiThreshold: 50 },
                    { cityName: "New York", aqiThreshold: 60 },
                ]
            }, 
            {
                id: "f3adf49e-01f7-45fd-b96c-eea2deea35ed",
                alerts: [
                    { cityName: "Berlin", aqiThreshold: 53 },
                    { cityName: "Beijing", aqiThreshold: 51 },
                ]
            }
        ]
        it('finds Auth alerts within Users array', () => {
            expect(findUserAlerts(auth, users)).to.equal(users[1].alerts);
        })

    })

})
