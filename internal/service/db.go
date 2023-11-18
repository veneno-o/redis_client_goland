package service

import (
	"changeme/internal/define"
	"changeme/internal/helper"
	"context"
	"errors"
	"fmt"
	"strconv"
	"strings"
)

var ctx context.Context

func DbList(identity string) ([]*define.DbItem, error) {
	var nums int
	res := map[string]int{}
	if identity == "" {
		return nil, errors.New("唯一标识不能为空")
	}
	connection, _ := helper.GetConnection(identity)
	rdb, _ := helper.GetRedisClient(connection, 0)

	keySpace, err := rdb.Info(context.Background(), "keyspace").Result()
	if err != nil {
		return nil, errors.New("数据执行有误" + err.Error())
	}
	dbList := strings.Split(keySpace, "\r\n")
	for i, v := range dbList {
		if i == 0 || v == "" {
			continue
		}
		key := strings.Split(v, ":")
		if len(key) < 2 {
			continue
		}
		keyValue := strings.Split(key[1], ",")
		for _, vv := range keyValue {
			arr := strings.Split(vv, "=")
			if len(arr) < 2 {
				continue
			}
			nums, _ = strconv.Atoi(arr[1])
			if arr[0] == "keys" {
				res[key[0]] = nums
			}
		}
	}
	// config get 获取数据库个数
	result, _ := rdb.ConfigGet(context.Background(), "databases").Result()

	n, _ := strconv.Atoi(result[1].(string))
	dbs := make([]*define.DbItem, n)
	for i, _ := range dbs {
		item := &define.DbItem{
			Key:    fmt.Sprintf("key%d", i),
			Number: 0,
		}

		if n, ok := res[fmt.Sprintf("key%d", i)]; ok {
			item.Number = n
		}
		dbs[i] = item
	}
	return dbs, nil
}
