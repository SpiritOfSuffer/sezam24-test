const supertest = require("supertest");
const should = require("should");
const server = supertest.agent("http://localhost:5000");

describe("testing our http-server", () => {
  it("should return json with titles", (done) => {
    server
    .get("/api/v1/news")
    .expect("Content-type",/json/)
    .expect(200) 
    .end((err, res) => {
      should(res.status).equal(200);
      should(res.body.error).equal(undefined);
      done();
    });
  });
});