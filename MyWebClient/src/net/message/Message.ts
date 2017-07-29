/**
 *
 * @author 
 *
 */
class Message {

    private posIndex: number = 14;
    private msg: ArrayBuffer;
    private data: DataView;
    private cmdId: number;
    private dataLength: number;
    private messageSize: number;
    public isCheckLoading = true;
    public isCheckRepeat = true;
    public constructor(cmdId: number = 0) {
        this.cmdId = cmdId;
        this.msg = new ArrayBuffer(1024);
        this.data = new DataView(this.msg);
        this.data.setInt16(0, 0x2425),
        this.data.setInt16(4, cmdId);
    }

    public inputData() { }

    public getCmdId(): number {
        return this.cmdId;
    }

    public getMsg(): ArrayBuffer {
        return this.msg;
    }

    public setBoolean(param: boolean): void {
        if (param) {
            this.setByte(1);
        } else {
            this.setByte(0);
        }
    }

    public setByte(param: number): void {
        this.data.setInt8(this.posIndex, param);
        this.posIndex += 1;
    }

    public setShort(param: number): void {
        this.data.setInt16(this.posIndex, param);
        this.posIndex += 2;
    }

    public setInt(param: number): void {
        this.data.setInt32(this.posIndex, param);
        this.posIndex += 4;
    }

    public setFloat(param: number): void {
        this.data.setFloat32(this.posIndex, param);
        this.posIndex += 4;
    }

    public setLong(param: number): void {
        this.data.setFloat64(this.posIndex, param);
        this.posIndex += 8;
    }

    public setString(param: string): void {
        param = encodeURIComponent(param);
        var size: number = param.length;
        this.setShort(size);
        for (var i = 0; i < size; ++i) {
            this.setByte(param.charCodeAt(i));
        }
    }

    public setPlayerId(id: number = -1): void {
        this.data.setInt32(6, id);
    }

    public setLoginCode(code: number = -1): void {
        this.data.setInt16(10, code);
    }

    public pack(): void {
        this.data.setInt16(2, this.posIndex - 4);
        this.msg = this.msg.slice(0, this.posIndex);
    }

    public getBoolean(): boolean {
        if (this.getByte() == 1) {
            return true;
        } else {
            return false;
        }
    }

    public getByte(): number {
        var value = this.data.getInt8(this.posIndex);
        this.posIndex += 1;
        return value;
    }

    public getShort(): number {
        var value = this.data.getInt16(this.posIndex);
        this.posIndex += 2;
        return value;
    }

    public getInt(): number {
        var value = this.data.getInt32(this.posIndex);
        this.posIndex += 4;
        return value;
    }

    public getLong(): number {
        var value = this.data.getFloat64(this.posIndex);
        this.posIndex += 8;
        return value;
    }

    public getFloat(): number {
        var value = this.data.getFloat32(this.posIndex);
        this.posIndex += 4;
        return value;
    }

    public getString(): string {
        var size: number = this.getShort();
        var uint: Uint8Array = new Uint8Array(this.msg, this.posIndex, size);
        this.posIndex += size;
        return this.Utf8ArrayToStr(uint);
    }

    public unpack(data: ArrayBuffer): void {
        this.posIndex = 0;
        this.msg = data;
        this.data = new DataView(this.msg);
        this.dataLength = this.getInt();
        this.cmdId = this.getShort();
    }

    private Utf8ArrayToStr(array): string {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
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
    }

    public recvData(data: ArrayBuffer): void {
        this.posIndex = 0;
        this.msg = data;
        this.data = new DataView(this.msg);
        this.messageSize = this.getByte();
    }

    public getMessage(): ArrayBuffer {
        var size = this.data.getInt32(this.posIndex);
        var buffer = this.msg.slice(this.posIndex, this.posIndex + size);
        this.posIndex += size;
        return buffer;
    }

    public getMessageSize(): number {
        return this.messageSize;
    }

    public getJoinDataLength(): number{
        return this.dataLength-6;
    }

    public readPos():void{
        this.posIndex=5;
    }

    public setGoodsSize(size:number):void{
        this.data.setInt8(5,size);
    }

    public joinMessage(message:Message):void{
        for(var i=0;i<message.getJoinDataLength();++i){
            this.setByte(message.getByte());
        }
    }

    public newGoodsMessage():void{
        var arrayBuffer=new ArrayBuffer(10240);
        var dataView = new DataView(arrayBuffer);
        for(var i=0;i<this.dataLength;++i){
            dataView.setInt8(i,this.data.getInt8(i));
        }
        this.msg = arrayBuffer;
        this.data = dataView;
        this.posIndex = this.dataLength;
    }
}
