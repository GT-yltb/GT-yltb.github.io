document.addEventListener('DOMContentLoaded', function() {
    // 扩展食物数据，添加新增的三个分类
    const foodData = {
        "主食": [
            { name: "米饭", alias: "又叫熟米饭、米、大米饭、饭、菜米、馍", calorie: "116 大卡(每100克)" },
            { name: "鲜玉米", alias: "又叫玉米（鲜）、稻谷、炒蒜米、柿子", calorie: "112 大卡(每100克)" },
            { name: "馒头", alias: "又叫白馒头、蒸馍", calorie: "223 大卡(每100克)" },
            { name: "红薯", alias: "又叫地瓜、番薯、甘薯", calorie: "86 大卡(每100克)" }
        ],
        "蛋肉类": [
            { name: "鸡蛋", alias: "又叫鸡子、鸡卵", calorie: "144 大卡(每100克)" },
            { name: "咸鸭蛋", alias: "又叫盐鸭蛋、腌鸭蛋", calorie: "190 大卡(每100克)" },
            { name: "鸡肉", alias: "又叫鸡胸肉", calorie: "167 大卡(每100克)" },
            { name: "鲫鱼", alias: "又叫河鲫", calorie: "108 大卡(每100克)" }
        ],
        "奶制品": [
            { name: "牛奶", alias: "又叫牛乳", calorie: "54 大卡(每100克)" },
            { name: "酸奶", alias: "又叫酸牛奶", calorie: "72 大卡(每100克)" },
            { name: "奶酪", alias: "又叫芝士、干酪", calorie: "328 大卡(每100克)" }
        ],
        "蔬果类": [
            { name: "苹果", alias: "又叫平安果、智慧果", calorie: "52 大卡(每100克)" },
            { name: "香蕉", alias: "又叫甘蕉、芎蕉", calorie: "89 大卡(每100克)" },
            { name: "菠菜", alias: "又叫波斯草、鹦鹉菜", calorie: "23 大卡(每100克)" }
        ],
        "零食小吃": [
            { name: "薯片", alias: "又叫土豆片", calorie: "536 大卡(每100克)" },
            { name: "巧克力", alias: "又叫朱古力", calorie: "546 大卡(每100克)" }
        ],
        "饮料": [
            { name: "可乐", alias: "又叫可口可乐", calorie: "43 大卡(每100克)" },
            { name: "橙汁", alias: "又叫橘子汁", calorie: "45 大卡(每100克)" }
        ],
        "坚果大豆类": [
            { name: "花生", alias: "又叫落花生、长生果", calorie: "567 大卡(每100克)" },
            { name: "黄豆", alias: "又叫大豆", calorie: "390 大卡(每100克)" },
            { name: "豆腐", alias: "又叫水豆腐", calorie: "82 大卡(每100克)" }
        ],
        "油类": [
            { name: "花生油", alias: "", calorie: "884 大卡(每100克)" },
            { name: "橄榄油", alias: "", calorie: "884 大卡(每100克)" }
        ],
        "调味品": [
            { name: "盐", alias: "又叫食盐", calorie: "0 大卡(每100克)" },
            { name: "酱油", alias: "", calorie: "63 大卡(每100克)" },
            { name: "醋", alias: "", calorie: "31 大卡(每100克)" }
        ]
    };

    // 分类卡片点击事件
    const categoryCards = document.querySelectorAll('.category-card');
    const foodDetails = document.getElementById('food-details');
    const categoryTitle = document.getElementById('category-title');
    const foodList = document.getElementById('food-list');
    const closeBtn = document.getElementById('close-details');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showFoodList(category);
            
            // 滚动到详情区域
            setTimeout(() => {
                foodDetails.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    });

    // 关闭详情按钮点击事件
    closeBtn.addEventListener('click', function() {
        foodDetails.style.display = 'none';
    });

    // 显示食物列表函数
    function showFoodList(category) {
        foodDetails.style.display = 'block';
        
        categoryTitle.textContent = getCategoryTitle(category);
        
        // 清空现有列表
        foodList.innerHTML = '';
        
        // 添加新食物项
        if (foodData[category]) {
            foodData[category].forEach(food => {
                const foodItem = document.createElement('div');
                foodItem.className = 'food-item';
                foodItem.innerHTML = `
                    <h4 class="food-name">${food.name}</h4>
                    <p class="food-alias">${food.alias}</p>
                    <p class="food-calorie">热量: ${food.calorie}</p>
                `;
                foodList.appendChild(foodItem);
            });
        } else {
            foodList.innerHTML = '<p>暂无该分类数据</p>';
        }
    }

    // 获取分类标题
    function getCategoryTitle(category) {
        const titles = {
            "主食": "谷薯芋、杂豆、主食",
            "蛋肉类": "蛋类、肉类及制品",
            "奶制品": "奶类及制品",
            "蔬果类": "蔬菜水果类",
            "零食小吃": "零食小吃",
            "饮料": "饮料类",
            "坚果大豆类": "坚果大豆类",
            "油类": "油类",
            "调味品": "调味品类"
        };
        return titles[category] || category;
    }

   // 搜索框展开/收起功能
const searchIconBtn = document.getElementById('search-icon-btn');
const searchExpandable = document.getElementById('search-expandable');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// 点击搜索图标展开搜索框
searchIconBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    searchExpandable.classList.toggle('active');
    if (searchExpandable.classList.contains('active')) {
        searchInput.focus(); // 展开后自动聚焦输入框
    }
});

