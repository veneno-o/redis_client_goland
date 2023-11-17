package define

var ConfigName = "redis-client.conf"
var SuccessCode = 200
var FailCode = -1

// 连接体
type Connection struct {
	Identity string `json:"identity"`
	Name     string `json:"name"`
	Addr     string `json:"addr"`
	Port     string `json:"port"`
	UserName string `json:"userName"`
	Password string `json:"password"`
	Type     string `json:"type"`
}

// 连接池
type Config struct {
	Connections []*Connection `json:"connections"`
}

// 消息返回格式
type M struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
	Data any    `json:"data"`
}

type DbItem struct {
	Key    string `json:"key"`    // db0 db1
	Number int    `json:"number"` // 建的个数
}
