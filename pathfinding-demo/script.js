/**
 * Canvas管理器类
 * 负责处理所有与Canvas相关的操作，包括绘制和事件处理
 */
class CanvasManager {
    /**
     * 构造函数
     * @param {string} canvasId - Canvas元素的ID
     */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 40;
        this.setupCanvas();
    }

    /**
     * 设置Canvas大小
     */
    setupCanvas() {
        // 获取设备像素比
        const dpr = window.devicePixelRatio || 1;
        
        // 设置Canvas的CSS大小
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // 设置Canvas的实际大小（考虑设备像素比）
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        
        // 缩放Canvas上下文以匹配设备像素比
        this.ctx.scale(dpr, dpr);
        
        // 设置线条宽度和字体大小时需要考虑设备像素比
        this.ctx.lineWidth = 0.5 / dpr;
    }

    /**
     * 清空画布
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 绘制网格
     */
    drawGrid() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#e0e0e0';
        
        // 绘制垂直线
        for (let x = 0; x <= this.canvas.width / window.devicePixelRatio; x += this.gridSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height / window.devicePixelRatio);
        }

        // 绘制水平线
        for (let y = 0; y <= this.canvas.height / window.devicePixelRatio; y += this.gridSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width / window.devicePixelRatio, y);
        }

        this.ctx.stroke();
    }

    /**
     * 绘制圆形
     * @param {number} x - 圆心x坐标
     * @param {number} y - 圆心y坐标
     * @param {number} radius - 半径
     * @param {string} color - 颜色
     * @param {boolean} fill - 是否填充
     */
    drawCircle(x, y, radius, color = 'blue', fill = false) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (fill) {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }

    /**
     * 绘制线段
     * @param {number} x1 - 起点x坐标
     * @param {number} y1 - 起点y坐标
     * @param {number} x2 - 终点x坐标
     * @param {number} y2 - 终点y坐标
     * @param {string} color - 颜色
     */
    drawLine(x1, y1, x2, y2, color = 'black') {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    /**
     * 获取鼠标在Canvas上的坐标
     * @param {MouseEvent} e - 鼠标事件对象
     * @returns {{x: number, y: number}} 鼠标坐标
     */
    getMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}

/**
 * A*寻路算法类
 * 实现基于网格的A*寻路算法
 */
class AStarPathFinder {
    /**
     * 构造函数
     * @param {number} gridSize - 网格大小
     */
    constructor(gridSize) {
        this.gridSize = gridSize;
    }

