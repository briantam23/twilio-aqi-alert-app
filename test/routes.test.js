'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server/app');
const agent = request.agent(app);

const { conn } = require('../server/db');
const { Alert, User } = require('../server/db').models;


describe('The Express Server', () => {

    describe('USE `public` Folder', () => {

        it('serves public files', () => (

            agent
                .get('/public/index.html')
                .expect('Content-type', 'text/html; charset=UTF-8')
                .expect(200)
        ))

        it('does not serve private files', async () => {
             
            const res = await agent
                .get('/src/util/profileUtil.js')
                .expect(404)

            expect(res['headers']['content-type']).to.not.equal('application/javascript; charset=UTF-8');
        })
    })

    describe('GET `/` Route', () => {
        
        it('sends the index.html file', () => (

            agent
                .get('/')
                .expect('Content-type', 'text/html; charset=UTF-8')
                .expect(200)
        ))
    })

    describe('The `Users` Route:', () => {

        // First we clear the database before beginning each run
        before(() => conn.sync({ force: true }))
    
        // Also, we empty the tables after each spec
        afterEach(() => (
            Promise.all([
                Alert.truncate({ cascade: true }),
                User.truncate({ cascade: true })
            ])
        ))

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

        describe('GET /api/users/:userId', () => {

            let testUser; 
            beforeEach(async () => {
                const creatingUsers = [
                    { 
                        username: 'Brian', 
                        password: 'Briantam23@', 
                        phoneNumber: '5166109915' 
                    },
                    { 
                        username: 'Mike',
                        password: 'Mike12#', 
                        phoneNumber: '5164337766' 
                    }
                ].map(data => User.create(data));
                
                const createdUsers = await Promise.all(creatingUsers);
                testUser = createdUsers[1];
            })

            it('returns the JSON of the User based on the id', async () => {
                
                const res = await agent
                    .get('/api/users/' + testUser.id)
                    .expect(200);
    
                if(typeof res.body === 'string') {
                    res.body = JSON.parse(res.body);
                }
                expect(res.body.username).to.equal('Mike');
            })

            it('returns a 404 error if the ID is not correct', () => (

                agent
                    .get('/api/users/a91bb9d6-53dc-49f3-8358-1334e3941bd7')
                    .expect(404)
            ))
        })

        describe('POST /api/users', () => {
            it('creates a new User', async () => {
    
                const res = await agent
                    .post('/api/users')
                    .send({
                        username: 'Brian', 
                        password: 'Briantam23@', 
                        phoneNumber: '5166109915'
                    })
                    .expect(200);
                
                expect(res.body.id).to.not.be.an('undefined');
                expect(res.body.username).to.equal('Brian');
            })

            it('does not create a new User without a phone number', () => (
    
                agent    
                    .post('/api/users')
                    .send({
                        username: 'This User should not be allowed.',
                        password: 'Briantam23@'
                    })
                    .expect(500)
            ))

            // Check if the Users were actually saved to the DB
            it('saves the User to the DB', async () => {
                
                await agent
                    .post('/api/users')
                    .send({
                        username: 'Brian', 
                        password: 'Briantam23@', 
                        phoneNumber: '5166109915'
                    })
                    .expect(200);

                const foundUser = await User.findOne({
                    where: { username: 'Brian' }
                })

                expect(foundUser).to.exist;
                expect(foundUser.phoneNumber).to.equal('5166109915');
            })

            // Do not assume async operations (like db writes) will work; always check
            it('sends back JSON of the actual created User, not just the POSTed data', async () => {

                const res = await agent
                    .post('/api/users')
                    .send({
                        username: 'Brian', 
                        password: 'Briantam23@', 
                        phoneNumber: '5166109915',
                        extraneous: 'Sequelize will quietly ignore this non-schema property'
                    })
                    .expect(200);

                expect(res.body.extraneous).to.be.an('undefined');
                expect(res.body.createdAt).to.exist;
            })
        })

        describe('PUT /api/users/:userId', () => {

            let user;
    
            beforeEach(async() => {
                user = await User.create({
                    username: 'Brian', 
                    password: 'Briantam23@', 
                    phoneNumber: '5166109915'
                })
            })

            it('updates a User', async() => {

                const res = await agent 
                    .put('/api/users/' + user.id)
                    .send({
                        phoneNumber: '6464428889'
                    })
                    .expect(200);
    
                expect(res.body.id).to.not.be.an('undefined');
                expect(res.body.username).to.equal('Brian');
                expect(res.body.phoneNumber).to.equal('6464428889');
            })

            it('saves updates to the DB', async() => {

                await agent 
                    .put('/api/users/' + user.id)
                    .send({
                        password: 'Briantam44#'
                    })
    
                const foundUser = await User.findByPk(user.id);
    
                expect(foundUser).to.exist;
                expect(foundUser.password).to.equal('Briantam44#');
            })

            it('gets 500 for invalid update', () => (
    
                agent
                    .put('/api/users/' + user.id)
                    .send({ password: null })
                    .expect(500)
            ))
        })

        describe('DELETE, /api/users/:userId', () => {

            let user;
    
            beforeEach(async() => {
                user = await User.create({
                    username: 'Brian', 
                    password: 'Briantam23@', 
                    phoneNumber: '5166109915'
                })
            })

            it('deletes a User', async() => {
    
                const res = await agent
                    .delete('/api/users/' + user.id)
                    .expect(204)
    
                expect(res.body.id).to.be.an('undefined');
            })

            it('saves changes in database', async() => {
    
                const res = await agent
                    .delete('/api/users/' + user.id)
                    .expect(204)
    
                const foundUser = await User.findByPk(user.id);
    
                expect(foundUser).to.not.exist;
            })

            it('responds with a 500 if a User does not exist', () => (
                
                agent
                    .delete('/api/users/123')
                    .expect(500)
            ))
        })
    })
})