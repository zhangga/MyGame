class GameDispatcher {
    private static _instance: GameDispatcher = null;
    private _eventDispatcher: egret.EventDispatcher = null;
    public constructor() {
        this._eventDispatcher = new egret.EventDispatcher();
    }
    public static get instance() {
        if (!this._instance) {
            this._instance = new GameDispatcher();
        }
        return this._instance;
    }
    public get eventDispatcher() {
        return this._eventDispatcher;
    }

    public dispatcherEventWith(type: string, bubbles?: boolean,
        data?: any, cancelable?: boolean): boolean {
        return this.eventDispatcher.dispatchEventWith(type, bubbles, data, cancelable);
    }

    public hasEventListener(eventType: string): boolean {
        return (this.eventDispatcher.hasEventListener(eventType));
    }

    public willTrigger(eventType: string): boolean {
        return (this.eventDispatcher.willTrigger(eventType));
    }

    public removeEventListener(type: string, listener: Function, thisObject, useCapture: boolean = false) {
        this.eventDispatcher.removeEventListener(type, listener, thisObject, useCapture);
    }

    public addEventListener(type: string, listener: Function, thisObject, useCapture: boolean = false, priority: number = 0) {
        this.eventDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    //The end
}