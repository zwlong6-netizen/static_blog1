// 智能更新脚本：只更新updated字段
// 确保不会影响published、pubDate、date字段

async function smartUpdateTimestamp() {
    // 获取当前活动文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("没有活动文件");
        return;
    }
    
    // 检查是否为Markdown文件
    if (activeFile.extension !== 'md') {
        new Notice("仅支持Markdown文件");
        return;
    }
    
    // 读取文件 content
    const content = await app.vault.read(activeFile);
    
    // 获取当前时间（UTC+8时区
    const now = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(/\//g, '-');
    
    // 使用更精确的正则表达式，只匹配Frontmatter中的updated字段
    // 确保不会匹配文档正文中的内容
    const updatedContent = content.replace(
        /(^---\n[\s\S]*?)(updated:\s*).*?(\n[\s\S]*?^---)/m,
        `$1$2${now}$3`
    );
    
    // 写回文件
    await app.vault.modify(activeFile, updatedContent);
    
    new Notice(`已更新updated字段为: ${now}`);
}

// 执行脚本
smartUpdateTimestamp();

// 关键：导出函数供Templater调用
module.exports = smartUpdateTimestamp;
