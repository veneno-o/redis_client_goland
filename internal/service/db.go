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

// 建立连接
func DbConn(identity string) error {
	rdb, err := helper.GetRedisClient(identity, 0)
	if err != nil {
		return err
	}
	_, err = rdb.Do(context.Background(), "ping").Result()
	if err != nil {
		return err
	}
	return nil
}

// 获取数据库列表
func DbList(identity string) ([]*define.DbItem, error) {
	var nums int
	res := map[string]int{}
	if identity == "" {
		return nil, errors.New("唯一标识不能为空")
	}
	rdb, err := helper.GetRedisClient(identity, 0)
	if err != nil {
		panic(err)
	}
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
	for i := range dbs {
		item := &define.DbItem{
			Key: fmt.Sprintf("db%d", i),
		}

		if n, ok := res[fmt.Sprintf("db%d", i)]; ok {
			item.Number = n
		}
		dbs[i] = item
	}
	return dbs, nil
}

// 获取数据库详情信息
func DbInfo(identity string) (map[string]string, error) {
	//var nums int
	res := map[string]string{}
	if identity == "" {
		return nil, errors.New("唯一标识不能为空")
	}

	rdb, err := helper.GetRedisClient(identity, 0)
	if err != nil {
		panic(err)
	}
	dbInfo := rdb.Info(context.Background())
	infoArr := strings.Split(dbInfo.String(), "\r\n")
	for _, info := range infoArr {
		keyArr := strings.Split(info, ":")
		if len(keyArr) < 2 {
			continue
		}
		res[keyArr[0]] = keyArr[1]
	}
	return res, nil
}

// 模糊查询数据库数据
func SearchValues(req *define.SearchKey) ([]*define.ReplyValue, error) {
	if req.ConnIdentity == "" {
		return nil, errors.New("唯一标识不能为空")
	}
	replyList := make([]*define.ReplyValue, 0)
	rdb, err := helper.GetRedisClient(req.ConnIdentity, 0)
	defer rdb.Close()
	if err != nil {
		return nil, err
	}
	// 模糊匹配key
	perStr := fmt.Sprintf("*%s*", req.Keyword)
	iterator := rdb.Scan(context.Background(), 0, perStr, 0).Iterator()
	// 迭代value
	for iterator.Next(ctx) {
		reply := new(define.ReplyValue)
		// 拿到准确的key
		key := iterator.Val()
		reply.Key = key
		//	判断类型
		type_, err := rdb.Type(context.Background(), key).Result()
		if err != nil {
			return nil, err
		}
		// 不是需要查询的类型，跳过
		if req.KeyType != "" && type_ != req.KeyType {
			continue
		}
		// 返回值
		reply.Type = type_
		//

		switch type_ {
		case "string":
			val, err := rdb.Get(context.Background(), key).Result()
			if err != nil {
				return nil, err
			}
			reply.Value = val
		case "hash":
			val, err := rdb.HGetAll(context.Background(), key).Result()
			if err != nil {
				return nil, err
			}
			reply.Value = val
		case "set":
		default:
			// 目前只支持string & hash类型查询
			continue
		}
		ttl, err := rdb.TTL(context.Background(), key).Result()
		if err != nil {
			return nil, err
		}
		reply.TTL = ttl
		replyList = append(replyList, reply)
	}
	return replyList, nil
}

// cli命令
func ExeCli(cli *define.Cli) (any, error) {
	if cli.ConnIdentity == "" {
		return nil, errors.New("唯一标识不能为空")
	}
	if len(cli.Cli) == 0 {
		return nil, errors.New("参数不能为空")
	}
	rdb, err := helper.GetRedisClient(cli.ConnIdentity, 0)
	defer rdb.Close()
	if err != nil {
		return nil, err
	}
	result, err := rdb.Do(context.Background(), cli.Cli...).Result()
	if err != nil {
		return nil, err
	}
	return result, nil
}
