package test

import (
	"changeme/internal/define"
	"changeme/internal/service"
	"context"
	"fmt"
	"testing"

	"github.com/go-redis/redis/v8"
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
		ConnIdentity: "b304e3a6-6430-401a-a0a8-6f120136c221",
		Db:           0,
		Keyword:      "",
		KeyType:      "",
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
	})
	if err != nil {
		fmt.Print("err:" + err.Error())
		return
	}
	fmt.Printf("添加成功")
}

// 测试删除字符串
func TestDelString(t *testing.T) {
	err := service.DelString(&define.DelString{
		ConnIdentity: CIDENTITY,
		Key:          "hello11",
	})
	if err != nil {
		fmt.Print("err:" + err.Error())
		return
	}
	fmt.Printf("删除成功")
}

// 测试更新字符串
func TestUpdateString(t *testing.T) {
	err := service.UpdateString(&define.AddUpdateString{ConnIdentity: CIDENTITY, Key: "key", Value: ""})
	if err != nil {
		fmt.Print("err:" + err.Error())
		return
	}
	fmt.Printf("更新成功")
}

// 测试添加哈希
func TestAddHash(t *testing.T) {
	err := service.AddHash(&define.AddHash{
		ConnIdentity: CIDENTITY,
		Key:          "c",
		Value: map[string]string{
			"eat":    "fish",
			"weight": "40",
			"a":      "b",
			"c":      "d",
		},
	})
	if err != nil {
		fmt.Print("err:" + err.Error())
		return
	}
	fmt.Printf("添加成功")
}

// 测试删除某个hash filed
func TestDelHash(t *testing.T) {
	err := service.DelHash(&define.DelHash{
		ConnIdentity: CIDENTITY,
		Key:          "cat1",
	})
	if err != nil {
		fmt.Print("err:" + err.Error())
		return
	}
	fmt.Printf("删除成功")
}

// 测试删除某个hash filed
func TestDelHashItem(t *testing.T) {
	err := service.DelHashItem(&define.DelHashItem{
		ConnIdentity: CIDENTITY,
		Key:          "c",
		Field:        []string{"eat", "c"},
	})
	if err != nil {
		fmt.Print("err:" + err.Error())
		return
	}
	fmt.Printf("field删除成功")
}

// 测试更新hash filed
func TestUpdateHashItem(t *testing.T) {
	err := service.UpdateHashItem(&define.UpdateHashItem{
		ConnIdentity: CIDENTITY,
		Key:          "c",
		Field:        map[string]string{"a": "d"},
	})
	if err != nil {
		fmt.Print("err:" + err.Error())
		return
	}
	fmt.Printf("field更新成功\n")
}

// 测试cli
func TestExeCli(t *testing.T) {
	cli, err := service.ExeCli(&define.Cli{
		ConnIdentity: "d3fc0813-b795-4bef-bb36-1fb32509b97f",
		Cli:          []any{"keys", "*"},
	})
	if err != nil {
		fmt.Println("err:\n" + err.Error())
		return
	}
	fmt.Printf("cli:%#v\n", cli)
}

// 测试客户端连接
func TestConn(t *testing.T) {
	err := service.DbConn("d3fc0813-b795-4bef-bb36-1fb32509b97f")
	if err != nil {
		fmt.Print(err.Error())
	}
	fmt.Printf("连接成功")
}
