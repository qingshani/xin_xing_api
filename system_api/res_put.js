function res_put(req, res, next) {
	res.put = function (data, code = 200) {
		// 获取back_type 默认"json"
		const back_type = req.query.back_type || "json";

		// 时间戳生成
		const timer = new Date().getTime();

		let result = {
			code: code,
			state: code == 200 ? "ok" : "fail",
			data: data,
			this_time: timer,
		};

		if (code != 200) {
			res.data = "";
			// res.message = lang(801);
		}

		// 如果debug模式开启则全部信息展示
		if (!req.query.debug) {
			delete result.data.debug;
		}

		if (back_type === "string") {
			res.send(JSON.stringify(result));
			return;
		}
		if (back_type === "json") {
			res.status(code).send(result);
			return;
		}
		if (back_type === "img") {
			if (result.data.imgurl) {
				res.redirect(result.data.imgurl);
				return;
			} else {
				// "本接口未适配back_type = img"
				res.code(761);
				return;
			}
		}
		res.send("1");
	};
	next();
}

module.exports = res_put;
