package main

import (
	"changeme/internal/define"
	"changeme/internal/service"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// 添加连接
func (a *App) ConnectCreate(conf define.Connection) define.M {
	// conf := define.Connection{
	// 	Addr: "127.0.0.1",
	// }
	err := service.ConnectionCreate(&conf)
	if err != nil {
		return define.M{Code: define.FailCode, Msg: err.Error()}
	}
	return define.M{Code: define.SuccessCode, Msg: "新建成功"}
}

// 查找连接列表
func (a *App) ConnectionList() define.M {
	connList, err := service.ConnectionList()
	if err != nil {
		return define.M{Code: define.FailCode, Msg: err.Error()}
	}
	return define.M{Code: define.SuccessCode, Data: connList}
}

// 编辑连接
func (a *App) ConnectionEdit(conf *define.Connection) define.M {
	fmt.Printf("编辑连接:%v", conf)
	err := service.ConnectionEdit(conf)
	if err != nil {
		return define.M{Code: define.FailCode, Msg: err.Error()}
	}
	return define.M{Code: define.SuccessCode, Msg: "编辑成功"}
}

// 删除连接
func (a *App) ConnectDel(identity string) define.M {
	err := service.ConnectionDel(identity)
	if err != nil {
		return define.M{Code: define.FailCode, Msg: err.Error()}
	}
	return define.M{Code: define.SuccessCode, Msg: "删除成功"}
}

// 数据库列表
func DbList(identity string) define.M {
	if identity == "" {
		return define.M{
			Code: define.FailCode,
			Msg:  "唯一标识不能为空",
		}
	}
	list, _ := service.DbList(identity)
	return define.M{
		Code: define.SuccessCode,
		Data: list,
	}
}

// 数据库详情信息
func DbInfo(identity string) define.M {
	if identity == "" {
		return define.M{
			Code: define.FailCode,
			Msg:  "唯一标识不能为空",
		}
	}
	info, err := service.DbInfo(identity)
	if err != nil {
		if identity == "" {
			return define.M{
				Code: define.FailCode,
				Msg:  err.Error(),
			}
		}
	}

	return define.M{
		Code: define.SuccessCode,
		Data: info,
	}
}

// 数据库查询
