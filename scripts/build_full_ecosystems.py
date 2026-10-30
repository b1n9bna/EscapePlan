# -*- coding: utf-8 -*-
"""
Master Ecosystem Builder for EscapePlan.
Integrates Part 1, Part 2, Part 3, Part 4 and creates bespoke multi-ecosystems
for all 34 provinces, guaranteeing that EVERY province has multiple diverse,
authentic birthplaces and scenarios.
"""

import json
import re

from data_part1 import ECOSYSTEMS_PART1
from data_part2 import ECOSYSTEMS_PART2
from data_part3 import ECOSYSTEMS_PART3
from data_part4 import ECOSYSTEMS_PART4
from data_part5 import ECOSYSTEMS_PART5

# Combine all explicit bespoke multi-ecosystems
ALL_CUSTOM_ECOSYSTEMS = []
ALL_CUSTOM_ECOSYSTEMS.extend(ECOSYSTEMS_PART1)
ALL_CUSTOM_ECOSYSTEMS.extend(ECOSYSTEMS_PART2)
ALL_CUSTOM_ECOSYSTEMS.extend(ECOSYSTEMS_PART3)
ALL_CUSTOM_ECOSYSTEMS.extend(ECOSYSTEMS_PART4)
ALL_CUSTOM_ECOSYSTEMS.extend(ECOSYSTEMS_PART5)

print(f"Loaded {len(ALL_CUSTOM_ECOSYSTEMS)} core custom ecosystems.")

