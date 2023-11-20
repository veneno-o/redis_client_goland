package service

import (
	"changeme/internal/define"
	"changeme/internal/helper"
	"context"
	"errors"
	"github.com/go-redis/redis/v8"
)

func AddHash(prop *define.AddHash) error {
	// 非空判断
	if prop.ConnIdentity == "" {
		return errors.New("唯一标识不能为空")
	}
	if prop.Key == "" {
		return errors.New("key不能为空")
	}
	if prop.Value == nil {
		return errors.New("数据不能为空")
	}
	if prop.TTL < 0 {
		return errors.New("无效过期时间")
	}
	rdb, err := helper.GetRedisClient(prop.ConnIdentity, 0)
	if err != nil {
		return err
	}
	// 判断key是否已存在
	v, err := rdb.HGetAll(context.Background(), prop.Key).Result()
	if err != nil {
		return err
	}
	if len(v) > 0 {
		return errors.New("key值已存在")
	}
	// 验证通过，设置key
	err = rdb.HMSet(context.Background(), prop.Key, prop.Value).Err()
	if err != nil {
		return err
	}
	// 如果不需要设置过期时间，直接结束方法
	if prop.TTL == 0 {
		return nil
	}
	// 如果需要则进行设置
	err = rdb.Expire(context.Background(), prop.Key, prop.TTL).Err()
	if err != nil {
		return errors.New("过期时间设置失败")
	}
	return nil
}

func DelHash(prop *define.DelHash) error {
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
	v, err := rdb.HGetAll(context.Background(), prop.Key).Result()
	if err != nil {
		return err
	}
	if len(v) == 0 {
		return errors.New("数据不存在")
	}
	// 验证通过
	err = rdb.Del(context.Background(), prop.Key).Err()
	if err != nil {
		return err
	}
	return nil
}

func DelHashItem(prop *define.DelHashItem) error {
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
	// 判断key是否存在
	v, err := rdb.HGetAll(context.Background(), prop.Key).Result()
	if err != nil {
		return err
	}
	if len(v) == 0 {
		return errors.New("数据不存在")
	}
	// 验证通过
	err = rdb.HDel(context.Background(), prop.Key, prop.Field...).Err()
	if err != nil {
		return err
	}
	return nil
}

func UpdateHashItem(prop *define.UpdateHashItem) error {
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
	v, err := rdb.HGetAll(context.Background(), prop.Key).Result()
	if err != nil {
		return err
	}
	if len(v) == 0 {
		return errors.New("数据不存在")
	}
	if len(prop.Field) == 0 {
		return errors.New("修改的数据不能为空")
	}
	// 判断field是否存在
	for f, _ := range prop.Field {
		_, err := rdb.HGet(context.Background(), prop.Key, f).Result()
		if err == redis.Nil {
			return errors.New("字段不存在")
		}
	}
	err = rdb.HSet(context.Background(), prop.Key, prop.Field).Err()

	// 验证通过，设置key
	if err != nil {
		return err
	}
	return nil
}
