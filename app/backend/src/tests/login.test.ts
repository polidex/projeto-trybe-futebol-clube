import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

import App from '../app';
import { Model } from 'sequelize';
import User from '../database/models/userModel';
import { admin } from './mock/mock'

// import { Response } from 'superagent';


const { app } = new App();


describe('Testes de Integração da rota /login', () => {
  describe('Testa se faltar algum dado na requisição', () => {
    it('Testa que não é possivel logar sem email', async () => {
      const response = await chai.request(app)
        .post('/login').send({ password: 'secret_admin' });
  
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Testa que não é possivel logar sem password', async () => {
      const response = await chai.request(app)
        .post('/login').send({ email: 'admin@admin.com' });
  
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  });

  describe('Testa se algum dado na requisição for incorreto', () => {
    it('Testa que não é possivel logar com email incorreto', async () => {
      beforeEach(() => sinon.stub(Model, 'findOne').resolves(null));
      afterEach(() => sinon.restore);
      const response = await chai.request(app)
        .post('/login').send({ email: 'admin@admincom', password: 'secret_admin' });

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    it('Testa que não é possivel logar com password incorreto', async () => {
      beforeEach(() => sinon.stub(Model, 'findOne')
        .resolves(admin as User));
      afterEach(() => sinon.restore);
      const response = await chai.request(app)
        .post('/login').send({ email: 'admin@admin.com', password: 'secretadmin' });

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });
});
