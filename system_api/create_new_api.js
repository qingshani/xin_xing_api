const fs = require("fs");
const path = require("path");
const yml = require("./yml.js");
const red = "\x1b[91m";
const white = "\x1b[37m%s\x1b[0m";

function createApiFiles(api_name) {
	const open_api_path = "./open_api/";
	const open_api_path_dir = open_api_path + api_name;
	const template_path = "./private/template/";
	// 读取目录内容
	const files = fs.readdirSync(open_api_path);

	// 判断是否存在名为 api_name 的文件夹
	if (files.includes(api_name)) {
		console.log(red, `${api_name} 文件夹已存在,请更换名称`);
		return;
	}

	fs.mkdirSync(open_api_path_dir);
	fs.mkdirSync(open_api_path_dir + "/api_data");
	fs.mkdirSync(open_api_path_dir + "/api_temp");
	fs.writeFileSync(open_api_path_dir + "/api_config.yml", api_config);
	fs.writeFileSync(open_api_path_dir + "/index.js", index_js);
}

// 从命令行参数获取 API 名称
const api_name = process.argv[2];
if (!api_name) {
	console.log(red, "npm run apii [api名称]");
	console.log(white, " 获取输出变量错误 未找到api名称 \r\n");
	process.exit(1);
}

const api_config = `api_name:
api_version: 0.0.1
author_name:
api_index: index.js

# api创建时间
api_create_time: 0

# api上线时间
api_online_time: 0

# api依赖项
api_dependencies:
  - nodejs

# api 描述
api_describe: 你的第一款API又何必是API

# API 作者的GITHUB首页地址
github: https://github.com/author

# 由系统分配的ID序号 不需要填
id: 0

# 是公开或者私有?公开任何人都可以访问,私有则有白名单(暂未开发)
type: public

# api的状态?normal:一切正常;
# maintenance:正在维护;
# delete:表示永久删除;
# stop:表示没有原因就是必须暂时使用
state: normal

# 表示是否需要挂载此api?只有每次启动服务器时才会需要用到
open: false

# 是否开启参数验证?true/false默认false 至于如何验证请查看文档
args_test: false
# -------------------------------- 需要参数验证的取消下面的 全部 注释
# # API参数列表
# args:
#   #参数1
#   - arg1:
#       #是否必须
#       - must: false
#       #参数的介绍
#       - des:
#       #默认值
#       - default:
#       #值的类型 string/int/json/url/base64/array/
#       - type:
#   #参数2
#   - arg2:
#       #是否必须
#       - must: false
#       #参数的介绍
#       - des:
#       #默认值
#       - default:
#       #值的类型 string/int/json/url/base64/array/
#       - type:
`;

const index_js = `
const express = require("express");
const router = express.Router();
const api_config = yml.load(__dirname + "/api_config.yml");
// 定义路由
router.get("/", (req, res) => {
	// 代码
});

module.exports = router;
`;
createApiFiles(api_name);
