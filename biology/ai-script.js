// AI助手功能脚本

// 知识库数据
const knowledgeBase = {
    '什么是生物多样性': '生物多样性是指地球上所有生物体及其所构成的生态系统的多样性和变异性，包括遗传多样性、物种多样性和生态系统多样性三个层次。',
    '濒危物种': '濒危物种是指面临灭绝危险的物种。目前全球有超过100万个物种面临灭绝威胁，主要原因包括栖息地破坏、气候变化、非法贸易和污染等。',
    '如何保护生物多样性': '保护生物多样性可以从个人做起：减少消费、拒绝野生动物制品、选择可持续产品、绿色出行、节约能源、参与植树活动、学习和传播知识、支持保护组织等。',
    '生态系统': '生态系统是由生物群落与其环境相互作用而形成的统一整体。主要类型包括热带雨林、海洋、草原、高山、沙漠、湿地、极地和温带森林等。',
    '大熊猫': '大熊猫是中国的国宝，主要栖息在四川、陕西和甘肃的竹林中。由于栖息地破坏和气候变化，野生大熊猫数量仅剩约1800只，被列为易危物种。',
    '气候变化': '气候变化是生物多样性面临的主要威胁之一。全球变暖改变了物种的生存环境，许多物种无法适应快速变化的气候条件，导致数量下降甚至灭绝。',
    '保护措施': '保护生物多样性的措施包括：建立自然保护区、实施可持续的资源利用、恢复退化的生态系统、减少污染和温室气体排放、加强监测和研究等。'
};

// 物种数据库
const speciesDatabase = {
    '大熊猫': {
        name: '大熊猫',
        status: '易危 (VU)',
        habitat: '四川、陕西、甘肃的竹林中',
        population: '约1800只',
        description: '大熊猫是中国的国宝，主要栖息在竹林中。由于栖息地破坏和气候变化，野生大熊猫数量仅剩约1800只。'
    },
    '犀牛': {
        name: '犀牛',
        status: '极危 (CR)',
        habitat: '非洲和亚洲部分地区',
        population: '数量急剧下降',
        description: '由于非法盗猎和栖息地丧失，全球犀牛数量急剧下降。特别是白犀牛和黑犀牛，都面临着严重的生存威胁。'
    },
    '东北虎': {
        name: '东北虎',
        status: '濒危 (EN)',
        habitat: '俄罗斯远东地区和中国东北',
        population: '不足500只',
        description: '东北虎是世界上最大的猫科动物，主要分布在俄罗斯远东地区和中国东北。由于栖息地破碎化和猎物减少，野生东北虎数量不足500只。'
    },
    '亚洲象': {
        name: '亚洲象',
        status: '濒危 (EN)',
        habitat: '东南亚和南亚地区',
        population: '持续下降',
        description: '亚洲象主要分布在东南亚和南亚地区。由于栖息地丧失、人象冲突和非法贸易，亚洲象数量持续下降。'
    }
};

// 打开聊天机器人
function openChatBot() {
    document.getElementById('chatBotModal').classList.add('active');
    document.getElementById('chatInput').focus();
}

// 关闭聊天机器人
function closeChatBot() {
    document.getElementById('chatBotModal').classList.remove('active');
}

