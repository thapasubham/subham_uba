import Sinon from "sinon";
import refreshTokenValid from "../../../app/web/auth/refreshToken.auth";
import {assert, expect} from "chai";
import {constants} from "../../../constants/constant.js";
import {HttpError} from "../../../app/web/middleware/error";
import {Auth} from "../../../app/web/auth/authorization";
describe("Refresh token test",()=> {
    let res: any;
    let req: any;
    let next: Sinon.SinonSpy;
    let decodeStub: Sinon.SinonStub ;
    before(async () => {
    decodeStub = Sinon.stub(Auth, "getDecodedToken");

        next = Sinon.spy();
    })
after(async () => {
    decodeStub.restore();
    next = Sinon.spy();
})
    it("Refresh token missing", async()=>{
    req ={ headers:{}};
    try{
        await refreshTokenValid(req, res, next);
    }catch(error){
        expect(error).to.be.instanceOf(HttpError);
        expect(error.message).to.equal(constants.EMPTY_TOKEN);
        expect(error.status).to.equal(401);
    }
    })
    it(" Incorrect token ", async()=>{
        req ={ headers:{
            authorization: "refresh notValidToken "
            }};
        try{
            await refreshTokenValid(req, res, next);
        }catch(error){
            expect(error).to.be.instanceOf(HttpError);
            expect(error.message).to.equal(constants.EMPTY_TOKEN);
            expect(error.status).to.equal(401);
        }
    })
    it("Call next function",async()=>{
        req = {
            headers: {
                authorization: "refreshToken valid token"
            }
        }
        res = {
            local: {}
        }
        const decodedToken ={id: 12}
        decodeStub.returns(decodedToken);

        await refreshTokenValid(req, res, next);

        Sinon.assert.calledOnce(next)

    });

});