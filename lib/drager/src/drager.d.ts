export type IDotSide = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type EventType = 'change' | 'drag' | 'drag-start' | 'drag-end' | 'resize' | 'resize-start' | 'resize-end' | 'rotate' | 'rotate-start' | 'rotate-end';
export type IDot = {
    side: IDotSide;
    cursor?: string;
};
export declare const DragerProps: {
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
    rotatable: {
        type: BooleanConstructor;
        default: boolean;
    };
    boundary: {
        type: BooleanConstructor;
    };
    disabled: BooleanConstructor;
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    left: {
        type: NumberConstructor;
        default: number;
    };
    top: {
        type: NumberConstructor;
        default: number;
    };
    angle: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    minWidth: {
        type: NumberConstructor;
        default: number;
    };
    minHeight: {
        type: NumberConstructor;
        default: number;
    };
    aspectRatio: {
        type: NumberConstructor;
    };
};
export interface DragData {
    width: number;
    height: number;
    left: number;
    top: number;
    angle: number;
}
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
export declare const getDotList: (angle?: number) => any[];
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