    /**
     * 使用A*算法寻找路径
     * @param {{x: number, y: number}} start - 起点
     * @param {{x: number, y: number}} end - 终点
     * @param {function} isValidPosition - 检查位置是否有效的函数
     * @returns {Array<{x: number, y: number}>} 路径点数组
     */
    findPath(start, end, isValidPosition) {
        const openSet = new Set();
        const closedSet = new Set();
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        const startNode = this.getGridNode(start.x, start.y);
        const endNode = this.getGridNode(end.x, end.y);
        const startKey = this.getNodeKey(startNode);
        const endKey = this.getNodeKey(endNode);

        openSet.add(startKey);
        gScore.set(startKey, 0);
        fScore.set(startKey, this.heuristic(startNode, endNode));

        while (openSet.size > 0) {
            let currentKey = this.getLowestFScore(openSet, fScore);
            if (currentKey === endKey) {
                return this.reconstructPath(cameFrom, currentKey);
            }

            openSet.delete(currentKey);
            closedSet.add(currentKey);

            const current = this.parseNodeKey(currentKey);
            const neighbors = this.getNeighbors(current, isValidPosition);

            for (const neighbor of neighbors) {
                const neighborKey = this.getNodeKey(neighbor);
                if (closedSet.has(neighborKey)) continue;

                const tentativeGScore = gScore.get(currentKey) + this.distance(current, neighbor);

                if (!openSet.has(neighborKey)) {
                    openSet.add(neighborKey);
                } else if (tentativeGScore >= (gScore.get(neighborKey) || Infinity)) {
                    continue;
                }

                cameFrom.set(neighborKey, currentKey);
                gScore.set(neighborKey, tentativeGScore);
                fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, endNode));
            }
        }

        return [start, end];
    }

    /**
     * 获取f值最小的节点
     * @param {Set} openSet - 开放集合
     * @param {Map} fScore - f值映射
     * @returns {string} 节点键值
     */
    getLowestFScore(openSet, fScore) {
        let currentKey = null;
        let lowestF = Infinity;
        for (const key of openSet) {
            const f = fScore.get(key) || Infinity;
            if (f < lowestF) {
                lowestF = f;
                currentKey = key;
            }
        }
        return currentKey;
    }

    /**
     * 将坐标转换为网格节点
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @returns {{x: number, y: number}} 网格节点
     */
    getGridNode(x, y) {
        return {
            x: Math.round(x / this.gridSize) * this.gridSize,
            y: Math.round(y / this.gridSize) * this.gridSize
        };
    }

    /**
     * 获取节点的唯一键值
     * @param {{x: number, y: number}} node - 节点
     * @returns {string} 节点键值
     */
    getNodeKey(node) {
        return `${node.x},${node.y}`;
    }

    /**
     * 解析节点键值
     * @param {string} key - 节点键值
     * @returns {{x: number, y: number}} 节点
     */
    parseNodeKey(key) {
        const [x, y] = key.split(',').map(Number);
        return { x, y };
    }

    /**
     * 获取相邻节点
     * @param {{x: number, y: number}} node - 当前节点
     * @param {function} isValidPosition - 检查位置是否有效的函数
     * @returns {Array<{x: number, y: number}>} 相邻节点数组
     */
    getNeighbors(node, isValidPosition) {
        const neighbors = [];
        const directions = [
            { dx: this.gridSize, dy: 0 },
            { dx: -this.gridSize, dy: 0 },
            { dx: 0, dy: this.gridSize },
            { dx: 0, dy: -this.gridSize },
            { dx: this.gridSize, dy: this.gridSize },
            { dx: -this.gridSize, dy: this.gridSize },
            { dx: this.gridSize, dy: -this.gridSize },
            { dx: -this.gridSize, dy: -this.gridSize }
        ];

        for (const dir of directions) {
            const newX = node.x + dir.dx;
            const newY = node.y + dir.dy;

            if (isValidPosition(newX, newY)) {
                neighbors.push({ x: newX, y: newY });
            }
        }

        return neighbors;
    }

    /**
     * 启发函数（曼哈顿距离）
     * @param {{x: number, y: number}} a - 起点
     * @param {{x: number, y: number}} b - 终点
     * @returns {number} 启发值
     */
    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    /**
     * 计算两点间距离
     * @param {{x: number, y: number}} a - 点1
     * @param {{x: number, y: number}} b - 点2
     * @returns {number} 距离
     */
    distance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    /**
     * 重建路径
     * @param {Map} cameFrom - 路径记录
     * @param {string} currentKey - 当前节点键值
     * @returns {Array<{x: number, y: number}>} 路径点数组
     */
    reconstructPath(cameFrom, currentKey) {
        const path = [this.parseNodeKey(currentKey)];
        while (cameFrom.has(currentKey)) {
            currentKey = cameFrom.get(currentKey);
            path.unshift(this.parseNodeKey(currentKey));
        }
        return path;
    }
}

/**
 * 虚拟点寻路算法类
 * 实现基于圆周边虚拟点的寻路算法
 */
class VirtualPointPathFinder {
    constructor() {
        this.virtualPoints = [];
    }

    /**
     * 生成虚拟点
     * 在每个圆的半径R+15px处，每隔30度生成一个虚拟点
     * @param {Array<{x: number, y: number, radius: number}>} circles - 圆数组
     */
    generateVirtualPoints(circles) {
        this.virtualPoints = [];

        // 为每个圆生成虚拟点
        for (const circle of circles) {
            // 每隔30度生成一个点
            for (let angle = 0; angle < 360; angle += 30) {
                const radian = angle * Math.PI / 180;
                const x = circle.x + (circle.radius + 15) * Math.cos(radian);
                const y = circle.y + (circle.radius + 15) * Math.sin(radian);

                // 检查点是否在其他圆内
                let isValid = true;
                for (const otherCircle of circles) {
                    if (otherCircle !== circle && this.isPointInCircle({ x, y }, otherCircle)) {
                        isValid = false;
                        break;
                    }
                }

                if (isValid) {
                    this.virtualPoints.push({ x, y });
                }
            }
        }
    }

