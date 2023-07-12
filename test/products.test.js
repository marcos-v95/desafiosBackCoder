import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Products', () => {
  describe('test de products', () => {
    it('Enpoint POST api/products para crear un producto', async () => {
      const productMock = {
        title: 'Remera',
        description: 'tela 100% algodon',
        code: 12399,
        price: 1500,
        stock: 5,
        category: 'shirts',
        thumbnail: "https://rutadeimagen.com/",
        status: true,
      }
      const {
        statusCode,
        ok,
        _body
      } = await requester.post('/api/products').send(productMock)
      // console.log(_body)
      // console.log(statusCode)
      // console.log(ok)
      expect(_body).to.have.property('_id')
    })

    it('Endpoint GET api/products para obtener todos los productos', async () => {
      const {
        statusCode,
        ok,
        _body
      } = await requester.get('/api/products')

      expect(Array.isArray(_body.payload)).to.be.true
    })

  })
})