# Define additional variants for remaining provinces
REMAINING_VARIANTS = [
    # -------------------------------------------------------------------------
    # 15. 河北省 (4)
    # -------------------------------------------------------------------------
    {
        "id": "hebei_tangshan",
        "province": "河北省",
        "subRegionName": "唐山路北钢铁机车老抗震平房院",
        "provinceGroup": "华北",
        "region": "河北省 · 唐山路北钢铁机车老抗震平房院",
        "landscape": "开滦百年煤矿铁道 · 震后红砖平房院 · 高炉热风与大机车轰鸣",
        "tagline": "英雄唐山抗震重生，百里钢城铁道交织，钢铁与煤火淬炼出的硬骨脊梁",
        "icon": "🏗️",
        "hospitalName": "华北理工大学附属医院（唐山市工人医院）产科",
        "primarySchoolName": "唐山市路北区西山路小学",
        "highSchoolName": "唐山市第一中学",
        "cityOrCounty": "唐山市路北区钢铁机车生活区",
        "birthScene": "初冬正午，渤海湾的寒风掠过唐山平原，开滦煤矿的运煤列车轰鸣着穿过铁道桥，钢铁厂高炉在苍穹下喷吐着翻滚的热浪。你降生在唐山市工人医院二楼产房。你的嘹亮啼哭穿过走廊。产房外，父亲作为中车唐山机车车辆厂的高铁动车铝合金车体焊接高级技工，穿着厚实的带焊斑帆布工装飞奔上楼，额头满是汗水，激动地给工友们递上刚买的唐山麻糖和香烟；母亲也是齿轮分厂的工艺员。爷爷坐在震后加固的老平房小院里，看着墙上的老日历，喃喃道“大难不死，后辈绵延”。你降生在这座从瓦砾中傲然崛起的英雄铁城。",
        "parents": [
            {
                "fatherJob": "中车唐山机车车辆公司时速350公里高铁车体首席焊师",
                "fatherAge": 33,
                "fatherTrait": "国际焊接工程师资质，精通高速动车组薄板铝合金自动焊，性格如铁般刚直",
                "motherJob": "唐钢集团热轧薄板厂质量监控主任工程师",
                "motherAge": 30,
                "motherTrait": "对钢材表面冷轧缺陷洞若观火，做事干练有条理，对你的学业规矩极其严格",
                "housing": "路北区建设北路高品质住宅三居室（暖气充沛，带独立地下车位）",
                "wealthIndex": 3
            },
            {
                "fatherJob": "唐山开滦煤矿井下大型皮带机维修电工",
                "fatherAge": 31,
                "fatherTrait": "技术娴熟在深井坚守十余年，性格豪迈直率，极爱与工友就着花生米喝唐山老白干",
                "motherJob": "机车大院第二幼儿园骨干幼儿教师",
                "motherAge": 28,
                "motherTrait": "待人温和热情，在矿工家属大院极富人缘，精通各种北方家常面食点心",
                "housing": "路北区七十年代末震后砖混加固平房独门独院（暖气滚烫，小院整洁）",
                "wealthIndex": 2
            },
            {
                "fatherJob": "小型轧钢作坊连铸下料重体力工",
                "fatherAge": 29,
                "fatherTrait": "在钢花飞溅中挥铁钳作业，身上落有多处烫痕，默默扛起全家生计",
                "motherJob": "在建工大院后街摆摊炸饹馇与肉馅烧饼",
                "motherAge": 26,
                "motherTrait": "起早贪黑在炉子前忙碌，面容朴素，用每一分微薄铜板给你买好奶粉",
                "housing": "老工矿区边缘砖瓦棚房（空间有限，冬天靠生大蜂窝煤炉取暖）",
                "wealthIndex": 0
            }
        ]
    },
    {
        "id": "hebei_hengshui",
        "province": "河北省",
        "subRegionName": "衡水桃城全国顶级题海衡中大院",
        "provinceGroup": "华北",
        "region": "河北省 · 衡水桃城全国顶级题海衡中大院",
        "landscape": "衡水中学跑操方阵 · 满墙高考喜报红榜 · 题海狂卷分秒必争",
        "tagline": "超级应试战车衡水模式，分秒必争狼性拼搏，在千万张模拟考卷里铺就阶层跃迁血路",
        "icon": "📚",
        "hospitalName": "衡水市人民医院妇产科",
        "primarySchoolName": "衡水市桃城区康复街完全小学",
        "highSchoolName": "河北衡水中学",
        "cityOrCounty": "衡水市桃城区英才路衡中教育核心圈",
        "birthScene": "初冬清晨六点整，衡水中学操场上传来上万学子震动天地的跑操口号声与整齐踏步声，迎风飘扬的百日誓师巨幅红旗在晨光下泛着烈焰般的红光。你降生在衡水市人民医院产房。你的第一声啼哭与窗外整齐如雷的背诵声汇聚。产房外，父亲作为衡水中学高三年级部的高级物理奥赛教练，手里拿着刚刚编印出炉的百校联考全套试卷，推了推厚厚的眼镜片，快步走入病房；母亲也是衡水中学的骨干英语教师，微笑着看你。书架上已经整齐摞放着从幼升小到高考全套知识图谱。你降生在全中国应试教育强度最高、做题家精神发挥到极致的风暴眼中。",
        "parents": [
            {
                "fatherJob": "衡水知名教育集团副总裁兼高考命题研究所所长",
                "fatherAge": 34,
                "fatherTrait": "深谙高考全国卷命题深层逻辑，著作等身，行事极讲究闭环效率与纪律",
                "motherJob": "衡水中学实验学校高中部清北特优班班主任",
                "motherAge": 31,
                "motherTrait": "带出数十名清华北大学子，作风雷厉风行，为你量身定制了精密的高考路线",
                "housing": "英才路名校教育苑大平层住宅（暖气充足，满室皆是参考资料与教学成果奖）",
                "wealthIndex": 4
            },
            {
                "fatherJob": "衡水中学教务印刷厂高速卷印机主任工程师",
                "fatherAge": 31,
                "fatherTrait": "掌管全校每日数万份试卷油墨印刷分发，恪尽职守不差毫厘，性格稳重少言",
                "motherJob": "市教育局直属幼儿园骨干教师",
                "motherAge": 28,
                "motherTrait": "对幼童心理发展深有造诣，温柔细致，精心陪伴你度过童年每一步",
                "housing": "桃城区教师新村三居室（环境清幽整洁，邻里皆是名校名师家庭）",
                "wealthIndex": 3
            },
            {
                "fatherJob": "衡中校园周边民办陪读公寓水暖门窗日常维护修理工",
                "fatherAge": 29,
                "fatherTrait": "终日穿梭在成千上万陪读家长租房中修门修电，感佩读书改变命运的伟大",
                "motherJob": "在校门口陪读小吃街开早点铺打烧饼",
                "motherAge": 26,
                "motherTrait": "天不亮就起床揉面烤烧饼，双手粗糙，深信读书是孩子唯一出路",
                "housing": "陪读公寓半地下室一居室（室内整洁无杂物，墙面贴满识字卡片）",
                "wealthIndex": 1
            }
        ]
    },
    {
        "id": "hebei_baoding",
        "province": "河北省",
        "subRegionName": "保定白沟箱包皮具小作坊聚落",
        "provinceGroup": "华北",
        "region": "河北省 · 保定白沟箱包皮具小作坊聚落",
        "landscape": "白沟箱包交易大厅 · 嗒嗒缝纫机声昼夜不绝 · 人造革皮料香",
        "tagline": "中国箱包之都，前店后厂数万家家庭小作坊，在缝纫机飞转与电商发货中奔忙致富",
        "icon": "👜",
        "hospitalName": "白沟新城中心医院妇产科",
        "primarySchoolName": "白沟新城第一完全小学",
        "highSchoolName": "保定市第一中学",
        "cityOrCounty": "保定白沟新城箱包专业镇商贸街坊",
        "birthScene": "初夏正午，白沟国际箱包城门前来自全国各地的大货车川流不息，家家户户沿街小作坊里传来工业平缝机飞速运转的嗒嗒声，空气中弥漫着胶水与新皮革的气息。你出生在白沟中心医院产房。你的啼哭伴着窗外撕扯封箱胶带的脆响。产房外，父亲刚与外贸电商客商谈妥了一笔十万只双肩背包的采购订单，连工装都没顾上换就冲进医院，从皮包里掏出大把钞票向护士道喜；母亲是家族制包作坊的打样裁版师，靠在床头幸福地抚摸你的小脑袋。你降生在中国最活跃密集的轻工小商品制造与商贸集镇。",
        "parents": [
            {
                "fatherJob": "白沟自主时尚箱包品牌制造集团董事长",
                "fatherAge": 34,
                "fatherTrait": "拥有自主研发设计中心与跨国独立站电商，身家千万富有敏锐商业洞察",
                "motherJob": "家族国际供应链仓储财务总监",
                "motherAge": 30,
                "motherTrait": "精通资金流转与大宗皮料采购核算，为人周全干练，极重孩子精英教育",
                "housing": "白沟高品质独栋欧式自建小别墅（带宽阔院落与独立展厅，停两台路虎）",
                "wealthIndex": 4
            },
            {
                "fatherJob": "前店后厂箱包拉链与五金压铸模具师傅",
                "fatherAge": 31,
                "fatherTrait": "熟稔模具翻砂与冲压工艺，做事踏实肯钻研，手脚麻利在镇上口碑极佳",
                "motherJob": "箱包城门市档口接单打样经理",
                "motherAge": 28,
                "motherTrait": "一口地道保定普通话，待客热情麻利，精打细算把全家生活经营得井井有条",
                "housing": "四层商住一体楼（一二层仓储作坊，三四层自住，室内装修整洁温馨）",
                "wealthIndex": 3
            },
            {
                "fatherJob": "箱包小作坊两班倒下料裁皮重体力小工",
                "fatherAge": 29,
                "fatherTrait": "在冲床前重复推按裁刀，双手布满老茧划痕，一心盼望攒足本钱开个小档口",
                "motherJob": "在出租屋打平缝机车双肩包拉链计件工",
                "motherAge": 26,
                "motherTrait": "每天踩缝纫机十二小时，腰酸背痛但毫无怨言，用全部母爱守护你成长",
                "housing": "作坊后巷租住简易平房一间（空间窄小堆放皮料边角料，生活朴素）",
                "wealthIndex": 1
            }
        ]
    },

    # -------------------------------------------------------------------------
    # 16. 安徽省 (4)
    # -------------------------------------------------------------------------
    {
        "id": "anhui_bozhou",
        "province": "安徽省",
        "subRegionName": "皖北亳州药都中药材大集",
        "provinceGroup": "华东",
        "region": "安徽省 · 皖北亳州平原药材大集与面食粮仓",
        "landscape": "华佗故里药市如海 · 万顷芍药花海 · 连绵平原麦浪与板面香",
        "tagline": "华夏第一药都，千家药企万种草本，皖北平原麦浪与浓郁药香交织的厚道与精明",
        "icon": "🌿",
        "hospitalName": "亳州市人民医院（华佗中医院）产科",
        "primarySchoolName": "亳州市谯城区完全第一小学",
        "highSchoolName": "亳州市第一中学",
        "cityOrCounty": "亳州市谯城区中药材专业市场街坊",
        "birthScene": "初夏清晨，亳州中华药都交易中心门前车水马龙，成千上万的中药材麻袋散发出浓烈深沉的当归、黄芪与白芍清香，城郊万亩芍药花海如粉红云锦盛放。你降生在华佗中医院充满草药清香的产房里。你的第一声嘹亮哭声引得窗外的雀鸟欢啼。产房外，父亲作为药材大市场的资深药材经纪人，穿着中式对襟衫，大步跑上楼梯，手里端着刚在巷口买的大碗鲜热牛肉板面与煮鸡蛋；母亲喝着老中医精心调制的益母红糖当归生姜汤，眼里满是慈爱。祖父在药神华佗像前点燃长明灯祈福。你降生在全中国中药材贸易吞吐最宏大的草本之乡。",
        "parents": [
            {
                "fatherJob": "国家级中药饮片GMP认证现代化制药企业董事长",
                "fatherAge": 34,
                "fatherTrait": "熟稔全国道地药材产销行情，精于中药提取纯化工艺，为人儒雅慷慨有大略",
                "motherJob": "亳州职业技术学院中药鉴定学教研室副教授",
                "motherAge": 31,
                "motherTrait": "眼光毒辣对千种草药性状真伪洞若观火，知书达礼，深谙中国传统养生国学",
                "housing": "谯城区高品质中式庭院洋房（三面环花，自带百草小花园，书香浓郁）",
                "wealthIndex": 4
            },
            {
                "fatherJob": "中药材大市场道地白芍与菊花批发商行老板",
                "fatherAge": 32,
                "fatherTrait": "在药市摸爬滚打十余年，看货成色一抓便知，诚信经营在行业内颇有口碑",
                "motherJob": "药材初加工车间切片与烘干工艺主管",
                "motherAge": 29,
                "motherTrait": "手脚麻利算账分明，为人随和热情，操持家务烧得一手正宗皖北家常好菜",
                "housing": "药市周边自建三层半红砖贴瓷楼房（一楼储药库，二三楼自住，整洁宽敞）",
                "wealthIndex": 3
            },
            {
                "fatherJob": "药材大市场夜班装卸扛麻袋重体力小工",
                "fatherAge": 29,
                "fatherTrait": "每天肩扛上百斤中药麻袋装车，浑身药香与汗渍，为了孩子上学拼尽全力",
                "motherJob": "在药材切片厂手工挑选剔除杂草残次药渣散工",
                "motherAge": 26,
                "motherTrait": "双手被药汁染得微黄，双眼因精细挑选微有干涩，但抱着你时满脸幸福笑容",
                "housing": "药材市场后巷租住简易砖平房单间（室内空间不大，但干爽整洁充满药香）",
                "wealthIndex": 1
            }
        ]
    },
    {
        "id": "anhui_huainan",
        "province": "安徽省",
        "subRegionName": "淮南田家庵采煤沉陷工矿家属院",
        "provinceGroup": "华东",
        "region": "安徽省 · 淮南田家庵采煤沉陷区工矿家属院",
        "landscape": "淮河两岸重载煤运专列 · 沉陷水塘芦苇荡 · 淮南牛肉汤热辣",
        "tagline": "华东能源之都八公山下，豆腐故里与百里煤海，淮河水边老矿工家庭的质朴与豪爽",
        "icon": "🍲",
        "hospitalName": "淮南矿业集团职业病防治院产科",
        "primarySchoolName": "田家庵区完全第一小学",
        "highSchoolName": "淮南第二中学",
        "cityOrCounty": "淮南市田家庵区老煤矿采煤生活区",
        "birthScene": "初冬拂晓，淮河大堤两岸晨雾弥漫，运煤专线铁轨上满载黑色无烟煤的列车哐当驶过，田家庵老街上淮南牛肉汤的大铁锅升腾起乳白鲜热的热气与扑鼻牛油辣椒香。你降生在矿业集团医院产科病房里。你的啼哭伴着老选煤厂风机的低沉呼啸。产房外，父亲作为谢桥煤矿综采队主检修电工，刚刚升井洗完澡，头发还湿漉漉的，身上散发着矿工特有的硫磺与香皂气息，快步跑进病房，小心翼翼捧出用保温桶装好的滚烫淮南牛肉汤与刚出炉的油酥烧饼；母亲靠在床头，眼里带着喜悦。窗外八公山巍然矗立，你降生在这片能源奔涌、烟火醇厚的淮河名城。",
        "parents": [
            {
                "fatherJob": "淮南矿业集团安全监察局通风瓦斯防突专家",
                "fatherAge": 33,
                "fatherTrait": "中国矿业大学安全工程硕士，多次亲临千米井下排查瓦斯隐患，沉着坚毅",
                "motherJob": "淮南市第二中学高级物理教师",
                "motherAge": 30,
                "motherTrait": "带出多届高考理综高分考生，思维严密作风干练，对你的科学思维启蒙极早",
                "housing": "舜耕山风景区旁高品质住宅三室两厅（环境清幽通透，暖气充裕）",
                "wealthIndex": 3
            },
            {
                "fatherJob": "矿井掘进机主司机兼班组技术骨干",
                "fatherAge": 31,
                "fatherTrait": "操纵数百吨重型掘进机破岩如削竹，技术精湛性格耿直，极爱喝淮河老窖老酒",
                "motherJob": "矿工家属区老字号豆腐坊传人",
                "motherAge": 28,
                "motherTrait": "磨得一手清甜滑嫩的八公山传统嫩豆腐，待人热忱和蔼，邻里口碑极好",
                "housing": "田家庵煤矿七十年代红砖四层多层福利房（暖气充足，大院充满熟人温情）",
                "wealthIndex": 2
            },
            {
                "fatherJob": "老采煤沉陷水塘捕捞野生小杂鱼散工",
                "fatherAge": 29,
                "fatherTrait": "在芦苇荡与沉陷水塘划塑料筏起网，风餐露宿，虽收入微薄但性格坚韧如竹",
                "motherJob": "在牛肉汤馆后厨洗碗兼切牛肉小工",
                "motherAge": 26,
                "motherTrait": "双手被洗涤剂泡得粗糙发白，省吃俭用，把店里最好的牛肉骨头汤留给你喝",
                "housing": "沉陷区边缘砖瓦棚户房（地基稍有沉降裂缝，室内朴素整洁）",
                "wealthIndex": 0
            }
        ]
    },
    {
        "id": "anhui_shexian",
        "province": "安徽省",
        "subRegionName": "皖南歙县黄山徽州马头墙古村",
        "provinceGroup": "华东",
        "region": "安徽省 · 皖南歙县徽州马头墙古村落",
        "landscape": "新安江水碧如玉 · 白墙黑瓦马头墙 · 徽墨宣纸与天井晨光",
        "tagline": "一生痴绝处无梦到徽州，天井古宅粉墙黛瓦，徽墨歙砚与新安江水涵养的文人风骨",
        "icon": "🏮",
        "hospitalName": "歙县人民医院妇产科",
        "primarySchoolName": "歙县行知完全小学",
        "highSchoolName": "安徽省歙县中学",
        "cityOrCounty": "黄山市歙县新安江畔传统徽州古村落",
        "birthScene": "初春细雨蒙蒙，新安江江水碧绿如玉，沿江两岸古徽州村落的粉墙黑瓦马头墙在水墨烟雨中若隐若现，老宅天井里落下一串清脆雨滴。你出生在歙县人民医院产房。你的温润啼哭伴着小巷深处砚雕作坊里的凿石声。产房外，外公穿着老式青布中式长衫，手里小心捧着一块雕刻有‘连中三元’纹样的老坑歙砚襁褓礼；父亲在老徽墨厂潜心从事传统松烟墨制作，满手带着墨香与麝香清气，快步跑进病房抱起你；母亲倚在古木雕花床头，喝着红枣莲子羹。天井下的古树生机盎然，你降生在这片程朱理学源远流长、文脉昌盛的徽商古里深处。",
        "parents": [
            {
                "fatherJob": "国家级非遗徽墨制作技艺代表性传承大师",
                "fatherAge": 34,
                "fatherTrait": "熟稔古法松烟金箔炼墨秘诀，墨锭落纸如漆万年不腐，儒雅淡泊受国际名家赞誉",
                "motherJob": "中国徽州文化博物馆古籍特藏部主任",
                "motherAge": 31,
                "motherTrait": "深谙徽派古籍善本修复与宗族谱牒学，端庄贤淑，从小陶冶你的传统文人审美",
                "housing": "古徽州明代进士第古宅整修套院（三进三出，砖雕木雕精美绝伦，带私家水榭）",
                "wealthIndex": 4
            },
            {
                "fatherJob": "歙砚名坑石料开采雕刻高级工艺美术师",
                "fatherAge": 32,
                "fatherTrait": "一把钢刀在青灰砚石上巧借天然金晕作画，性格沉静如石，专注手艺传承",
                "motherJob": "歙县老字号毛豆腐与臭鳜鱼传统作坊掌柜",
                "motherAge": 29,
                "motherTrait": "煎得一手焦黄喷香的古法毛豆腐，手脚麻利算账分明，把四方宾客招待得妥妥当当",
                "housing": "新安江畔传统清代两层木石老宅（天井采光充足，推开木窗即见青山碧水）",
                "wealthIndex": 3
            },
            {
                "fatherJob": "新安江竹筏人工摆渡与打捞水草散工",
                "fatherAge": 29,
                "fatherTrait": "在风雨江流中手持竹篙撑船，水性精湛，虽生活清贫但恪守祖训为人极老实",
                "motherJob": "在茶叶工坊替人手工挑剔茶梗毛尖计件工",
                "motherAge": 26,
                "motherTrait": "一坐一整天挑拣嫩芽，眼力虽耗但毫无怨言，用全部的心血把你呵护在暖被中",
                "housing": "古村外围依山搭建的砖石小平房两间（陈设朴素，但柴门常带新安茶香）",
                "wealthIndex": 1
            }
        ]
    },

    # -------------------------------------------------------------------------
    # 17. 福建省 (4)
    # -------------------------------------------------------------------------
    {
        "id": "fujian_jinjiang",
        "province": "福建省",
        "subRegionName": "晋江石狮运动鞋服民营大作坊",
        "provinceGroup": "华东",
        "region": "福建省 · 晋江石狮运动鞋服民营代工大作坊",
        "landscape": "鞋服工业流水线 · 闽南红砖燕尾脊古厝 · 妈祖香火与爱拼才会赢",
        "tagline": "中国鞋都天下晋江，爱拼才会赢敢为天下先，红砖大厝妈祖香火里崛起的国货霸主",
        "icon": "👟",
        "hospitalName": "晋江市中医院妇产科",
        "primarySchoolName": "晋江市实验完全小学",
        "highSchoolName": "晋江市第一中学",
        "cityOrCounty": "晋江市青阳街道运动鞋服工业商圈",
        "birthScene": "初秋盛夏，闽南骄阳似火，晋江陈埭数千家鞋服机械厂的流水线二十四小时运转不息，空气中弥漫着热压EVA鞋底的橡胶焦香。你出生在晋江市中医院特需病房里。你的第一声嘹亮哭声伴着窗外飘来的闽南语名曲《爱拼才会赢》。产房外，穿短裤人字拖的父亲刚刚与海外采购客商敲定了一笔数百万双运动鞋出口大单，手包里装满了支票与豪车钥匙，急匆匆地冲进门，给整层楼的护士分发厚厚的大红包；母亲是家族制鞋企业的财务主管，喝着婆婆精心炖好的花胶炖鲍鱼汤。祖父在宗祠红砖燕尾脊大厝给妈祖神像敬上三炷高香。你降生在中国民营品牌最富搏击活力的鞋都核心。",
        "parents": [
            {
                "fatherJob": "中国知名百亿级运动鞋服集团联合创始人",
                "fatherAge": 34,
                "fatherTrait": "手握全国数千家专卖门店网络，敢想敢拼善于赞助顶级体育赛事，极具商业雄才",
                "motherJob": "家族跨国鞋底新材料研发实验室总监",
                "motherAge": 31,
                "motherTrait": "精通高分子发泡与缓震碳板复合技术，知性果敢，为你的国际精英求学早做铺垫",
                "housing": "晋江市区豪华独栋闽南风格私人庄园（占地数亩自带喷泉假山，停放数台名车）",
                "wealthIndex": 4
            },
            {
                "fatherJob": "前店后厂运动鞋帮针车与冷粘总装车间主管",
                "fatherAge": 31,
                "fatherTrait": "精通制鞋流水线每一道胶水粘合工序，性格耿直实干，带徒弟极其严格负责",
                "motherJob": "石狮服装城品牌档口批发销售经理",
                "motherAge": 28,
                "motherTrait": "一口流利闽南话与普通话，八面玲珑招徕四方客户，把家里打理得井井有条",
                "housing": "自建四层红砖贴瓷商住楼（一楼仓库二楼车间三四楼自住，殷实富足）",
                "wealthIndex": 3
            },
            {
                "fatherJob": "鞋厂流水线夜班热压大底两班倒压底工",
                "fatherAge": 29,
                "fatherTrait": "在灼热模具前不停压胶取底，双手满是烫伤与化学胶水味，为挣加班费拼命",
                "motherJob": "在出租屋替鞋厂手工修剪鞋垫毛边打散工",
                "motherAge": 26,
                "motherTrait": "双手被剪刀磨出厚厚老茧，虽生活困苦，但永远把最好的鱼丸肉燕留给你吃",
                "housing": "工业区握手自建房顶楼铁皮隔热单间（室内空间不大，但温馨洁净）",
                "wealthIndex": 1
            }
        ]
    },
    {
        "id": "fujian_changle",
        "province": "福建省",
        "subRegionName": "福州长乐跨洋海归侨乡大宅",
        "provinceGroup": "华东",
        "region": "福建省 · 福州长乐跨洋海归侨乡老宗祠大宅",
        "landscape": "依山面海花岗岩豪宅 · 跨洋汇款单与护照 · 宗族祠堂祭祖盛典",
        "tagline": "中国著名华侨之乡，八仙过海闯荡美利坚，海外汇款单与巨型罗马柱豪宅里的亲缘纽带",
        "icon": "🚢",
        "hospitalName": "福州市长乐区妇幼保健院产科",
        "primarySchoolName": "长乐师范学校附属完全小学",
        "highSchoolName": "长乐第一中学",
        "cityOrCounty": "福州市长乐区沿海侨乡传统聚居村落",
        "birthScene": "初春时节，东海的风穿过长乐沿海的松林，漫山遍野耸立着一座座带有花岗岩罗马柱的五层欧式气派侨乡大宅，宗祠里铜钟清脆敲响。你降生在长乐区妇幼保健院特护病房里。你的啼哭伴着走廊里此起彼伏的福州方言谈笑。产房外，父亲作为远在纽约曼哈顿经营中餐连锁的大老板，通过刚刚接通的跨洋卫星电话听到你的初啼，激动得在大洋彼岸热泪盈眶，当即指示家族长辈在村里摆下三十桌流水席庆贺；母亲靠在红木雕花大床上，身边放着从美国邮寄回来的最新款婴儿襁褓。你降生在全中国最富出海闯荡精神、宗族血脉远播五大洲的传奇侨乡。",
        "parents": [
            {
                "fatherJob": "美东华人餐饮商会常务副会长兼跨国连锁餐饮集团董事长",
                "fatherAge": 34,
                "fatherTrait": "从曼哈顿外卖餐馆赤手空拳打拼下数十家分店，豪迈霸气，在长乐侨界极重声威",
                "motherJob": "长乐区知名双语幼儿园理事长兼侨联委员",
                "motherAge": 31,
                "motherTrait": "通晓英语与福州方言，优雅端庄富有远见，为你的未来做好了横跨中美的精英铺垫",
                "housing": "长乐半山腰自建占地千平米欧式石构巨型别墅（带私家泳池与罗马柱门廊）",
                "wealthIndex": 4
            },
            {
                "fatherJob": "长乐滨海经编化纤纺织集团特种整经机车间工长",
                "fatherAge": 31,
                "fatherTrait": "精通千米高速经编机工艺调校，性格老实沉稳，享受侨乡富庶安稳的本土生活",
                "motherJob": "长乐农商银行国际涉外汇款业务主办",
                "motherAge": 28,
                "motherTrait": "对各国外币汇率与跨境汇款门清，为人温和精细，把家庭财务打理得稳若泰山",
                "housing": "村中自建三层半花岗岩贴瓷大洋楼（宽敞大院内停放两台合资轿车，温馨富足）",
                "wealthIndex": 3
            },
            {
                "fatherJob": "早年出海未果背负沉重中介借款的沿海养殖工",
                "fatherAge": 30,
                "fatherTrait": "背负数十万亲友高利借贷压力巨大，在沿海滩涂拼命养殖海蚌，饱受风浪挫折",
                "motherJob": "在村头小塑料作坊帮人分拣废旧线头散工",
                "motherAge": 27,
                "motherTrait": "手脚粗糙生茧，生活清苦但为人坚毅从不怨天尤人，用全部温柔把你紧拥入怀",
                "housing": "侨乡老旧石头平房两间（虽无豪华装修，但收拾得干干净净充满暖意）",
                "wealthIndex": 0
            }
        ]
    },
    {
        "id": "fujian_longyan",
        "province": "福建省",
        "subRegionName": "闽西龙岩客家土楼与武夷山茶",
        "provinceGroup": "华东",
        "region": "福建省 · 闽西龙岩武夷山老茶坑与客家土楼",
        "landscape": "生土夯筑巨大客家圆楼 · 武夷山岩茶肉桂香 · 天井长寿古井水",
        "tagline": "客家祖地生土古堡，巨大圆楼同宗共祖，武夷山九曲溪畔岩茶焙火里沉淀的深沉温情",
        "icon": "🏯",
        "hospitalName": "龙岩市第二医院妇产科",
        "primarySchoolName": "永定区实验完全小学",
        "highSchoolName": "龙岩第一中学",
        "cityOrCounty": "龙岩市永定区高头传统客家土楼聚落",
        "birthScene": "初秋黄昏，闽西大山深处炊烟袅袅，巨大的圆形生土客家土楼在青山环抱中巍然如古城堡，祖堂天井上空飞燕掠过，楼道里弥漫着武夷山岩茶炭火慢焙的醇厚果香与米酒甜香。你降生在土楼四层雕花木窗朝向祖堂的厢房里。你的第一声啼哭引得圆楼四层环形回廊数十户宗亲探头欢呼。产房外，父亲刚从武夷山老茶坑收回上等肉桂茶青，满身茶叶清香，快步跑上木楼梯，手里捧着一罐用百年古井泉水泡出的顶级大红袍；母亲微笑着抚摸你襁褓上的客家刺绣。族长在祖堂点燃红蜡烛，敲响铜锣宣告新丁入籍。你来到了这片同宗共居、生生不息的客家精神古堡。",
        "parents": [
            {
                "fatherJob": "武夷岩茶国家级非遗炭焙大红袍特级制茶大师",
                "fatherAge": 34,
                "fatherTrait": "熟谙文火慢焙每一道香气演化，所制岩茶千金难求，性格厚重如山深受爱戴",
                "motherJob": "龙岩市文化遗产保护传承中心副研究员",
                "motherAge": 31,
                "motherTrait": "对客家土楼夯土建造技艺与民俗学有深入研究，端庄文雅，注重启蒙你的文化品格",
                "housing": "客家承启楼修缮后的独立庭院单元（厚重生土冬暖夏凉，陈设古色古香）",
                "wealthIndex": 4
            },
            {
                "fatherJob": "龙岩紫金矿业地下采矿特种凿岩机熟练工长",
                "fatherAge": 31,
                "fatherTrait": "在深部采场操纵现代化液压凿岩台车，技术过硬性格直爽，极好与工友喝老米酒",
                "motherJob": "客家传统万应茶与药膳煲汤工坊掌柜",
                "motherAge": 28,
                "motherTrait": "深谙客家药膳滋补之道，做一手正宗客家酿豆腐，为人热情待客极诚恳",
                "housing": "土楼群旁新建三层客家风格砖混楼房（推窗见万峰叠翠，室内宽敞舒适）",
                "wealthIndex": 2
            },
            {
                "fatherJob": "大山深处陡坡梯田采摘油茶籽重体力苦工",
                "fatherAge": 29,
                "fatherTrait": "背负沉重茶果穿梭险峻山林，脚底磨满厚茧，老实忠厚只求一家老小平安温饱",
                "motherJob": "在土楼天井给宗族祠堂做保洁兼扎竹扫帚",
                "motherAge": 26,
                "motherTrait": "双手被竹篾刺得伤痕累累，性情温厚顺良，把自己所有心血全倾注在你身上",
                "housing": "老土楼底层最阴暗潮湿堆柴偏间（采光较差，但宗亲邻里互帮互助人情极暖）",
                "wealthIndex": 0
            }
        ]
    }
]