// 点击搜索按钮执行搜索
searchBtn.addEventListener('click', function() {
    performSearch();
});

// 按回车键执行搜索
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// 点击页面其他地方收起搜索框
document.addEventListener('click', function() {
    searchExpandable.classList.remove('active');
});

// 阻止点击搜索框内部时收起
searchExpandable.addEventListener('click', function(e) {
    e.stopPropagation();
});

// 搜索函数
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        alert(`搜索: ${searchTerm}\n实际应用中这里会跳转到搜索结果或滚动到相关内容`);
        searchInput.value = '';
        searchExpandable.classList.remove('active');
    }
}
});







// 悬浮AI助手功能
const aiFloatBtn = document.getElementById('ai-float-btn');
const aiChatContainer = document.getElementById('ai-chat-container');
const closeChatBtn = document.getElementById('close-chat');

// 点击悬浮按钮打开聊天窗口
aiFloatBtn.addEventListener('click', function() {
    aiChatContainer.classList.add('active');
});

// 点击关闭按钮隐藏聊天窗口
closeChatBtn.addEventListener('click', function() {
    aiChatContainer.classList.remove('active');
});

// 点击聊天窗口外部区域关闭窗口
document.addEventListener('click', function(e) {
    if (!aiChatContainer.contains(e.target)) {
        aiChatContainer.classList.remove('active');
    }
});

// 阻止点击悬浮按钮时事件冒泡
aiFloatBtn.addEventListener('click', function(e) {
    e.stopPropagation();
});

// AI问答功能
const aiQuestion = document.getElementById('ai-question');
const aiSend = document.getElementById('ai-send');
const aiMessages = document.getElementById('ai-messages');

// 发送问题函数
function sendQuestion() {
    const question = aiQuestion.value.trim();
    if (!question) return;
    
    // 添加用户问题到聊天区
    addMessage(question, 'user-question');
    aiQuestion.value = '';
    
    // 显示"正在思考"消息
    const thinkingId = 'thinking-' + Date.now();
    addMessage('正在思考...', 'ai-response', thinkingId);
    
    // 调用DeepSeek API
    fetchDeepSeekAI(question, thinkingId);
}

// 添加消息到聊天区
function addMessage(text, className, id = '') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${className}`;
    if (id) messageDiv.id = id;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    aiMessages.appendChild(messageDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

// 模拟调用DeepSeek API
function fetchDeepSeekAI(question, thinkingId) {
    setTimeout(() => {
        const thinkingElement = document.getElementById(thinkingId);
        if (thinkingElement) thinkingElement.remove();

        // 统一转为小写方便匹配
        const q = question.toLowerCase();
        let response = "感谢您的提问！我可以为您解答以下方面的健康问题：\n1. BMI计算与评估\n2. 饮食营养建议\n3. 运动计划制定\n4. 心理健康指导\n请尝试提出更具体的问题。";

        // BMI相关问题
        if (q.includes('bmi') || q.includes('体重') || q.includes('身高') || q.includes('肥胖') || q.includes('偏瘦')|| q.includes('BMI')) {
            response = `BMI健康知识：
 计算公式：体重(kg) ÷ (身高(m))²
 标准范围：
  - 偏瘦：<18.5
  - 正常：18.5-23.9
  - 微胖：24-27.9
  - 肥胖：≥28
 测量建议：晨起空腹测量更准确
