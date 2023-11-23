package define

import (
	"time"
)

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

// 数据查询格式
type SearchKey struct {
	ConnIdentity string `json:"conn_identity"`
	Db           int    `json:"db"`
	Keyword      string `json:"keyword"`
	KeyType      string `json:"keyType"`
}

// 查询数据返回格式
type ReplyValue struct {
	Value any           `json:"value"`
	TTL   time.Duration `json:"ttl"`
	Type  string        `json:"type"`
}

// 字符串添加 & 修改格式
type AddUpdateString struct {
	ConnIdentity string        `json:"conn_identity"`
	Key          string        `json:"key"`
	Value        string        `json:"value"`
	TTL          time.Duration `json:"ttl"`
}

// 删除字符串格式
type DelString struct {
	ConnIdentity string `json:"conn_identity"`
	Key          string `json:"key"`
}

// 添加哈希类型
type AddHash struct {
	ConnIdentity string            `json:"conn_identity"`
	Key          string            `json:"key"`
	Value        map[string]string `json:"value"`
	TTL          time.Duration     `json:"ttl"`
}

// 删除哈希类型
type DelHash struct {
	ConnIdentity string `json:"conn_identity"`
	Key          string `json:"key"`
}

// 删除哈希字段类型
type DelHashItem struct {
	ConnIdentity string   `json:"conn_identity"`
	Key          string   `json:"key"`
	Field        []string `json:"field"`
}

// 更新哈希字段类型
type UpdateHashItem struct {
	ConnIdentity string            `json:"conn_identity"`
	Key          string            `json:"key"`
	Field        map[string]string `json:"field"`
}

// cli操作
type Cli struct {
	ConnIdentity string `json:"conn_identity"`
	Cli          []any`json:"cli"`
}