ALL_CUSTOM_ECOSYSTEMS.extend(REMAINING_VARIANTS)
print(f"Total compiled ecosystems: {len(ALL_CUSTOM_ECOSYSTEMS)}")

# Read simulation.ts to get the original 34 ecosystems
sim_path = "/Users/colin569/社会生产劳动/GitHub/EscapePlan/src/data/simulation.ts"
with open(sim_path, "r", encoding="utf-8") as f:
    sim_content = f.read()

# Extract the original REGION_ECOSYSTEMS array from simulation.ts
match = re.search(r'export const REGION_ECOSYSTEMS = (\[[\s\S]*?\n\]);', sim_content)
if not match:
    print("Error: Could not locate REGION_ECOSYSTEMS in simulation.ts")
    exit(1)

orig_ecosystems_json = match.group(1)
# Clean up JSON if needed or parse with json.loads
try:
    orig_ecosystems = json.loads(orig_ecosystems_json)
    print(f"Successfully extracted {len(orig_ecosystems)} original ecosystems from simulation.ts")
except Exception as e:
    print("Could not directly json.loads, using custom parser or fallback:", e)
    orig_ecosystems = []

# Merge: For each province in original, keep it and give it a subRegionName if not present
final_ecosystem_list = []
seen_regions = set()

# First add our rich custom bespoke ecosystems
for eco in ALL_CUSTOM_ECOSYSTEMS:
    if eco["region"] not in seen_regions:
        seen_regions.add(eco["region"])
        final_ecosystem_list.append(eco)