// 发送消息
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 添加用户消息
    addMessage(message, 'user');
    input.value = '';
    
    // 模拟AI思考时间
    setTimeout(() => {
        const response = getAIResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

// 添加消息到聊天界面
function addMessage(text, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (type === 'bot') {
        contentDiv.innerHTML = `<strong>AI助手：</strong>${text}`;
    } else {
        contentDiv.textContent = text;
    }
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 获取AI回复（基于规则和关键词匹配）
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // 关键词匹配
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowerMessage.includes(key.toLowerCase()) || 
            key.toLowerCase().includes(lowerMessage)) {
            return value;
        }
    }
    
    // 特殊问题处理
    if (lowerMessage.includes('你好') || lowerMessage.includes('hello')) {
        return '您好！我是生物多样性AI助手，可以回答您关于生物多样性、濒危物种、生态系统和保护行动的问题。';
    }
    
    if (lowerMessage.includes('帮助') || lowerMessage.includes('help')) {
        return '我可以帮助您了解：1. 什么是生物多样性 2. 濒危物种信息 3. 生态系统知识 4. 保护措施建议。请告诉我您想了解什么？';
    }
    
    if (lowerMessage.includes('谢谢') || lowerMessage.includes('感谢')) {
        return '不客气！如果您还有其他关于生物多样性的问题，随时可以问我。';
    }
    
    // 默认回复
    const defaultResponses = [
        '这是一个很好的问题！根据我的知识库，生物多样性是指地球上所有生物体及其所构成的生态系统的多样性和变异性。您想了解哪个具体方面呢？',
        '关于这个问题，我建议您可以查看我们网站的"关于"页面了解更多详细信息。您还有其他问题吗？',
        '这个问题涉及多个方面。您可以尝试问更具体的问题，比如"什么是濒危物种"或"如何保护生物多样性"。',
        '感谢您的提问！生物多样性保护是一个重要的话题。您可以告诉我您最感兴趣的部分，我会为您详细解答。'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// 回车发送消息
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// 打开智能搜索
function openSpeciesSearch() {
    document.getElementById('searchModal').classList.add('active');
    document.getElementById('speciesSearchInput').focus();
}

// 关闭智能搜索
function closeSpeciesSearch() {
    document.getElementById('searchModal').classList.remove('active');
    document.getElementById('searchResults').innerHTML = '';
}

// 执行搜索
function performSearch() {
    const query = document.getElementById('speciesSearchInput').value.trim();
    if (!query) return;
    
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '<div style="text-align: center; padding: 2rem;">🔍 AI正在搜索...</div>';
    
    // 模拟AI搜索延迟
    setTimeout(() => {
        const results = searchSpecies(query);
        displaySearchResults(results);
    }, 800);
}

// 搜索物种
function searchSpecies(query) {
    const lowerQuery = query.toLowerCase();
    const results = [];
    
    // 精确匹配
    if (speciesDatabase[query]) {
        results.push(speciesDatabase[query]);
    }
    
    // 模糊匹配
    for (const [name, data] of Object.entries(speciesDatabase)) {
        if (name.includes(query) || query.includes(name) || 
            data.description.includes(query)) {
            if (!results.find(r => r.name === name)) {
                results.push(data);
            }
        }
    }
    
    // 如果没有结果，返回提示
    if (results.length === 0) {
        return [{
            name: '未找到相关物种',
            description: `抱歉，没有找到与"${query}"相关的物种信息。您可以尝试搜索：大熊猫、犀牛、东北虎、亚洲象等。`,
            status: '',
            habitat: '',
            population: ''
        }];
    }
    
    return results;
}

// 显示搜索结果
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-light);">未找到相关结果</div>';
        return;
    }
    
    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'search-result-item';
        resultDiv.innerHTML = `
            <h4>${result.name}</h4>
            ${result.status ? `<p><strong>保护状态：</strong>${result.status}</p>` : ''}
            ${result.habitat ? `<p><strong>栖息地：</strong>${result.habitat}</p>` : ''}
            ${result.population ? `<p><strong>种群数量：</strong>${result.population}</p>` : ''}
            <p>${result.description}</p>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

// 回车搜索
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('speciesSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// 打开物种识别
function openSpeciesIdentify() {
    document.getElementById('identifyModal').classList.add('active');
}

// 关闭物种识别
function closeSpeciesIdentify() {
    document.getElementById('identifyModal').classList.remove('active');
    document.getElementById('identifyResults').innerHTML = '';
    document.getElementById('identifyResults').classList.remove('active');
    document.getElementById('uploadArea').style.display = 'block';
}

// 处理图片上传
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const uploadArea = document.getElementById('uploadArea');
        const resultsContainer = document.getElementById('identifyResults');
        
        uploadArea.style.display = 'none';
        resultsContainer.classList.add('active');
        resultsContainer.innerHTML = '<div style="text-align: center; padding: 2rem;">🤖 AI正在识别中...</div>';
        
        // 模拟AI识别延迟
        setTimeout(() => {
            const result = identifySpecies(file.name);
            displayIdentifyResults(result, reader.result);
        }, 1500);
    };
    reader.readAsDataURL(file);
}

// 识别物种（模拟）
function identifySpecies(filename) {
    // 基于文件名或随机返回识别结果（演示功能）
    const possibleSpecies = [
        { name: '大熊猫', confidence: 95, description: '识别为：大熊猫 (Ailuropoda melanoleuca)' },
        { name: '东北虎', confidence: 88, description: '识别为：东北虎 (Panthera tigris altaica)' },
        { name: '亚洲象', confidence: 92, description: '识别为：亚洲象 (Elephas maximus)' },
        { name: '朱鹮', confidence: 85, description: '识别为：朱鹮 (Nipponia nippon)' }
    ];
    
    return possibleSpecies[Math.floor(Math.random() * possibleSpecies.length)];
}

// 显示识别结果
function displayIdentifyResults(result, imageData) {
    const resultsContainer = document.getElementById('identifyResults');
    resultsContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="${imageData}" alt="上传的图片" style="max-width: 100%; border-radius: 10px; max-height: 300px;">
        </div>
        <div class="identify-result-item">
            <h4>${result.name}</h4>
            <p>${result.description}</p>
            <p class="confidence">识别置信度：${result.confidence}%</p>
            <p style="margin-top: 1rem; color: var(--text-light); font-size: 0.9rem;">
                <strong>注意：</strong>这是演示功能。实际应用中，AI会分析图片的视觉特征来识别物种。
            </p>
        </div>
    `;
}

