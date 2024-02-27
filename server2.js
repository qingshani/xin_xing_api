const express = require("express");
const importFresh = require("import-fresh");
const fs = require("fs");
const app = express();
global.apis_info = {};
global.yml = require("./system_api/yml.js");
const red = "\x1b[91m";
const white = "\x1b[37m%s\x1b[0m";

// 引入自定义 中间件
const res_code = require("./system_api/res_code.js");
app.use(res_code);
const res_put = require("./system_api/res_put.js");
app.use(res_put);
const req_args = require("./system_api/req_args.js");
app.use(req_args);

// 注册 API 路由
const loadApi = (api_name) => {
	apis_info[api_name] = yml.load(`./open_api/${api_name}/api_config.yml`);

	const apiPath = `./open_api/${api_name}/index`;
	delete require.cache[require.resolve(apiPath)]; // 卸载缓存中的模块
	const api = importFresh(apiPath); // 动态加载最新的模块
	try {
		if (apis_info[api_name].open) {
			app.use(`/api/${api_name}`, api);
		}
	} catch (error) {
		console.log(api_name + "未成功加载");
	}
};
global.api_count = 0;
// 遍历 open_api 目录，加载所有 API
fs.readdirSync("./open_api").forEach((api_name) => {
	try {
		loadApi(api_name);
		console.log(`${api_count + 1}.${api_name}已加载`);
		api_count++;
	} catch (error) {
		console.log(red, `${api_count}.${api_name} 未成功加载`);
		console.log(white, "");
	}
});
console.log("已加载" + api_count + "个api");
// 监听 API 变化，实现热更新
fs.watch("./open_api", (eventType, filename) => {
	if (eventType === "change") {
		const api_name = filename.split("/")[0];
		loadApi(api_name);
	}
});

// 跨域资源
// app.use(cors());

// 静态资源开放
app.use(express.static("public"));

// 404页面
app.use((req, res) => {
	res.status(404).send({ "code": 404, "state": "接口不存在 或 地址错误" });
});

// 启动服务器
app.listen(3000, () => {
	console.log("V1.2 热更新_本体 启动 3000!");
	console.log("内部快速访问地址 http://127.0.0.1:" + 3000);
});
