/**
* @author Eneh, James Erozonachi
*
* @description user operations specification
*
* */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../index';

const expect = chai.expect;

chai.use(chaiHTTP);

describe('Users', () => {
  describe('POST /users', () => {
    const user = {
      firstName: 'James',
      lastName: 'Eneh',
      username: 'KingJames',
      email: 'eneh@mail.com',
      password: 'y7hbsudsunjj#hski',
    };
    it('it should POST a new user object', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});
