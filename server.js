const fs = require("fs");
const express = require("express");
const app = express();
global.apis_info = {};
global.yml = require("./system_api/yml.js");

// 引入自定义 中间件
const res_code = require("./system_api/res_code.js");
app.use(res_code);
const res_put = require("./system_api/res_put.js");
app.use(res_put);
const req_args = require("./system_api/req_args.js");
app.use(req_args);

const loadApi = (api_name) => {
	// 载入各api配置文件进入全局
	apis_info[api_name] = yml.load(`./open_api/${api_name}/api_config.yml`);
	// 加载每个 API 的 index.js
	const api = require(`./open_api/${api_name}/index`);

	// 注册 API 路由
	try {
		if (apis_info[api_name].open) {
			app.use(`/api/${api_name}`, api);
		}
	} catch (error) {
		console.log(api_name + "加载失败");
	}
};

// 遍历 open_api 目录
fs.readdirSync("./open_api").forEach((api_name) => {
	loadApi(api_name);
});

// 跨域资源
app.use(cors());

// 静态资源开放
app.use(express.static("public"));

// 404页面
app.use((req, res) => {
	res.status(404).send({ "code": 404, "state": "接口不存在 或 地址错误" });
});

// 启动服务器
app.listen(3000, () => {
	console.log("v1.2 Server started on port 3000");
});