// 点击上传区域
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageUpload = document.getElementById('imageUpload');
    
    if (uploadArea && imageUpload) {
        uploadArea.addEventListener('click', function() {
            imageUpload.click();
        });
        
        // 拖拽上传
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--secondary-color)';
        });
        
        uploadArea.addEventListener('dragleave', function() {
            uploadArea.style.borderColor = 'var(--primary-color)';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                imageUpload.files = files;
                handleImageUpload({ target: { files: files } });
            }
        });
    }
});

// 打开保护建议
function openActionRecommend() {
    document.getElementById('recommendModal').classList.add('active');
}

// 关闭保护建议
function closeActionRecommend() {
    document.getElementById('recommendModal').classList.remove('active');
    document.getElementById('recommendResults').innerHTML = '';
    document.getElementById('recommendResults').classList.remove('active');
}

// 获取AI建议
function getRecommendations() {
    const interest = document.getElementById('interestSelect').value;
    const time = document.getElementById('timeSelect').value;
    const method = document.getElementById('methodSelect').value;
    
    const resultsContainer = document.getElementById('recommendResults');
    resultsContainer.classList.add('active');
    resultsContainer.innerHTML = '<div style="text-align: center; padding: 2rem;">💡 AI正在为您生成个性化建议...</div>';
    
    // 模拟AI分析延迟
    setTimeout(() => {
        const recommendations = generateRecommendations(interest, time, method);
        displayRecommendations(recommendations);
    }, 1000);
}

