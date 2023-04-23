import http from "./http.js";
export default {
  //用户列表
  findAll() {
    return http({
      url: `/api/mockGetList`,
      method: "get",
    });
  },

  //添加用户
  addUser(user) {
    return http({
      url: `/api/add`,
      method: "post",
      data: user,
    });
  },
};
