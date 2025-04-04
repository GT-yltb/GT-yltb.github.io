document.addEventListener('DOMContentLoaded', function() {
    // 开屏动画控制
    const splashScreen = document.getElementById('splash-screen');
    const splashVideo = document.getElementById('splash-video');
    const skipBtn = document.getElementById('skip-btn');
    const mainContent = document.getElementById('main-content');
    
    // 检查是否已经看过开屏动画
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
        // 如果已经看过，直接显示主内容
        splashScreen.style.display = 'none';
        mainContent.style.display = 'block';
    } else {
        // 第一次访问，显示开屏动画
        splashScreen.style.display = 'flex';
        
        // 视频结束后显示主内容
        splashVideo.addEventListener('ended', function() {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
            localStorage.setItem('hasSeenSplash', 'true');
        });
        
        // 跳过按钮
        skipBtn.addEventListener('click', function() {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
            localStorage.setItem('hasSeenSplash', 'true');
        });
    }
    
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

// // 轮播图功能
// const slides = document.querySelectorAll('.slide');
// let currentSlide = 0;

// function showSlide(n) {
//     slides.forEach(slide => slide.classList.remove('active'));
//     currentSlide = (n + slides.length) % slides.length;
//     slides[currentSlide].classList.add('active');
// }

// function nextSlide() {
//     showSlide(currentSlide + 1);
// }



// // 自动轮播
// let slideInterval = setInterval(nextSlide, 2000);

// // 鼠标悬停暂停轮播
// const slider = document.querySelector('.slider');
// slider.addEventListener('mouseenter', () => {
//     clearInterval(slideInterval);
// });

// slider.addEventListener('mouseleave', () => {
//     slideInterval = setInterval(nextSlide, 3000);
// });


// 轮播图功能
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    // 更新幻灯片
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    
    // 更新指示器
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// 初始化
showSlide(currentSlide);
startAutoSlide();

// 事件监听
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

// 指示器点击事件
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const slideIndex = parseInt(indicator.getAttribute('data-slide'));
        showSlide(slideIndex);
        stopAutoSlide();
        startAutoSlide();
    });
});

// 鼠标悬停暂停轮播
const slider = document.querySelector('.slider-section');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);






    
    // BMI计算器功能
    const calculateBtn = document.getElementById('calculate-btn');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultDiv = document.getElementById('result');
    
    calculateBtn.addEventListener('click', function() {
        const height = parseFloat(heightInput.value) / 100; // 转换为米
        const weight = parseFloat(weightInput.value);
        
        if (isNaN(height) || isNaN(weight)) {
            resultDiv.textContent = '请输入有效的身高和体重';
            resultDiv.style.backgroundColor = 'rgba(255, 235, 238, 0.8)';
            resultDiv.style.color = '#c62828';
            document.getElementById('bmi-buttons').innerHTML = ''; // 清空按钮
            return;
        }
        
        if (height <= 0 || weight <= 0) {
            resultDiv.textContent = '身高和体重必须大于0';
            resultDiv.style.backgroundColor = 'rgba(255, 235, 238, 0.8)';
            resultDiv.style.color = '#c62828';
            document.getElementById('bmi-buttons').innerHTML = ''; // 清空按钮
            return;
        }
        
        const bmi = weight / (height * height);
        let category, color;
        
        if (bmi < 18.5) {
            category = '偏瘦';
            color = 'rgba(255, 243, 224, 0.8)';
        } else if (bmi < 24) {
            category = '正常';
            color = 'rgba(232, 245, 233, 0.8)';
        } else if (bmi < 28) {
            category = '微胖';
            color = 'rgba(255, 243, 224, 0.8)';
        } else {
            category = '肥胖';
            color = 'rgba(255, 235, 238, 0.8)';
        }
        
        resultDiv.textContent = `您的BMI: ${bmi.toFixed(1)} (${category})`;
        resultDiv.style.backgroundColor = color;
        resultDiv.style.color = '#2e7d32';
        
        // 添加跳转按钮
        const buttonsDiv = document.getElementById('bmi-buttons');
        buttonsDiv.innerHTML = `
            <div class="button-group">
                <button class="diet-btn" onclick="window.location.href='health-plan.html'">饮食建议</button>
                <button class="exercise-btn" onclick="window.location.href='exercise-plan.html'">运动建议</button>
            </div>
        `;
    });
    
    // // 搜索功能
    // const searchBtn = document.getElementById('search-btn');
    // const searchInput = document.getElementById('search-input');
    
    // searchBtn.addEventListener('click', function() {
    //     const searchTerm = searchInput.value.trim().toLowerCase();
    //     if (searchTerm) {
    //         alert(`搜索: ${searchTerm}\n实际应用中这里会跳转到搜索结果或滚动到相关内容`);
    //         // 实际应用中这里可以添加跳转到搜索结果的逻辑
    //     }
    // });
    
    // // 允许按回车键搜索
    // searchInput.addEventListener('keypress', function(e) {
    //     if (e.key === 'Enter') {
    //         searchBtn.click();
    //     }
    // });
});
// 视频控制功能
const video = document.querySelector('.content-col video');
const muteBtn = document.querySelector('.mute-btn');
const fullscreenBtn = document.querySelector('.fullscreen-btn');

