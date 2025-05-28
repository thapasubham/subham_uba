import {MentorController} from "../../../app/web/controller/MentorController.js";
import Sinon from "sinon";
import {MentorService} from "../../../app/web/services/MentorService.js";
import { ResponseApi } from "../../../utils/ApiResponse.js";

describe('MentorController', () => {
const  mentorController = new MentorController();
    let req: any;
    let res: any;
    let sendStub: Sinon.SinonStub;
    let statusStub: Sinon.SinonStub;
    let writeResponseStub: Sinon.SinonStub;

    describe('Create Mentor', () => {
        let createStub: Sinon.SinonStub;

        beforeEach(() => {
            createStub = Sinon.stub(MentorService.prototype, "CreateMentor").resolves();
            writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
            statusStub = Sinon.stub().returnsThis();
            sendStub = Sinon.stub();
            res = {
                status: statusStub,
                send: sendStub,
            };
        })
            afterEach(() => {
                createStub.restore();
                writeResponseStub.restore();
            })
            it("Create Mentor", async () => {

                const mentor = {
                    id: 0,
                    firstname: "test",
                    lastname: "test",
                    email: "<EMAIL>",
                    password: "<PASSWORD>",
                    role: 3,
                }
                req = {
                    body: {
                        mentor
                    },
                };

                await mentorController.CreateMentor(req, res);
                Sinon.assert.calledOnce(createStub);
                Sinon.assert.calledWith(createStub, {mentor});
                Sinon.assert.calledOnce(writeResponseStub);
                Sinon.assert.calledWith(writeResponseStub, res, {
                    status: 201,
                    message: "Mentor Created",
                });
            })
    })

    describe('Read Mentor', () => {
    let readStub: Sinon.SinonStub;
        beforeEach(() => {
            readStub = Sinon.stub(MentorService.prototype, "ReadMentors").resolves();
            writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
            statusStub = Sinon.stub().returnsThis();
            sendStub = Sinon.stub();
            res = {
                status: statusStub,
                send: sendStub,
            };
        })

        afterEach(()=>{
            readStub.restore();
            writeResponseStub.restore();
        })

        it("Read Mentors", async () => {
            const mentors = [
                {
                    id: 0,
                    firstname: "test",
                    lastname: "test",
                    email: "<EMAIL>",
                    password: "<PASSWORD>",
                    role: 3,
                },
                {
                    id: 0,
                    firstname: "test",
                    lastname: "test",
                    email: "<EMAIL>",
                    password: "<PASSWORD>",
                    role: 3,
                }
            ]

            req = {
                query: {
                    offset: 1,
                    limit: 5,
                },
            };
            readStub.returns(mentors);
            await mentorController.GetMentors(req, res);
            Sinon.assert.calledOnce(readStub);
            Sinon.assert.calledWith(readStub, 5, 1);
            Sinon.assert.calledOnce(writeResponseStub);
            Sinon.assert.calledWith(writeResponseStub, res, {
                status: 200,
                data: mentors,
            })
        })
            it("Read Mentor by id", async () => {
                const mentor ={
                        id: 0,
                        firstname: "test",
                        lastname: "test",
                        email: "<EMAIL>",
                        password: "<PASSWORD>",
                        role: 3,
                    }


                req = {
                   params: {id: 5}
                };
                readStub.returns(mentor);
                await mentorController.GetMentor(req, res);
                Sinon.assert.calledOnce(readStub);
                Sinon.assert.calledWith(readStub, 0,0,5);
                Sinon.assert.calledOnce(writeResponseStub);
                Sinon.assert.calledWith(writeResponseStub, res, {
                    status: 200,
                    data: mentor,
                })
        })
    });

    describe('Update Mentor', () => {
       let updateStub: Sinon.SinonStub;
        beforeEach(() => {
            updateStub = Sinon.stub(MentorService.prototype, "Update").resolves();
            writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
            statusStub = Sinon.stub().returnsThis();
            sendStub = Sinon.stub();
            res = {
                status: statusStub,
                send: sendStub,
            };
        });
        afterEach(() => {
                updateStub.restore();
                writeResponseStub.restore();
            });

            it("Update the mentor", async () => {
                req = {
                    body: {
                        firstname: "test",
                        lastname: "test",
                        phoneNumber: "9854752314",
                    },
                    params: {
                        id: "5",
                    },
                };

                updateStub.returns(1);
                await mentorController.UpdateMentor(req, res);
                Sinon.assert.calledOnce(updateStub);
                Sinon.assert.calledWith(writeResponseStub, res, {
                    message: "Mentor Updated",
                    status: 200,
                });
            });
        })


})