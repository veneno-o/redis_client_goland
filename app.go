package main

import (
	"changeme/internal/define"
	"changeme/internal/helper"
	"changeme/internal/service"
	"context"
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

// 建立连接
func (a *App) ConnectDb(identity string) define.M {
	defer helper.NoPanic()
	err := service.DbConn(identity)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Msg:  "连接成功",
	}
}

// 添加连接
func (a *App) ConnectCreate(conf define.Connection) define.M {
	// conf := define.Connection{
	// 	Addr: "127.0.0.1",
	// }
	defer helper.NoPanic()
	err := service.ConnectionCreate(&conf)
	if err != nil {
		return define.M{Code: define.FailCode, Msg: err.Error()}
	}
	return define.M{Code: define.SuccessCode, Msg: "新建成功"}
}

// 查找连接列表
func (a *App) ConnectionList() define.M {
	defer helper.NoPanic()
	connList, err := service.ConnectionList()
	if err != nil {
		return define.M{Code: define.FailCode, Msg: err.Error()}
	}
	return define.M{Code: define.SuccessCode, Data: connList, Msg: "查找成功"}
}

// 编辑连接
func (a *App) ConnectionEdit(conf *define.Connection) define.M {
	defer helper.NoPanic()
	err := service.ConnectionEdit(conf)
	if err != nil {
		return define.M{Code: define.FailCode, Msg: err.Error()}
	}
	return define.M{Code: define.SuccessCode, Msg: "编辑成功"}
}

// 删除连接
func (a *App) ConnectDel(identity string) define.M {
	defer helper.NoPanic()
	err := service.ConnectionDel(identity)
	if err != nil {
		return define.M{Code: define.FailCode, Msg: err.Error()}
	}
	return define.M{Code: define.SuccessCode, Msg: "删除成功"}
}

// 数据库列表
func (a *App) DbList(identity string) define.M {
	defer helper.NoPanic()
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
		Msg:  "数据库列表获取成功",
	}
}

// 数据库详情信息
func (a *App) DbInfo(identity string) define.M {
	defer helper.NoPanic()
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
		Msg:  "数据库详情获取成功",
	}
}

// 数据查询
func (a *App) SearchValues(search *define.SearchKey) define.M {
	defer helper.NoPanic()
	values, err := service.SearchValues(search)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Data: values,
		Msg:  "查询成功",
	}
}

// cli查询
func (a *App) SearchCli(cli *define.Cli) define.M {
	defer helper.NoPanic()
	exeCli, err := service.ExeCli(cli)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Data: exeCli,
		Msg:  "查询成功",
	}
}

// string添加
func (a *App) AddString(req *define.AddUpdateString) define.M {
	defer helper.NoPanic()
	err := service.AddString(req)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Msg:  "添加成功",
	}
}

// string删除
func (a *App) DelString(req *define.DelString) define.M {
	defer helper.NoPanic()
	err := service.DelString(req)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Msg:  "删除成功",
	}
}

// string更新
func (a *App) UpdateString(req *define.AddUpdateString) define.M {
	defer helper.NoPanic()
	err := service.UpdateString(req)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Msg:  "更新成功",
	}
}

// hash添加
func (a *App) AddHash(req *define.AddHash) define.M {
	defer helper.NoPanic()
	err := service.AddHash(req)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Msg:  "添加成功",
	}
}

// hash删除field
func (a *App) DelHashItem(req *define.DelHashItem) define.M {
	defer helper.NoPanic()
	err := service.DelHashItem(req)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Msg:  "field删除成功",
	}
}

// hash删除
func (a *App) DelHash(req *define.DelHash) define.M {
	defer helper.NoPanic()
	err := service.DelHash(req)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Msg:  "删除成功",
	}
}

// hash更新 UpdateHashItem
func (a *App) UpdateHashItem(req *define.UpdateHashItem) define.M {
	defer helper.NoPanic()
	err := service.UpdateHashItem(req)
	if err != nil {
		return define.M{
			Code: define.FailCode,
			Msg:  err.Error(),
		}
	}
	return define.M{
		Code: define.SuccessCode,
		Msg:  "更新成功",
	}
}
