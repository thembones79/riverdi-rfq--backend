import request from "supertest";
import { app } from "../app";
import { Context } from "./context";

declare global {
  namespace NodeJS {
    interface Global {
      login(role_id?: number): Promise<string[]>;
    }
  }
}

let context: Context | undefined;

beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context?.reset();
});

afterAll(async () => {
  await context?.close();
});

global.login = async (role_id = 1) => {
  const authResponse = await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: `test${role_id}@test.com`,
      password: `password`,
      username: `test${role_id}`,
      shortname: `QWERTY${role_id}`,
      role_id,
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");
  return cookie;
};
