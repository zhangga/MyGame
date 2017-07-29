/**
 * 通用分享类型枚举
 * 自定不同value 可以在具体的handler内重新mapping
 */
enum EShareTo {
    toQQ = 0,   // QQ好友
    toQz = 1,   // QQ空间
    toWX = 2,   // 微信
    toTL = 3    // 朋友圈
};