// 静音/取消静音按钮
muteBtn.addEventListener('click', function() {
    if (video.muted) {
        video.muted = false;
        this.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        video.muted = true;
        this.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// 全屏按钮
fullscreenBtn.addEventListener('click', function() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
});

// 视频自动播放处理（解决某些浏览器的限制）
document.addEventListener('DOMContentLoaded', function() {
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // 自动播放被阻止，显示播放按钮
            const playBtn = document.createElement('button');
            playBtn.className = 'play-btn';
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.style.position = 'absolute';
            playBtn.style.top = '50%';
            playBtn.style.left = '50%';
            playBtn.style.transform = 'translate(-50%, -50%)';
            playBtn.style.zIndex = '10';
            video.parentNode.style.position = 'relative';
            video.parentNode.appendChild(playBtn);
            
            playBtn.addEventListener('click', function() {
                video.play();
                this.remove();
            });
        });
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

// 实际应用中替换为真实的DeepSeek API调用


// async function fetchDeepSeekAI(question, thinkingId) {
//     const API_KEY = "Bearer sk-c0a97593bdaf48ad9ce0ddc3d59da5bc"; // 确保这是最新有效的Key
//     const API_URL = "https://api.deepseek.com/v1/chat/completions";

//     try {
//         // 调试：打印请求信息
//         console.log("发送请求：", {
//             question,
//             key: API_KEY.slice(0, 5) + "..." // 避免控制台暴露完整Key
//         });

//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer sk-c0a97593bdaf48ad9ce0ddc3d59da5bc`
//             },
//             body: JSON.stringify({
//                 model: "deepseek-chat",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "你是一个专业的健康顾问，回答需简明准确，不超过100字"
//                     },
//                     {
//                         role: "user",
//                         content: question
//                     }
//                 ],
//                 temperature: 0.7,
//                 max_tokens: 500
//             })
//         });

//         // 增强错误处理
//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("API错误详情：", errorData);
//             throw new Error(`请求失败：${response.status}`);
//         }

//         const data = await response.json();
//         console.log("完整响应：", data); // 关键调试点

//         // 安全移除"正在思考"消息
//         const thinkingElement = document.getElementById(thinkingId);
//         if (thinkingElement) {
//             thinkingElement.remove();
//         }

//         // 强化数据解析
//         const answer = data.choices?.[0]?.message?.content 
//                       || data.error?.message 
//                       || "未能获取有效回答";
        
//         addMessage(answer, 'ai-response');

//     } catch (error) {
//         console.error("请求异常：", error);
//         const errorMsg = error.message.includes("401") 
//             ? "认证失败，请检查API Key" 
//             : "服务暂时不可用，请稍后重试";
        
//         document.getElementById(thinkingId)?.remove();
//         addMessage(errorMsg, 'ai-response');
//     }
// }
