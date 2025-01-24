/**
 * 获取当前时间的格式化字符串
 * @returns {string} 格式化后的时间字符串 (xxxx年xx月xx日 xx:xx:xx)
 */
export function getCurrentFormattedTime() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}

/**
 * 计算给定时间与当前时间的差值
 * @param {string} timeStr - 格式为"xxxx年xx月xx日 xx:xx:xx"的时间字符串
 * @returns {string} 相差的时间描述
 */
export function getTimeDifference(timeStr) {
    // 解析输入的时间字符串
    const [datePart, timePart] = timeStr.split(' ');
    const [year, month, day] = datePart.split(/年|月|日/).filter(Boolean).map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    
    const inputDate = new Date(year, month - 1, day, hours, minutes, seconds);
    const now = new Date();
    
    const diffInSeconds = Math.floor((now - inputDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    // 计算月份差
    const monthDiff = (now.getFullYear() - inputDate.getFullYear()) * 12 + 
                     (now.getMonth() - inputDate.getMonth());
    
    // 计算年份差
    const yearDiff = Math.floor(monthDiff / 12);

    if (yearDiff > 0) {
        return `${yearDiff}年前`;
    }
    if (monthDiff > 0) {
        return `${monthDiff}个月前`;
    }
    if (diffInDays > 0) {
        return `${diffInDays}天前`;
    }
    if (diffInHours > 0) {
        return `${diffInHours}小时前`;
    }
    if (diffInMinutes > 0) {
        return `${diffInMinutes}分钟前`;
    }
    return `${diffInSeconds}秒前`;
}
