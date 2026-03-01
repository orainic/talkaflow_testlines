// ========== i18n — English / Chinese language support ==========
(function () {
    var translations = {
        en: {
            // Landing page
            pageTitle: 'TalkaFlow Voice AI',
            heading: 'Voice AI Agents',
            subtitle: 'Choose an agent to start a voice conversation',
            startCall: 'Start Call',
            endCall: 'End Call',
            footerText: '\u00a9 2025 Powered and secured by',
            footerBrand: 'talkaFlow',
            loadError: 'Failed to load agents. Please refresh the page.',

            // Voice agent page
            ready: 'Ready',
            readySub: 'Click below to start a voice call',
            connecting: 'Connecting...',
            connectingSub: 'Setting up voice connection',
            listening: 'Listening',
            listeningSub: 'Speak now...',
            aiSpeaking: 'AI Speaking',
            aiSpeakingSub: 'is responding',
            connected: 'Connected',
            connectedSub: 'Call active',
            connectedSubSpeak: 'Call active - speak now',
            callEnded: 'Call Ended',
            callEndedSub: 'Click to start a new call',
            error: 'Error',
            you: 'You',
            trySaying: 'Try saying:',
            conversation: 'Conversation',
            transcriptPlaceholder: 'Start a call to speak with the AI assistant',
            debugLog: 'Debug Log',
            download: 'Download',
            clear: 'Clear',
            debug: 'Debug',

            // Alerts & messages
            sdkNotLoaded: 'Voice SDK not loaded. Please refresh the page.',
            agentNotLoaded: 'Agent configuration not loaded. Please refresh the page.',
            micRequired: 'Microphone access required for voice calls. Please allow microphone access and try again.',
            failedToStart: 'Failed to start call:',
            networkLost: 'Network connection lost. The call may disconnect.',
            sdkError: 'Voice SDK could not load',
            clearConfirm: 'Are you sure you want to clear all saved call logs? This cannot be undone.',
            thankYou: 'Thank you for contacting',
            haveAWonderfulDay: '. Have a wonderful day!',
            shortCallMsg: 'Call ended shortly after greeting. This may be due to: (1) No microphone input detected, (2) Agent timeout, or (3) Network issue. Please ensure your microphone is working and try again.',
            unexpectedDisconnect: 'Call disconnected unexpectedly. Please check your internet connection and microphone permissions.',
            allAgents: 'All Agents'
        },
        zh: {
            // Landing page
            pageTitle: 'TalkaFlow 语音AI',
            heading: '语音AI助手',
            subtitle: '选择一个助手开始语音对话',
            startCall: '开始通话',
            endCall: '结束通话',
            footerText: '\u00a9 2025 技术支持与安全保障由',
            footerBrand: 'talkaFlow',
            loadError: '加载助手失败，请刷新页面。',

            // Voice agent page
            ready: '就绪',
            readySub: '点击下方按钮开始语音通话',
            connecting: '连接中...',
            connectingSub: '正在建立语音连接',
            listening: '聆听中',
            listeningSub: '请开始说话...',
            aiSpeaking: 'AI 回复中',
            aiSpeakingSub: '正在回复',
            connected: '已连接',
            connectedSub: '通话中',
            connectedSubSpeak: '通话中 - 请开始说话',
            callEnded: '通话已结束',
            callEndedSub: '点击开始新的通话',
            error: '错误',
            you: '你',
            trySaying: '试着说：',
            conversation: '对话记录',
            transcriptPlaceholder: '开始通话以与AI助手对话',
            debugLog: '调试日志',
            download: '下载',
            clear: '清除',
            debug: '调试',

            // Alerts & messages
            sdkNotLoaded: '语音SDK未加载，请刷新页面。',
            agentNotLoaded: '助手配置未加载，请刷新页面。',
            micRequired: '语音通话需要麦克风权限，请允许麦克风访问后重试。',
            failedToStart: '通话启动失败：',
            networkLost: '网络连接已断开，通话可能会中断。',
            sdkError: '语音SDK无法加载',
            clearConfirm: '确定要清除所有已保存的通话日志吗？此操作无法撤销。',
            thankYou: '感谢您联系',
            haveAWonderfulDay: '。祝您有美好的一天！',
            shortCallMsg: '通话在问候后不久便已结束。可能原因：(1) 未检测到麦克风输入，(2) 助手超时，(3) 网络问题。请确保麦克风正常工作后重试。',
            unexpectedDisconnect: '通话意外断开，请检查您的网络连接和麦克风权限。',
            allAgents: '所有助手'
        }
    };

    function getLang() {
        return localStorage.getItem('lang') || 'en';
    }

    function setLang(lang) {
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
    }

    function t(key) {
        var lang = getLang();
        var dict = translations[lang] || translations.en;
        return dict[key] !== undefined ? dict[key] : (translations.en[key] || key);
    }

    // Get agent field respecting current language
    function agentField(agent, field) {
        if (!agent) return '';
        var lang = getLang();
        if (lang === 'zh' && agent[field + '_zh']) return agent[field + '_zh'];
        return agent[field] || '';
    }

    // Expose globally
    window.i18n = {
        getLang: getLang,
        setLang: setLang,
        t: t,
        agentField: agentField
    };
})();
