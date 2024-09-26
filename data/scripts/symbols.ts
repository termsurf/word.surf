import talk from '@termsurf/talk'
import devanagari from '@termsurf/text/devanagari'
import tibetan from '@termsurf/text/tibetan'

const TIBETAN_FRACTIONS = [
  -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5,
]

const ROMAN_NUMERALS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100, 500, 1000, 10000, 100,
  6, 50,
]

const DEVANAGARI_VOWEL_DIACRITICS =
  `\u093A \u093B \u093E \u093F \u0940 \u0941 \u0942 \u0943 \u0944 \u0945 \u0946 \u0947 \u0948 \u0949 \u094A \u094B \u094C \u094E \u094F \u0955 \u0956 \u0962 \u0963`.split(
    /\s+/,
  )

const DEVANAGARI_CONSONANTS =
  `\u0915 \u0916 \u0917 \u0918 \u0919 \u091A \u091B \u091C \u091D \u091E \u091F \u0920 \u0921 \u0922 \u0923 \u0924 \u0925 \u0926 \u0927 \u0928 \u092A \u092B \u092C \u092D \u092E \u092F \u0930 \u0932 \u0935 \u0936 \u0937 \u0938 \u0939`.split(
    /\s+/,
  )

const DEVANAGARI_VOWELS =
  `\u0904 \u0905 \u0906 \u0907 \u0908 \u0909 \u090A \u090B \u090C \u090D \u090F \u090E \u0910 \u0911 \u0912 \u0913 \u0914 \u0960 \u0961 \u0972`.split(
    /\s+/,
  )

const CHINESE_RADICALS = loadChineseRadicals()

