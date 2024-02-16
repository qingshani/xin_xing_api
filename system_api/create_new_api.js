const fs = require("fs");
const path = require("path");

function createApiFiles(apiName) {
	const folderPath = `./open_api/${apiName}`;
	const indexPath = path.join(folderPath, "index.js");
	const infoPath = path.join(folderPath, "api_config.json");

	// 创建文件夹
	fs.mkdirSync(folderPath, { recursive: true });

	// 创建 index.js 文件并写入内容
	const indexContent = `
const express = require("express");
const router = express.Router();

// 定义路由
//req是请求 res是响应
router.get("/", (req, res) => {
    const json = {
        "status": "ok"
    };
    res.json(json);
});

module.exports = router;
`;
	fs.writeFileSync(indexPath, indexContent);

	// 创建 api_info.json 文件并写入内容
	const apiInfoContent = `
{
    "name": "${apiName}",
    "id": "0",
    "type": "public",
    "state": "normal",
    "open": false
}
`;
	fs.writeFileSync(infoPath, apiInfoContent);

	console.log(`API files for '${apiName}' created successfully.`);
}

// 从命令行参数获取 API 名称
const apiName = process.argv[2];
if (!apiName) {
	console.error("Please provide an API name.");
	process.exit(1);
}

createApiFiles(apiName);