    /**
     * 寻找路径
     * @param {{x: number, y: number}} start - 起点
     * @param {{x: number, y: number}} end - 终点
     * @param {Array<{x: number, y: number, radius: number}>} circles - 圆数组
     * @returns {Array<{x: number, y: number}>} 路径点数组
     */
    findPath(start, end, circles) {
        // 首先检查是否需要绕行
        if (this.canConnectDirectly(start, end, circles)) {
            return [start, end];
        }

        // 需要绕行，使用虚拟点
        const allPoints = [start, ...this.virtualPoints, end];
        const graph = this.buildGraph(allPoints, circles);
        return this.dijkstra(graph, 0, allPoints.length - 1, allPoints);
    }

    /**
     * 构建图
     * @param {Array<{x: number, y: number}>} points - 点数组
     * @param {Array<{x: number, y: number, radius: number}>} circles - 圆数组
     * @returns {Array<Array<{to: number, weight: number}>>} 图的邻接表
     */
    buildGraph(points, circles) {
        const graph = new Array(points.length).fill().map(() => []);

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                if (this.canConnectDirectly(points[i], points[j], circles)) {
                    const distance = this.distance(points[i], points[j]);
                    graph[i].push({ to: j, weight: distance });
                    graph[j].push({ to: i, weight: distance });
                }
            }
        }

        return graph;
    }

    /**
     * Dijkstra算法寻找最短路径
     * @param {Array<Array<{to: number, weight: number}>>} graph - 图的邻接表
     * @param {number} start - 起点索引
     * @param {number} end - 终点索引
     * @param {Array<{x: number, y: number}>} points - 点数组
     * @returns {Array<{x: number, y: number}>} 路径点数组
     */
    dijkstra(graph, start, end, points) {
        const distances = new Array(graph.length).fill(Infinity);
        const previous = new Array(graph.length).fill(null);
        const visited = new Set();

        distances[start] = 0;

        while (visited.size < graph.length) {
            let current = -1;
            let minDistance = Infinity;

            for (let i = 0; i < distances.length; i++) {
                if (!visited.has(i) && distances[i] < minDistance) {
                    minDistance = distances[i];
                    current = i;
                }
            }

            if (current === -1) break;
            if (current === end) break;

            visited.add(current);

            for (const edge of graph[current]) {
                const newDistance = distances[current] + edge.weight;
                if (newDistance < distances[edge.to]) {
                    distances[edge.to] = newDistance;
                    previous[edge.to] = current;
                }
            }
        }

        const path = [];
        let current = end;
        while (current !== null) {
            path.unshift(points[current]);
            current = previous[current];
        }

        return path;
    }

    /**
     * 检查两点之间是否可以直线连接
     * @param {{x: number, y: number}} p1 - 点1
     * @param {{x: number, y: number}} p2 - 点2
     * @param {Array<{x: number, y: number, radius: number}>} circles - 圆数组
     * @returns {boolean} 是否可以直线连接
     */
    canConnectDirectly(p1, p2, circles) {
        for (const circle of circles) {
            if (this.lineIntersectsCircle(p1, p2, circle)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 检查线段是否与圆相交
     * @param {{x: number, y: number}} p1 - 线段起点
     * @param {{x: number, y: number}} p2 - 线段终点
     * @param {{x: number, y: number, radius: number}} circle - 圆
     * @returns {boolean} 是否相交
     */
    lineIntersectsCircle(p1, p2, circle) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        const dot = ((circle.x - p1.x) * dx + (circle.y - p1.y) * dy) / (length * length);

        const closestX = p1.x + dot * dx;
        const closestY = p1.y + dot * dy;

        if (dot < 0) {
            return this.distance(p1, circle) < circle.radius;
        }
        if (dot > 1) {
            return this.distance(p2, circle) < circle.radius;
        }

        return this.distance({ x: closestX, y: closestY }, circle) < circle.radius;
    }

    /**
     * 检查点是否在圆内
     * @param {{x: number, y: number}} point - 点
     * @param {{x: number, y: number, radius: number}} circle - 圆
     * @returns {boolean} 是否在圆内
     */
    isPointInCircle(point, circle) {
        const dx = point.x - circle.x;
        const dy = point.y - circle.y;
        return Math.sqrt(dx * dx + dy * dy) < circle.radius;
    }

    /**
     * 计算两点间距离
     * @param {{x: number, y: number}} p1 - 点1
     * @param {{x: number, y: number}} p2 - 点2
     * @returns {number} 距离
     */
    distance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
}

/**
 * 主类
 * 整合所有功能，处理用户交互
 */
class PathFinder {
    constructor() {
        this.canvasManager = new CanvasManager('canvas');
        this.aStarPathFinder = new AStarPathFinder(this.canvasManager.gridSize);
        this.virtualPointPathFinder = new VirtualPointPathFinder();
        this.points = [];
        this.circles = [];
        this.currentMode = 'point';
        this.mousePosition = { x: 0, y: 0 };
        this.nextCircleRadius = 100;
        this.setupEventListeners();
        this.setupResizeHandler()
    }

    /**
     * 设置窗口大小改变事件处理
     */
    setupResizeHandler() {
        window.addEventListener('resize', () => {
            this.canvasManager.setupCanvas();
            this.draw()
        });
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        this.canvasManager.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvasManager.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.getElementById('pointMode').addEventListener('click', () => this.setMode('point'));
        document.getElementById('circleMode').addEventListener('click', () => this.setMode('circle'));
        document.getElementById('checkPath').addEventListener('click', () => this.checkPath());
        document.getElementById('checkPath2').addEventListener('click', () => this.checkPath2());
        document.getElementById('clearPoints').addEventListener('click', () => this.clearPoints());
        document.getElementById('clearCircles').addEventListener('click', () => this.clearCircles());
        document.getElementById('clear').addEventListener('click', () => this.clear());
    }

    /**
     * 设置当前模式
     * @param {string} mode - 模式（'point'或'circle'）
     */
    setMode(mode) {
        this.currentMode = mode;
        document.getElementById('pointMode').classList.toggle('active', mode === 'point');
        document.getElementById('circleMode').classList.toggle('active', mode === 'circle');
        this.draw();
    }

    handleMouseMove(e) {
        this.mousePosition = this.canvasManager.getMousePosition(e);
        this.draw();
    }

    /**
     * 处理点击事件
     * @param {MouseEvent} e - 鼠标事件
     */
    handleClick(e) {
        const pos = this.canvasManager.getMousePosition(e);
        if (this.currentMode === 'point') {
            this.addPoint(pos.x, pos.y);
        } else {
            this.addCircle(pos.x, pos.y);
        }
        this.draw();
    }

    /**
     * 添加点
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     */
    addPoint(x, y) {
        this.points.push({ x, y, type: 'original' });
    }

    /**
     * 添加圆
     * @param {number} x - 圆心x坐标
     * @param {number} y - 圆心y坐标
     */
    addCircle(x, y) {
        const radius = this.nextCircleRadius
        this.circles.push({ x, y, radius });
        this.nextCircleRadius = Math.random() * 100 + 50
    }

    /**
     * 绘制所有元素
     */
    draw() {
        this.canvasManager.clear();
        this.canvasManager.drawGrid();

        // 绘制圆
        this.circles.forEach(circle => {
            this.canvasManager.drawCircle(circle.x, circle.y, circle.radius);
        });

        // 绘制虚拟点
        this.virtualPointPathFinder.virtualPoints.forEach(point => {
            this.canvasManager.drawCircle(point.x, point.y, 3, 'orange', true);
        });

        // 绘制点和线
        this.points.forEach((point, index) => {
            if (point.type === 'original') {
                this.drawTriangle(point.x, point.y, 'red');
            } else {
                this.canvasManager.drawCircle(point.x, point.y, 5, 'blue', true);
            }

            if (index > 0) {
                this.canvasManager.drawLine(
                    this.points[index - 1].x,
                    this.points[index - 1].y,
                    point.x,
                    point.y
                );
            }
        });

        // 绘制鼠标跟随效果
        if (this.currentMode === 'point') {
            this.drawTriangle(this.mousePosition.x, this.mousePosition.y, 'rgba(255, 0, 0, 0.5)');
        } else {
            this.canvasManager.drawCircle(
                this.mousePosition.x,
                this.mousePosition.y,
                this.nextCircleRadius,
                'rgba(0, 0, 255, 0.3)'
            );
        }
    }

    drawTriangle(x, y, color) {
        const size = 10;
        this.canvasManager.ctx.beginPath();
        this.canvasManager.ctx.moveTo(x, y + 1);
        this.canvasManager.ctx.lineTo(x - size + 3, y - size * 2);
        this.canvasManager.ctx.lineTo(x + size - 3, y - size * 2);
        this.canvasManager.ctx.closePath();
        this.canvasManager.ctx.fillStyle = color;
        this.canvasManager.ctx.fill();
    }

    /**
     * 使用A*算法检查路径
     */
    checkPath() {
        this.points = this.points.filter(point => point.type === 'original');

        for (const point of this.points) {
            for (const circle of this.circles) {
                if (this.isPointInCircle(point, circle)) {
                    alert('错误：有点在圆内！');
                    return;
                }
            }
        }

        for (let i = 0; i < this.points.length - 1; i++) {
            const start = this.points[i];
            const end = this.points[i + 1];
            const path = this.aStarPathFinder.findPath(start, end, (x, y) => this.isValidPosition(x, y));

            if (path.length > 2) {
                const newPoints = path.slice(1, -1).map(p => ({
                    x: p.x,
                    y: p.y,
                    type: 'detour'
                }));
                this.points.splice(i + 1, 0, ...newPoints);
                i += newPoints.length;
            }
        }
        this.draw();
    }

    /**
     * 使用虚拟点算法检查路径
     */
    checkPath2() {
        this.points = this.points.filter(point => point.type === 'original');

        for (const point of this.points) {
            for (const circle of this.circles) {
                if (this.isPointInCircle(point, circle)) {
                    alert('错误：有点在圆内！');
                    return;
                }
            }
        }

        this.virtualPointPathFinder.generateVirtualPoints(this.circles);

        for (let i = 0; i < this.points.length - 1; i++) {
            const start = this.points[i];
            const end = this.points[i + 1];
            const path = this.virtualPointPathFinder.findPath(start, end, this.circles);

            if (path.length > 2) {
                const newPoints = path.slice(1, -1).map(p => ({
                    x: p.x,
                    y: p.y,
                    type: 'detour'
                }));
                this.points.splice(i + 1, 0, ...newPoints);
                i += newPoints.length;
            }
        }
        this.draw();
    }

    /**
     * 检查位置是否有效
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @returns {boolean} 是否有效
     */
    isValidPosition(x, y) {
        for (const circle of this.circles) {
            const dx = x - circle.x;
            const dy = y - circle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < circle.radius) {
                return false;
            }
        }
        return true;
    }

    /**
     * 检查点是否在圆内
     * @param {{x: number, y: number}} point - 点
     * @param {{x: number, y: number, radius: number}} circle - 圆
     * @returns {boolean} 是否在圆内
     */
    isPointInCircle(point, circle) {
        const dx = point.x - circle.x;
        const dy = point.y - circle.y;
        return Math.sqrt(dx * dx + dy * dy) < circle.radius;
    }

    /**
     * 清除所有点
     */
    clearPoints() {
        this.points = [];
        this.draw();
    }

    /**
     * 清除所有圆
     */
    clearCircles() {
        this.circles = [];
        this.virtualPointPathFinder.virtualPoints = []
        this.draw();
    }

    /**
     * 清除所有元素
     */
    clear() {
        this.points = [];
        this.circles = [];
        this.virtualPointPathFinder.virtualPoints = [];
        this.draw();
    }
}

// 初始化应用
const pathFinder = new PathFinder(); 