const CHINESE_SIMPLIFIED =
  `钯 钹 罢 坝 拨 钵 剥 饽 铂 悖 悖 鹁 博 博 镈 馎 驳 卜 卜 泺 蘖 摆 摆 呗 败 杯 杯 杯 鹎 背 背 贝 狈 钡 辈 备 惫 炮 炮 龅 饱 鸨 宝 刨 刨 鲍 报 颁 板 板 钣 绊 办 锛 贲 帮 绑 并 并 并 彷 谤 镑 绷 逼 逼 笔 秘 秘 铋 佛 佛 佛 费 痹 痹 币 毙 闭 毕 哔 荜 筚 跸 辟 辟 赑 鳖 别 别 瘪 飙 标 镖 飑 镳 表 表 鳔 编 鳊 边 笾 贬 苄 苄 缏 辫 辩 变 禀 宾 傧 滨 槟 缤 镔 濒 摈 殡 膑 鬓 髌 饼 补 布 布 钸 颇 泼 朴 朴 钋 酦 坏 坏 赔 辔 抛 疱 疱 盘 蹒 拼 拼 喷 庞 庞 仿 仿 仿 仿 鹏 纰 铍 毗 毗 罴 飘 缥 骠 骈 谝 骗 贫 频 苹 苹 颦 嫔 评 萍 萍 瓶 瓶 冯 凭 仆 仆 扑 扑 铺 谱 妈 蚂 嬷 麻 麻 么 么 马 吗 玛 码 骂 无 无 模 模 谟 馍 万 万 袜 袜 没 殁 脉 霡 麦 貘 貘 镆 蓦 买 卖 劢 迈 莓 莓 霉 霉 镁 谜 猫 牦 牦 锚 铆 贸 谋 缪 亩 颟 谩 馒 鳗 瞒 蛮 满 缦 镘 闷 焖 门 们 扪 钔 懑 氓 氓 铓 蒙 蒙 蒙 蒙 锰 梦 眯 眯 弥 弥 祢 猕 芈 沵 幂 谧 觅 灭 蔑 蔑 缈 庙 谬 绵 腼 腼 缅 面 面 缗 闽 闵 悯 黾 渑 铭 鸣 钼 鹜 发 发 阀 罚 珐 绯 飞 诽 镄 鲱 废 复 复 复 幡 幡 翻 翻 钒 泛 泛 泛 烦 矾 贩 饭 范 范 氛 氛 纷 坟 豮 偾 愤 奋 粪 钫 鲂 纺 访 丰 丰 风 枫 疯 讽 锋 沣 缝 沨 凤 赗 麸 肤 绋 绂 辐 凫 缚 缚 辅 俯 俯 抚 讣 驸 鲋 鳆 负 妇 赙 赋 哒 跶 达 鞑 呆 呆 呆 贷 隶 隶 叇 绐 骀 带 岛 捣 捣 导 祷 盗 帱 焘 斗 斗 豆 豆 饾 窦 读 鸩 鸩 单 郸 殚 瘅 箪 担 掸 胆 钽 膻 膻 啖 啖 惮 弹 诞 当 当 珰 裆 筜 铛 党 党 挡 档 谠 砀 荡 荡 灯 镫 邓 堤 堤 镝 涤 适 适 敌 籴 觌 诋 缔 谛 递 绖 谍 鲽 踮 踮 踮 叠 雕 雕 雕 鲷 鸟 吊 吊 钓 铫 调 窎 丢 颠 巅 癫 点 钿 电 淀 垫 钉 顶 锭 订 饤 铤 顿 独 渎 椟 犊 牍 黩 赌 笃 镀 夺 铎 缍 亸 驮 饳 跺 跺 堕 兑 队 对 怼 缎 锻 断 炖 趸 钝 饨 吨 遁 遁 冬 冬 东 冻 栋 动 它 它 铊 拓 拓 獭 挞 闼 阘 台 台 台 台 鲐 钛 态 韬 韬 掏 掏 绦 涛 鼗 梼 讨 头 贪 啴 滩 摊 瘫 谈 锬 坛 坛 谭 镡 荨 昙 袒 袒 叹 叹 汤 趟 趟 镗 糖 糖 糖 傥 烫 誊 藤 藤 腾 缇 题 绨 鹈 体 锑 屉 贴 铁 龆 条 鲦 鲦 眺 眺 粜 阗 听 听 厅 颋 秃 涂 涂 图 钍 托 托 饦 脱 驼 鸵 鼍 椭 萚 箨 颓 蜕 抟 团 团 鲀 同 同 铜 鲖 童 童 统 恸 拿 拿 拿 内 呐 纳 讷 钠 馁 挠 桡 铙 恼 脑 闹 楠 楠 难 铌 儿 儿 鲵 拟 昵 昵 腻 捻 捻 镍 岩 岩 岩 岩 陧 业 聂 摄 嗫 蹑 镊 颞 糵 啮 茑 袅 袅 袅 纽 钮 鲇 鲶 辇 撵 辗 念 念 娘 酿 宁 宁 宁 拧 咛 狞 柠 聍 泞 驽 挪 挪 傩 诺 农 侬 浓 哝 脓 秾 钕 疟 谑 腊 腊 蜡 蜡 镴 乐 了 了 来 涞 崃 徕 莱 铼 睐 赉 厉 赖 濑 癞 籁 累 累 缧 镭 诔 垒 泪 类 颣 捞 劳 唠 崂 痨 铑 络 涝 搂 娄 偻 溇 喽 楼 蒌 窭 蝼 耧 髅 嵝 篓 瘘 瘘 镂 岚 阑 澜 拦 斓 栏 兰 襕 谰 镧 蓝 褴 篮 览 揽 榄 懒 滥 烂 琅 琅 阆 锒 棱 棱 狸 狸 漓 漓 缡 离 蓠 篱 厘 丽 酾 骊 鹂 鲡 里 里 锂 鲤 礼 鳢 逦 莅 镉 栗 栗 历 历 历 沥 坜 呖 枥 雳 励 疠 砺 粝 蛎 栎 砾 轹 跞 俪 郦 俩 猎 辽 疗 缭 镣 鹩 钌 溜 溜 镏 馏 飗 骝 鹠 刘 浏 镠 绺 陆 鹨 帘 帘 连 涟 琏 梿 莲 裢 鲢 镰 奁 怜 联 蔹 脸 炼 练 链 链 殓 敛 裣 潋 恋 挛 邻 辚 鳞 临 凛 廪 懔 赁 蔺 躏 凉 谅 粮 两 魉 辆 铃 鸰 龄 凌 凌 绫 鲮 棂 棂 灵 领 岭 噜 卢 泸 庐 垆 炉 炉 栌 芦 胪 舻 轳 颅 鸬 鲈 卤 卤 虏 掳 鲁 橹 渌 禄 绿 录 箓 辘 辂 赂 鹭 戮 戮 啰 脶 镙 骡 罗 㑩 猡 萝 逻 箩 锣 裸 裸 骆 荦 峦 娈 孪 栾 脔 滦 銮 鸾 乱 抡 仑 仑 伦 沦 囵 纶 论 轮 龙 泷 咙 珑 栊 茏 昽 胧 胧 砻 聋 笼 垄 拢 陇 闾 榈 驴 吕 侣 铝 屡 褛 缕 虑 滤 锊 轧 价 价 胳 胳 纥 搁 鸽 阁 合 合 颌 个 盖 铬 该 赅 钙 给 皓 皓 皓 缟 镐 搅 诰 锆 构 构 构 钩 区 沟 缑 苟 苟 够 诟 觏 购 干 干 干 干 杆 杆 尴 秆 赶 赶 绀 赣 赣 亘 杠 杠 冈 刚 岗 纲 钢 缰 戆 赓 绠 鲠 鲠 颈 钴 鸪 家 家 毂 诂 谷 谷 馉 鹘 贾 鹄 蛊 锢 雇 雇 顾 刮 刮 鸹 蜗 剐 挂 挂 诖 涡 埚 过 锅 蝈 国 掴 帼 椁 拐 拐 洼 洼 闺 鲑 规 沩 妫 龟 归 轨 匦 诡 贵 匮 柜 柜 瞆 会 刽 桧 刿 鳜 鳏 关 观 管 管 馆 毋 毋 贯 惯 掼 罐 罐 鹳 辊 衮 滚 浑 鲧 广 广 邝 犷 红 龚 宫 巩 矿 贡 咳 咳 颏 轲 钶 颗 壳 克 克 课 锞 骒 缂 开 岂 剀 凯 恺 垲 闿 铠 锴 忾 考 考 铐 抠 扣 扣 龛 坎 坎 槛 阚 垦 恳 龈 钪 肮 肮 闶 硁 羟 倾 铿 库 裤 喾 夸 夸 阔 鞟 扩 块 侩 浍 哙 郐 狯 脍 鲙 窥 窥 亏 岿 馈 馈 溃 愦 蒉 聩 篑 宽 髋 昆 昆 锟 鲲 捆 捆 阃 壸 困 困 诓 诳 况 贶 圹 旷 纩 铪 虾 诃 和 和 核 核 阂 蝎 蝎 鹖 龁 阖 吓 贺 鹤 还 骇 号 蚝 颢 灏 糇 后 后 鲎 顸 韩 厂 厂 捍 捍 焊 焊 闬 颔 汉 颃 恒 横 绗 糊 糊 戏 胡 胡 胡 鹕 壶 许 浒 冱 冱 户 沪 获 获 护 华 华 哗 哗 划 划 铧 桦 画 婳 话 伙 伙 货 祸 镬 怀 诙 挥 辉 辉 晖 翚 袆 回 回 虫 虫 诲 贿 毁 毁 汇 汇 烩 荟 绘 缋 阓 哕 秽 翙 讳 欢 欢 欢 环 缳 阛 镮 锾 浣 浣 缓 奂 涣 换 唤 焕 痪 鲩 阍 荤 馄 珲 诨 锽 鳇 黄 谎 哄 哄 轰 纮 闳 讧 荭 鸿 嵘 黉 唝 几 几 机 机 饥 饥 叽 玑 矶 讥 积 积 绩 迹 迹 赍 跻 齑 鸡 羁 汲 汲 级 吃 吃 极 鹡 借 借 辑 击 剧 纪 虮 济 挤 记 计 骑 际 齐 剂 哜 荠 霁 鲚 骥 系 系 系 蓟 觊 鲫 继 夹 镓 侠 浃 挟 郏 荚 蛱 铗 颊 钾 槚 驾 阶 结 疖 诘 颉 鲒 撷 杰 杰 讦 节 栉 洁 诫 届 鲛 乔 娇 骄 鹪 浇 胶 绞 较 铰 饺 脚 剿 剿 侥 挢 矫 缴 峤 轿 觉 纠 鸠 阄 旧 鹫 奸 奸 钘 戋 浅 笺 笺 缣 鹣 鳒 坚 鲣 间 闲 闲 缄 渐 监 艰 歼 鞯 拣 谫 钱 减 笕 戬 俭 捡 检 睑 碱 骞 骞 裥 简 茧 见 荐 荐 键 贱 践 饯 溅 涧 锏 舰 鉴 鉴 剑 谏 筋 筋 浸 浸 仅 谨 觐 馑 紧 尽 尽 锦 劲 晋 缙 进 烬 荩 赆 姜 姜 将 浆 螀 僵 僵 蒋 桨 奖 讲 绛 强 强 酱 鲸 泾 茎 经 荆 惊 刭 径 径 胫 痉 靓 净 静 镜 竞 菹 菹 车 驹 据 据 锯 局 局 龃 举 榉 巨 巨 讵 飓 惧 屦 决 诀 绝 谲 鹃 镌 卷 卷 眷 眷 绢 隽 钧 军 皲 浚 浚 骏 凄 凄 栖 栖 戚 戚 戚 溪 溪 桤 缉 旗 旗 颀 蕲 骐 锜 只 只 只 只 鳍 脐 蛴 启 绮 讫 气 气 弃 碛 锲 惬 箧 窃 硗 硗 跷 锹 侨 桥 荞 硚 谯 翘 鹊 诮 窍 丘 丘 秋 秋 鹙 鳅 赇 虬 千 千 悭 牵 谦 铅 佥 签 签 迁 锓 钤 钳 钳 钳 潜 缱 谴 茜 茜 堑 椠 纤 纤 骎 钦 嵚 亲 勤 勤 寝 揿 锵 抢 呛 玱 枪 枪 戗 跄 锖 镪 嫱 樯 蔷 墙 襁 襁 炝 请 鲭 烃 氢 轻 顷 庆 诎 岖 驱 驱 躯 趋 鸲 龋 阒 觑 阙 却 却 确 确 悫 榷 榷 阕 诠 辁 铨 蜷 蜷 权 颧 绻 劝 茕 茕 穷 琼 欣 欣 诶 嘻 嘻 牺 携 席 席 习 锡 觋 湿 湿 袭 洒 洒 鳃 玺 泻 泻 细 饩 阋 峡 狭 陕 陕 硖 辖 辖 厦 协 胁 页 缬 谐 写 泄 泄 绁 绁 屟 谢 亵 鸮 绡 销 枭 萧 箫 潇 蟏 哓 骁 嚣 肴 肴 筱 筱 晓 效 效 啸 泶 鸺 修 修 馐 绣 锈 仙 仙 籼 姗 祆 祆 跹 铦 鲜 鲜 弦 弦 咸 咸 衔 衔 娴 痫 鹇 贤 铣 蚬 崄 猃 险 藓 癣 狝 显 岘 现 苋 馅 羡 线 宪 县 献 锌 寻 衅 厢 缃 乡 芗 镶 骧 详 饷 饷 鲞 响 飨 向 向 项 蚃 样 兴 骍 铏 陉 荥 荇 荇 幸 幸 于 于 吁 吁 虚 嘘 须 须 呕 余 余 诩 谞 恤 恤 勖 叙 顼 绪 续 学 鳕 喧 喧 萱 萱 轩 谖 旋 旋 悬 选 炫 炫 铉 绚 勋 熏 熏 询 驯 浔 鲟 讯 训 孙 逊 凶 凶 恟 恟 汹 祇 栀 织 执 蛰 絷 跖 跖 质 职 掷 踯 址 址 轵 纸 征 征 致 致 轾 铚 志 志 制 制 置 置 骘 滞 挚 贽 鸷 帜 识 踬 锧 迟 觯 扎 扎 楂 楂 札 札 闸 铡 叉 叉 诈 鲊 笮 笮 榨 榨 栅 折 折 慑 慑 辄 谪 辙 詟 锗 这 鹧 着 斋 择 寨 寨 责 债 钊 诏 棹 棹 赵 辀 周 周 赒 诪 轴 胄 胄 纣 昼 皱 绉 占 占 沾 沾 觇 谵 毡 鹯 鳣 斩 崭 盏 飐 栈 绽 暂 战 颤 诊 贞 侦 浈 桢 祯 针 针 唇 唇 轸 缜 赈 阵 陈 镇 张 长 涨 帐 胀 账 钲 争 挣 峥 狰 睁 筝 诤 铮 症 症 证 证 帧 郑 朱 朱 诛 铢 诸 猪 潴 槠 橥 薯 薯 术 术 筑 筑 烛 贮 属 嘱 瞩 伫 苎 纻 注 注 驻 铸 挝 诼 浊 镯 锥 骓 缒 缀 坠 赘 颛 专 砖 转 啭 传 撰 撰 馔 纂 纂 赚 谆 准 准 纯 妆 庄 装 桩 壮 状 终 钟 钟 冢 冢 肿 种 种 众 鸱 驰 耻 齿 饬 炽 锸 姹 诧 刹 砗 彻 钗 侪 册 虿 钞 绸 雠 俦 畴 筹 踌 丑 丑 掺 搀 婵 禅 蝉 缠 谗 镵 馋 刬 产 铲 铲 浐 谄 阐 冁 蒇 忏 沉 沉 谌 尘 碜 称 龀 闯 榇 衬 谶 阊 锠 鲳 伥 苌 尝 尝 偿 场 肠 怅 畅 撑 赪 柽 蛏 诚 铖 枨 伧 惩 骋 出 出 刍 雏 储 锄 锄 厨 橱 蹰 处 础 绌 触 龊 辍 绰 捶 捶 锤 锤 钏 鹑 莼 囱 创 疮 怆 冲 冲 宠 铳 尸 尸 鸤 虱 虱 诗 师 狮 硕 蚀 时 埘 莳 鲥 实 驶 铈 视 贳 试 轼 弑 势 饰 谥 谥 释 纱 鲨 杀 铩 畲 赊 舍 舍 设 叶 滠 筛 谁 烧 绍 绶 寿 兽 钐 删 扇 扇 闪 讪 骟 缮 鳝 赡 绅 诜 参 参 谂 审 沈 婶 肾 渗 伤 殇 觞 赏 升 升 升 胜 胜 声 绳 剩 剩 圣 纾 输 书 枢 摅 赎 数 倏 倏 树 竖 说 帅 烁 铄 税 闩 顺 骦 双 热 娆 荛 蛲 饶 扰 绕 绕 纴 纫 轫 韧 认 饪 让 铷 蠕 蠕 缛 蕊 蕊 睿 睿 锐 软 闰 润 绒 绒 镕 颂 荣 蝾 咨 咨 资 缁 辎 锱 鲻 兹 镃 赀 龇 眦 渍 臜 咱 咱 杂 则 鲗 啧 帻 箦 赜 贼 泽 仄 仄 侧 灾 载 糟 糟 凿 枣 缲 皂 皂 噪 噪 诹 鲰 邹 诌 驺 骤 攒 趱 錾 赞 赞 酂 瓒 谮 赃 脏 脏 驵 缯 赠 镞 组 诅 躜 钻 缵 鳟 从 纵 踪 偬 总 疭 综 词 糍 鹚 辞 厕 赐 测 恻 䇲 才 才 财 采 采 采 彩 彩 草 草 凑 辏 骖 残 惭 蚕 惨 灿 仓 沧 苍 舱 层 粗 粗 粗 错 鹾 锉 缞 淬 淬 撺 蹿 窜 葱 聪 骢 枞 苁 丛 缌 锶 飔 厮 丝 鸶 蛳 驷 饲 飒 萨 铯 啬 穑 涩 赛 骚 缫 扫 搜 搜 锼 馊 飕 擞 薮 毵 伞 伞 糁 丧 颡 苏 苏 苏 稣 溯 溯 诉 缩 肃 骕 鹔 谡 蓑 蓑 唢 琐 锁 绥 虽 随 谇 岁 酸 酸 狲 荪 笋 损 松 松 嵩 嵩 怂 讼 诵 锕 腌 腌 讹 锇 鹅 额 恶 恶 厄 厄 扼 扼 轭 谔 锷 颚 鹗 腭 饿 垩 哑 鳄 阏 挨 挨 硙 皑 嗳 蔼 霭 爱 嫒 瑷 暧 叆 碍 骜 鳌 鳌 夭 夭 媪 袄 奥 岙 沤 欧 殴 瓯 讴 鸥 铵 庵 庵 鹌 阴 谙 暗 暗 暗 鲕 铒 饵 尔 迩 贰 铱 医 医 鹥 祎 迤 迤 诒 贻 饴 谊 颐 移 移 仪 遗 钇 蚁 蚁 舣 舣 轶 缢 镒 鹢 艺 呓 异 义 议 亿 忆 镱 诣 怿 峄 绎 译 驿 瘗 鸦 鸭 亚 桠 桠 压 氩 娅 铔 讶 御 御 爷 野 野 咽 咽 谒 邺 烨 晔 靥 馌 崖 崖 哟 淆 淆 尧 峣 轺 摇 瑶 遥 谣 飖 鳐 窑 药 药 耀 耀 钥 鹞 优 优 忧 尤 尤 鱿 铀 游 游 邮 犹 莸 铕 佑 佑 诱 阉 殷 殷 烟 烟 厌 恹 燕 燕 阎 阎 檐 檐 颜 严 盐 掩 掩 兖 鼹 厣 魇 黡 俨 彦 谚 焰 焰 砚 雁 雁 赝 餍 验 谳 酽 艳 滟 茵 茵 铟 骃 银 淫 淫 饮 隐 瘾 荫 荫 晕 慭 鸯 痒 痒 扬 扬 阳 炀 杨 旸 疡 钖 养 莺 应 鹰 婴 罂 罂 撄 嘤 璎 樱 缨 鹦 茔 荧 莹 萤 萦 营 滢 潆 赢 蝇 颍 颖 瘿 污 诬 乌 呜 邬 钨 铻 吴 芜 捂 捂 鹉 庑 怃 呒 妩 务 雾 骛 坞 误 娲 腽 莴 窝 卧 龌 为 韦 帏 围 违 闱 维 潍 诿 鲔 伟 炜 玮 苇 纬 韪 伪 喂 喂 猬 谓 卫 弯 湾 纨 顽 挽 挽 绾 温 辒 鳁 纹 闻 阌 稳 问 网 网 辋 瓮 瓮 瓮 纡 与 谀 舆 玙 欤 逾 逾 觎 娱 鱼 渔 俣 语 龉 屿 伛 钰 欲 欲 鹆 郁 郁 愈 愈 愈 谕 阈 驭 饫 鹬 预 滪 誉 狱 妪 约 钺 岳 岳 悦 阅 粤 跃 鸳 鹓 渊 鸢 鼋 园 辕 员 圆 陨 缘 橼 远 愿 愿 氲 赟 云 云 沄 沄 芸 芸 纭 匀 郧 筼 殒 韵 恽 郓 运 鹍 愠 酝 韫 蕴 嗈 嗈 雍 雍 痈 佣 佣 镛 拥 颙 咏 涌 涌 踊 踊`
    .split(/\s+/)
    .map(text => ({ text }))

