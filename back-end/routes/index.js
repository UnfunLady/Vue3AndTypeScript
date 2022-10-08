
var express = require('express');
var router = express.Router();
var connect = require('../db/connect')
const getProvince = require('./province')
const os = require("os")
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require("path") // 处理路径的模块
// 引入token相关util
const { createToken } = require('../utils/index')
const moment = require('moment')
//上传图片的模板
var multer = require('multer');
//生成的图片放入uploads文件夹下
var upload = multer({ dest: 'uploads/' })

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 省市
router.get('/api/getProvinceCity', getProvince)
// 登录接口
router.post('/api/login', function (req, res, next) {
  // 获取账号密码
  const { username, password } = req.body
  const sql = `select *from users where username='${username}' and password= '${password}'`
  connect.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const { nickname, avatar, username, level } = results[0];
      const token = createToken({ username });
      res.send({
        code: 200,
        msg: '账号密码验证成功!',
        token,
        Info: {
          avatar,
          nickname,
          username,
          level
        }
      })
    } else {
      res.send({
        code: 201,
        msg: '账号密码验证失败!'
      })
    }
  })
})
// 部门一系列信息
// 获取全部部门信息
router.get('/api/deptInfo', function (req, res, next) {
  const sql = `select *from depall`;
  connect.query(sql, (err, results) => {
    connect.query('select *from dept', (e, r) => {
      if (err || e) throw err;
      if (results.length > 0) {
        res.send({
          code: 200,
          msg: '操作成功',
          deptInfo: [
            ...results
          ],
          groupInfo: [...r]
        })
      } else {
        res.send({
          code: 202,
          msg: '操作失败',
        })
      }
    })
  })
})
// 获取部门细节
router.get('/api/companyDetail', (req, res) => {
  // 获取部门总数
  const oneSql = `SELECT count(d.dno)as companyDeptCount from depall d  `
  // 获取小组总数
  const twoSql = `select count(d.id)AS companyGroupCount from dept d`
  // 获取员工总数
  const threeSql = `SELECT count(DISTINCT(e.employno)) as companyEmployeCount  from employee e `
  // 获取平均薪资
  const fourSql = `select round(avg(e.employsalary),0) as companyAvgSalary from employee e`
  // 获取男性人数
  const fiveSql = `select count(DISTINCT(e.employno))as BoyGrilsPercentage from employee e WHERE e.employsex='男'`
  connect.query(oneSql, (e1, r1) => {
    if (r1.length > 0) {
      connect.query(twoSql, (e2, r2) => {
        if (r2.length > 0) {
          connect.query(threeSql, (e3, r3) => {
            if (r3.length > 0) {
              connect.query(fourSql, (e4, r4) => {
                if (r4.length > 0) {
                  connect.query(fiveSql, (e5, r5) => {
                    if (r5.length > 0) {
                      const BoyGrilsPercentage = parseFloat(r5[0].BoyGrilsPercentage / r3[0].companyEmployeCount).toFixed(2) * 100 + '%'
                      res.send({ code: 200, detailData: { companyDeptCount: r1[0].companyDeptCount, companyGroupCount: r2[0].companyGroupCount, companyEmployeCount: r3[0].companyEmployeCount, companyAvgSalary: r4[0].companyAvgSalary, BoyGrilsPercentage } })
                    }
                  })
                }
              })
            }
          }
          )
        }
      })
    }
  })
})
// 根据部门号查找部门下的全部团队
router.get('/api/getDeptByDno', function (req, res, next) {
  const { dno } = req.query;
  const sql = `select *from dept where dept.deptno=${dno}`
  connect.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send({
        code: 200,
        msg: '操作成功',
        groupInfo: [...results]
      })
    } else {
      res.send({
        code: 202,
        msg: '该部门无任何小组,请组建新的小组',
      })
    }
  })
})
// 根据部门团队号查询 部门团队下的所有成员
router.get('/api/getEmployee', (req, res) => {
  const { deptId, page, size } = req.query;
  const sql = `select e.*,d.deptname,da.dno from employee e,dept d, depall da where e.deptno=d.id and d.deptno=da.dno and e.deptno=${deptId} order by e.employno limit ${(page - 1) * size},${size}`
  connect.query(sql, (err, results) => {
    if (err) throw err;
    // 查询全部条数
    connect.query(`select d.count from  dept d where d.id=${deptId}`, (error, resu) => {

      if (error) throw error;
      if (results.length >= 0) {
        res.send({
          code: 200,
          msg: '操作成功',
          employeInfo: [...results],
          count: resu[0]['count']
        })
      } else {
        res.send({
          code: 202,
          msg: '操作失败',
        })
      }
    })
  })
})
// 添加员工或修改员工
router.post('/api/addOrUpdateEmploy', (req, res) => {
  const { body } = req
  const { isUpdate } = body.default;
  const changeGroup = body.changeGroup
  // body.default基本信息 body.old 旧部门信息 因为表是多个主键 修改需要用到旧部门id
  // 如果是更新且移动员工到别的组则走更新的操作
  if (isUpdate) {
    if (changeGroup && changeGroup === true) {
      const preSql = `select *from employee where employno=${body.default.employno} and deptno=${body.default.deptno}`
      connect.query(preSql, (errors, resu) => {
        if (errors) throw errors
        if (resu && resu.length > 0) {
          res.send({
            code: 202,
            msg: '该小组已有相同成员 请移到其他小组'
          })
        } else {
          res.send({
            code: 202,
            msg: '修改异常'
          })
        }
      })
    } else {
      const udSql = `
  UPDATE  employee SET deptno = ${body.default.deptno}, employname = '${body.default.employname}', employage = '${body.default.employage}', employsex= '${body.default.employsex}', employidcard = '${body.default.employidcard}',
  employphone = '${body.default.employphone}', entryDate = '${body.default.entryDate}',
  employemail = '${body.default.employemail}', employaddress = '${body.default.employaddress}',
  employsalary = '${body.default.employsalary}'
  WHERE deptno=${body.old} and employno = ${body.default.employno};
  `
      // 更新员工
      connect.query(udSql, (e, r) => {
        if (e) { res.send({ code: 202, msg: '请确认该部门是否有相同员工！' }) }
        else {
          if (r && r.affectedRows > 0) {
            res.send({
              code: 200,
              msg: '修改员工信息成功!'
            })
          } else {
            res.send({
              code: 202,
              msg: '修改异常,请确认新数据和原数据是否相同或出现未知异常'
            })
          }
        }

      })
    }
  } else {
    // 插入sql
    const addSql = `INSERT INTO  employee(deptno, employname, employage, employsex,employidcard, employphone, entryDate, employemail, employaddress, employsalary)
VALUES (${body.default.deptno}, '${body.default.employname}', '${body.default.employage}', '${body.default.employsex}', '${body.default.employidcard}', '${body.default.employphone}', '${body.default.entryDate}', '${body.default.employemail}', '${body.default.employaddress}', '${body.default.employsalary}');`
    connect.query(addSql, (err, result) => {
      // 插入成功 返回信息
      if (result.affectedRows && result.affectedRows > 0) {
        res.send({
          code: 200,
          msg: '添加员工信息成功!'
        })
      } else {
        // 插入失败 返回信息
        res.send({
          code: 202,
          msg: '添加员工信息失败!'
        })
      }
    })
  }
})
// 删除员工
router.post('/api/deleteEmploy', (req, res) => {
  const { employno, deptno, user } = req.body;
  // 获取当前操作的时间
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
  // 删除sql
  const sql = `delete from employee where employno =${employno} and deptno=${deptno}`
  // 获取员工当前部门号
  const preSql = `select deptno from dept where id=${deptno}`
  connect.query(preSql, (er, rs) => {
    if (er) res.send({ code: 202, msg: '删除失败' })
    if (rs) {
      // rs[0].deptno
      // 获取删除员工的个人信息 准备存入备份表
      const preSql2 = `select *from employee where employno=${employno} and deptno=${deptno}`
      connect.query(preSql2, (ser, srs) => {
        if (ser) res.send({ code: 202, msg: '删除失败' })
        // 插入备份表语句
        const preSql3 = `INSERT INTO vuets.employeredo(dno, deptno, employno,
           employname, employage, employsex, employidcard, employphone, 
           entryDate, employemail, employaddress,employsalary ,isuse,confirmTime,whichDone)
         VALUES (${rs[0].deptno}, ${deptno}, ${employno},
           '${srs[0].employname}', '${srs[0].employage}', '${srs[0].employsex}',
            '${srs[0].employidcard}', '${srs[0].employphone}', '${srs[0].entryDate}', 
            '${srs[0].employemail}', '${srs[0].employaddress}','${srs[0].employsalary}', '${srs[0].isuse}','${nowDate}','${user}');
        `
        connect.query(preSql3, (rer, rrs) => {
          if (rer) res.send({ code: 202, msg: '删除失败' })
          if (rrs.affectedRows > 0) {
            connect.query(sql, (error, results) => {
              if (results && results.affectedRows > 0) {
                res.send({
                  code: 200,
                  msg: '删除员工成功!'
                })
              } else {
                res.send({
                  code: 202,
                  msg: '删除员工失败,员工不存在或未知异常'
                })
              }
            })
          }
        })
      })
    }
  })



})
// 关键字查找
router.get('/api/searchEmploy', (req, res) => {
  const { keyword, page, size } = req.query;
  const sql = `
select e.* ,d.deptname,da.dno from  employee e,dept d,depall da where (e.employno like'%${keyword}%' or e.employname like'%${keyword}%')  AND  e.deptno=d.id GROUP BY e.employno order by e.employno  limit ${(page - 1) * size},${size}`
  connect.query(`select count(DISTINCT e.employno) as count from  employee e,dept d where e.employno like'%${keyword}%' or e.employname like'%${keyword}%' AND  e.deptno=d.id`, (e, r) => {
    if (e) throw e
    else {
      connect.query(sql, (error, results) => {
        if (error) throw error
        if (results && results.length > 0) {
          res.send({
            code: 200,
            count: r[0].count,
            msg: '查找成功!',
            employeInfo: [...results]
          })
        } else {
          res.send({
            code: 202,
            msg: '查无此人~',
          })
        }
      })
    }
  })
})
// 薪资------
// 获取团队薪资信息
router.get('/api/getSaralyInfo', (req, res) => {
  const { dno } = req.query;
  if (dno) {
    const sql = `
select sa.* from employesalary sa WHERE deptno=${dno}
`;
    connect.query(sql, (error, results) => {
      if (results && results.length > 0) {
        connect.query(`select de.* from dept de WHERE deptno=${dno}`, (e, r) => {
          if (r.length > 0) {
            // 将两个数组转化成一个
            var groupInfo = results.map((item, index) => {
              return { ...item, ...r[index] };
            });
            res.send({
              code: 200,
              groupInfo: groupInfo
            })
          } else {
            res.send({
              code: 202,
              msg: '未知错误'
            })
          }
        })
      } else {
        res.send({
          code: 202,
          msg: '无信息'
        })
      }
    })
  } else {
    res.send({
      code: 202,
      msg: '缺少部门号无法获取准确信息'
    })
  }
})
// 修改薪资信息
router.post('/api/updateSalaryInfo', (req, res) => {
  const { editForm, performance } = req.body;

  if (editForm.isuse !== null && editForm.isuse !== '' && editForm.deptid !== null) {
    const sql = `
UPDATE employesalary SET isuse = '${editForm.isuse}' WHERE deptid=${editForm.deptid} `;
    connect.query(sql, (error, results) => {
      if (results.affectedRows > 0) {
        res.send({
          code: 200,
          msg: '修改成功'
        })
      }
    })
  } else {
    const sql = `
UPDATE employesalary SET performance = '${performance.performance}' WHERE deptid=${performance.deptid} `;
    connect.query(sql, (e, r) => {
      const nextSql = `UPDATE  vuets.employesalarydetail  SET   usePerformance  = ${performance.performance} WHERE  deptno  = ${performance.deptid};`

      connect.query(nextSql, (errorr, changeSuccess) => {
        if (changeSuccess.affectedRows > 0) {
          res.send({
            code: 200,
            msg: '修改成功'
          })
        }
      })

    })

  }
})
// 获取员工详细薪资明细
router.get('/api/getSaralyDetailInfo', (req, res) => {
  const { deptid, page, size } = req.query
  if (deptid) {
    connect.query(`SELECT count(*) as count FROM employesalarydetail  ed where  ed.deptno=${deptid}`, (error, results) => {
      if (results != null) {
        const sql = `SELECT ed.*,d.deptname FROM employesalarydetail  ed,dept d where ed.deptno=d.id AND  ed.deptno=${deptid} GROUP BY ed.employno limit ${(page - 1) * size},${size}`
        connect.query(sql, (e, r) => {
          // 获取补贴相关的具体数据
          connect.query(`SELECT es.socialSub,es.houseSub,es.eatSub,es.transSub,es.hotSub,(es.performance*10)as performance FROM employesalary es WHERE deptid=${deptid}`, (haserror, success) => {
            if (r.length > 0) {
              res.send({
                code: 200,
                detailInfo: [...r],
                count: results[0].count,
                // 补贴
                subDetail: success
              })
            } else {
              res.send({
                code: 202,
                msg: '该小组暂无员工!'
              })
            }
          })
        })
      } else {
        res.send({
          code: 202,
          msg: '暂无数据!'
        })
      }
    })
  } else {
    res.send({
      code: 202,
      msg: '缺少关键信息'
    })
  }
})
// 修改员工详细
router.post('/api/updateSalaryDetail', (req, res) => {
  // every返回全部为真的情况
  const updateSuccess = req.body.every((item, index) => {
    const sql = `update employesalarydetail
set  deptno =${item.deptno}, employname ='${item.employname}',
usesocialsub ='${item.usesocialSub}', usehousesub ='${item.usehouseSub}',
useeatsub ='${item.useeatSub}', usetranssub ='${item.usetransSub}',
usehotsub ='${item.usehotSub}', useperformance =${item.usePerformance},
isuse ='${item.isuse}' where  employno =${item.employno};`
    // 执行更新语句
    const updatesuccess = connect.query(sql, (error, results) => {
      if (results.affectedRows > 0)
        return true;
    })
    return updatesuccess;
  })
  if (updateSuccess) {
    res.send({
      code: 200,
      msg: '修改成功'
    })
  } else {
    res.send({
      code: 202,
      msg: '修改出现错误请重试'
    })
  }
})
// 没有头像
router.post('/api/editDeptNoAvatar', (req, res) => {
  console.log(req.body)
  const { dno, dname, explain } = req.body.editDeptData;
  const sql = `
UPDATE depall SET dname = '${dname}',
depall.explain = '${explain}'  WHERE dno = ${dno};
`;
  connect.query(sql, (e, results) => {
    if (e) throw e
    if (results && results.affectedRows > 0) {
      res.send({ code: 200, msg: '修改部门信息成功!' })
    } else {
      res.send({ code: 202, msg: '修改部门信息出错!' })
    }
  })
})



