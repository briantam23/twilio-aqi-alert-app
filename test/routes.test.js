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

            it('returns another User if there is one in the DB', async() => {

                await User.create({ 
                    username: 'Brian', 
                    password: 'Briantam23@', 
                    phoneNumber: '5166109915' 
                })
                await User.create({ 
                    username: 'Mike',
                    password: 'Mike12#', 
                    phoneNumber: '5164337766' 
                })
    
                const res = await agent
                    .get('/api/users')
                    .expect(200)
    
                expect(res.body).to.be.an.instanceOf(Array);
                expect(res.body[0].username).to.equal('Brian');
                expect(res.body[1].username).to.equal('Mike');
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

            it('returns a 404 error if the ID is not correct', () => {

                return agent
                    .get('/api/users/a91bb9d6-53dc-49f3-8358-1334e3941bd7')
                    .expect(404);
            })
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

            it('does not create a new User without a password', () => {
    
                return agent    
                    .post('/api/users')
                    .send({
                        username: 'This User should not be allowed.'
                    })
                    .expect(500);
            })

            // Check if the Users were actually saved to the DB
            it('saves the Todo to the DB', async () => {
                
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

            it('gets 500 for invalid update', () => {
    
                return agent
                    .put('/api/users/' + user.id)
                    .send({ password: null })
                    .expect(500);
            })
        })
    })
})