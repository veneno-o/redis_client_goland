package service

import (
	"changeme/internal/define"
	"changeme/internal/helper"
	"context"
	"errors"
	"fmt"
)

var ctx context.Context

func DbList(identity string) ([]*define.DbItem, error) {
	if identity == "" {
		return nil, errors.New("唯一标识不能为空")
	}
	conn, err := helper.GetConnection(identity)
	if err != nil {
		return nil, err
	}
	rdb, err := helper.GetRedisClient(conn, 0)
	if err != nil {
		return nil, err
	}
	// info 获取不同建个数
	keySpace, err := rdb.Info(context.Background(), "keyspace").Result()
	// config get 获取数据库个数
	fmt.Printf("keySpace:%#v", keySpace)
	if err != nil {
		return nil, nil
	}
	return nil, nil
}