const CHINESE_TRADITIONAL =
  `鈀 鈸 罷 壩 撥 缽 剝 餑 鉑 悖 誖 鵓 博 簙 鎛 餺 駁 卜 蔔 濼 蘗 擺 襬 唄 敗 桮 杯 盃 鵯 揹 背 貝 狽 鋇 輩 備 憊 砲 炮 齙 飽 鴇 寶 刨 鉋 鮑 報 頒 板 闆 鈑 絆 辦 錛 賁 幫 綁 并 併 並 徬 謗 鎊 繃 逼 偪 筆 秘 祕 鉍 佛 彿 髴 費 痺 痹 幣 斃 閉 畢 嗶 蓽 篳 蹕 闢 辟 贔 鱉 別 彆 癟 飆 標 鏢 颮 鑣 錶 表 鰾 編 鯿 邊 籩 貶 苄 芐 緶 辮 辯 變 稟 賓 儐 濱 檳 繽 鑌 瀕 擯 殯 臏 鬢 髕 餅 補 佈 布 鈽 頗 潑 朴 樸 釙 醱 坏 壞 賠 泡 拋 疱 皰 盤 蹣 拼 拚 噴 厖 龐 倣 仿 彷 髣 鵬 紕 鈹 毘 毗 羆 飄 縹 驃 駢 諞 騙 貧 頻 蘋 苹 顰 嬪 評 蓱 萍 瓶 缾 馮 憑 僕 仆 扑 撲 鋪 譜 媽 螞 嬤 麻 痲 麼 么 馬 嗎 瑪 碼 罵 无 無 模 糢 謨 饃 万 萬 襪 袜 沒 歿 脈 霢 麥 獏 貘 鏌 驀 買 賣 勱 邁 苺 莓 黴 霉 鎂 謎 貓 犛 氂 錨 鉚 貿 謀 繆 畝 顢 謾 饅 鰻 瞞 蠻 滿 縵 鏝 悶 燜 門 們 捫 鍆 懣 氓 甿 鋩 懞 濛 蒙 矇 錳 咪 瞇 眯 彌 瀰 禰 獼 羋 濔 冪 謐 覓 滅 衊 蔑 緲 廟 謬 綿 腼 靦 緬 面 麵 緡 閩 閔 憫 黽 澠 銘 鳴 鉬 鶩 發 髮 閥 罰 琺 緋 飛 誹 鐨 鯡 廢 復 复 複 旛 幡 繙 翻 釩 氾 泛 汎 煩 礬 販 飯 範 范 雰 氛 紛 墳 豶 僨 憤 奮 糞 鈁 魴 紡 訪 丰 豐 風 楓 瘋 諷 鋒 灃 縫 渢 鳳 賵 麩 膚 紼 紱 輻 鳧 縛 縳 輔 頫 俯 撫 訃 駙 鮒 鰒 負 婦 賻 賦 噠 躂 達 韃 騃 獃 呆 貸 隶 隸 靆 紿 駘 帶 島 搗 擣 導 禱 盜 幬 燾 斗 鬥 豆 荳 餖 竇 讀 酖 鴆 單 鄲 殫 癉 簞 擔 撣 膽 鉭 羶 膻 啖 啗 憚 彈 誕 當 噹 璫 襠 簹 鐺 党 黨 擋 檔 讜 碭 盪 蕩 燈 鐙 鄧 堤 隄 鏑 滌 适 適 敵 糴 覿 詆 締 諦 遞 絰 諜 鰈 帖 踮 跕 疊 鵰 彫 雕 鯛 鳥 弔 吊 釣 銚 調 窵 丟 顛 巔 癲 點 鈿 電 澱 墊 釘 頂 錠 訂 飣 鋌 頓 獨 瀆 櫝 犢 牘 黷 賭 篤 鍍 奪 鐸 綞 嚲 馱 飿 跢 跺 墮 兌 隊 對 懟 緞 鍛 斷 燉 躉 鈍 飩 噸 遁 遯 鼕 冬 東 凍 棟 動 牠 它 鉈 拓 搨 獺 撻 闥 闒 臺 檯 颱 台 鮐 鈦 態 韜 弢 搯 掏 絛 濤 鞀 檮 討 頭 貪 嘽 灘 攤 癱 談 錟 壇 罈 譚 鐔 蕁 曇 襢 袒 歎 嘆 湯 蹚 趟 鏜 糖 餳 醣 儻 燙 謄 藤 籐 騰 緹 題 綈 鵜 體 銻 屜 跕 鐵 齠 條 鰷 鯈 眺 覜 糶 闐 听 聽 廳 頲 禿 塗 涂 圖 釷 託 托 飥 脫 駝 鴕 鼉 橢 蘀 籜 頹 蛻 摶 糰 團 魨 衕 同 銅 鮦 僮 童 統 慟 拿 挐 拏 內 吶 納 訥 鈉 餒 撓 橈 鐃 惱 腦 鬧 柟 楠 難 鈮 兒 儿 鯢 擬 暱 昵 膩 捻 撚 鎳 岩 喦 巖 嵒 隉 業 聶 攝 囁 躡 鑷 顳 糱 齧 蔦 裊 嫋 嬝 紐 鈕 鮎 鯰 輦 攆 輾 唸 念 孃 釀 甯 寧 宁 擰 嚀 獰 檸 聹 濘 駑 挪 挼 儺 諾 農 儂 濃 噥 膿 穠 釹 瘧 謔 腊 臘 蠟 蜡 鑞 樂 瞭 了 來 淶 崍 徠 萊 錸 睞 賚 厲 賴 瀨 癩 籟 累 纍 縲 鐳 誄 壘 淚 類 纇 撈 勞 嘮 嶗 癆 銠 絡 澇 摟 婁 僂 漊 嘍 樓 蔞 窶 螻 耬 髏 嶁 簍 瘺 瘻 鏤 嵐 闌 瀾 攔 斕 欄 蘭 襴 讕 鑭 藍 襤 籃 攬 欖 纜 懶 濫 爛 瑯 琅 閬 鋃 棱 稜 狸 貍 漓 灕 縭 離 蘺 籬 釐 麗 釃 驪 鸝 鱺 裡 里 鋰 鯉 禮 鱧 邐 蒞 鎘 栗 慄 曆 厤 歷 瀝 壢 嚦 櫪 靂 勵 癘 礪 糲 蠣 櫟 礫 轢 躒 儷 酈 倆 獵 遼 療 繚 鐐 鷯 釕 溜 霤 鎦 餾 飀 騮 鶹 劉 瀏 鏐 綹 陸 鷚 簾 帘 連 漣 璉 槤 蓮 褳 鰱 鐮 奩 憐 聯 蘞 臉 煉 練 鏈 鍊 殮 斂 襝 瀲 戀 攣 鄰 轔 鱗 臨 凜 廩 懍 賃 藺 躪 涼 諒 糧 兩 魎 輛 鈴 鴒 齡 淩 凌 綾 鯪 欞 櫺 靈 領 嶺 嚕 盧 瀘 廬 壚 爐 鑪 櫨 蘆 臚 艫 轤 顱 鸕 鱸 滷 鹵 虜 擄 魯 櫓 淥 祿 綠 錄 籙 轆 輅 賂 鷺 僇 戮 囉 腡 鏍 騾 羅 儸 玀 蘿 邏 籮 鑼 裸 臝 駱 犖 巒 孌 孿 欒 臠 灤 鑾 鸞 亂 掄 崙 侖 倫 淪 圇 綸 論 輪 龍 瀧 嚨 瓏 櫳 蘢 曨 矓 朧 礱 聾 籠 壟 攏 隴 閭 櫚 驢 呂 侶 鋁 屢 褸 縷 慮 濾 鋝 軋 价 價 胳 肐 紇 擱 鴿 閣 合 閤 頜 個 蓋 鉻 該 賅 鈣 給 皜 皓 暠 縞 鎬 攪 誥 鋯 构 搆 構 鉤 區 溝 緱 苟 茍 夠 詬 覯 購 乾 干 幹 榦 桿 杆 尷 稈 趕 赶 紺 贛 灨 亙 杠 槓 岡 剛 崗 綱 鋼 韁 戇 賡 綆 骾 鯁 頸 鈷 鴣 家 傢 轂 詁 谷 穀 餶 鶻 賈 鵠 蠱 錮 僱 雇 顧 颳 刮 鴰 蝸 剮 掛 挂 詿 渦 堝 過 鍋 蟈 國 摑 幗 槨 拐 枴 窪 洼 閨 鮭 規 溈 媯 龜 歸 軌 匭 詭 貴 匱 櫃 柜 瞶 會 劊 檜 劌 鱖 鰥 關 觀 管 筦 館 毋 毌 貫 慣 摜 鑵 罐 鸛 輥 袞 滾 渾 鯀 广 廣 鄺 獷 紅 龔 宮 鞏 礦 貢 欬 咳 頦 軻 鈳 顆 殼 剋 克 課 錁 騍 緙 開 豈 剴 凱 愷 塏 闓 鎧 鍇 愾 考 攷 銬 摳 扣 釦 龕 坎 埳 檻 闞 墾 懇 齦 鈧 骯 肮 閌 硜 羥 傾 鏗 庫 褲 嚳 夸 誇 闊 鞹 擴 塊 儈 澮 噲 鄶 獪 膾 鱠 闚 窺 虧 巋 餽 饋 潰 憒 蕢 聵 簣 寬 髖 崑 昆 錕 鯤 捆 綑 閫 壼 困 睏 誆 誑 況 貺 壙 曠 纊 鉿 蝦 訶 龢 和 核 覈 閡 蝎 蠍 鶡 齕 闔 嚇 賀 鶴 還 駭 號 蠔 顥 灝 餱 後 后 鱟 頇 韓 廠 厂 捍 扞 焊 銲 閈 頷 漢 頏 恆 橫 絎 糊 餬 戲 衚 鬍 胡 鶘 壺 許 滸 沍 冱 戶 滬 獲 穫 護 譁 華 鏵 嘩 划 劃 驊 樺 畫 嫿 話 夥 伙 貨 禍 鑊 懷 詼 揮 煇 輝 暉 翬 褘 回 迴 虫 蟲 誨 賄 燬 毀 彙 匯 燴 薈 繪 繢 闠 噦 穢 翽 諱 懽 歡 驩 環 繯 闤 鐶 鍰 浣 澣 緩 奐 渙 換 喚 煥 瘓 鯇 閽 葷 餛 琿 諢 鍠 鰉 黃 謊 哄 鬨 轟 紘 閎 訌 葒 鴻 嶸 黌 嗊 几 幾 机 機 飢 饑 嘰 璣 磯 譏 積 勣 績 蹟 跡 齎 躋 齏 雞 羈 伋 汲 級 喫 吃 極 鶺 借 藉 輯 擊 劇 紀 蟣 濟 擠 記 計 騎 際 齊 劑 嚌 薺 霽 鱭 驥 係 系 繫 薊 覬 鯽 繼 夾 鎵 俠 浹 挾 郟 莢 蛺 鋏 頰 鉀 檟 駕 階 結 癤 詰 頡 鮚 擷 傑 杰 訐 節 櫛 潔 誡 屆 鮫 喬 嬌 驕 鷦 澆 膠 絞 較 鉸 餃 腳 勦 剿 僥 撟 矯 繳 嶠 轎 覺 糾 鳩 鬮 舊 鷲 奸 姦 鈃 戔 淺 箋 牋 縑 鶼 鰜 堅 鰹 間 閑 閒 緘 漸 監 艱 殲 韉 揀 譾 錢 減 筧 戩 儉 撿 檢 瞼 鹼 鶱 騫 襉 簡 繭 見 荐 薦 鍵 賤 踐 餞 濺 澗 鐧 艦 鑒 鑑 劍 諫 筋 觔 寖 浸 僅 謹 覲 饉 緊 儘 盡 錦 勁 晉 縉 進 燼 藎 贐 姜 薑 將 漿 螿 殭 僵 蔣 槳 獎 講 絳 強 彊 醬 鯨 涇 莖 經 荊 驚 剄 徑 逕 脛 痙 靚 淨 靜 鏡 競 葅 菹 車 駒 據 据 鋸 局 侷 齟 舉 櫸 巨 鉅 詎 颶 懼 屨 決 訣 絕 譎 鵑 鐫 卷 捲 睠 眷 絹 雋 鈞 軍 皸 浚 濬 駿 悽 淒 棲 栖 戚 慼 鏚 溪 谿 榿 緝 旂 旗 頎 蘄 騏 錡 衹 隻 祇 只 鰭 臍 蠐 啟 綺 訖 气 氣 棄 磧 鍥 愜 篋 竊 磽 墝 蹺 鍬 僑 橋 蕎 礄 譙 翹 鵲 誚 竅 丘 坵 鞦 秋 鶖 鰍 賕 虯 韆 千 慳 牽 謙 鉛 僉 簽 籤 遷 鋟 鈐 拑 箝 鉗 潛 繾 譴 蒨 茜 塹 槧 纖 縴 駸 欽 嶔 親 懃 勤 寢 撳 鏘 搶 嗆 瑲 槍 鎗 戧 蹌 錆 鏹 嬙 檣 薔 牆 繈 襁 熗 請 鯖 烴 氫 輕 頃 慶 詘 嶇 敺 驅 軀 趨 鴝 齲 闃 覷 闕 郤 卻 確 确 愨 搉 榷 闋 詮 輇 銓 踡 蜷 權 顴 綣 勸 煢 惸 窮 瓊 訢 欣 誒 嘻 譆 犧 攜 席 蓆 習 錫 覡 溼 濕 襲 洒 灑 鰓 璽 潟 瀉 細 餼 鬩 峽 狹 陜 陝 硤 轄 舝 廈 協 脅 頁 纈 諧 寫 洩 泄 絏 紲 屧 謝 褻 鴞 綃 銷 梟 蕭 簫 瀟 蠨 嘵 髐 囂 肴 餚 篠 筱 曉 傚 效 嘯 澩 鵂 修 脩 饈 繡 鏽 僊 仙 秈 姍 祅 祆 躚 銛 鮮 尟 弦 絃 咸 鹹 啣 銜 嫻 癇 鷳 賢 銑 蜆 嶮 獫 險 蘚 癬 獮 顯 峴 現 莧 餡 羨 線 憲 縣 獻 鋅 尋 釁 廂 緗 鄉 薌 鑲 驤 詳 餉 饟 鯗 響 饗 嚮 向 項 蠁 樣 興 騂 鉶 陘 滎 莕 荇 倖 幸 於 于 籲 吁 虛 噓 須 鬚 嘔 餘 余 詡 諝 卹 恤 勗 敘 頊 緒 續 學 鱈 喧 諠 萱 萲 軒 諼 鏇 旋 懸 選 衒 炫 鉉 絢 勛 熏 燻 詢 馴 潯 鱘 訊 訓 孫 遜 兇 凶 忷 恟 洶 秖 梔 織 執 蟄 縶 跖 蹠 質 職 擲 躑 阯 址 軹 紙 徵 征 緻 致 輊 銍 誌 志 制 製 置 寘 騭 滯 摯 贄 鷙 幟 識 躓 鑕 遲 觶 扎 紮 楂 樝 札 劄 閘 鍘 叉 扠 詐 鮓 笮 筰 搾 榨 柵 摺 折 慴 懾 輒 謫 轍 讋 鍺 這 鷓 著 齋 擇 寨 砦 責 債 釗 詔 櫂 棹 趙 輈 週 周 賙 譸 軸 冑 胄 紂 晝 皺 縐 占 佔 沾 霑 覘 譫 氈 鸇 鱣 斬 嶄 盞 颭 棧 綻 暫 戰 顫 診 貞 偵 湞 楨 禎 鍼 針 脣 唇 軫 縝 賑 陣 陳 鎮 張 長 漲 帳 脹 賬 鉦 爭 掙 崢 猙 睜 箏 諍 錚 癥 症 證 証 幀 鄭 硃 朱 誅 銖 諸 豬 瀦 櫧 櫫 薯 藷 術 朮 築 筑 燭 貯 屬 囑 矚 佇 苧 紵 注 註 駐 鑄 撾 諑 濁 鐲 錐 騅 縋 綴 墜 贅 顓 專 磚 轉 囀 傳 譔 撰 饌 纂 篹 賺 諄 准 準 純 妝 莊 裝 樁 壯 狀 終 鍾 鐘 冢 塚 腫 种 種 眾 鴟 馳 恥 齒 飭 熾 鍤 奼 詫 剎 硨 徹 釵 儕 冊 蠆 鈔 綢 讎 儔 疇 籌 躊 丑 醜 摻 攙 嬋 禪 蟬 纏 讒 鑱 饞 剗 產 剷 鏟 滻 諂 闡 囅 蕆 懺 沈 沉 諶 塵 磣 稱 齔 闖 櫬 襯 讖 閶 錩 鯧 倀 萇 嚐 嘗 償 場 腸 悵 暢 撐 赬 檉 蟶 誠 鋮 棖 傖 懲 騁 齣 出 芻 雛 儲 鋤 耡 廚 櫥 躕 處 礎 絀 觸 齪 輟 綽 搥 捶 鎚 錘 釧 鶉 蓴 囪 創 瘡 愴 衝 沖 寵 銃 屍 尸 鳲 蝨 虱 詩 師 獅 碩 蝕 時 塒 蒔 鰣 實 駛 鈰 視 貰 試 軾 弒 勢 飾 謚 諡 釋 紗 鯊 殺 鎩 畬 賒 捨 舍 設 葉 灄 篩 誰 燒 紹 綬 壽 獸 釤 刪 搧 扇 閃 訕 騸 繕 鱔 贍 紳 詵 参 參 諗 審 瀋 嬸 腎 滲 傷 殤 觴 賞 昇 升 陞 勝 胜 聲 繩 賸 剩 聖 紓 輸 書 樞 攄 贖 數 倏 儵 樹 豎 說 帥 爍 鑠 稅 閂 順 驦 雙 熱 嬈 蕘 蟯 饒 擾 遶 繞 紝 紉 軔 韌 認 飪 讓 銣 蠕 蝡 縟 蕊 橤 睿 叡 銳 軟 閏 潤 絨 羢 鎔 頌 榮 蠑 諮 咨 資 緇 輜 錙 鯔 茲 鎡 貲 齜 眥 漬 臢 咱 偺 雜 則 鰂 嘖 幘 簀 賾 賊 澤 庂 仄 側 災 載 糟 蹧 鑿 棗 繰 皂 皁 噪 譟 諏 鯫 鄒 謅 騶 驟 攢 趲 鏨 讚 贊 酇 瓚 譖 贓 臟 髒 駔 繒 贈 鏃 組 詛 躦 鑽 纘 鱒 從 縱 蹤 傯 總 瘲 呲 詞 餈 鶿 辭 廁 賜 測 惻 筴 纔 才 財 寀 采 採 綵 彩 騲 草 湊 輳 驂 殘 慚 蠶 慘 燦 倉 滄 蒼 艙 層 觕 粗 麤 錯 鹺 銼 縗 淬 焠 攛 躥 竄 蔥 聰 驄 樅 蓯 叢 緦 鍶 颸 廝 絲 鷥 螄 駟 飼 颯 薩 銫 嗇 穡 澀 賽 騷 繅 掃 搜 蒐 鎪 餿 颼 擻 藪 毿 傘 繖 糝 喪 顙 蘇 囌 甦 穌 泝 溯 訴 縮 肅 驌 鷫 謖 簑 蓑 嗩 瑣 鎖 綏 雖 隨 誶 歲 酸 痠 猻 蓀 筍 損 松 鬆 崧 嵩 慫 訟 誦 錒 醃 腌 訛 鋨 鵝 額 惡 噁 阨 厄 扼 搤 軛 諤 鍔 顎 鶚 齶 餓 堊 啞 鱷 閼 挨 捱 磑 皚 噯 藹 靄 愛 嬡 璦 曖 靉 礙 驁 鼇 鰲 殀 夭 媼 襖 奧 嶴 漚 歐 毆 甌 謳 鷗 銨 庵 菴 鵪 陰 諳 暗 闇 晻 鮞 鉺 餌 爾 邇 貳 銥 醫 毉 鷖 禕 迤 迆 詒 貽 飴 誼 頤 迻 移 儀 遺 釔 螘 蟻 艤 檥 軼 縊 鎰 鷁 藝 囈 異 義 議 億 憶 鐿 詣 懌 嶧 繹 譯 驛 瘞 鴉 鴨 亞 椏 枒 壓 氬 婭 錏 訝 禦 御 爺 野 埜 咽 嚥 謁 鄴 燁 曄 靨 饁 崖 厓 喲 殽 淆 堯 嶢 軺 搖 瑤 遙 謠 颻 鰩 窯 藥 葯 燿 耀 鑰 鷂 优 優 憂 尤 尢 魷 鈾 遊 游 郵 猶 蕕 銪 祐 佑 誘 閹 慇 殷 煙 菸 厭 懨 燕 讌 閻 閆 檐 簷 顏 嚴 鹽 揜 掩 兗 鼴 厴 魘 黶 儼 喭 諺 焰 燄 硯 雁 鴈 贗 饜 驗 讞 釅 豔 灩 裀 茵 銦 駰 銀 淫 婬 飲 隱 癮 廕 蔭 暈 憖 鴦 痒 癢 颺 揚 陽 煬 楊 暘 瘍 鍚 養 鶯 應 鷹 嬰 甖 罌 攖 嚶 瓔 櫻 纓 鸚 塋 熒 瑩 螢 縈 營 瀅 瀠 贏 蠅 潁 穎 癭 汙 誣 烏 嗚 鄔 鎢 鋙 吳 蕪 捂 摀 鵡 廡 憮 嘸 嫵 務 霧 騖 塢 誤 媧 膃 萵 窩 臥 齷 為 韋 幃 圍 違 闈 維 濰 諉 鮪 偉 煒 瑋 葦 緯 韙 偽 餵 喂 蝟 謂 衛 彎 灣 紈 頑 挽 輓 綰 溫 轀 鰮 紋 聞 閿 穩 問 網 网 輞 甕 瓮 罋 紆 與 諛 輿 璵 歟 踰 逾 覦 娛 魚 漁 俁 語 齬 嶼 傴 鈺 欲 慾 鵒 郁 鬱 愈 瘉 癒 諭 閾 馭 飫 鷸 預 澦 譽 獄 嫗 約 鉞 嶽 岳 悅 閱 粵 躍 鴛 鵷 淵 鳶 黿 園 轅 員 圓 隕 緣 櫞 遠 願 愿 氳 贇 雲 云 沄 澐 蕓 芸 紜 勻 鄖 篔 殞 韻 惲 鄆 運 鶤 慍 醞 韞 蘊 噰 嗈 雍 雝 癰 傭 佣 鏞 擁 顒 詠 涌 湧 踴 踊`
    .split(/\s+/)
    .map(text => ({ text }))