// 1.上传头像 vue
router.post('/api/editDept', upload.single('file'), (req, res) => {
  //上传的图片到uploads文件
  const { dno, dname, explain } = req.query;
  var imges = req.file;
  if (imges) {
    // 读取文件信息
    fs.readFile(imges.path, (err, data) => {
      if (err) {
        res.send({ code: 202, msg: "读取图片失败" })
      }
      var imgesori = imges.originalname; // 图片名称
      var radname = Date.now() + parseInt(Math.random() * 114514)  // 赋给图片的名称用时间戳+随机数获取
      var oriname = imgesori.lastIndexOf(".");//获取最后一个.的位置
      var hzm = imgesori.substring(oriname, imgesori.length) // 获取图片后缀名
      var pic = radname + hzm // 拼接一个完整的图片名称 随机生成
      // 写入文件
      fs.writeFile(path.join(__dirname, '../public/images/' + pic), data, (err) => {
        if (err) {
          res.send({ code: 202, msg: "图片上传失败" })
          return
        }
        // 通过os模块 获取本地address
        const couter = os.networkInterfaces()
        for (var cm in couter) {
          var cms = couter[cm]
        }
        // 将图片的路径保存到数据库
        // "http://localhost:3000/public/images/"不用public 因为 app.js用了  app.use(express.static(path.join(__dirname, 'public')));  省略了public
        const picPath = "http://" + cms[1].address + ':3000' + '/images/' + pic;
        const sql = `
  UPDATE depall SET avatar='${picPath}',dname='${dname}',depall.explain='${explain}' WHERE dno =${dno};`
        // 执行修改逻辑
        connect.query(sql, (error, result) => {
          if (error) throw error;
          if (result.affectedRows > 0) {
            res.send({ code: 200, msg: "修改成功" })
          } else {
            res.send({ code: 202, msg: "修改失败" })
          }
        })
      })
    })
  } else {
    res.send({ code: 202, msg: '图片上传失败' })
  }
})
// 2.上传头像 react
router.post('/api/editDeptR', upload.single('file'), (req, res) => {
  // 图片信息
  const files = JSON.parse(req.body.files)
  const { dname, explain, dno } = req.body
  // 高清图片base64
  const avarat_str = req.body.base64;
  // 去掉前缀
  const originStr = avarat_str.replace(/^data:image\/\w+;base64,/, "")
  // 转成buffer格式
  const dataBuffer = Buffer.from(originStr, 'base64');
  // 随机名称
  const randomName = Date.now() + parseInt(Math.random() * 114514)
  // 后缀名
  const hzm = files.name.substring(files.name.lastIndexOf('.'), files.name.length)
  // 写入图片
  fs.writeFile(path.join(__dirname, '../public/images/' + randomName + hzm), dataBuffer, (err) => {
    if (err) {
      console.log('上传图片失败')
      res.send({ code: 202, msg: '图片上传失败' })
    } else {
      // 通过os模块 获取本地address
      const couter = os.networkInterfaces()
      for (var cm in couter) {
        var cms = couter[cm]
      }
      // 将图片的路径保存到数据库
      // "http://localhost:3000/public/images/"不用public 因为 app.js用了  app.use(express.static(path.join(__dirname, 'public')));  省略了public
      const picPath = "http://" + cms[1].address + ':3000' + '/images/' + randomName + hzm;
      const sql = `
       UPDATE depall SET avatar='${picPath}',dname='${dname}',depall.explain='${explain}' WHERE dno =${dno};`
      // 执行修改逻辑
      connect.query(sql, (error, result) => {
        if (error) throw error;
        if (result.affectedRows > 0) {
          res.send({ code: 200, msg: "修改成功" })
        } else {
          res.send({ code: 202, msg: "修改失败" })
        }
      })
    }
  })
})



