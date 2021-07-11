const request = require('supertest');
const app = require('../index');

//Testing GET /location
describe('/GET /location', () =>{
    it('Devuelve el valor city, segun la ip-api', done =>{
        request(app)
            .get('/v1/location')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done());
    });    

});

//Testing GET /current/:city?
describe('/GET /current/:city?', ()=>{
    it('Devuelve los datos de ubicación city y el estado del tiempo actual.', done =>{
        request(app)
            .get('/v1/current/Armstrong')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done());
    });

    it('Devuelve los datos de ubicación actual según ip-api y el estado del tiempo actual.', done =>{
        request(app)
            .get('/v1/current/')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done());
    });

    it('Devuelve estado 401 cuando city es incorrecto.', done =>{
        request(app)
            .get('/v1/current/Armssssss')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401, done());
    });
    
});

//Testing GET /forecast/:city?
describe('/GET /forecast/:city?', ()=>{
    it('Devuelve los datos de ubicación city y el estado del tiempo a 5 días.', done =>{
        request(app)
            .get('/v1/forecast/Armstrong')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done());
    });

    it('Devuelve los datos de ubicación actual según ip-api y el estado del tiempo a 5 días.', done =>{
        request(app)
            .get('/v1/forecast/')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done());
    });

    it('Devuelve estado 401 cuando city es incorrecto.', done =>{
        request(app)
            .get('/v1/forecast/Armssssss')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401, done());
    });
    
});

