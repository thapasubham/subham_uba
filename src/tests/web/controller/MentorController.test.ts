import {MentorController} from "../../../app/web/controller/MentorController.js";
import Sinon from "sinon";
import {MentorService} from "../../../app/web/services/MentorService.js";
import { ResponseApi } from "../../../utils/ApiResponse.js";
import {assert} from "chai";

describe('MentorController', () => {
const  mentorController = new MentorController();
    let req: any;
    let res: any;
    let sendStub: Sinon.SinonStub;
    let statusStub: Sinon.SinonStub;
    let writeResponseStub: Sinon.SinonStub;


    const tokenData ={
        signed_token:{
            bearerToken: "bearer",
            accessToken: "accessToken",
        },
        id :4,
        permission: ["view", "edit"]
    }


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
                    email: "email",
                    password: "password",
                    phoneNumber: "9748152452",
                    role: 3,
                }
                req = { body: { ...mentor } };

                await mentorController.CreateMentor(req, res);
                Sinon.assert.calledOnce(createStub);
                Sinon.assert.calledWith(createStub, mentor);
                Sinon.assert.calledOnce(writeResponseStub);
                Sinon.assert.calledWith(writeResponseStub, res, {
                    status: 201,
                    message: "Mentor Created",
                });
            })
    })

    describe('Read Mentor', () => {
    let readsStub: Sinon.SinonStub;
    let readStub: Sinon.SinonStub;
        beforeEach(() => {
            readsStub = Sinon.stub(MentorService.prototype, "ReadMentors").resolves();
            readStub= Sinon.stub(MentorService.prototype, "ReadMentor");
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
            readsStub.restore();
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
            readsStub.returns(mentors);
            await mentorController.GetMentors(req, res);
            Sinon.assert.calledOnce(readsStub);
            Sinon.assert.calledWith(readsStub, 5, 1);
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
                        email: "email",
                    phoneNumber: "9748152452",
                        role: 3,
                    }


                req = {
                   params: {id: 5}
                };
                readStub.returns(mentor);
                await mentorController.GetMentor(req, res);
                Sinon.assert.calledOnce(readStub);
                Sinon.assert.calledWith(readStub, 5);
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
        it("Failed to update the mentor", async () => {
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

            updateStub.returns(0);
            await mentorController.UpdateMentor(req, res);
            Sinon.assert.calledOnce(updateStub);
            Sinon.assert.calledWith(writeResponseStub, res, {
                message: "Failed to update Mentor",
                status: 404,
            });
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


    describe("Refresh Mentor", () => {
        let refreshStub: Sinon.SinonStub;
        beforeEach(() => {
            refreshStub= Sinon.stub(MentorService.prototype, "Refresh").resolves();
            writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
            statusStub = Sinon.stub().returnsThis();
            sendStub = Sinon.stub();
            res = {
                status: statusStub,
                send: sendStub,
            };
        })
        afterEach(()=>{
            refreshStub.restore();
            writeResponseStub.restore();
        })
        it("Refresh the mentor", async () => {
            res = {
                locals: {
                    id: 4
                }
            }

            refreshStub.returns(tokenData);
             await mentorController.Refresh(req, res);
            Sinon.assert.calledOnce(refreshStub);
            Sinon.assert.calledWith(writeResponseStub, res, {status:200, data: tokenData });
            Sinon.assert.calledOnce(writeResponseStub);
        })
    })

    describe("Login Mentor", () => {
        let loginStub: Sinon.SinonStub;
        beforeEach(() => {
            loginStub= Sinon.stub(MentorService.prototype, "Login").resolves();
            writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
            statusStub = Sinon.stub().returnsThis();
            sendStub = Sinon.stub();
            res = {
                status: statusStub,
                send: sendStub,
            };
        })
        afterEach(()=>{
            loginStub.restore();
            writeResponseStub.restore();
        })
        it("Login mentor test", async () => {
            req = {
             body:{
                 email: "cool@mail.com",
                 password: "verySecure",
             }
            }

            loginStub.returns(tokenData);
            await mentorController.login(req, res);
            Sinon.assert.calledOnce(loginStub);
            Sinon.assert.calledWith(writeResponseStub, res, {status:200, data: tokenData });
            Sinon.assert.calledOnce(writeResponseStub);
        })
    })

    describe('Delete Mentor', () => {
        let deleteStub: Sinon.SinonStub;
        beforeEach(() => {
            deleteStub = Sinon.stub(MentorService.prototype, "DeleteMentor").resolves();
            writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
            statusStub = Sinon.stub().returnsThis();
            sendStub = Sinon.stub();
            res = {
                status: statusStub,
                send: sendStub,
            };
        });
        afterEach(() => {
            deleteStub.restore();
            writeResponseStub.restore();
        });
        it("Failed to delete the mentor", async () => {
            req = {
                body: {
                    firstname: "test",
                    lastname: "test",
                    phoneNumber: "9854752414",
                },
                params: {
                    id: "1",
                },
            };

            deleteStub.returns(0);
            await mentorController.DeleteMentor(req, res);
            Sinon.assert.calledOnce(deleteStub);
            Sinon.assert.calledWith(writeResponseStub, res, {
                message: "Failed to delete mentor",
                status: 400,
            });
        });
        it("Delete the mentor", async () => {
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

            deleteStub.returns(1);
            await mentorController.DeleteMentor(req, res);
            Sinon.assert.calledOnce(deleteStub);
            Sinon.assert.calledWith(writeResponseStub, res, {
                message: "Mentor Deleted",
                status: 204,
            });
        });
    })



})