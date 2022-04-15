/* eslint-disable no-underscore-dangle */
import dotenv from 'dotenv';
import supertest from 'supertest';
import { connection } from './mockMongoose';

import { app } from '../app';

dotenv.config();

const request = supertest(app);

const userTest = {
  username: 'testSystemAfk37812-++aks22',
  password: 'testSystemAfk37812-++aks22',
};

let idUser = '';
let token = '';
let codeGenerate = '';
let codeGenerate2 = '';

afterAll(async () => {
  await connection.connection.close();
});

beforeAll(() =>
  request
    .post('/generate_code')
    .send({ GENERATOR_CODE: process.env.GENERATOR_CODE })
    .then((res) => {
      codeGenerate = res.body.code;
      return request
        .post('/generate_code')
        .send({ GENERATOR_CODE: process.env.GENERATOR_CODE })
        .then((res2) => {
          codeGenerate2 = res2.body.code;
        });
    }),
);

describe('Testa o CRUD de usuários', () => {
  it('Deve cadastrar um usuário', () =>
    request
      .post('/user')
      .send({
        code: codeGenerate,
        username: userTest.password,
        password: userTest.username,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        idUser = res.body._id;
      }));
  it('Deve retornar 409 ao tentar cadastrar um usuário que já existe', () =>
    request
      .post('/user')
      .send({
        code: codeGenerate2,
        username: userTest.username,
        password: userTest.password,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(409);
      }));
  it('Deve fazer login no sistema e obter um token', () =>
    request
      .post('/auth')
      .send({
        username: userTest.username,
        password: userTest.password,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        // @ts-ignore
        token = { authorization: `Bearer ${res.body.token}` };
      }));
  it('Deve retornar 404 para um usuário não cadastrado tentando fazer login no sistemas', () =>
    request
      .post('/auth')
      .send({
        username: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        password: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      }));
  it('Deve retornar 403 para um usuário com senha inválida tentando fazer login no sistemas', () =>
    request
      .post('/auth')
      .send({
        username: userTest.username,
        password: 'senhaInvalida',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(403);
      }));
  it('Deve impedir um usuário com token inválido de obter os usuários', () =>
    request.get(`/user`).then((res) => {
      expect(res.statusCode).toEqual(403);
    }));

  it('Deve Obter um usuário', () =>
    request
      .get(`/user`)
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual(idUser);
        expect(res.body.password).toBeUndefined();
      }));
  it('Deve impedir um usuário com token inválido de Editar um usuário', () =>
    request
      .put(`/user`)
      .send({
        username: 'testeQualquerCoisa',
        password: 'usuarioNotExists',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(403);
      }));
  it('Deve Editar um usuário', () =>
    request
      .put(`/user`)
      .set(token)
      .send({
        username: 'abctestSystemAfk37812-++aks22',
        password: 'abctestSystemAfk37812-++aks22',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      }));
  it('Deve impedir um usuário com token inválido de  Deletar um usuário', () =>
    request.delete(`/user`).then((res) => {
      expect(res.statusCode).toEqual(403);
    }));

  it('Deve Deletar um usuário', () =>
    request
      .delete(`/user`)
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      }));
});
