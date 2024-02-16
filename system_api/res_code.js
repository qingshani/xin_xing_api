function res_code(req, res, next) {
	res.code = function (code) {
		const lang = read_code(code);
		if (lang == undefined) {
			console.log(1);
		}
		res.put(lang, code);
	};
	next();
}

module.exports = res_code;
