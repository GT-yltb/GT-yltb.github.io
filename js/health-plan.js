document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
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
    
   
     // BMI分类切换功能
     const bmiCategories = document.querySelectorAll('.bmi-category');
     const dietPlans = document.querySelectorAll('.diet-plan');
     
     // 初始化显示对应的BMI内容
     function initBMIContent() {
         // 获取URL hash
         const hash = window.location.hash.substring(1);
         const validBMITypes = ['underweight', 'normal', 'overweight', 'obese'];
         
         // 检查hash是否有效
         if (hash && validBMITypes.includes(hash)) {
             showBMIContent(hash);
         } else {
             // 默认显示第一个分类
             showBMIContent('underweight');
         }
     }
     
     // 显示指定BMI类型的内容
     function showBMIContent(bmiType) {
         // 移除所有active类
         bmiCategories.forEach(cat => cat.classList.remove('active'));
         dietPlans.forEach(plan => plan.classList.remove('active'));
         
         // 为当前分类和内容添加active类
         const activeCategory = document.querySelector(`.bmi-category[data-bmi="${bmiType}"]`);
         const activePlan = document.getElementById(bmiType);
         
         if (activeCategory) activeCategory.classList.add('active');
         if (activePlan) activePlan.classList.add('active');
         
     }
     
     // 为每个BMI分类添加点击事件
     bmiCategories.forEach(category => {
         category.addEventListener('click', function() {
             const bmiType = this.getAttribute('data-bmi');
             showBMIContent(bmiType);
         });
     });
     // 初始化内容显示
    initBMIContent();


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
