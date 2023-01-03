
import Product from '../model/Video.js'


before((done) => {
    Product.deleteMany({}, function(err) {});
    done();
})


after((done) => {
    Product.deleteMany({}, function(err) {});
    done();
})