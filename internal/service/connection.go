package service

import (
	"changeme/internal/define"
	"changeme/internal/helper"
	"encoding/json"
	"errors"
	"os"

	uuid "github.com/satori/go.uuid"
)

// 连接列表
func ConnectionList() ([]*define.Connection, error) {
	config_path := helper.GetConfigPath()
	data, err := os.ReadFile(config_path)
	if errors.Is(err, os.ErrNotExist) {
		return nil, errors.New("配置文件不存在")
	}
	config := new(define.Config)
	err = json.Unmarshal(data, config)
	if err != nil {
		return nil, errors.New("配置文件反序列化失败，文件已损坏:" + err.Error())
	}
	return config.Connections, nil
}

// 创建连接
func ConnectionCreate(con *define.Connection) error {
	if con.Addr == "" {
		return errors.New("连接地址不能为空")
	}
	// 默认参数处理
	if con.Name == "" {
		con.Name = con.Addr
	}
	if con.Port == "" {
		con.Port = "6379"
	}
	con.Identity = uuid.NewV4().String()
	conf := new(define.Config)
	nowPath, _ := os.Getwd()
	configPath := nowPath + string(os.PathSeparator) + define.ConfigName
	data, err := os.ReadFile(configPath)
	// 文件不存在
	if errors.Is(err, os.ErrNotExist) {
		conf.Connections = []*define.Connection{con}
		data, _ := json.Marshal(conf)
		err = os.WriteFile(configPath, data, 0666)
		if err != nil {
			return errors.New("文件读写失败")
		}
		return nil
	}
	// 文件存在
	json.Unmarshal(data, conf)
	conf.Connections = append(conf.Connections, con)
	data, _ = json.Marshal(conf)
	err = os.WriteFile(configPath, data, 0666)
	if err != nil {
		return errors.New("文件读写失败")
	}
	// 写入配置文件
	return nil
}

//  编辑连接
func ConnectionEdit(con *define.Connection) error {
	configPath := helper.GetConfigPath()
	data, err := os.ReadFile(configPath)
	if errors.Is(err, os.ErrNotExist) {
		return errors.New("配置文件不存在")
	} else if err != nil {
		return err
	}
	config := new(define.Config)
	json.Unmarshal(data, config)
	for i := 0; i < len(config.Connections); i++ {
		if config.Connections[i].Identity == con.Identity {
			config.Connections[i] = con
			con = nil
			break
		}
	}
	// 如果配置文件中存在该连接,更新配置文件
	if con == nil {
		data, _ = json.Marshal(config)
		err = os.WriteFile(configPath, data, 0666)
		if err != nil {
			return errors.New("文件写入失败")
		}
		return nil
	}
	return errors.New("连接不存在")
}

//  删除连接
func ConnectionDel(identity string) error {
	configPath := helper.GetConfigPath()
	data, err := os.ReadFile(configPath)
	if errors.Is(err, os.ErrNotExist) {
		return errors.New("配置文件不存在")
	} else if err != nil {
		return errors.New(err.Error())
	}
	config := new(define.Config)
	json.Unmarshal(data, config)
	for i := 0; i < len(config.Connections); i++ {
		if config.Connections[i].Identity == identity {
			config.Connections = append(config.Connections[:i], config.Connections[i+1:]...)
		}
	}
	// 如果配置文件中存在该连接,更新配置文件
	data, _ = json.Marshal(config)
	err = os.WriteFile(configPath, data, 0666)
	if err != nil {
		return errors.New("文件写入失败")
	}
	return nil
}
