import request from "supertest";
import { app } from "../../../app";
import { RequirementRepo } from "../../../repos/requirement-repo";

it("creates a requirement to given rfq", async () => {
  const cookie = await global.login();

  const newRfq = await request(app)
    .post("/api/v1/rfqs")
    .set("Cookie", cookie)
    .send({
      eau: 2370000,
      customer_id: 1,
      distributor_id: 1,
      pm_id: 1,
      kam_id: 1,
    })
    .expect(201);

  const startingCount = await RequirementRepo.count();
  await request(app)
    .post(`/api/v1/rfqs/requirements`)
    .set("Cookie", cookie)
    .send({
      rfq_id: newRfq.body.id,
      c_nc_cwr: "c",
      requirement: "new req",
      note: "new note",
    })
    .expect(201);

  const finishCount = await RequirementRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});

it("returns a 400 with invalid c_nc_cwr", async () => {
  const cookie = await global.login(2);
  const newRfq = await request(app)
    .post("/api/v1/rfqs")
    .set("Cookie", cookie)
    .send({
      eau: 2370000,
      customer_id: 1,
      distributor_id: 1,
      pm_id: 2,
      kam_id: 2,
    })
    .expect(201);

  await request(app)
    .post(`/api/v1/rfqs/requirements`)
    .set("Cookie", cookie)
    .send({
      rfq_id: newRfq.body.id,
      c_nc_cwr: "cd",
      requirement: "new req",
      note: "new note",
    })
    .expect(400);
});

it("returns a 400 with invalid requirement", async () => {
  const cookie = await global.login(3);

  const newRfq = await request(app)
    .post("/api/v1/rfqs")
    .set("Cookie", cookie)
    .send({
      eau: 2370000,
      customer_id: 1,
      distributor_id: 1,
      pm_id: 3,
      kam_id: 3,
    })
    .expect(201);

  await request(app)
    .post(`/api/v1/rfqs/requirements`)
    .set("Cookie", cookie)
    .send({
      rfq_id: newRfq.body.id,
      c_nc_cwr: "c",
      requirement: "",
      note: "new note",
    })
    .expect(400);
});

it("returns a 400 with invalid rfq_id", async () => {
  const cookie = await global.login();

  await request(app)
    .post(`/api/v1/rfqs/requirements`)
    .set("Cookie", cookie)
    .send({
      rfq_id: 10000000,
      c_nc_cwr: "c",
      requirement: "new req",
      note: "new note",
    })
    .expect(400);
});

it("responds 401 if not authenticated", async () => {
  await request(app)
    .post(`/api/v1/rfqs/requirements`)
    .send({
      rfq_id: 1,
      c_nc_cwr: "c",
      requirement: "new req",
      note: "new note",
    })
    .expect(401);
});
