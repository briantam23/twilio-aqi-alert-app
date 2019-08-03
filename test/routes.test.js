'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server/app');
const agent = request.agent(app);

const { conn } = require('../server/db');
const { Alert, User } = require('../server/db').models;


describe('The Express Server', () => {

    describe('USE `public` Folder', () => {

        it('serves public files', () => {

            return agent
                .get('/public/index.html')
                .expect('Content-type', 'text/html; charset=UTF-8')
                .expect(200)
        })

        it('does not serve private files', async () => {
             
            const res = await agent
                .get('/src/util/profileUtil.js')
                .expect(404)

            expect(res['headers']['content-type']).to.not.equal('application/javascript; charset=UTF-8');
        })
    })

    describe('GET `/` Route', () => {
        
        it('sends the index.html file', () => {

            return agent
                .get('/')
                .expect('Content-type', 'text/html; charset=UTF-8')
                .expect(200);
        })
    })

    describe('The `Users` Route:', () => {

        // First we clear the database before beginning each run
        before(() => {
            return conn.sync({ force: true });
        })
    
        // Also, we empty the tables after each spec
        afterEach(() => {
            return Promise.all([
                Alert.truncate({ cascade: true }),
                User.truncate({ cascade: true })
            ])
        })

        describe('GET /api/users', () => {
            it('responds with a array via JSON', async () => {
    
                const res = await agent
                    .get('/api/users')
                    .expect('Content-Type', /json/)
                    .expect(200);
    
                expect(res.body).to.be.an.instanceOf(Array);
                expect(res.body).to.have.length(0);
            })

            // Save a user in the database using our model and then retrieve it
            it('returns a User if there is one in the DB', async () => {

                await User.create({ 
                    username: 'Brian', 
                    password: 'Briantam23@', 
                    phoneNumber: '5166109915' 
                })

                const res = await agent 
                    .get('/api/users')
                    .expect(200)

                expect(res.body).to.be.an.instanceOf(Array);
                expect(res.body[0].password).to.equal('Briantam23@');
            })
        })
    })
})