# Then add original ecosystems with updated subRegionName
for eco in orig_ecosystems:
    if eco["region"] not in seen_regions:
        seen_regions.add(eco["region"])
        # ensure subRegionName is set
        if "subRegionName" not in eco:
            # Derive subRegionName from region or cityOrCounty
            short_sub = eco["region"].split("·")[-1].strip() if "·" in eco["region"] else eco["cityOrCounty"]
            eco["subRegionName"] = short_sub
        final_ecosystem_list.append(eco)

print(f"Final merged ecosystems count: {len(final_ecosystem_list)}")

# Count ecosystems per province
prov_counts = {}
for eco in final_ecosystem_list:
    p = eco["province"]
    prov_counts[p] = prov_counts.get(p, 0) + 1

for p, c in sorted(prov_counts.items(), key=lambda x: -x[1]):
    print(f"  {p}: {c} ecosystems")

# Output to src/data/provincial_ecosystems.ts
output_ts = """// ============================================================================
// ESCAPEPLAN PROVINCIAL DIVERSE ECOSYSTEMS MATRIX
// 全中国34个省级行政区全覆盖 · 多剧本/多出身地/多风土人情矩阵
// 每个省份均收录多套截然不同的初临人间实景、家庭阶层与成长环境
// ============================================================================

export interface RegionParentOption {
  fatherJob: string;
  fatherAge: number;
  fatherTrait: string;
  motherJob: string;
  motherAge: number;
  motherTrait: string;
  housing: string;
  wealthIndex: number;
}

export interface RegionEcosystem {
  id: string;
  province: string;
  subRegionName?: string;
  provinceGroup: string;
  region: string;
  landscape: string;
  tagline: string;
  icon: string;
  hospitalName: string;
  primarySchoolName: string;
  highSchoolName: string;
  cityOrCounty: string;
  birthScene: string;
  parents: RegionParentOption[];
}

export const REGION_ECOSYSTEMS: RegionEcosystem[] = """ + json.dumps(final_ecosystem_list, ensure_ascii=False, indent=2) + """;

/**
 * 获取指定省份的所有多分支生态剧本
 */
export function getEcosystemsByProvince(targetProvince: string): RegionEcosystem[] {
  const clean = targetProvince.trim();
  return REGION_ECOSYSTEMS.filter(
    (e) =>
      e.province === clean ||
      e.id === clean ||
      clean.includes(e.province) ||
      e.province.includes(clean)
  );
}
"""

out_file_path = "/Users/colin569/社会生产劳动/GitHub/EscapePlan/src/data/provincial_ecosystems.ts"
with open(out_file_path, "w", encoding="utf-8") as f:
    f.write(output_ts)

print(f"Successfully generated {out_file_path} with {len(final_ecosystem_list)} rich ecosystems!")
