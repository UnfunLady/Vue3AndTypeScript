var express = require('express');
var router = express.Router();
var connect = require('../db/connect')
const os = require("os")
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require("path") // 处理路径的模块
//上传图片的模板
var multer = require('multer');
const { first } = require('lodash');
//生成的图片放入uploads文件夹下
var upload = multer({ dest: 'uploads/' })
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 登录接口
router.post('/api/login', function (req, res, next) {
  // 获取账号密码
  const { username, password } = req.body
  const sql = `select *from users where username='${username}' and password= '${password}'`
  connect.query(sql, (err, results) => {
    if (err) throw err;
    const { nickname, avatar, token } = results[0];
    if (results.length > 0) {
      // const secret = "woshizengyu"
      // let token = jwt.sign({ username, password }, secret, { expiresIn: "10h" })
      res.send({
        code: 200,
        msg: '账号密码验证成功!',
        token,
        Info: {
          avatar,
          nickname
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
  // body.default基本信息 body.old 旧部门信息 因为表是多个主键 修改需要用到旧部门id
  // 如果是更新则走更新的操作
  if (isUpdate) {
    const preSql = `select *from employee where employno=${body.default.employno} and deptno=${body.default.deptno}`
    console.log(preSql);
    connect.query(preSql, (errors, resu) => {
      if (errors) throw errors
      if (resu && resu.length > 0) {
        res.send({
          code: 202,
          msg: '该小组已有相同成员 请移到其他小组'
        })
      } else {
        const udSql = `
    UPDATE vueandts.employee SET deptno = ${body.default.deptno}, employname = '${body.default.employname}', employage = '${body.default.employage}', employsex= '${body.default.employsex}', employidcard = '${body.default.employidcard}',
    employphone = '${body.default.employphone}', entryDate = '${body.default.entryDate}', 
    employemail = '${body.default.employemail}', employaddress = '${body.default.employaddress}', 
    employsalary = '${body.default.employsalary}' 
    WHERE deptno=${body.old} and employno = ${body.default.employno};
    `
        // 更新员工
        connect.query(udSql, (e, r) => {
          if (e) throw e
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
        })
      }
    })

  } else {
    // 插入sql
    const addSql = `INSERT INTO vueandts.employee(deptno, employname, employage, employsex,employidcard, employphone, entryDate, employemail, employaddress, employsalary)
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
  const { employno } = req.body;
  const sql = `delete from employee where employno =${employno}`
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
            msg: '查找失败!',

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
  console.log(editForm, performance);
  if (editForm.isuse != null && editForm.deptid != null) {
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
      console.log(r);
    })
    res.send({
      code: 200,
      msg: '修改绩效成功'
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
          connect.query('select *from employeSub', (haserror, success) => {
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


// 1.上传头像
router.post('/api/editDept', upload.single('file'), (req, res) => {
  // // 上传的图片到uploads文件
  const { dno, dname, explain } = req.query;
  var imges = req.file;
  if (imges) {
    // 读取文件信息
    fs.readFile(imges.path, (err, data) => {
      if (err) {
        console.log(err, "图片读取失败")
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
        console.log(sql);
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
        msg: '已有相同名字部门请重新取名!'
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
module.exports = router;
