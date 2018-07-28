/**
* @author Eneh, James Erozonachi
*
* @description entry operations specification
*
* */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../index';
import diary from '../models/diary';

const expect = chai.expect;

chai.use(chaiHTTP);

describe('Entries', () => {
  describe('GET /entries', () => {
    it('it should GET all the entries of a user', (done) => {
      diary.push(
        {
          entries: [
            {
              title: 'Paris Visit',
              description: 'I had fun',
              conclusion: 'I enjoyed myself',
            },
          ],
        },
      );
      chai.request(server)
        .get('/api/v1/users/0/entries')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('it should return User not found', (done) => {
      chai.request(server)
        .get('/api/v1/users/10/entries')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('it should GET a specified entry of a user', (done) => {
      chai.request(server)
        .get('/api/v1/users/0/entries/0')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('it should return User not found', (done) => {
      chai.request(server)
        .get('/api/v1/users/10/entries/0')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('it should return Entry not found', (done) => {
      chai.request(server)
        .get('/api/v1/users/0/entries/1')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe('POST /entries', () => {
    const entry = {
      title: 'London Visit',
      description: 'I met a black guy on the throng of King James',
      conclusion: 'And that black guy is me, I am King James',
    };
    it('it should POST a new entry to user entry list', (done) => {
      chai.request(server)
        .post('/api/v1/users/0/entries')
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('it should return User not found', (done) => {
      chai.request(server)
        .post('/api/v1/users/10/entries')
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe('PUT /entries', () => {
    const entry = {
      title: 'London Visit',
      description: 'I met a black guy on the throng of King James',
      conclusion: 'And that black guy is me, I am King James',
    };
    it('it should PUT a saved entry in user entry list', (done) => {
      chai.request(server)
        .put('/api/v1/users/0/entries/1')
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('it should return User not found', (done) => {
      chai.request(server)
        .put('/api/v1/users/10/entries/1')
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('it should return Entry not found', (done) => {
      chai.request(server)
        .put('/api/v1/users/0/entries/10')
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
