const fs = require("fs");
const yaml = require("js-yaml");

// 读取 YAML 文件
function load(yml_file_name) {
	const yamlData = fs.readFileSync(yml_file_name, "utf8");
	const data = yaml.load(yamlData);
	return data;
}

// 保存数据到 YAML 文件
function save(yml_file_name, data) {
	let yamlData;
	if (Object.keys(data).length === 0 && data.constructor === Object) {
		yamlData = "";
	} else {
		yamlData = yaml.dump(data);
	}

	fs.writeFileSync(yml_file_name, yamlData, "utf8");
}

// 删除 key
function remove(yml_file_name, key) {
	const existingData = load(yml_file_name) || {};
	delete existingData[key];

	save(yml_file_name, existingData);
}

// 设置特定字段值到 YAML 文件
function set(yml_file_name, key, value) {
	const existingData = load(yml_file_name) || {};

	// 解析 YAML 并保留注释
	const data = yaml.parse(existingData, { keepBlobsInJSON: true });

	// 处理数据
	data[key] = value;

	// 将数据转换回 YAML 字符串
	const newYamlString = yaml.stringify(data, { keepBlobsInJSON: true });

	save(yml_file_name, newYamlString);
}

module.exports = {
	load,
	save,
	set,
	// createYaml,
	// deleteYaml,
};
