var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Message = (function () {
    function Message(cmdId) {
        if (cmdId === void 0) { cmdId = 0; }
        this.posIndex = 14;
        this.isCheckLoading = true;
        this.isCheckRepeat = true;
        this.cmdId = cmdId;
        this.msg = new ArrayBuffer(1024);
        this.data = new DataView(this.msg);
        this.data.setInt16(0, 0x2425),
            this.data.setInt16(4, cmdId);
    }
    Message.prototype.inputData = function () { };
    Message.prototype.getCmdId = function () {
        return this.cmdId;
    };
    Message.prototype.getMsg = function () {
        return this.msg;
    };
    Message.prototype.setBoolean = function (param) {
        if (param) {
            this.setByte(1);
        }
        else {
            this.setByte(0);
        }
    };
    Message.prototype.setByte = function (param) {
        this.data.setInt8(this.posIndex, param);
        this.posIndex += 1;
    };
    Message.prototype.setShort = function (param) {
        this.data.setInt16(this.posIndex, param);
        this.posIndex += 2;
    };
    Message.prototype.setInt = function (param) {
        this.data.setInt32(this.posIndex, param);
        this.posIndex += 4;
    };
    Message.prototype.setFloat = function (param) {
        this.data.setFloat32(this.posIndex, param);
        this.posIndex += 4;
    };
    Message.prototype.setLong = function (param) {
        this.data.setFloat64(this.posIndex, param);
        this.posIndex += 8;
    };
    Message.prototype.setString = function (param) {
        param = encodeURIComponent(param);
        var size = param.length;
        this.setShort(size);
        for (var i = 0; i < size; ++i) {
            this.setByte(param.charCodeAt(i));
        }
    };
    Message.prototype.setPlayerId = function (id) {
        if (id === void 0) { id = -1; }
        this.data.setInt32(6, id);
    };
    Message.prototype.setLoginCode = function (code) {
        if (code === void 0) { code = -1; }
        this.data.setInt16(10, code);
    };
    Message.prototype.pack = function () {
        this.data.setInt16(2, this.posIndex - 4);
        this.msg = this.msg.slice(0, this.posIndex);
    };
    Message.prototype.getBoolean = function () {
        if (this.getByte() == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Message.prototype.getByte = function () {
        var value = this.data.getInt8(this.posIndex);
        this.posIndex += 1;
        return value;
    };
    Message.prototype.getShort = function () {
        var value = this.data.getInt16(this.posIndex);
        this.posIndex += 2;
        return value;
    };
    Message.prototype.getInt = function () {
        var value = this.data.getInt32(this.posIndex);
        this.posIndex += 4;
        return value;
    };
    Message.prototype.getLong = function () {
        var value = this.data.getFloat64(this.posIndex);
        this.posIndex += 8;
        return value;
    };
    Message.prototype.getFloat = function () {
        var value = this.data.getFloat32(this.posIndex);
        this.posIndex += 4;
        return value;
    };
    Message.prototype.getString = function () {
        var size = this.getShort();
        var uint = new Uint8Array(this.msg, this.posIndex, size);
        this.posIndex += size;
        return this.Utf8ArrayToStr(uint);
    };
    Message.prototype.unpack = function (data) {
        this.posIndex = 0;
        this.msg = data;
        this.data = new DataView(this.msg);
        this.dataLength = this.getInt();
        this.cmdId = this.getShort();
    };
    Message.prototype.Utf8ArrayToStr = function (array) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    };
    Message.prototype.recvData = function (data) {
        this.posIndex = 0;
        this.msg = data;
        this.data = new DataView(this.msg);
        this.messageSize = this.getByte();
    };
    Message.prototype.getMessage = function () {
        var size = this.data.getInt32(this.posIndex);
        var buffer = this.msg.slice(this.posIndex, this.posIndex + size);
        this.posIndex += size;
        return buffer;
    };
    Message.prototype.getMessageSize = function () {
        return this.messageSize;
    };
    Message.prototype.getJoinDataLength = function () {
        return this.dataLength - 6;
    };
    Message.prototype.readPos = function () {
        this.posIndex = 5;
    };
    Message.prototype.setGoodsSize = function (size) {
        this.data.setInt8(5, size);
    };
    Message.prototype.joinMessage = function (message) {
        for (var i = 0; i < message.getJoinDataLength(); ++i) {
            this.setByte(message.getByte());
        }
    };
    Message.prototype.newGoodsMessage = function () {
        var arrayBuffer = new ArrayBuffer(10240);
        var dataView = new DataView(arrayBuffer);
        for (var i = 0; i < this.dataLength; ++i) {
            dataView.setInt8(i, this.data.getInt8(i));
        }
        this.msg = arrayBuffer;
        this.data = dataView;
        this.posIndex = this.dataLength;
    };
    return Message;
}());
__reflect(Message.prototype, "Message");
//# sourceMappingURL=Message.js.map