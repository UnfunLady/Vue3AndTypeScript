/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3307
 Source Schema         : vueandts

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 04/08/2022 17:24:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for depall
-- ----------------------------
DROP TABLE IF EXISTS `depall`;
CREATE TABLE `depall`  (
  `dno` int(0) NOT NULL,
  `dname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `explain` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `count` int(0) NOT NULL,
  `groupCount` int(0) NOT NULL,
  PRIMARY KEY (`dno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of depall
-- ----------------------------
INSERT INTO `depall` VALUES (1, '爬虫团队', '参与分布式爬虫和数据采集系统的架构设计和开发,负责大规模文本、图像数据的抓取、抽取，去重、分类，垃圾过滤，质量识别等工作', 'https://img0.baidu.com/it/u=3104250705,162290846&fm=253&fmt=auto&app=138&f=JPG', 80, 4);
INSERT INTO `depall` VALUES (2, '后端团队', '设计开发以及测试并且维护后端的各个子系统，负责线上服务器运行期间的安全以及稳定性，负责相关后台服务的工发工作', '\r\nhttps://mms2.baidu.com/it/u=1219526164,3946276492&fm=253&app=138&f=JPEG', 40, 3);
INSERT INTO `depall` VALUES (3, 'UI团队', '负责软件界面的美术设计、创意工作和制作工作，根据各种相关软件的用户群，提出构思新颖、有高度吸引力的创意设计', 'https://img1.baidu.com/it/u=3213166844,1927952924&fm=253&fmt=auto&app=138&f=PNG', 20, 2);
INSERT INTO `depall` VALUES (4, '前端团队', '配合UI设计师实现预期的视觉交互效果，定期的更新和优化产品，保持产品的生命力和可用性，配合后端工程师完成相关应用的开发工作', 'https://img2.baidu.com/it/u=2213282682,62301055&fm=253&fmt=auto&app=138&f=JPEG', 30, 3);
INSERT INTO `depall` VALUES (5, '运维团队', '设计并开发高效的监控平台和告警平台，以可控的方式，尽可能高效的完成产品功能的迭代的变更工作', 'https://img0.baidu.com/it/u=3231418332,3200306261&fm=253&fmt=auto&app=138&f=JPEG', 30, 3);
INSERT INTO `depall` VALUES (6, '经营团队', '以可控的方式，尽可能高效的完成产品功能的迭代的变更工作，搞好市场调查与预测，选定产品发展方向，制定长期发展规划', 'https://img1.baidu.com/it/u=312885407,2370214083&fm=253&fmt=auto&app=138&f=JPEG', 10, 1);
INSERT INTO `depall` VALUES (7, '行政团队', '负责公司全体员工的后勤保障工作，负责接待来宾（比如：政府部门、职能部门人员），接听或转接外部电话，负责公司员工的考勤管理', 'https://img0.baidu.com/it/u=3450002477,2924136512&fm=253&fmt=auto&app=138&f=PNG', 10, 1);

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `id` int(0) NOT NULL,
  `deptno` int(0) NOT NULL,
  `deptname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `count` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_depno`(`deptno`) USING BTREE,
  CONSTRAINT `fk_depno` FOREIGN KEY (`deptno`) REFERENCES `depall` (`dno`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES (1, 1, '爬虫团队1组', '广州', 20);
INSERT INTO `dept` VALUES (2, 1, '爬虫团队2组', '深圳', 20);
INSERT INTO `dept` VALUES (3, 1, '爬虫团队3组', '广州', 20);
INSERT INTO `dept` VALUES (4, 1, '爬虫团队4组', '长沙', 20);
INSERT INTO `dept` VALUES (5, 2, '后端团队1组', '广州', 20);
INSERT INTO `dept` VALUES (6, 2, '后端团队2组', '深圳', 10);
INSERT INTO `dept` VALUES (7, 2, '后端团队3组', '北京', 10);
INSERT INTO `dept` VALUES (8, 3, 'UI团队1组', '北京', 10);
INSERT INTO `dept` VALUES (9, 3, 'UI团队2组', '深圳', 10);
INSERT INTO `dept` VALUES (10, 4, '前端团队1组', '广州', 10);
INSERT INTO `dept` VALUES (11, 4, '前端团队2组', '广州', 10);
INSERT INTO `dept` VALUES (12, 4, '前端团队3组', '北京', 10);
INSERT INTO `dept` VALUES (13, 5, '运维团队1组', '广州', 10);
INSERT INTO `dept` VALUES (14, 5, '运维团队2组', '广州', 10);
INSERT INTO `dept` VALUES (15, 5, '运维团队3组', '深圳', 10);
INSERT INTO `dept` VALUES (16, 6, '经营团队1组', '广州', 10);
INSERT INTO `dept` VALUES (17, 7, '行政团队1组', '广州', 10);

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `deptno` int(0) NOT NULL,
  `employno` int(0) NOT NULL AUTO_INCREMENT,
  `employname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employsex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employidcard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employphone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `entryDate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employemail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employaddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employsalary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isuse` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否补贴',
  PRIMARY KEY (`employno`) USING BTREE,
  INDEX `deptno`(`deptno`) USING BTREE,
  INDEX `employname`(`employname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 231 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES (1, 1, '鲁潜22', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省深圳市', '3500', 'true');
INSERT INTO `employee` VALUES (1, 2, '邵金鑫', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (1, 3, '陈昊强', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (1, 4, '	潘 琪', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (1, 5, '洪弘文', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (1, 6, '顾金鑫', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 7, '卢文昊', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 8, '韦苑博', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 9, '江涛', '23', '男', '440106199003077174', '156-45629045', '2022-02-12', '95@gmail.com', '广东省汕头市', '3500', 'true');
INSERT INTO `employee` VALUES (1, 10, '严耀杰', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 11, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 12, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (1, 13, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (1, 14, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (1, 15, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (1, 16, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 17, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 18, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 19, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (1, 20, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 21, '鲁潜', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 22, '邵金鑫', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (2, 23, '陈昊强', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (2, 24, '	潘 琪', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (2, 25, '洪弘文', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (2, 26, '顾金鑫', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 27, '卢文昊', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 28, '韦苑博', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 29, '江涛', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 30, '严耀杰', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 31, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 32, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (2, 33, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (2, 34, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (2, 35, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (2, 36, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 37, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 38, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 39, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (2, 40, '严耀杰1', '20', '男', '440106199003072656', '5733-56739802', '2022-02-12', '96@gmail.com', '广东省广州市', '3500', 'true');
INSERT INTO `employee` VALUES (3, 41, '鲁潜', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 42, '邵金鑫', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (3, 43, '陈昊强', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (3, 44, '	潘 琪', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (3, 45, '洪弘文', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (3, 46, '顾金鑫', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 47, '卢文昊', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 48, '韦苑博', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 49, '江涛', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 50, '严耀杰', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 51, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 52, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (3, 53, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (3, 54, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (3, 55, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (3, 56, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 57, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 58, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 59, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (3, 60, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 61, '鲁潜', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 62, '邵金鑫', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (4, 63, '陈昊强', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (4, 64, '	潘 琪', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (4, 65, '洪弘文', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (4, 66, '顾金鑫', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 67, '卢文昊', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 68, '韦苑博', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 69, '江涛', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 70, '严耀杰', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 71, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 72, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (4, 73, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (4, 74, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (4, 75, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (4, 76, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 77, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 78, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 79, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (4, 80, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 81, '鲁潜', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 82, '邵金鑫', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (5, 83, '陈昊强', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (5, 84, '	潘 琪', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (5, 85, '洪弘文', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (5, 86, '顾金鑫', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 87, '卢文昊', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 88, '韦苑博', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 89, '江涛', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 90, '严耀杰', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 91, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 92, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (5, 93, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (5, 94, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (5, 95, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (5, 96, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 97, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 98, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 99, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (5, 100, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (6, 101, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (6, 102, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (6, 103, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (6, 104, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (6, 105, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (6, 106, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (6, 107, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (6, 108, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (6, 109, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (6, 110, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (7, 111, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (7, 112, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (7, 113, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (7, 114, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (7, 115, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (7, 116, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (7, 117, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (7, 118, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (7, 119, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (7, 120, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (8, 121, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (8, 122, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (8, 123, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (8, 124, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (8, 125, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (8, 126, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (8, 127, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (8, 128, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (8, 129, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (8, 130, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (9, 131, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (9, 132, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (9, 133, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (9, 134, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (9, 135, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (9, 136, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (9, 137, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (9, 138, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (9, 139, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (9, 140, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (10, 141, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (10, 142, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (10, 143, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (10, 144, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (10, 145, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (10, 146, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (10, 147, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (10, 148, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (10, 149, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (10, 150, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (11, 151, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (11, 152, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (11, 153, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (11, 154, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (11, 155, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (11, 156, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (11, 157, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (11, 158, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (11, 159, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (11, 160, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (12, 161, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (12, 162, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (12, 163, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (12, 164, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (12, 165, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (12, 166, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (12, 167, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (12, 168, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (12, 169, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (12, 170, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (13, 171, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (13, 172, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (13, 173, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (13, 174, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (13, 175, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (13, 176, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (13, 177, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (13, 178, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (13, 179, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (13, 180, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (14, 181, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (14, 182, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (14, 183, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (14, 184, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (14, 185, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (14, 186, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (14, 187, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (14, 188, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (14, 189, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (14, 190, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (15, 191, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (15, 192, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (15, 193, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (15, 194, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (15, 195, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (15, 196, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (15, 197, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (15, 198, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (15, 199, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (15, 200, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (16, 201, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (16, 202, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (16, 203, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (16, 204, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (16, 205, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (16, 206, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (16, 207, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (16, 208, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (16, 209, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (16, 210, '严耀杰1', '20', '男', '	440106199003072656', '5733-56739802', '2022-02-12', '	96@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (17, 211, '鲁潜1', '21', '男', '441623200110158757', '13825361944', '2022-02-12', '_50@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (17, 212, '邵金鑫1', '21', '男', '110101200106072592', '18968451285', '2022-02-12', '	.zs@yahoo.com', '北京市北京市辖区东城区', '3800', 'true');
INSERT INTO `employee` VALUES (17, 213, '陈昊1', '28', '男', '	110101199503072072', '	4706-51611314', '2022-02-12', '	_56@gmail.com', '北京市北京市辖区东城区', '8000', 'true');
INSERT INTO `employee` VALUES (17, 214, '潘 琪1', '23', '女', '110101199903075088', '8667-21583259', '2022-02-12', '	24@yahoo.com', '北京市北京市辖区东城区', '3200', 'true');
INSERT INTO `employee` VALUES (17, 215, '洪弘文1', '20', '男', '	310101200203072479', '	3461-57848206', '2022-02-12', '	91@hotmail.com', '上海市上海市市辖区黄浦区', '5000', 'true');
INSERT INTO `employee` VALUES (17, 216, '顾金鑫1', '21', '男', '	440106199003078230', '	95655935425', '2022-02-12', '_588@hotmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (17, 217, '卢文昊1', '21', '男', '	440106199003072699', '	626-83028149', '2022-02-12', '	.zts@yahoo.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (17, 218, '韦苑博1', '28', '男', '440106199003077115', '3141-91971190', '2022-02-12', '	94@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (17, 219, '江涛1', '23', '男', '	440106199003077174', '156-45629045', '2022-02-12', '	95@gmail.com', '广东省广州市天河区', '3500', 'true');
INSERT INTO `employee` VALUES (17, 220, '李四1', '18', '男', '441623200210151548', '13825361949', '2022-5-7', '1382536@qq.com', '广东省广州市', '3002', 'true');

-- ----------------------------
-- Table structure for employesalary
-- ----------------------------
DROP TABLE IF EXISTS `employesalary`;
CREATE TABLE `employesalary`  (
  `deptno` int(0) NOT NULL COMMENT '部门所属团队',
  `deptid` int(0) NOT NULL COMMENT '团队号',
  `socialSub` int(0) NOT NULL DEFAULT 150 COMMENT '社保钱',
  `houseSub` int(0) NOT NULL DEFAULT 800 COMMENT '房补金',
  `eatSub` int(0) NOT NULL DEFAULT 650 COMMENT '餐补',
  `transSub` int(0) NOT NULL DEFAULT 500 COMMENT '交通补贴',
  `hotSub` int(0) NOT NULL DEFAULT 300 COMMENT '高温补贴',
  `performance` int(0) NOT NULL DEFAULT 100 COMMENT '绩效',
  `isuse` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否把补贴计入',
  PRIMARY KEY (`deptid`) USING BTREE,
  INDEX `deptno`(`deptno`) USING BTREE,
  CONSTRAINT `deptid ` FOREIGN KEY (`deptid`) REFERENCES `dept` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `deptno` FOREIGN KEY (`deptno`) REFERENCES `depall` (`dno`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employesalary
-- ----------------------------
INSERT INTO `employesalary` VALUES (1, 1, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (1, 2, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (1, 3, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (1, 4, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (2, 5, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (2, 6, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (2, 7, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (3, 8, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (3, 9, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (4, 10, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (4, 11, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (4, 12, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (5, 13, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (5, 14, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (5, 15, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (6, 16, 150, 800, 650, 500, 300, 100, 'true');
INSERT INTO `employesalary` VALUES (7, 17, 150, 800, 650, 500, 300, 100, 'true');

-- ----------------------------
-- Table structure for employesalarydetail
-- ----------------------------
DROP TABLE IF EXISTS `employesalarydetail`;
CREATE TABLE `employesalarydetail`  (
  `deptno` int(0) NOT NULL,
  `employno` int(0) NOT NULL COMMENT '员工号',
  `employname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '名字',
  `usesocialSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否社保',
  `usehouseSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否有房补',
  `useeatSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否有餐补',
  `usetransSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否有交通补',
  `usehotSub` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否有高温补',
  `usePerformance` int(0) NOT NULL DEFAULT 100 COMMENT '是否有绩效',
  `isuse` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true' COMMENT '是否拥有补贴 取决于团队整体',
  `salary` int(0) NOT NULL COMMENT '底薪',
  PRIMARY KEY (`employno`) USING BTREE,
  INDEX `detail_deptno`(`deptno`) USING BTREE,
  INDEX `detail_name`(`employname`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employesalarydetail
-- ----------------------------
INSERT INTO `employesalarydetail` VALUES (1, 1, '鲁潜22', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 2, '邵金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (1, 3, '陈昊强', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (1, 4, '	潘 琪', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (1, 5, '洪弘文', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (1, 6, '顾金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 7, '卢文昊', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 8, '韦苑博', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 9, '江涛', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 10, '严耀杰', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 11, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 12, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (1, 13, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (1, 14, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (1, 15, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (1, 16, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 17, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 18, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 19, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (1, 20, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 21, '鲁潜', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 22, '邵金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (2, 23, '陈昊强', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (2, 24, '	潘 琪', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (2, 25, '洪弘文', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (2, 26, '顾金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 27, '卢文昊', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 28, '韦苑博', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 29, '江涛', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 30, '严耀杰', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 31, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 32, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (2, 33, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (2, 34, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (2, 35, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (2, 36, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 37, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 38, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 39, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (2, 40, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 41, '鲁潜', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 42, '邵金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (3, 43, '陈昊强', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (3, 44, '	潘 琪', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (3, 45, '洪弘文', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (3, 46, '顾金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 47, '卢文昊', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 48, '韦苑博', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 49, '江涛', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 50, '严耀杰', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 51, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 52, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (3, 53, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (3, 54, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (3, 55, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (3, 56, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 57, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 58, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 59, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (3, 60, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 61, '鲁潜', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 62, '邵金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (4, 63, '陈昊强', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (4, 64, '	潘 琪', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (4, 65, '洪弘文', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (4, 66, '顾金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 67, '卢文昊', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 68, '韦苑博', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 69, '江涛', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 70, '严耀杰', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 71, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 72, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (4, 73, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (4, 74, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (4, 75, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (4, 76, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 77, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 78, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 79, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (4, 80, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 81, '鲁潜', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 82, '邵金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (5, 83, '陈昊强', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (5, 84, '	潘 琪', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (5, 85, '洪弘文', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (5, 86, '顾金鑫', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 87, '卢文昊', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 88, '韦苑博', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 89, '江涛', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 90, '严耀杰', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 91, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 92, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (5, 93, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (5, 94, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (5, 95, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (5, 96, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 97, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 98, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 99, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (5, 100, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (6, 101, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (6, 102, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (6, 103, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (6, 104, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (6, 105, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (6, 106, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (6, 107, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (6, 108, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (6, 109, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (6, 110, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (7, 111, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (7, 112, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (7, 113, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (7, 114, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (7, 115, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (7, 116, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (7, 117, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (7, 118, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (7, 119, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (7, 120, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (8, 121, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (8, 122, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (8, 123, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (8, 124, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (8, 125, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (8, 126, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (8, 127, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (8, 128, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (8, 129, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (8, 130, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (9, 131, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (9, 132, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (9, 133, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (9, 134, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (9, 135, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (9, 136, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (9, 137, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (9, 138, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (9, 139, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (9, 140, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (10, 141, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (10, 142, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (10, 143, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (10, 144, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (10, 145, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (10, 146, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (10, 147, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (10, 148, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (10, 149, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (10, 150, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (11, 151, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (11, 152, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (11, 153, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (11, 154, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (11, 155, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (11, 156, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (11, 157, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (11, 158, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (11, 159, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (11, 160, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (12, 161, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (12, 162, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (12, 163, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (12, 164, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (12, 165, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (12, 166, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (12, 167, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (12, 168, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (12, 169, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (12, 170, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (13, 171, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (13, 172, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (13, 173, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (13, 174, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (13, 175, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (13, 176, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (13, 177, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (13, 178, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (13, 179, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (13, 180, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (14, 181, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (14, 182, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (14, 183, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (14, 184, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (14, 185, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (14, 186, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (14, 187, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (14, 188, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (14, 189, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (14, 190, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (15, 191, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (15, 192, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (15, 193, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (15, 194, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (15, 195, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (15, 196, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (15, 197, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (15, 198, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (15, 199, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (15, 200, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (16, 201, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (16, 202, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (16, 203, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (16, 204, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (16, 205, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (16, 206, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (16, 207, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (16, 208, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (16, 209, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (16, 210, '严耀杰1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (17, 211, '鲁潜1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (17, 212, '邵金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3800);
INSERT INTO `employesalarydetail` VALUES (17, 213, '陈昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 8000);
INSERT INTO `employesalarydetail` VALUES (17, 214, '潘 琪1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3200);
INSERT INTO `employesalarydetail` VALUES (17, 215, '洪弘文1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 5000);
INSERT INTO `employesalarydetail` VALUES (17, 216, '顾金鑫1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (17, 217, '卢文昊1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (17, 218, '韦苑博1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (17, 219, '江涛1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3500);
INSERT INTO `employesalarydetail` VALUES (17, 220, '李四1', 'true', 'true', 'true', 'true', 'true', 100, 'true', 3002);

-- ----------------------------
-- Table structure for employesub
-- ----------------------------
DROP TABLE IF EXISTS `employesub`;
CREATE TABLE `employesub`  (
  `socialSub` int(0) NOT NULL,
  `houseSub` int(0) NOT NULL,
  `eatSub` int(0) NOT NULL,
  `transSub` int(0) NOT NULL,
  `hotSub` int(0) NOT NULL,
  `performance` int(0) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employesub
-- ----------------------------
INSERT INTO `employesub` VALUES (150, 800, 650, 500, 300, 1000);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `islock` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `level` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'token',
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('admin', '123456', '0', '1', 'https://himg.bdimg.com/sys/portrait/item/public.1.9d62a83f.ak8wyGYgvIRgx1ZEi2Lv4A.jpg', 'UnfunLady', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NTczNDczMTYsImV4cCI6MTY1NzM4MzMxNn0.7G96zlwzqSqVFVHNzrc3t2r3xH-2F7lrg7NbGBQZSBI');
INSERT INTO `users` VALUES ('hello', 'world', '0', '0', 'https://himg.bdimg.com/sys/portrait/item/public.1.9d62a83f.ak8wyGYgvIRgx1ZEi2Lv4A.jpg', 'Luyuxi', '');

-- ----------------------------
-- Triggers structure for table dept
-- ----------------------------
DROP TRIGGER IF EXISTS `dpall`;
delimiter ;;
CREATE TRIGGER `dpall` AFTER UPDATE ON `dept` FOR EACH ROW BEGIN
DECLARE dpno int(255);
DECLARE allCount int(255);
-- 总人数修改时 修改部门人数
set dpno=(select deptno from dept WHERE dept.id=new.id);
set allCount=(select  sum(dept.count) from dept where dept.deptno=dpno);
UPDATE depall SET count=allCount WHERE dno=dpno;
-- 部门团队人数修改
update depall set groupCount=(select count(*) from dept where deptno=new.deptno) WHERE dno=new.deptno;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employee
-- ----------------------------
DROP TRIGGER IF EXISTS `triggercountdelete`;
delimiter ;;
CREATE TRIGGER `triggercountdelete` AFTER DELETE ON `employee` FOR EACH ROW begin
declare newcoun int(255);
set newcoun=(select count(*) from employee,dept where employee.deptno=dept.id and employee.deptno=old.deptno);
update dept  set  count =newcoun where dept.id=old.deptno;
delete from employesalarydetail where employno=old.employno;
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employee
-- ----------------------------
DROP TRIGGER IF EXISTS `triggercountadd`;
delimiter ;;
CREATE TRIGGER `triggercountadd` AFTER INSERT ON `employee` FOR EACH ROW begin
declare newcoun int(255);
set newcoun=(select count(*) from employee,dept where employee.deptno=dept.id and employee.deptno=new.deptno);
update dept  set  count =newcoun where dept.id=new.deptno;
INSERT INTO `vueandts`.`employesalarydetail`(`deptno`, `employno`, `employname`,`salary`) VALUES (new.deptno, new.employno, new.employname,new.employsalary);
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employee
-- ----------------------------
DROP TRIGGER IF EXISTS `triggercountupdate`;
delimiter ;;
CREATE TRIGGER `triggercountupdate` AFTER UPDATE ON `employee` FOR EACH ROW begin
declare newcoun int(255);
declare oldcoun int(255);
set oldcoun=(select count(*) from employee,dept where employee.deptno=dept.id and employee.deptno=old.deptno);
update dept  set  count =oldcoun where dept.id=old.deptno;
set newcoun=(select count(*) from employee,dept where employee.deptno=dept.id and employee.deptno=new.deptno);
update dept  set  count =newcoun where dept.id=new.deptno;
UPDATE `vueandts`.`employesalarydetail` SET `deptno` = new.deptno, `employname` = new.employname,`isuse` = new.isuse,`salary`=new.employsalary WHERE `employno` = new.employno;

end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employesalary
-- ----------------------------
DROP TRIGGER IF EXISTS `changeUse`;
delimiter ;;
CREATE TRIGGER `changeUse` AFTER UPDATE ON `employesalary` FOR EACH ROW beginDECLARE isusesub VARCHAR(10);

set isusesub=(select isuse from employesalary where deptid=new.deptid);

UPDATE employesalarydetail SET  usePerformance=new.performance WHERE deptno =new.deptid;
update  employee  set isuse=isusesub WHERE deptno=new.deptid;

END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table employesub
-- ----------------------------
DROP TRIGGER IF EXISTS `changeSub`;
delimiter ;;
CREATE TRIGGER `changeSub` AFTER UPDATE ON `employesub` FOR EACH ROW begin

update  employesalary SET socialSub=new.socialSub,houseSub=new.houseSub,eatSub=new.eatSub,transSub=new.transSub,hotSub=new.hotSub;

end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
