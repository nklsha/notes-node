let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server.js");

let should = chai.should();
chai.use(chaiHttp);

describe("/GET notes", () => {
    it("it should GET all the notes", (done) => {
        chai.request(server)
            .get("/note")
            .end((err, res) => {
                res.body.should.have.property("data");
                res.body.should.have.property("status");

                const data = res.body.data;
                res.should.have.status(200);
                data.should.be.a("array");
                data.length.should.be.greaterThan(0);

                done();
            });
    });
});

describe("/POST notes", () => {
    it("it should post a new note", (done) => {
        let note = {
            title: "Some title",
            description: "Some description"
        };

        chai.request(server)
            .post("/note")
            .send(note)
            .end((err, res) => {
                res.body.should.have.property("data");
                res.body.should.have.property("status");
                res.should.have.status(200);

                const data = res.body.data;
                data.should.be.a("object");
                data.should.have.property("title").eql("Some title");
                data.should.have.property("description").eql("Some description");
                data.should.have.property("id");

                done();
            });
    });
});