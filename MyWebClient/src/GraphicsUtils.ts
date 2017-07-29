class GraphicsUtils extends egret.HashObject {
    public static fillRect(g: egret.Graphics, color: number, alpha: number, x: number, y: number, w: number, h: number) {
        g.beginFill(color, alpha);
        g.drawRect(x, y, w, h);

        g.endFill();
    }

}
