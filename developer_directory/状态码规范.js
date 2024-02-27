// 已废弃此规范
// 已废弃此规范
// 已废弃此规范
// 已废弃此规范
// 已废弃此规范
// 已废弃此规范
// 已废弃此规范
var json = {
	"http_code": 200,
	"result": {
		"data": {
			"code": 0, //最外层的CODE只能是0或者1，表示这个api结果是否是理想结果且正常输出"
			"id": 10,
			"title": "学生恶意篡改同学高考志愿被行拘",
			"url":
				"https://m.weibo.cn/search?containerid=100103type%3D1%26t%3D10%26q%3D%23%E5%AD%A6%E7%94%9F%E6%81%B6%E6%84%8F%E7%AF%A1%E6%94%B9%E5%90%8C%E5%AD%A6%E9%AB%98%E8%80%83%E5%BF%97%E6%84%BF%E8%A2%AB%E8%A1%8C%E6%8B%98%23&stream_entry_id=31&isnewpage=1&extparam=seat%3D1%26pos%3D9%26filter_type%3Drealtimehot%26c_type%3D31%26dgr%3D0%26cate%3D5001%26realpos%3D9%26flag%3D0%26stream_entry_id%3D31%26lcate%3D5001%26q%3D%2523%25E5%25AD%25A6%25E7%2594%259F%25E6%2581%25B6%25E6%2584%258F%25E7%25AF%25A1%25E6%2594%25B9%25E5%2590%258C%25E5%25AD%25A6%25E9%25AB%2598%25E8%2580%2583%25E5%25BF%2597%25E6%2584%25BF%25E8%25A2%25AB%25E8%25A1%258C%25E6%258B%2598%2523%26band_rank%3D9%26display_time%3D1688527908%26pre_seqid%3D1688527908003032670147&luicode=10000011&lfid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot",
		},
		"lastTime": 1688527906, //微博最后更新的时间，十分钟更新一次
		"lastTimeP": "2023-07-05 11:31:46", //格式化后的时间
	},
	"time": 1688527906, //当API被调用时的时间
	"backtype": "JavaScript Object Notation", //返回格式,这是里JSON,为了装13才写全称
};

// 其中 最外层的code ，data内的code，最外层的time，最外层的backtype是通用API返回值
/** 

{
    "code": 0,
    "http_code": 200,
    "data": {
        "text": "只要是石头，到哪里都不会发光。"
    },
    "time": 1688527906,
    "backtype": "text"
}

*/
