'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { User, Alert } = require('../server/db').models;
const { conn } = require('../server/db');


describe('The `User` model:', () => {

    // First we claer the database and recreate the tables before beginning a run
    before(() => {
        return conn.sync({ force: true });
    });

    // Next, we create an (un-saved!) article instance before every spec
    let user;
    beforeEach(() => {
        user = User.build({
            username: 'Brian', 
            password: 'Briantam23@', 
            phoneNumber: '5166109915'
        })
    })

    // Also, we empty the tables after each spec
    afterEach(() => {
        return Promise.all([
            User.truncate({ cascade: true }),
            Alert.truncate({ cascade: true })
        ])
    })

    describe('attributes definition', () => {
        it('includes `username, password, and phoneNumber` fields', async () => {

            const savedUser = await user.save();
            expect(savedUser.username).to.equal('Brian');
            expect(savedUser.password).to.equal('Briantam23@');
            expect(savedUser.phoneNumber).to.equal('5166109915');
        })

        it('requires `username`', async () => {
            user.username = null;

            let result, error;
            try {
                result = await user.validate();
            } catch(err) {
                error = err;
            }

            if(result) throw Error('validation should fail when username is null');

            expect(error).to.be.an.instanceOf(Error);
        })

        it('requires `username` (strict)', async () => {

            user.username = '';

            let result, error;
            try {
                result = await user.validate();
            } catch(err) {
                error = err;
            }

            if(result) throw Error('validation should fail when username is an empty string');

            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.contain('Validation error');
        })
    })

    describe('associations', () => {
        it('has many Alerts', async () => {

            const creatingUser = await User.create({ 
                username: 'Brian', 
                password: 'Briantam23@', 
                phoneNumber: '5166109915'
            })
            const creatingAlert = await Alert.create({ 
                cityName: 'New York', 
                urlParamCityName: 'newyork', 
                aqiThreshold: 0
            })

            const [createdUser, createdAlert] = await Promise.all([creatingUser, creatingAlert]);

            await createdUser.setAlerts(createdAlert);

            const foundUser = await User.findOne({
                where: { username: 'Brian' },
                include: { model: Alert }
            })

            expect(foundUser.alerts).to.exist;
            expect(foundUser.alerts[0].cityName).to.equal('New York');
        })
    })
})