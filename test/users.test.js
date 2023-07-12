import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Users', () => {
  describe('test de users', () => {
    let cookie
    it('Enpoint POST /api/sessions/register para crear un producto', async () => {
      const userMock = {
        first_name: "User",
        last_name: "Prueba",
        email: "user@live.com.ar",
        age: 27,
        password: "1234"
      }
      const {
        statusCode,
        ok,
        _body
      } = await requester.post('/api/sessions/register').send(userMock)

      expect(_body).to.have.property('message')
      expect(statusCode).to.be.equal(200)
    })

    it('Endpoint POST /api/sessions/login para loguear un usuario', async () => {
      const mockLogin = {
        email: "user@live.com.ar",
        password: "1234"
      }
      const result = await requester.post('/api/sessions/login').send(mockLogin)
      const cookieResult = result.headers['set-cookie'][0]

      expect(cookieResult).to.be.ok

      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1]
      }

      expect(cookie.name).to.be.ok.and.eql('loginToken')
      expect(cookie.value).to.be.ok;
    })

    it('Envia la cookie que contiene el usuario y lo desestructura', async () => {
      const {
        statusCode,
        ok,
        _body
      } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])

      expect(_body.firstname).to.be.eql("User")
    })
  })
})