/**
* @author Eneh, James Erozonachi
*
* @description entry operations specification
*
* */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../index';

const expect = chai.expect;

chai.use(chaiHTTP);
let token = '';
let userId = 0;
let entryId = 0;

describe('Users', () => {
  describe('POST /users/auth/signup', () => {
    it('it should return status 400 and message: First name is required', (done) => {
      const user = {
        firstName: '',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Last name is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: '',
        username: 'KingJames',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Username is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: '',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Email is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: 'KingJames',
        email: '',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Password is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'eneh@mail.com',
        password: '',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: First name can only contain letters', (done) => {
      const user = {
        firstName: 'James12 ',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Last name can only contain letters', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh 34',
        username: 'KingJames',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: First name: max length of 20 exceeded', (done) => {
      const user = {
        firstName: 'Jamesgfghdsghhgsdghsghsdhghsdhgsdhhsdhhhgs',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Last name: max length of 20 exceeded', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Enehjkejehjehhjehjewhjewhjewjhhjewjhjhewhjhjhj',
        username: 'KingJames',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Username: max length of 20 exceeded', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: 'KingJameshjsdhhjdshjdshjdsjhdsjhdsjhdsjdsjdsjdsj',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Email: max length of 45 exceeded', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'enehcomhdashjdhjrehrehrehjrehjrejjrejkerjhrejrejerjieewiuewjewjjewjejhewjhejhewjhewhjewhjewhjehjjebnnnbbn@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Email not valid', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'eneh.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Password cannot be less than 10 characters', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'eneh@erozona.com',
        password: 'y7hb',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Password must be a mix of letters, digits or symbols', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'eneh@erozona.com',
        password: 'yshshdshshshshsjhb',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should sign up a new user and return status 201', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        username: 'KingJames',
        email: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe('POST /users/auth/login', () => {
    it('it should return status 400 and message: Username or Email is required', (done) => {
      const user = {
        loginName: '',
        loginPassword: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 400 and message: Password is required', (done) => {
      const user = {
        loginName: 'enehoach',
        loginPassword: '',
      };
      chai.request(server)
        .post('/api/v1/users/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status 200 and message: Logged in successfully', (done) => {
      const user = {
        loginName: 'eneh@mail.com',
        loginPassword: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/users/auth/login')
        .send(user)
        .end((err, res) => {
          const body = res.body;
          userId = body.data.id;
          token = body.data.accessToken;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('POST /users/:userId/notify/:setNotice', () => {
    let switching = 'on';
    it(`it should return status 200 and message: Daily reminder turned ${switching}`, (done) => {
      switching = 'on';
      chai.request(server)
        .post(`/api/v1/users/${userId}/notify/${switching}`)
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    switching = 'off';
    it(`it should return status 200 and message: Daily reminder turned ${switching}`, (done) => {
      chai.request(server)
        .post(`/api/v1/users/${userId}/notify/${switching}`)
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
}); 

describe('Entries', () => {
  describe('POST /entries', () => {
    const entry = {
      title: 'London Visit',
      description: 'I met a black guy on the throng of King James',
      conclusion: 'And that black guy is me, I am King James',
    };
    it('it should return status: 400 and message: Title is required', (done) => {
      const entry = {
        title: '',
        description: 'I met a black guy on the throng of King James',
        conclusion: 'And that black guy is me, I am King James',
      };
      chai.request(server)
        .post(`/api/v1/users/${userId}/entries`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status: 400 and message: Title: max length of 50 exceeded', (done) => {
      const entry = {
        title: 'jhsdhjhdshjdjdsjjdsjkjkdsjdjkkjkdskdskkdskkdskkdskkdkdkkdskndskkdskndskkdskdsksdkdskdsksdksdksdksdksdkdsk',
        description: 'I met a black guy on the throng of King James',
        conclusion: 'And that black guy is me, I am King James',
      };
      chai.request(server)
        .post(`/api/v1/users/${userId}/entries`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status: 400 and message: Description is required', (done) => {
      const entry = {
        title: 'England Visit',
        description: '',
        conclusion: 'And that black guy is me, I am King James',
      };
      chai.request(server)
        .post(`/api/v1/users/${userId}/entries`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status: 401 and  message: Authentication failed', (done) => {
      chai.request(server)
        .post(`/api/v1/users/${userId}/entries`)
        .set('x-access-token', 'dkld##kdki#.kskskwk£$%&*okdjhdhdnjjhdfjhdujhdj')
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('it should return status: 401 and  message: User not authenticated', (done) => {
      chai.request(server)
        .post(`/api/v1/users/${userId}/entries`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('it should return status: 201 and Create successful', (done) => {
      chai.request(server)
        .post(`/api/v1/users/${userId}/entries`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  describe('GET /entries', () => {
    it('it should return status: 200 and all the entries of a user', (done) => {
      chai.request(server)
        .get(`/api/v1/users/${userId}/entries`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          const body = res.body;
          entryId = body.data[0].id;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('it should return status: 200 and a specific entry of a user', (done) => {
      chai.request(server)
        .get(`/api/v1/users/${userId}/entries/${entryId}`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
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
    it('it should return status: 400 and message: Title is required', (done) => {
      const entry = {
        title: '',
        description: 'I met a black guy on the throng of King James',
        conclusion: 'And that black guy is me, I am King James',
      };
      chai.request(server)
        .put(`/api/v1/users/${userId}/entries/${entryId}`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status: 400 and message: Title: max length of 50 exceeded', (done) => {
      const entry = {
        title: 'jhsdhjhdshjdjdsjjdsjkjkdsjdjkkjkdskdskkdskkdskkdskkdkdkkdskndskkdskndskkdskdsksdkdskdsksdksdksdksdksdkdsk',
        description: 'I met a black guy on the throng of King James',
        conclusion: 'And that black guy is me, I am King James',
      };
      chai.request(server)
        .put(`/api/v1/users/${userId}/entries/${entryId}`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status: 400 and message: Description is required', (done) => {
      const entry = {
        title: 'England Visit',
        description: '',
        conclusion: 'And that black guy is me, I am King James',
      };
      chai.request(server)
        .put(`/api/v1/users/${userId}/entries/${entryId}`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should return status: 401 and message: Compromised access token', (done) => {
      chai.request(server)
        .put(`/api/v1/users/end/entries/${entryId}`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('it should return Entry not found', (done) => {
      chai.request(server)
        .put(`/api/v1/users/${userId}/entries/107`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('it should return status: 200 and message: Modified successfully', (done) => {
      chai.request(server)
        .put(`/api/v1/users/${userId}/entries/${entryId}`)
        .set('x-access-token', `${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
});
