package test

import (
	"changeme/internal/define"
	"changeme/internal/service"
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"testing"
)

var rdb = redis.NewClient(&redis.Options{
	Addr: "localhost:6379",
})
var ctx = context.Background()

const CIDENTITY = "ccffe1d6-1db1-4415-92fc-20055fccb46d"

// 测试数据库列表
func TestDbList(t *testing.T) {
	list, _ := service.DbList("ccffe1d6-1db1-4415-92fc-20055fccb46d")
	for _, item := range list {
		fmt.Printf("%v\n", *item)
	}
}

// 测试数据库详情信息
func TestDbInfo(t *testing.T) {
	identity := "ccffe1d6-1db1-4415-92fc-20055fccb46d"
	dbInfo, err := service.DbInfo(identity)
	if err != nil {
		fmt.Printf("%v", err)
	}
	fmt.Printf("dbInfo:\n%v", dbInfo)
}

// 测试数据库查询
func TestKeyListRequest(t *testing.T) {
	req := define.SearchKey{
		ConnIdentity: "ccffe1d6-1db1-4415-92fc-20055fccb46d",
		Db:           0,
		Keyword:      "user123",
		KeyType:      "string",
	}
	value, err := service.SearchValues(&req)
	if err != nil {
		fmt.Printf("err:" + err.Error())
	}
	for _, item := range value {
		fmt.Printf("value:%#v\n", item)
	}
}

// 测试添加字符串
func TestAddString(t *testing.T) {
	err := service.AddString(&define.AddUpdateString{
		ConnIdentity: CIDENTITY,
		Key:          "hello11",
		Value:        "word",
		TTL:          0,
	})
	if err != nil {
		fmt.Print("err:" + err.Error())
	}
	fmt.Printf("添加成功")
}

// 测试删除字符串
func TestDelString(t *testing.T) {
	err := service.DelString(&define.DelString{
		ConnIdentity: CIDENTITY,
		Key:          "hello",
	})
	if err != nil {
		fmt.Print("err:" + err.Error())
	}
	fmt.Printf("删除成功")
}

// 测试更新字符串
func TestUpdateString(t *testing.T) {
	err := service.UpdateString(&define.AddUpdateString{ConnIdentity: CIDENTITY, Key: "key", Value: "123"})
	if err != nil {
		fmt.Print("err:" + err.Error())
	}
	fmt.Printf("删除成功")
}