export const sets = {
  latin: {
    letters: {
      name: 'Letters',
      slug: 'letters',
      symbols: () =>
        `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z Æ Ɑ	Ꞵ	Ð	Ǝ	Ə	Ɛ	Ɣ	I	Ɩ	Ŋ	Œ	Ɔ	Ꞷ	Ʊ	ẞ	Ʃ	Þ	Ʋ	Ƿ	Ȝ	Ʒ	ʔ`
          .split(/\s+/)
          .map(text => ({ text })),
      links: {
        standard: {
          name: 'Standard Letters',
          slug: 'letters/standard',
          overview: () =>
            `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`
              .split(/\s+/)
              .map(text => ({ text })),
          symbols: () =>
            `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`
              .split(/\s+/)
              .map(x => `${x}${x.toLowerCase()}`)
              .map(text => ({ text })),
          links: {
            uppercase: {
              name: 'Standard Uppercase Letters',
              slug: 'letters/standard/uppercase',
              symbols: () =>
                `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`
                  .split(/\s+/)
                  .map(text => ({ text })),
            },
            lowercase: {
              name: 'Standard Lowercase Letters',
              slug: 'letters/standard/lowercase',
              symbols: () =>
                `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`
                  .split(/\s+/)
                  .map(x => x.toLowerCase())
                  .map(text => ({ text })),
            },
          },
        },
        modified: {
          name: 'Modified Letters',
          slug: 'letters/modified',
          symbols: () =>
            `Á À Ȧ Â Ä Ǟ Ǎ Ă Ā Ã Å Ǻ Ǽ Ǣ Ḅ Ć Ċ Ĉ Č Ď Ḍ Ḑ Ḓ É È Ė Ê Ë Ě Ĕ Ē Ẽ E̊ Ẹ Ǵ Ġ Ĝ Ǧ Ğ G̃ Ģ Ĥ Ḥ Í Ì İ Î Ï Ǐ Ĭ Ī Ĩ Ị Ĵ Ķ Ǩ Ĺ Ļ Ľ Ŀ Ḷ Ḽ M̂ M̄ ʼN Ń N̂ Ṅ N̈ Ň N̄ Ñ Ņ Ṋ Ó Ò Ȯ Ȱ Ô Ö Ȫ Ǒ Ŏ Ō Õ Ȭ Ő Ọ Ǿ Ơ P̄ Ŕ Ř Ŗ Ṛ Ś Ŝ Ṡ Š Ș Ṣ Ť Ț Ṭ Ṱ Ú Ù Û Ü Ǔ Ŭ Ū Ũ Ű Ů Ụ Ẃ Ẁ Ŵ Ẅ Ẋ Ý Ỳ Ŷ Ÿ Ȳ Ỹ Ź Ż Ž Ẓ Ǯ`
              .split(/\s+/)
              .map(x => `${x}${x.toLowerCase()}`)
              .map(text => ({ text })),
          links: {
            uppercase: {
              name: 'Uppercase Modified Letters',
              slug: 'letters/modified/uppercase',
              symbols: () =>
                `Á À Ȧ Â Ä Ǟ Ǎ Ă Ā Ã Å Ǻ Ǽ Ǣ Ḅ Ć Ċ Ĉ Č Ď Ḍ Ḑ Ḓ É È Ė Ê Ë Ě Ĕ Ē Ẽ E̊ Ẹ Ǵ Ġ Ĝ Ǧ Ğ G̃ Ģ Ĥ Ḥ Í Ì İ Î Ï Ǐ Ĭ Ī Ĩ Ị Ĵ Ķ Ǩ Ĺ Ļ Ľ Ŀ Ḷ Ḽ M̂ M̄ ʼN Ń N̂ Ṅ N̈ Ň N̄ Ñ Ņ Ṋ Ó Ò Ȯ Ȱ Ô Ö Ȫ Ǒ Ŏ Ō Õ Ȭ Ő Ọ Ǿ Ơ P̄ Ŕ Ř Ŗ Ṛ Ś Ŝ Ṡ Š Ș Ṣ Ť Ț Ṭ Ṱ Ú Ù Û Ü Ǔ Ŭ Ū Ũ Ű Ů Ụ Ẃ Ẁ Ŵ Ẅ Ẋ Ý Ỳ Ŷ Ÿ Ȳ Ỹ Ź Ż Ž Ẓ Ǯ`
                  .split(/\s+/)
                  .map(text => ({ text })),
            },
            lowercase: {
              name: 'Lowercase Modified Letters',
              slug: 'letters/modified/lowercase',
              symbols: () =>
                `Á À Ȧ Â Ä Ǟ Ǎ Ă Ā Ã Å Ǻ Ǽ Ǣ Ḅ Ć Ċ Ĉ Č Ď Ḍ Ḑ Ḓ É È Ė Ê Ë Ě Ĕ Ē Ẽ E̊ Ẹ Ǵ Ġ Ĝ Ǧ Ğ G̃ Ģ Ĥ Ḥ Í Ì İ Î Ï Ǐ Ĭ Ī Ĩ Ị Ĵ Ķ Ǩ Ĺ Ļ Ľ Ŀ Ḷ Ḽ M̂ M̄ ʼN Ń N̂ Ṅ N̈ Ň N̄ Ñ Ņ Ṋ Ó Ò Ȯ Ȱ Ô Ö Ȫ Ǒ Ŏ Ō Õ Ȭ Ő Ọ Ǿ Ơ P̄ Ŕ Ř Ŗ Ṛ Ś Ŝ Ṡ Š Ș Ṣ Ť Ț Ṭ Ṱ Ú Ù Û Ü Ǔ Ŭ Ū Ũ Ű Ů Ụ Ẃ Ẁ Ŵ Ẅ Ẋ Ý Ỳ Ŷ Ÿ Ȳ Ỹ Ź Ż Ž Ẓ Ǯ`
                  .split(/\s+/)
                  .map(x => x.toLowerCase())
                  .map(text => ({ text })),
            },
          },
        },
        consonants: {
          name: 'Consonants',
          slug: 'letters/consonants',
          symbols: () =>
            `B C D F G H J K L M N P Q R S T V W X Y Z`
              .split(/\s+/)
              .map(text => ({ text })),
          links: {
            flats: {
              name: 'Flat Consonants',
              slug: 'letters/consonants/flats',
              symbols: () =>
                `m n d b t k h s f v z x c w l r`
                  .split(/\s+/)
                  .map(text => ({ text })),
            },
          },
        },
        vowels: {
          name: 'Vowels',
          slug: 'letters/vowels',
          symbols: () =>
            `A E I O U`.split(/\s+/).map(text => ({ text })),
        },
      },
    },
    numbers: {
      name: 'Numbers',
      slug: 'numbers',
      symbols: () =>
        `0 1 2 3 4 5 6 7 8 9`.split(/\s+/).map(text => ({ text })),
    },
    punctuation: {
      name: 'Punctuation',
      slug: 'punctuation',
      symbols: () =>
        `! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~ \``
          .split(/\s+/)
          .map(text => ({ text })),
    },
    fractions: {
      name: 'Fractions',
      slug: 'fractions',
      symbols: () =>
        `⅐ ⅑ ⅒ ⅓ ⅔ ⅕ ⅖ ⅗ ⅘ ⅙ ⅚ ⅛ ⅜ ⅝ ⅞ ⅟ ↉`
          .split(/\s+/)
          .map(text => ({ text })),
    },
    'roman-numerals': {
      name: 'Roman Numerals',
      slug: 'roman-numerals',
      symbols: () =>
        `Ⅰ Ⅱ Ⅲ Ⅳ Ⅴ Ⅵ Ⅶ Ⅷ Ⅸ Ⅹ Ⅺ Ⅻ Ⅼ Ⅽ Ⅾ Ⅿ ↀ ↁ ↂ Ↄ ↅ ↆ`
          .split(/\s+/)
          .map((text, i) => ({
            text,
            hint: ROMAN_NUMERALS[i]?.toLocaleString(),
          })),
      links: {
        lowercase: {
          name: 'Lowercase Roman Numerals',
          slug: 'roman-numerals/lowercase',
          symbols: () =>
            `ⅰ ⅱ ⅲ ⅳ ⅴ ⅵ ⅶ ⅷ ⅸ ⅹ ⅺ ⅻ ⅼ ⅽ ⅾ ⅿ`
              .split(/\s+/)
              .map((text, i) => ({
                text,
                hint: ROMAN_NUMERALS[i]?.toLocaleString(),
              })),
        },
      },
    },
    subscripts: {
      name: 'Subscripts',
      slug: 'subscripts',
      symbols: () =>
        `₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₌ ₍ ₎ ₐ ₑ ₒ ₓ ₔ ₕ ₖ ₗ ₘ ₙ ₚ ₛ ₜ`
          .split(/\s+/)
          .map(text => ({ text: `x${text}` })),
    },
    superscripts: {
      name: 'Superscripts',
      slug: 'superscripts',
      symbols: () =>
        `⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁺ ⁻ ⁼ ⁽ ⁾ ⁿ ⁱ`
          .split(/\s+/)
          .map(text => ({ text: `x${text}` })),
    },
    diacritics: {
      name: 'Diacritics',
      slug: 'diacritics',
      symbols: () =>
        `\u0300 \u0301 \u0302 \u0303 \u0304 \u0305 \u0306 \u0307 \u0308 \u0309 \u030A \u030B \u030C \u030D \u030E \u030F \u0310 \u0311 \u0312 \u0313 \u0314 \u0315 \u0316 \u0317 \u0318 \u0319 \u031A \u031B \u031C \u031D \u031E \u031F \u0320 \u0321 \u0322 \u0323 \u0324 \u0325 \u0326 \u0327 \u0328 \u0329 \u032A \u032B \u032C \u032D \u032E \u032F \u0330 \u0331 \u0332 \u0333 \u0334 \u0335 \u0336 \u0337 \u0338 \u0339 \u033A \u033B \u033C \u033D \u033E \u033F \u0340 \u0341 \u0342 \u0343 \u0344 \u0345 \u0346 \u0347 \u0348 \u0349 \u034A \u034B \u034C \u034D \u034E \u034F \u0350 \u0351 \u0352 \u0353 \u0354 \u0355 \u0356 \u0357 \u0358 \u0359 \u035A \u035B \u035C \u035D \u035E \u035F \u0360 \u0361 \u0362 \u0363 \u0364 \u0365 \u0366 \u0367 \u0368 \u0369 \u036A \u036B \u036C \u036D \u036E \u036F`
          .split(/\s+/)
          .map(text => ({ text: `\u25cc${text}` })),
    },
  },
  tibetan: {
    consonants: {
      name: 'Consonants',
      slug: 'consonants',
      symbols: () =>
        `ཀ ཁ ག ང ཅ ཆ ཇ ཉ ཏ ཐ ད ན པ ཕ བ མ ཙ ཚ ཛ ཝ ཞ ཟ འ ཡ ར ལ ཤ ས ཧ`
          .split(/\s+/)
          .map(text => ({ text, hint: talk(tibetan(text)) })),
    },
    numbers: {
      name: 'Numbers',
      slug: 'numbers',
      symbols: () =>
        `༠	༡	༢	༣	༤	༥	༦	༧	༨	༩`
          .split(/\s+/)
          .map((text, i) => ({ text, hint: String(i) })),
    },
    punctuation: {
      name: 'Punctuation',
      slug: 'punctuation',
      symbols: () =>
        `༄ ༅ ༃ ༁ ༆ ༉ ་ ། ༎ ༑ ༏ ༐ ༈ ༔ ༒ ༸ ༴ ༓ ༼ ༽ ༺ ༻`
          .split(/\s+/)
          .map(text => ({ text })),
    },
    fractions: {
      name: 'Fractions',
      slug: 'fractions',
      symbols: () =>
        `༳ ༪ ༫ ༬ ༭ ༮ ༯ ༰ ༱ ༲`.split(/\s+/).map((text, i) => ({
          text,
          hint: TIBETAN_FRACTIONS[i].toString(),
        })),
    },
  },
  devanagari: {
    vowels: {
      name: 'Vowels',
      slug: 'vowels',
      symbols: () =>
        DEVANAGARI_VOWELS.map(text => ({
          text,
          slug: text,
          hint: talk(devanagari(text)),
        })),
      links: {
        diacritics: {
          name: 'Vowel diacritics',
          slug: 'vowels/diacritics',
          symbols: () =>
            DEVANAGARI_VOWEL_DIACRITICS.map(text => ({
              text,
              slug: point(text),
            })),
        },
      },
    },
    consonants: {
      name: 'Consonants',
      slug: 'consonants',
      symbols: () =>
        DEVANAGARI_CONSONANTS.map(text => ({
          text,
          slug: text,
          hint: talk(devanagari(text)),
        })),
      links: {
        extensions: {
          name: 'Consonant Extensions',
          slug: 'consonants/extensions',
          symbols: () =>
            `\u0933 \u0915 \u0924 \u091C \u0936 \u0915 \u0916 \u0917 \u091C \u092B \u0921 \u0922`
              .split(/\s+/)
              .map(text => ({
                text,
                slug: text,
                hint: talk(devanagari(text)),
              })),
        },
      },
    },
    numbers: {
      name: 'Numbers',
      slug: 'numbers',
      symbols: () =>
        `० १ २ ३ ४ ५ ६ ७ ८ ९`
          .split(/\s+/)
          .map((text, i) => ({ text, slug: text, hint: String(i) })),
    },
  },
  chinese: {
    // symbols
    characters: {
      name: 'Characters',
      slug: 'characters',
      symbols: () =>
        `鱼 鸟 牛 鹰 蟹 羊 鹅 象 鹿 蛤 壳 票 街 路 桥 镇 店 海 河 山 雨 雪 树 风`
          .split(/\s+/)
          .map(text => ({ text })),
    },

    radicals: {
      name: 'Radicals',
      slug: 'characters/radicals',
      overview: () => CHINESE_RADICALS.slice(0, 24),
      symbols: () => CHINESE_RADICALS,
    },
    symmetric: {
      name: 'Symmetric Characters',
      slug: 'characters/symmetric',
      overview: () =>
        `亘 亚 亜 亞 人 仐 仝 伞 全 共 关 其 具 典 兽 冒 凷 凸 凹 出 击 十 半`
          .split(/\s+/)
          .map(text => ({ text })),
      symbols: () =>
        `〇 一 三 丗 且 业 个 中 丰 串 二 亖 亘 亚 亜 亞 人 仐 仝 伞 全 共 关 其 具 典 兽 冒 凷 凸 凹 出 击 十 半 卋 单 叠 口 古 只 合 吉 吕 吴 呆 呈 品 啚 善 喆 喜 喦 單 喿 嘦 嘼 噐 噩 嚻 囂 囍 回 囯 固 圉 圚 土 圭 垩 基 堂 堇 墓 士 壶 壹 大 夫 央 奰 㝙 㝞 㝠 尘 㞢 㞷 山 㞤 岀 㞬 㞭 㞱 㞵 峀 㞿 峇 崮 㟦 㠑 工 干 平 幸 廿 支 斐 日 旦 早 旱 旲 旵 旹 旻 昊 昋 昌 昔 昚 昱 昷 显 晋 㫩 㫫 晝 曽 普 晶 暃 㫷 暈 㬥 曡 曲 曺 曹 曼 曾 替 木 未 末 本 杏 束 来 杳 果 某 查 柬 栗 棠 森 㮂 榃 㯥 㯱 㰆 王 甘 田 由 甲 申 甴 画 畐 畢 畣 異 㽞 畳 當 畺 畱 畾 㽬 疊 畠 皋 皐 皛 皨 皿 㿻 盅 益 盒 盖 盫 目 睪 瞐 瞢 䁷 矗 䅇 米 类 粜 粟 粪 罜 罝 罟 罣 罪 罬 置 罯 罾 罿 羀 羊 美 耒 舍 舎 艾 芈 芙 苗 苜 苦 苯 英 苴 苷 苹 苿 茁 茉 茭 荃 草 荣 莒 莔 莫 莱 菐 菲 萁 营 萺 蔓 蔷 蕈 蕾 蘁 覃 訔 詈 誊 諅 謇 謈 譶 譻 谷 豆 豊 豐 責 貴 買 賁 賚 賛 賞 賣 賫 贔 車 辜 里 量 金 鑫 雯 雷 霏 霖 非 革 韭 首 黄 堊 圖 菩 茵 奭 蓉 父 釜 因`
          .split(/\s+/)
          .sort()
          .map(text => ({ text })),
    },
    simplified: {
      name: 'Simplified Characters',
      slug: 'characters/simplified',
      overview: () => CHINESE_SIMPLIFIED.slice(0, 24),
      symbols: () => CHINESE_SIMPLIFIED,
    },
    traditional: {
      name: 'Traditional Characters',
      slug: 'characters/traditional',
      overview: () => CHINESE_TRADITIONAL.slice(0, 24),
      symbols: () => CHINESE_TRADITIONAL,
    },
  },
}

