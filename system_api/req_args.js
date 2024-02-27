function req_args(req, res, next) {
	// 对api进行验证 是否开启 是否有权限
	// const api_name = req.path.replace("/api/", "");
	// if (!apis_info[api_name].open) {
	// 	res.code(801);
	// }

	// req.args = {};
	// req.args.must = function () {};
	// req.args.normal = function () {};
	next();
}
module.exports = req_args;
