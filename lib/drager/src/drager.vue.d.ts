declare const _sfc_main: import("vue").DefineComponent<{
    tag: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: string;
    };
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
    zIndex: {
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
    maxWidth: {
        type: NumberConstructor;
        default: number;
    };
    maxHeight: {
        type: NumberConstructor;
        default: number;
    };
    aspectRatio: {
        type: NumberConstructor;
    };
    selected: BooleanConstructor;
    snapToGrid: BooleanConstructor;
    gridX: {
        type: NumberConstructor;
        default: number;
    };
    gridY: {
        type: NumberConstructor;
        default: number;
    };
    scaleRatio: {
        type: NumberConstructor;
        default: number;
    };
    disabledKeyEvent: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    resizeList: {
        type: import("vue").PropType<import("./drager").IDotSide[]>;
    };
    equalProportion: {
        type: BooleanConstructor;
    };
    checkCollision: {
        type: BooleanConstructor;
    };
    snap: BooleanConstructor;
    snapThreshold: {
        type: NumberConstructor;
        default: number;
    };
    markline: import("vue").PropType<boolean | ((e: import("./drager").MarklineData) => void)>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "drag" | "drag-start" | "drag-end" | "resize" | "resize-start" | "resize-end" | "rotate" | "rotate-start" | "rotate-end")[], "change" | "drag" | "drag-start" | "drag-end" | "resize" | "resize-start" | "resize-end" | "rotate" | "rotate-start" | "rotate-end", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tag: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: string;
    };
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
    zIndex: {
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
    maxWidth: {
        type: NumberConstructor;
        default: number;
    };
    maxHeight: {
        type: NumberConstructor;
        default: number;
    };
    aspectRatio: {
        type: NumberConstructor;
    };
    selected: BooleanConstructor;
    snapToGrid: BooleanConstructor;
    gridX: {
        type: NumberConstructor;
        default: number;
    };
    gridY: {
        type: NumberConstructor;
        default: number;
    };
    scaleRatio: {
        type: NumberConstructor;
        default: number;
    };
    disabledKeyEvent: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    resizeList: {
        type: import("vue").PropType<import("./drager").IDotSide[]>;
    };
    equalProportion: {
        type: BooleanConstructor;
    };
    checkCollision: {
        type: BooleanConstructor;
    };
    snap: BooleanConstructor;
    snapThreshold: {
        type: NumberConstructor;
        default: number;
    };
    markline: import("vue").PropType<boolean | ((e: import("./drager").MarklineData) => void)>;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onDrag?: ((...args: any[]) => any) | undefined;
    "onDrag-start"?: ((...args: any[]) => any) | undefined;
    "onDrag-end"?: ((...args: any[]) => any) | undefined;
    onResize?: ((...args: any[]) => any) | undefined;
    "onResize-start"?: ((...args: any[]) => any) | undefined;
    "onResize-end"?: ((...args: any[]) => any) | undefined;
    onRotate?: ((...args: any[]) => any) | undefined;
    "onRotate-start"?: ((...args: any[]) => any) | undefined;
    "onRotate-end"?: ((...args: any[]) => any) | undefined;
}, {
    top: number;
    left: number;
    tag: string | import("vue").Component;
    resizable: boolean;
    rotatable: boolean;
    boundary: boolean;
    disabled: boolean;
    width: number;
    height: number;
    zIndex: number;
    angle: number;
    color: string;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    selected: boolean;
    snapToGrid: boolean;
    gridX: number;
    gridY: number;
    scaleRatio: number;
    disabledKeyEvent: boolean;
    border: boolean;
    equalProportion: boolean;
    checkCollision: boolean;
    snap: boolean;
    snapThreshold: number;
}, {}>;
export default _sfc_main;
