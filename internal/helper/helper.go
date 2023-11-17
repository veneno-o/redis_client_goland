package helper

import (
	"changeme/internal/define"
	"encoding/json"
	"errors"
	"net"
	"os"

	"github.com/go-redis/redis/v8"
)

func GetConfigPath() string {
	dir, err := os.Getwd()
	if err != nil {
		panic("获取目录有误:" + err.Error())
	}
	return dir + string(os.PathSeparator) + define.ConfigName
}

// 获取已存在的连接
func GetConnection(identity string) (*define.Connection, error) {
	if identity == "" {
		return nil, errors.New("唯一标识不能为空")
	}
	config_path := GetConfigPath()
	data, err := os.ReadFile(config_path)
	if errors.Is(err, os.ErrNotExist) {
		return nil, errors.New("配置文件不存在")
	}
	config := new(define.Config)
	err = json.Unmarshal(data, config)
	if err != nil {
		return nil, errors.New("配置文件反序列化失败，文件已损坏:" + err.Error())
	}
	for _, v := range config.Connections {
		if v.Identity == identity {
			return v, nil
		}
	}
	return nil, errors.New("连接数据不存在")
}

// 获取redis客户端
func GetRedisClient(conn *define.Connection, db int) (*redis.Client, error) {
	options := redis.Options{
		Addr:         net.JoinHostPort(conn.Addr, conn.Port),
		Username:     conn.UserName,
		Password:     conn.Password,
		DB:           db,
		ReadTimeout:  -1,
		WriteTimeout: -1,
	}
	client := redis.NewClient(&options)

	return client, nil
}