// 修改小组信息
router.post('/api/editGroupInfo', (req, res) => {
  const { id, deptname, location, count } = req.body
  const checkDname = `select *from dept where deptname='${deptname}'`
  connect.query(checkDname, (erro, checkResult) => {
    if (erro) throw erro
    if (checkResult.length > 0) {
      res.send({
        code: 202,
        msg: '已有相同名字部门请重新取名!'
      })
    }
    else {
      if (id && deptname && location && count) {
        const sql = `update dept set deptname='${deptname}',location='${location}',count='${count}' where id=${id}`
        connect.query(sql, (error, results) => {
          if (error) throw error
          if (results.affectedRows > 0) {
            res.send({
              code: 200,
              msg: '修改成功'
            })
          } else {
            res.send({
              code: 202,
              msg: '修改失败'
            })
          }
        })
      } else {
        res.send({
          code: 202,
          msg: '缺少重要信息！'
        })
      }
    }
  })
})
// 获取全部员工信息
router.get('/api/getAllEmploye', (req, res) => {
  const sql = `select DISTINCT employee.employno as 'key',employee.employname as 'label' from employee order by employee.employno`
  connect.query(sql, (err, results) => {
    if (err) throw err
    if (results.length > 0) {
      res.send({
        code: 200,
        employeInfo: results
      })
    } else {
      res.send({
        code: 202,
        msg: '获取员工信息失败'
      })
    }
  })
})
// 新增小组信息
router.post('/api/addGroup', (req, res) => {
  const { addForm, deptno, location, deptname } = req.body;
  // 检查小组是否重名
  const checkDname = `select *from dept where deptname='${deptname}'`
  connect.query(checkDname, (erro, checkResult) => {
    if (erro) throw erro
    if (checkResult.length > 0) {
      res.send({
        code: 202,
        msg: '已有相同名字小组请重新取名!'
      })
    } else {
      // 插入新小组
      const sql = `insert into dept(deptno,deptname,location) values(${deptno},'${deptname}','${location}')`
      connect.query(sql, (err, results) => {
        if (err) throw err
        if (results.affectedRows > 0) {
          // 是否全部插入成功
          const isSuccess = addForm.every((item, index) => {
            // 查找刚插入的小组的编号
            const sql = `select d.id from dept d where deptname='${deptname}'`;
            const allSuccess = connect.query(sql, (e, r) => {
              if (e) throw e
              // 获取选择的员工基本信息准备插入到表中
              const presql = `select e.employno,e.employname,e.employage,e.employsex,e.employidcard,e.employphone,e.entryDate,e.employemail,e.employaddress,e.employsalary,e.isuse from employee e WHERE e.employno=${item}`
              const isOk = connect.query(presql, (error, result) => {
                if (error) throw error
                // 插入信息到员工表
                const beforeSql = `INSERT INTO employee(deptno, employno, employname, employage, employsex, employidcard, employphone, entryDate, employemail, employaddress, employsalary, isuse) VALUES
(${r[0].id}, ${result[0].employno}, '${result[0].employname}', '${result[0].employage}',
'${result[0].employsex}', '${result[0].employidcard}', '${result[0].employphone}', '${result[0].entryDate}',
'${result[0].employemail}', '${result[0].employaddress}', '${result[0].employsalary}', '${result[0].isuse}');
`
                // 执行插入语句
                const insertSuccess = connect.query(beforeSql, (er, rs) => {
                  if (er) throw er
                  if (rs.affectedRows > 0) {
                    // 返回真
                    return true
                  }
                })
                // 返回真
                return insertSuccess
              })
              // 返回真
              return isOk
            })
            // 三个步骤全部成功返回真  every为真返回200code
            return allSuccess
          })
          if (isSuccess) {
            res.send({
              code: 200,
              msg: '新增小组成功'
            })
          }
        }
        else {
          res.send({
            code: 202,
            msg: '新增小组失败！'
          })
        }
      })
    }
  })
})
// 解散小组
router.post('/api/delGroup', (req, res) => {
  const { id } = req.body;
  // 查询小组剩下的员工
  const preSql = `select e.employno from employee e where e.deptno=${id}`
  connect.query(preSql, (error, results) => {
    if (error) throw error
    if (results.length > 0) {
      // 如果有循环删除掉
      const success = results.every((item, index) => {
        const delEmployeSql = `delete from employee e where e.employno=${item.employno} and e.deptno=${id} `
        const delSuccess = connect.query(delEmployeSql, (err, result) => {
          if (err) throw err
          if (result.affectedRows > 0) {
            // 删除成功返回true
            return true
          }
        })
        return delSuccess
      })
      // 如果全部都删除完了 执行删除小组操作
      if (success) {
        const sql = `delete from dept where dept.id=${id}`
        connect.query(sql, (e, r) => {
          if (e) throw e
          if (r.affectedRows > 0) {
            res.send({
              code: 200,
              msg: '解散小组成功!'
            })
          } else {
            res.send({
              code: 202,
              msg: '解散小组失败!'
            })
          }
        })
      }
    } else {
      // 如果小组已经没有员工了 直接执行删除小组的操作
      const sql = `delete from dept where dept.id=${id}`
      connect.query(sql, (e, r) => {
        if (e) throw e
        if (r.affectedRows > 0) {
          res.send({
            code: 200,
            msg: '解散小组成功!'
          })
        } else {
          res.send({
            code: 202,
            msg: '解散小组失败!'
          })
        }
      })
    }
  })
})
// 解散部门
router.post('/api/delDept', (req, res) => {
  const { children } = req.body
  // 查询部门下的小组号  如果有则查询小组员工 如果有就删除 之后再删除部门
  if (children && children.length > 0) {
    // 统计小组是否被删完
    var isOk = 0;
    children.forEach((item, index) => {
      // 根据小组号查询所有员工
      const preSql = `select e.employno from employee e where e.deptno=${item.id}`
      connect.query(preSql, (error, results) => {
        if (error) throw error
        // 如果有员工
        if (results.length >= 0) {
          // 根据查到的所有员工 组成删除sql执行删除
          const delSuccess = results.every((i) => {
            const delSql = `delete from employee e where e.employno=${i.employno} and e.deptno=${item.id} `
            const delEmployeSuccess = connect.query(delSql, (err, result) => {
              if (err) throw err
              if (result.affectedRows >= 0) {
                return true
              }
            })
            return delEmployeSuccess;
          })
          // 员工删除完毕 解散小组
          const delGroupSql = `delete from dept where id=${item.id}`
          connect.query(delGroupSql, (iserr, isresults) => {
            if (isresults.affectedRows > 0) {
              isOk += 1;
              if (isOk === children.length) { // 说明所有部门都删除完了
                // 没有小组了 直接删除部门
                const delDeptSql = `delete from depall where dno=${req.body.dno} `
                connect.query(delDeptSql, (ise, isr) => {
                  if (isr.affectedRows > 0) {
                    res.send({
                      code: 200,
                      msg: 'success'
                    })
                  } else {
                    res.send({
                      code: 202,
                      msg: '解散部门失败！'
                    })
                  }
                })
              }
            }
          })
        }
        // 没有员工
        else {
          // 没有员工 解散小组
          const delGroupSql = `delete from dept where id=${item.id}`
          const delGroupSuccess = connect.query(delGroupSql, (iserr, isresults) => {
            if (isresults.affectedRows > 0) {
              isOk += 1;
              // 说明所有部门都删除完了
              if (isOk === children.length) {
                // 没有小组了 直接删除部门
                const delDeptSql = `delete from depall where dno=${req.body.dno} `
                connect.query(delDeptSql, (ise, isr) => {
                  if (isr.affectedRows > 0) {
                    res.send({
                      code: 200,
                      msg: 'success'
                    })
                  } else {
                    res.send({
                      code: 202,
                      msg: '解散部门失败！'
                    })
                  }
                })
              }
            }
          })
        }
      })
    })
  }
  else {
    // 没有小组了 直接删除部门
    const delDeptSql = `delete from depall where dno=${req.body.dno} `
    connect.query(delDeptSql, (e, r) => {
      if (e) throw e
      if (r.affectedRows > 0) {
        res.send({
          code: 200,
          msg: '解散部门成功 '
        })
      } else {
        res.send({
          code: 202,
          msg: '解散部门失败'
        })
      }
    })
  }
})
// 新增部门
router.post('/api/addDeptpartment', upload.single('file'), (req, res) => {
  const images = req.file
  // 获取部门名和部门描述
  const { dname, explain } = req.query;
  // 检查部门是否存在
  const preSql = `select *from depall where dname='${dname}'`
  connect.query(preSql, (e, r) => {
    if (e) throw e
    if (r.length > 0) {
      res.send({
        code: 202,
        msg: '已经存在相同的部门了!'
      })
    } else {
      if (images) {
        // 读取文件
        fs.readFile(images.path, (err, data) => {
          if (err) res.send({ code: 202, msg: '读取图片失败!' })
          // 获取图片原始名称
          const imagesOri = images.originalname;
          // 取一个随机名字
          const randomName = Date.now() + parseInt(Math.random() * 1919)
          // 获取后缀名
          const hzm = imagesOri.substring(imagesOri.lastIndexOf('.'), imagesOri.length);
          // 拼接起来完整的随机文件名
          const pic = randomName + hzm;
          // 写入文件
          fs.writeFile(path.join(__dirname, '../public/images/' + pic), data, (err) => {
            if (err) res.send({ code: 202, msg: '图片上传失败' })
            const couter = os.networkInterfaces();
            for (let cm in couter) {
              var cms = couter[cm]
            }
            const picPath = 'http://' + cms[1].address + ':3000' + '/images/' + pic;
            const sql = `insert into depall (dname,depall.explain,avatar)  values('${dname}','${explain}','${picPath}')`
            connect.query(sql, (error, results) => {
              if (error) throw error
              if (results.affectedRows > 0) {
                res.send({
                  code: 200,
                  msg: '添加部门成功!'
                })
              } else {
                res.send({
                  code: 202,
                  msg: '添加部门失败!'
                })
              }
            })
          })
        })
      } else {
        res.send({
          code: 202,
          msg: '请上传部门头像！'
        })
      }
    }
  })
})
// 新增部门react
router.post('/api/addDeptpartmentR', upload.single('file'), (req, res) => {
  const files = JSON.parse(req.body.files)
  const { dname, explain } = req.body
  // 高清图片base64
  const avarat_str = req.body.base64;
  // 去掉前缀
  const originStr = avarat_str.replace(/^data:image\/\w+;base64,/, "")
  // 转成buffer格式
  const dataBuffer = Buffer.from(originStr, 'base64');
  // 随机名称
  const randomName = Date.now() + parseInt(Math.random() * 114514)
  // 后缀名
  const hzm = files.name.substring(files.name.lastIndexOf('.'), files.name.length)
  // 写入图片
  fs.writeFile(path.join(__dirname, '../public/images/' + randomName + hzm), dataBuffer, (err) => {
    if (err) {
      console.log('上传图片失败')
      res.send({ code: 202, msg: '图片上传失败' })
    } else {
      // 通过os模块 获取本地address
      const couter = os.networkInterfaces()
      for (var cm in couter) {
        var cms = couter[cm]
      }
      // 将图片的路径保存到数据库
      // "http://localhost:3000/public/images/"不用public 因为 app.js用了  app.use(express.static(path.join(__dirname, 'public')));  省略了public
      const picPath = "http://" + cms[1].address + ':3000' + '/images/' + randomName + hzm;
      const sql = ` insert into depall (dname,depall.explain,avatar)  values('${dname}','${explain}','${picPath}')`
      // 执行修改逻辑
      connect.query(sql, (error, result) => {
        if (error) throw error;
        if (result.affectedRows > 0) {
          res.send({ code: 200, msg: "添加成功" })
        } else {
          res.send({ code: 202, msg: "添加失败" })
        }
      })
    }
  })
})


