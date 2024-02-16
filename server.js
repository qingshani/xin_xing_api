const fs = require("fs");
const express = require("express");
const app = express();
global.apis_info = {};
global.read_code = (code) => {
	return JSON.parse(fs.readFileSync("./system_api/main_lang.json"))[code];
};
// 引入自定义 res.put
const res_put = require("./system_api/res_put.js");
app.use(res_put);
const res_code = require("./system_api/res_code.js");
app.use(res_code);
// 遍历 open_api 目录
fs.readdirSync("./open_api").forEach((api_name) => {
	// 加载每个 API 的 index.js
	apis_info[apiName] = JSON.parse(fs.readFileSync(`./open_api/${api_name}/api_info.json`));
	const api = require(`./open_api/${api_name}/index`);

	// 注册 API 路由
	try {
		if (apis_info[api_name].open) {
			app.use(`/api/${api_name}`, api);
		}
	} catch (error) {
		console.log(api_name + "加载失败");
	}
});

// 跨域资源
app.use(cors());

// 静态资源开放
app.use(express.static("public"));

// 404页面
app.use((req, res) => {
	res.status(404).send({ "code": 404 });
});

// 启动服务器
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
