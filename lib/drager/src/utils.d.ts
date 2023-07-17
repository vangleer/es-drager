import { DragData } from './drager';
export type MouseTouchEvent = MouseEvent | TouchEvent;
/**
 * 统一处理拖拽事件
 * @param onMousemove 鼠标移动处理函数
 */
export declare function setupMove(onMousemove: (e: MouseTouchEvent) => void, onMouseupCb?: (e: MouseTouchEvent) => void): void;
export declare function getXY(e: MouseTouchEvent): {
    clientX: number;
    clientY: number;
};
export declare const withUnit: (val?: number | string) => string;
export declare const resizableMap: {
    n: string;
    s: string;
    e: string;
    w: string;
    ne: string;
    nw: string;
    se: string;
    sw: string;
};
export declare const cursorDirectionArray: string[];
export declare const getCursor: (rotateAngle: number, d: string) => string;
export declare const getDotList: (angle?: number, resizeList?: string[]) => any[];
export declare const degToRadian: (deg: number) => number;
export declare const getLength: (x: number, y: number) => number;
export declare const getNewStyle: (type: string, rect: any, deltaW: number, deltaH: number, ratio: number | undefined, minWidth: number, minHeight: number) => {
    position: {
        centerX: any;
        centerY: any;
    };
    size: {
        width: number;
        height: number;
    };
};
export declare const centerToTL: ({ centerX, centerY, width, height, angle }: any) => DragData;
export declare const formatData: (data: DragData, centerX: number, centerY: number) => {
    width: number;
    height: number;
    left: number;
    top: number;
};
/**
 * @param diff 移动的距离
 * @param grid 网格大小
 */
export declare function calcGrid(diff: number, grid: number): number;