// 生成建议（基于规则）
function generateRecommendations(interest, time, method) {
    const recommendations = [];
    
    // 根据兴趣领域
    const interestActions = {
        'animals': [
            { title: '支持野生动物保护组织', description: '可以捐款或参与志愿活动，帮助保护濒危动物。' },
            { title: '拒绝野生动物制品', description: '不购买象牙、虎骨等野生动物制品，从需求端减少对野生动物的威胁。' },
            { title: '参与野生动物救助', description: '如果发现受伤的野生动物，及时联系专业救助机构。' }
        ],
        'plants': [
            { title: '参与植树造林活动', description: '定期参与植树活动，增加植被覆盖率，恢复生态系统。' },
            { title: '种植本地植物', description: '在社区或家中种植本地植物，为本地野生动物提供栖息地。' },
            { title: '支持植物保护项目', description: '支持植物园和植物保护组织的保护和研究工作。' }
        ],
        'ocean': [
            { title: '减少塑料使用', description: '减少使用一次性塑料制品，保护海洋环境。' },
            { title: '选择可持续海产品', description: '购买MSC认证的可持续海产品，支持可持续渔业。' },
            { title: '参与海滩清理活动', description: '参与海滩垃圾清理活动，保护海洋生态系统。' }
        ],
        'forest': [
            { title: '支持森林保护项目', description: '支持FSC认证的木材产品，支持可持续森林管理。' },
            { title: '减少纸张浪费', description: '节约用纸，使用双面打印，减少对森林资源的消耗。' },
            { title: '参与森林恢复', description: '参与森林恢复和植树造林项目，帮助恢复退化的森林。' }
        ],
        'climate': [
            { title: '绿色出行', description: '选择步行、骑行或公共交通，减少碳排放。' },
            { title: '节约能源', description: '使用节能电器，合理使用空调和暖气，减少能源消耗。' },
            { title: '支持可再生能源', description: '如果可能，选择使用可再生能源，如太阳能、风能等。' }
        ]
    };
    
    // 根据时间安排调整建议
    const timeAdjustments = {
        'daily': '您可以每天进行这些活动，形成良好的环保习惯。',
        'weekly': '建议您每周安排时间参与这些活动，持续关注生物多样性保护。',
        'monthly': '您可以每月参与一次相关活动，保持对保护工作的关注。',
        'occasional': '即使偶尔参与，也能为保护生物多样性贡献力量。'
    };
    
    // 根据参与方式调整
    const methodAdjustments = {
        'online': '这些活动主要可以通过线上方式参与，如在线学习、线上捐款、社交媒体宣传等。',
        'offline': '这些活动需要线下参与，如实地植树、清理活动、参观保护区等。',
        'both': '这些活动可以线上线下结合参与，灵活安排时间和方式。'
    };
    
    const actions = interestActions[interest] || interestActions['animals'];
    recommendations.push(...actions.slice(0, 3));
    
    // 添加通用建议
    recommendations.push({
        title: '学习和传播知识',
        description: '了解生物多样性的重要性，向家人、朋友传播保护知识，提高公众意识。'
    });
    
    return {
        recommendations: recommendations,
        timeNote: timeAdjustments[time],
        methodNote: methodAdjustments[method]
    };
}

// 显示建议
function displayRecommendations(data) {
    const resultsContainer = document.getElementById('recommendResults');
    resultsContainer.innerHTML = '';
    
    data.recommendations.forEach((rec, index) => {
        const recDiv = document.createElement('div');
        recDiv.className = 'recommend-item';
        recDiv.innerHTML = `
            <h4>${index + 1}. ${rec.title}</h4>
            <p>${rec.description}</p>
        `;
        resultsContainer.appendChild(recDiv);
    });
    
    // 添加说明
    const noteDiv = document.createElement('div');
    noteDiv.style.marginTop = '1.5rem';
    noteDiv.style.padding = '1rem';
    noteDiv.style.background = 'var(--light-color)';
    noteDiv.style.borderRadius = '8px';
    noteDiv.style.wordWrap = 'break-word';
    noteDiv.style.overflowWrap = 'break-word';
    noteDiv.innerHTML = `
        <p style="color: var(--text-light); margin-bottom: 0.5rem; line-height: 1.6;"><strong>时间安排建议：</strong>${data.timeNote}</p>
        <p style="color: var(--text-light); line-height: 1.6;"><strong>参与方式：</strong>${data.methodNote}</p>
    `;
    resultsContainer.appendChild(noteDiv);
    
    // 滚动到结果区域
    setTimeout(() => {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}