您可以使用首页的BMI计算器进行自我评估`;
        
        // 饮食营养类
        } else if (q.includes('饮食') || q.includes('吃') || q.includes('营养') || q.includes('食谱') || q.includes('减肥餐')) {
            response = `科学饮食建议：
1. 三餐搭配原则：
    早餐：蛋白质+复合碳水（如鸡蛋+全麦面包）
    午餐：主食+优质蛋白+蔬菜（如糙米饭+鱼肉+西兰花）
    晚餐：易消化蛋白+高纤维（如豆腐+绿叶菜）

2. 常见食物推荐：
    优质蛋白：鸡胸肉、鱼类、豆制品
    健康脂肪：牛油果、坚果、橄榄油
    低GI主食：燕麦、红薯、糙米

3. 特殊需求：
    减脂期：控制总热量，增加膳食纤维
    增肌期：提高蛋白质摄入（1.6-2.2g/kg体重）`;

        // 运动健身类
        } else if (q.includes('运动') || q.includes('锻炼') || q.includes('健身') || q.includes('跑步') || q.includes('力量训练')) {
            response = `运动计划指南：
【初学者计划】
 周一/三/五：快走/慢跑20-30分钟
 周二/四：瑜伽/普拉提30分钟
 周末：休闲活动（游泳/骑行）

【中级计划】
 每周3次有氧（跑步/跳绳）
 每周2次力量训练（哑铃/自重）
 每日步数8000+

【高级计划】
 HIIT训练（20分钟/次）
 分化训练（胸背/腿肩循环）
 功能性训练（平衡/敏捷）

注意事项：
 运动前后充分热身拉伸
 循序渐进增加强度
 保持每周休息1-2天`;

        // 心理健康类
        } else if (q.includes('心理') || q.includes('压力') || q.includes('睡眠') || q.includes('情绪') || q.includes('焦虑')) {
            response = `心理健康建议：
1. 压力管理：
    每日冥想10-15分钟
    深呼吸练习（4-7-8呼吸法）
    写情绪日记

2. 睡眠改善：
    固定作息时间
    睡前1小时避免蓝光
    卧室温度保持18-22℃

3. 社交支持：
    每周至少2次深度社交
    参加兴趣小组
    寻求专业咨询（如需）`;

        // 健康方案类
        } else if (q.includes('方案') || q.includes('计划') || q.includes('建议') || q.includes('健康管理')) {
            response = `个性化健康方案：
 BMI<18.5（增重）：
   每日热量盈余300-500kcal
   高蛋白高碳水饮食
   抗阻训练为主

BMI18.5-23.9（维持）：
   均衡饮食
   有氧+力量结合
   体脂率监测

 BMI>24（减脂）：
   每日热量缺口300-500kcal
   控制精制碳水
   有氧运动为主`;

        // 食物热量类
        } else if (q.includes('热量') || q.includes('卡路里') || q.includes('食物营养')) {
            response = `常见食物热量参考（每100g）：
 主食类：
  - 米饭：116kcal
  - 全麦面包：265kcal
  - 燕麦：389kcal

 蛋白质类：
  - 鸡胸肉：165kcal
  - 鸡蛋：144kcal
  - 三文鱼：208kcal

 蔬果类：
  - 西兰花：34kcal
  - 苹果：52kcal
  - 牛油果：160kcal

详细数据请查看"卡路里大全"页面`;

        // 问候类
        } else if (q.includes('你好') || q.includes('hi') || q.includes('hello')) {
            response = "您好！我是轻启计划的AI健康助手，可以为您提供以下帮助：\n BMI计算与解读\n 个性化饮食建议\n 运动计划制定\n 心理健康指导\n请问您想了解哪方面的内容？";
        
        // 默认回答
        } else {
            response = "您的问题涉及健康管理，但不够具体。您可以这样提问：\n \"BMI怎么计算？\"\n \"减肥期间该怎么吃？\"\n \"适合新手的运动有哪些？\"\n我会为您提供专业建议！";
        }

        addMessage(response, 'ai-response');
    }, 800);
}

// 事件监听
aiSend.addEventListener('click', sendQuestion);
aiQuestion.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendQuestion();
});
