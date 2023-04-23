// 引入mockjs
import Mock from "mockjs";

// 获取 mock.Random 对象
const Random = Mock.Random;

// 使用mockjs模拟数据
let tableList = [
  {
    id: "5ffa80aD-9CF4-0C77-eBFC-f6612BfAcF4F",
    url: "/image/20201222164536582.jpg",
  },
  {
    id: "5ffa80aD-9CF4-0C77-eBFC-f6612BfAcF4F1",
    url: "/image/20220729154931740.jpg",
  },
  {
    id: "5ffa80aD-9CF4-0C77-eBFC-f6612BfAcF4F2",
    url: "/image/20221121152123405.jpg",
  },
  {
    id: "5ffa80aD-9CF4-0C77-eBFC-f6612BfAcF4F3",
    url: "/image/20230117174003545.jpg",
  },
];

// for (let i = 0; i < 20; i++) {
//   let newObject = {
//     id: Random.guid(), // 获取全局唯一标识符
//     account: /^[a-zA-Z0-9]{4,6}$/,
//     password: /^[a-zA-Z]\w{5,17}$/,
//     address: /[1-9]\d{7,10}@qq\.com/,
//   };
//   tableList.push(newObject);
// }

/** get请求
 * 获取用户列表
 */
Mock.mock("/api/mockGetList", "get", () => {
  return {
    code: "0",
    data: tableList,
  };
});

/** post请求添加表格数据 */
Mock.mock("/api/add", "post", (params) => {
  let newData = JSON.parse(params.body);
  newData.id = Random.guid();
  tableList.push(newData);
  return {
    code: "0",
    message: "success",
    data: tableList,
  };
});
