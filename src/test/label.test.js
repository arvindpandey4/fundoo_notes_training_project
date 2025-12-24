const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const { expect } = chai;

describe('Label API', () => {
    let token;
    let labelId;
    const testUser = {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser${Date.now()}@example.com`,
        password: 'Password123'
    };

    before((done) => {
        chai.request(app)
            .post('/api/v1/users/register')
            .send(testUser)
            .end((err, res) => {
                chai.request(app)
                    .post('/api/v1/users/login')
                    .send({ email: testUser.email, password: testUser.password })
                    .end((err, res) => {
                        token = res.body.data.token;
                        done();
                    });
            });
    });

    it('should create a label', (done) => {
        chai.request(app)
            .post('/api/v1/labels')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Label' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.have.property('name', 'Test Label');
                labelId = res.body.data._id;
                done();
            });
    });

    it('should get all labels', (done) => {
        chai.request(app)
            .get('/api/v1/labels')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.be.an('array');
                done();
            });
    });

    it('should get label by ID', (done) => {
        chai.request(app)
            .get(`/api/v1/labels/${labelId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.have.property('_id', labelId);
                done();
            });
    });

    it('should update label', (done) => {
        chai.request(app)
            .put(`/api/v1/labels/${labelId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Label' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.have.property('name', 'Updated Label');
                done();
            });
    });

    it('should delete label', (done) => {
        chai.request(app)
            .delete(`/api/v1/labels/${labelId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            });
    });
});
