package helper

import (
	"changeme/internal/define"
	"encoding/json"
	"errors"
	"net"
	"os"
	"path"
	"runtime"

	"github.com/go-redis/redis/v8"
)

func GetConfigPath() string {
	_, file, _, ok := runtime.Caller(0)
	dir := path.Dir(path.Dir(path.Dir(file)))
	if !ok {
		panic("获取项目目录有误:")
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
func GetRedisClient(identity string, db int) (*redis.Client, error) {
	conn, err := GetConnection(identity)
	if err != nil {
		return nil, err
	}
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

// 封装返回格式
func GetResult(code int, msg string, value any) define.M {
	return define.M{code, msg, value}
}