// 首页第一张图echarts各部门总人数
router.get('/api/deptTotal', (req, res) => {
  // 全部部门名
  // select de.dname,de.count from depall de
  // 标题
  // title:'各部门总人数'
  const sql = `select de.dname as name,de.count as value from depall de
`
  connect.query(sql, (err, results) => {
    if (results.length > 0) {
      res.send({
        code: 200,
        deptInfo: [...results],
        title: '各部门总人数'
      })
    }
  })
})
// 第二张图 获取部门细节 平均工资 总人数 小组数
router.get('/api/deptDetail', (req, res) => {
  const sql = `
select depall.dname as name,round(avg(employsalary),0) as avg ,depall.count,depall.groupCount from employee,dept,depall WHERE employee.deptno=dept.id AND dept.deptno=depall.dno GROUP BY depall.dname
`
  connect.query(sql, (err, results) => {
    if (err) throw err
    if (results.length > 0) {
      res.send({
        code: 200,
        deptDetailInfo: [...results]
      })
    } else {
      res.send({
        code: 202,
        msg: '获取数据出错'
      })
    }
  })
})
// 第三张图
// 第四张图
// 修改密码
router.post('/api/editPassword', (req, res) => {
  const { nowPassword, newPassword } = req.body.editInfo;
  const { user } = req.body
  if (nowPassword === newPassword) {
    res.send({
      code: 202,
      msg: '新旧密码不能相同！'
    })
  } else {
    const preSql = `select password from users where username='${user}'`
    connect.query(preSql, (e, r) => {
      if (r.length > 0) {
        // 如果旧密码相同
        if (r[0].password == nowPassword) {
          // 修改密码
          const sql = `update users set password='${newPassword}' where username='${user}'`
          connect.query(sql, (err, results) => {
            if (err) res.send({ code: 202, msg: '修改密码失败!' })
            if (results.affectedRows > 0) {
              res.send({
                code: 200,
                msg: 'success'
              })
            } else {
              res.send({
                code: 202,
                msg: '修改密码失败!'
              })
            }
          })
        } else {
          res.send({
            code: 202,
            msg: '旧密码错误！'
          })
        }
      } else {
        res.send({
          code: 202,
          msg: '修改密码失败！'
        })
      }
    })
  }
})
// 获取部门接种信息
router.get('/api/getCompanyEvilInfo', (req, res) => {
  // 获取部门信息
  const preSql = `
SELECT depall.*,count(covidinfo.employid) AS noCovid FROM covidinfo ,depall
WHERE depallid=dno GROUP BY depallid ORDER BY depallid asc
`
  connect.query(preSql, (e, r) => {
    if (e) res.send({ code: 202, msg: '获取部门信息失败' })
    if (r && r.length > 0) {
      // 查询部门没有打三针的员工 合并
      const sql = `
SELECT depall.* FROM covidinfo ,depall
WHERE depallid=dno GROUP BY depallid ORDER BY depallid asc
`
      connect.query(sql, (err, results) => {
        if (err) res.send({ code: 202, msg: '获取部门信息失败' })
        if (results.length > 0) {
          res.send({
            code: 200,
            deptInfo: results
          })
        } else {
          res.send({ code: 202, msg: '获取部门信息失败' })
        }
      })
    } else {
      res.send({ code: 202, msg: '获取部门信息失败' })
    }
  })
})
// 获取相关员工信息
router.get('/api/getEmployeEvilInfo', (req, res) => {
  const { dno } = JSON.parse(req.query.baseInfo);
  const { page, size } = JSON.parse(req.query.pagination)
  // 未接种完毕的员工信息
  const preSql = `SELECT DISTINCT e.*from employee e,dept d WHERE e.employno
in (select c.employid from covidinfo c WHERE c.depallid=${dno} AND threeInoculation='false' )
AND e.deptno=d.id  AND d.deptno=${dno} limit ${(page - 1) * size},${size}
`
  connect.query(preSql, (e, r) => {
    if (e) res.send({ code: 202, msg: '获取信息失败' })
    if (r.length > 0) {
      // 员工具体接种信息
      const sql = `
select c.* from covidinfo c ,dept d WHERE c.employid
in (select c.employid from covidinfo c WHERE c.depallid=${dno} AND threeInoculation='false')
AND c.deptid=d.id AND d.deptno=${dno} 
`
      connect.query(sql, (err, results) => {
        if (err) res.send({ code: 202, msg: '获取信息失败' })
        if (results.length > 0) {

          res.send({ code: 200, employeInfo: [...r], employeCount: r.length, evilInfo: [...results], evilCount: results.length })
        } else if (results.length === 0) {
          {
            res.send({ code: 200, employeInfo: [], employeCount: 0, evilInfo: [], evilCount: 0 })
          }
        }
      })
    }
    else {
      res.send({ code: 200, employeInfo: [], employeCount: 0, evilInfo: [], evilCount: 0 })
    }
  })
})
// 获取部门全部员工接种信息
router.get('/api/getAllEmployeEvilInfo', (req, res) => {
  const { dno } = JSON.parse(req.query.baseInfo);
  const { page, size } = JSON.parse(req.query.pagination)
  // 获取员工 分页
  const sql = `SELECT DISTINCT e.*,co.deptid,co.depallid,co.firstInoculation,co.secondInoculation,co.threeInoculation from employee e,dept d,covidinfo co WHERE e.employno
in (select c.employid from covidinfo c WHERE c.depallid=${dno} )
AND e.deptno=d.id  AND co.depallid=d.deptno AND d.deptno=${dno} AND e.employno=co.employid ORDER BY e.employno asc
limit ${(page - 1) * size},${size}`
  connect.query(sql, (err, results) => {
    if (err) res.send({ code: 202, msg: '查询数据失败' })
    if (results && results.length > 0) {
      // 获取总数
      const countSql = `SELECT DISTINCT count(e.employno) as count from employee e,dept d,covidinfo co WHERE e.employno
in (select c.employid from covidinfo c WHERE c.depallid=${dno} )
AND e.deptno=d.id  AND co.depallid=d.deptno AND d.deptno=${dno} AND e.employno=co.employid ORDER BY e.employno asc
`
      connect.query(countSql, (e, r) => {
        if (e) res.send({ code: 202, msg: '查询数据失败' })
        if (r.length > 0) {
          res.send({ code: 200, allEmployeEvilInfo: results, count: r[0].count })
        }
      })
    }
  })
})
// 修改接种信息
router.post('/api/updateEmployeEvilInfo', (req, res) => {
  const { depallid, deptid, employno, firstInoculation, secondInoculation, threeInoculation } = req.body
  const sql = `UPDATE  covidinfo  SET  depallid  = ${depallid},  firstInoculation  = '${firstInoculation}',
secondInoculation  = '${secondInoculation}',  threeInoculation  = '${threeInoculation}'
WHERE  deptid  = ${deptid} AND  employid  = ${employno};`
  console.log(sql);
  connect.query(sql, (err, results) => {
    if (err) res.send({ code: 202, msg: '修改信息失败' })
    if (results && results.affectedRows > 0) {
      res.send({ code: 200, msg: '修改成功' })
    } else {
      res.send({ code: 202, msg: '修改信息失败' })
    }
  })
})

// 查看删除的员工信息
router.get('/api/getDeletedEmploye', (req, res) => {
  const { page, size } = req.query
  const sql = `select * from employeredo limit ${page - 1},${size}`
  connect.query(`select count(*) as count from employeredo`, (e, r) => {
    if (e) res.send({ code: 202, msg: '获取信息失败' })
    connect.query(sql, (err, results) => {
      if (err) res.send({ code: 202, msg: '获取信息失败！' })
      if (results.length > 0) {
        res.send({ code: 200, results: results, count: r[0].count })
      } else {
        res.send({ code: 202, msg: '暂无删除员工' })
      }
    })
  })

})
// 撤回删除的员工操作
router.post('/api/rebackEmploye', (req, res) => {
  console.log(req.body)
  res.send({ code: 200 })
})
module.exports = router;