/**
 * 寻路对象
 */
class PathFinder {

    //开始节点
    private startRoad: Grid;

    //目标节点
    private endRoad: Grid;

    //已经走过的节点.key-Grid.key value-PathGrid
    private hasGone: {} = {};

    //当前所有分支的列表.key-Grid.key value-PathGrid
    private branchList: {} = {};

    /**
     * 起始终止格子必须是道路
     */
    public constructor(startRoad: Grid, endRoad: Grid) {
        this.startRoad = startRoad;
        this.endRoad = endRoad;
    }

    /**
     * 执行寻路
     */
    public start(): PathGrid {
        var pg: PathGrid = new PathGrid(this.startRoad, this.endRoad);
        var end: PathGrid = this.loopRoad(pg);
        return end;
    }

    /**
     * 迭代寻路
     */
    private loopRoad(pGrid: PathGrid): PathGrid {
        if (pGrid == null) {
            return null;
        }
        //寻路完成
        else if (pGrid.isFinal(this.endRoad)) {
            return pGrid;
        }
        else {
            this.addGone(pGrid);
            var childList: Grid[] = pGrid.nextRoadList;
            var nearGrid: PathGrid = null;
            for (var i = 0; i < childList.length; i++) {
                var obj: Grid = childList[i];
                //已经走过该节点
                if (this.hasGone[obj.key]) {
                    continue;
                }
                var cGrid: PathGrid = new PathGrid(obj, this.endRoad);
                cGrid.setBefore(pGrid);
                if (!this.branchList[obj.key]) {
                    this.branchList[obj.key] = cGrid;
                }
                if (nearGrid == null && cGrid.stepValue < pGrid.stepValue) {
                    nearGrid = cGrid;
                }
                else if (nearGrid != null && cGrid.stepValue < nearGrid.stepValue) {
                    nearGrid = cGrid;
                }
            }
            //首先处理自己的格子
            if (nearGrid != null) {
                this.branchList[nearGrid.grid.key] = null;
                delete this.branchList[nearGrid.grid.key];
                return this.loopRoad(nearGrid);
            }
            else {
                if (this.branchList != null) {
                    var roadGrid: PathGrid = null;
                    for (var key in this.branchList) {
                        var g: PathGrid = this.branchList[key];
                        if (!g.grid.equal(pGrid.grid)) {
                            if (roadGrid == null) {
                                roadGrid = g;
                            }
                            else if (roadGrid.stepValue > g.stepValue) {
                                roadGrid = g;
                            }
                        }
                    }
                    if (roadGrid == null) {
                        return null;
                    }
                    else {
                        this.branchList[roadGrid.grid.key] = null;
                        delete this.branchList[roadGrid.grid.key];
                        return this.loopRoad(roadGrid);
                    }
                }
                else {
                    return null;
                }
            }
        }
    }

    /**
     * 添加已经走过的节点
     */
    private addGone(pGrid: PathGrid): void {
        this.hasGone[pGrid.grid.key] = pGrid;
    }

}