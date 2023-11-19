package service

import (
	"changeme/internal/define"
	"changeme/internal/helper"
	"context"
	"errors"
	"github.com/go-redis/redis/v8"
)

func AddString(prop *define.AddUpdateString) error {
	// 非空判断
	if prop.ConnIdentity == "" {
		return errors.New("唯一标识不能为空")
	}
	if prop.Key == "" {
		return errors.New("key不能为空")
	}
	if prop.TTL < 0 {
		return errors.New("无效过期时间")
	}
	rdb, err := helper.GetRedisClient(prop.ConnIdentity, 0)
	if err != nil {
		return err
	}
	// 判断key是否已存在
	_, err = rdb.Get(context.Background(), prop.Key).Result()
	if err != redis.Nil {
		return errors.New("key值已存在")
	}
	// 验证通过，设置key
	err = rdb.Set(context.Background(), prop.Key, prop.Value, prop.TTL).Err()
	if err != nil {
		return err
	}
	return nil
}

func DelString(prop *define.DelString) error {
	// 非空判断
	if prop.ConnIdentity == "" {
		return errors.New("唯一标识不能为空")
	}
	if prop.Key == "" {
		return errors.New("key不能为空")
	}
	rdb, err := helper.GetRedisClient(prop.ConnIdentity, 0)
	if err != nil {
		return err
	}
	// 判断key是否已存在
	_, err = rdb.Get(context.Background(), prop.Key).Result()
	if err == redis.Nil {
		return errors.New("数据不存在")
	}
	// 验证通过
	err = rdb.Del(context.Background(), prop.Key).Err()
	if err != nil {
		return err
	}
	return nil
}

func UpdateString(prop *define.AddUpdateString) error {
	// 非空判断
	if prop.ConnIdentity == "" {
		return errors.New("唯一标识不能为空")
	}
	if prop.Key == "" {
		return errors.New("key不能为空")
	}
	if prop.TTL < 0 {
		return errors.New("无效过期时间")
	}
	rdb, err := helper.GetRedisClient(prop.ConnIdentity, 0)
	if err != nil {
		return err
	}
	// 判断key是否已存在
	_, err = rdb.Get(context.Background(), prop.Key).Result()
	if err == redis.Nil {
		return errors.New("数据不存在")
	}
	// 验证通过，设置key
	err = rdb.Set(context.Background(), prop.Key, prop.Value, prop.TTL).Err()
	if err != nil {
		return err
	}
	return nil
}
