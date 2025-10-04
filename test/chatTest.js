import { expect } from "chai";
import request from "supertest";
import app from "../server.js";

describe("Chat API", function () {
  // Test the basic endpoint
  it("should return a 200 status code for the root endpoint", function (done) {
    request(app).get("/").expect(200, done);
  });

  // Test sending a message
  it("should send a message successfully", function (done) {
    request(app)
      .post("/send")
      .send({ message: "hi" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("hello");
        console.log(JSON.stringify(res.body));
        done();
      });
  });
});
