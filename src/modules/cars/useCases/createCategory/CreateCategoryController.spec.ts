import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';


let connection: Connection

describe('Create Category Controller', () => {

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
    const id = uuid()
    const password = await hash("admin", 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@admin.com.br','${password}' , true, 'now()', 'XXXXX')
    `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("Should able to create a new category", async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: "admin@admin.com.br",
      password: "admin"
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post('/categories')
      .send({
        name: "Category test",
        description: "Description test"
      }).set({
        Authorization: `Baerer ${refresh_token}`
      })

    expect(response.statusCode).toBe(201)
  })

  it("Should not able to create a category twice", async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: "admin@admin.com.br",
      password: "admin"
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post('/categories')
      .send({
        name: "Category test",
        description: "Description test"
      }).set({
        Authorization: `Baerer ${refresh_token}`
      })

    expect(response.statusCode).toBe(400)
  })

})
