const express = require("express");
const router = express.Router();
const api_config = yml.load(__dirname + "/config.yml");

// 定义路由
router.get("/", (req, res) => {
	const json = {
		"stare": "ok",
	};
	res.put(json);
});

module.exports = router;