function loadChineseRadicals() {
  let i = parseInt('2F00', 16)
  let n = parseInt('2FD5', 16)
  const symbols: Array<{ text: string }> = []
  while (i <= n) {
    symbols.push({ text: String.fromCodePoint(i++) })
  }
  return symbols
}

export const symbols = {
  devanagari: {},
}

DEVANAGARI_VOWELS.forEach(text => {
  symbols.devanagari[point(text)] = {
    name: text,
    slug: point(text),
  }
})

DEVANAGARI_CONSONANTS.forEach(text => {
  symbols.devanagari[point(text)] = {
    name: text,
    slug: point(text),
    links: {
      combinations: {
        name: `Combinations`,
        slug: `${point(text)}/combinations`,
        symbols: () =>
          DEVANAGARI_VOWEL_DIACRITICS.map(x => ({
            text: `${text}${x}`,
            hint: talk(devanagari(`${text}${x}`)),
          })),
      },
    },
  }
})

DEVANAGARI_VOWEL_DIACRITICS.forEach(text => {
  symbols.devanagari[point(text)] = {
    name: text,
    slug: point(text),
    links: {
      combinations: {
        name: `Combinations`,
        slug: `${point(text)}/combinations`,
        symbols: () =>
          DEVANAGARI_CONSONANTS.map(x => ({
            text: `${x}${text}`,
            hint: talk(devanagari(`${x}${text}`)),
          })),
      },
    },
  }
})

export function point(text: string) {
  return `U+${text
    .codePointAt(0)
    ?.toString(16)
    .toUpperCase()
    .padStart(4, '0')}`
}
