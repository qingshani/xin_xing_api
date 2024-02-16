const express = require("express");
const importFresh = require("import-fresh");
const fs = require("fs");
const app = express();
global.apis_info = {};
global.read_code = (code) => {
	const lang = JSON.parse(fs.readFileSync("./system_api/main_lang.json"))[code];
	if (lang) {
		return lang;
	} else {
		return;
	}
};
// 引入自定义 res.put
const res_code = require("./system_api/res_code.js");
app.use(res_code);
const res_put = require("./system_api/res_put.js");
app.use(res_put);
const req_args = require("./system_api/req_args.js");
app.use(req_args);

// 注册 API 路由
const loadApi = (apiName) => {
	apis_info[apiName] = JSON.parse(fs.readFileSync(`./open_api/${apiName}/api_config.json`));

	const apiPath = `./open_api/${apiName}/index`;
	delete require.cache[require.resolve(apiPath)]; // 卸载缓存中的模块
	const api = importFresh(apiPath); // 动态加载最新的模块
	try {
		if (apis_info[apiName].open) {
			app.use(`/api/${apiName}`, api);
		}
	} catch (error) {
		console.log(apiName + "加载失败");
	}
};

// 遍历 open_api 目录，加载所有 API
fs.readdirSync("./open_api").forEach((apiName) => {
	loadApi(apiName);
});

// 监听 API 变化，实现热更新
fs.watch("./open_api", (eventType, filename) => {
	if (eventType === "change") {
		const apiName = filename.split("/")[0];
		loadApi(apiName);
	}
});
app.use((req, res) => {
	res.status(404).send({ "code": 404, "state": "接口不存在 或 地址错误" });
});
// 启动服务器
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
