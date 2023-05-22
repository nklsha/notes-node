let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server.js");
let dotenv = require("dotenv")
dotenv.config()

let should = chai.should();

chai.use(chaiHttp);


describe("/GET all notes", () => {
    it("it should GET all the notes", (done) => {
        chai.request(server)
            .get("/note")
            .set({ "authorization": `Bearer ${process.env.TESTING_USER_ACCESS_TOKEN}` })
            .end((err, res) => {
                res.body.should.have.property("data");

                const data = res.body.data;
                res.should.have.status(200);
                data.should.be.a("array");
                data.length.should.be.greaterThan(0);

                done();
            });
    });
});

describe("POST/GET/UPDATE/DELETE a note", () => {
    var addedNote;

    it("it should POST a new note", async () => {

        const res1 = await chai.request(server)
            .post("/note")
            .set({ "authorization": `Bearer ${process.env.TESTING_USER_ACCESS_TOKEN}` })
            .send({
                title: "Some title",
                description: "Some description"
            });

        chai.expect(res1.body).to.have.property("data");
        chai.expect(res1).have.status(200);

        addedNote = res1.body.data;
        chai.expect(addedNote).to.be.a("object")

        chai.expect(addedNote).to.have.property("title").eql("Some title");
        chai.expect(addedNote).to.have.property("description").eql("Some description");
        chai.expect(addedNote).to.have.property("id")
    });


    it("it should get added Note GET/:id", async () => {
        const res2 = await chai.request(server)
            .get("/note/" + addedNote.id)
            .set({ "authorization": `Bearer ${process.env.TESTING_USER_ACCESS_TOKEN}` });

        chai.expect(res2.body).to.have.property("data");
        chai.expect(res2).have.status(200);

        chai.expect(res2.body.data).to.be.a("array")
        chai.expect(res2.body.data[0]).to.have.property("title").eql(addedNote.title);
        chai.expect(res2.body.data[0]).to.have.property("description").eql(addedNote.description);
        chai.expect(res2.body.data[0]).to.have.property("id").eql(addedNote.id)
    });

    it("it should update added Note PUT/:id", async () => {
        const res2 = await chai.request(server)
            .put("/note/" + addedNote.id)
            .set({ "authorization": `Bearer ${process.env.TESTING_USER_ACCESS_TOKEN}` })
            .send({ title: "Updated title", description: "Updated description" });

        chai.expect(res2.body).to.have.property("data");
        chai.expect(res2).have.status(200);

        chai.expect(res2.body.data).to.be.a("object")
        chai.expect(res2.body.data).to.have.property("title").eql("Updated title");
        chai.expect(res2.body.data).to.have.property("description").eql("Updated description");
        chai.expect(res2.body.data).to.have.property("id").eql(addedNote.id)
    });

    it("it should update added Note DELETE/:id", async () => {
        const res2 = await chai.request(server)
            .delete("/note/" + addedNote.id)
            .set({ "authorization": `Bearer ${process.env.TESTING_USER_ACCESS_TOKEN}` });

        chai.expect(res2.body).to.have.property("data");
        chai.expect(res2).have.status(200);

        chai.expect(res2.body.data).to.be.a("object")
        chai.expect(res2.body.data).to.have.property("id").eql(addedNote.id)
    });
});