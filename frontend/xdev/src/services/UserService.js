import http from "../http-common";

class UserService {
    signup(data){
        debugger;
        return http.post("/sigup", data);
    }
}

export default new UserService();