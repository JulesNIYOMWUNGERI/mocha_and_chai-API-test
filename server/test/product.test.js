
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js'


const expect = chai.expect;
const should = chai.should()


chai.use(chaiHttp);






describe('/First Test Collection',() => {

    it('test default API welcome route...',(done) => {
        chai.request(server)
        .get('/api/welcome')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const actualVal = res.body.message;
            expect(actualVal).to.be.equal('welcome to the mocha and chai test API')
            done();
        });
    })



    it('should verify that we have 0 product in the DB',(done) => {
        chai.request(server)
        .get('/api/videos/random')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        });
    });



    it('should POST a valid product',(done) => {

        let product = {
            title:'test product',
            desc:'test product desc',
            imgUrl:'test product imgurl'
        }
        chai.request(server)
        .post('/api/videos')
        .send(product)
        .end((err,res) => {
            res.should.have.status(200);
            done();
        });
    });



    it('should verify that we have 1 product in the DB',(done) => {
        chai.request(server)
        .get('/api/videos/random')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
        });
    });




    it('should test two values....',()=>{
        //actual test content in here

        let expectedVal = 10;
        let actualVal = 10;

        expect(actualVal).to.be.equal(expectedVal);
    })
})