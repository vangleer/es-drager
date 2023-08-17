import { App, Plugin } from 'vue';
export type { DragData, DragerProps } from './src/drager';
import Drager from './src/drager.vue';
export declare const install: (app: App) => void;
export { Drager as ESDrager };
declare const _default: Plugin & {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: {
            tag?: string | import("vue").Component | undefined;
            resizable?: boolean | undefined;
            rotatable?: boolean | undefined;
            boundary?: boolean | undefined;
            disabled?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            left?: number | undefined;
            top?: number | undefined;
            zIndex?: number | undefined;
            angle?: number | undefined;
            color?: string | undefined;
            minWidth?: number | undefined;
            minHeight?: number | undefined;
            selected?: boolean | undefined;
            snapToGrid?: boolean | undefined;
            gridX?: number | undefined;
            gridY?: number | undefined;
            scaleRatio?: number | undefined;
            disabledKeyEvent?: boolean | undefined;
            border?: boolean | undefined;
            equalProportion?: boolean | undefined;
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
            readonly aspectRatio?: number | undefined;
            readonly resizeList?: string[] | undefined;
            key?: string | number | symbol | undefined;
            ref?: import("vue").VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            onVnodeBeforeMount?: ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeMounted?: ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUpdate?: ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>, oldVNode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>, oldVNode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUpdated?: ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>, oldVNode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>, oldVNode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUnmount?: ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUnmounted?: ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            class?: unknown;
            style?: unknown;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot<any> | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: "change" | "drag" | "drag-start" | "drag-end" | "resize" | "resize-start" | "resize-end" | "rotate" | "rotate-start" | "rotate-end", ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
                type: import("vue").PropType<string[]>;
            };
            equalProportion: {
                type: BooleanConstructor;
            };
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
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "drag" | "drag-start" | "drag-end" | "resize" | "resize-start" | "resize-end" | "rotate" | "rotate-start" | "rotate-end")[], string, {
            tag: string | import("vue").Component;
            resizable: boolean;
            rotatable: boolean;
            boundary: boolean;
            disabled: boolean;
            width: number;
            height: number;
            left: number;
            top: number;
            zIndex: number;
            angle: number;
            color: string;
            minWidth: number;
            minHeight: number;
            selected: boolean;
            snapToGrid: boolean;
            gridX: number;
            gridY: number;
            scaleRatio: number;
            disabledKeyEvent: boolean;
            border: boolean;
            equalProportion: boolean;
        }, {}, string, {}> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
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
            type: import("vue").PropType<string[]>;
        };
        equalProportion: {
            type: BooleanConstructor;
        };
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
    } & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
        type: import("vue").PropType<string[]>;
    };
    equalProportion: {
        type: BooleanConstructor;
    };
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
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "drag" | "drag-start" | "drag-end" | "resize" | "resize-start" | "resize-end" | "rotate" | "rotate-start" | "rotate-end")[], "change" | "drag" | "drag-start" | "drag-end" | "resize" | "resize-start" | "resize-end" | "rotate" | "rotate-start" | "rotate-end", {
    tag: string | import("vue").Component;
    resizable: boolean;
    rotatable: boolean;
    boundary: boolean;
    disabled: boolean;
    width: number;
    height: number;
    left: number;
    top: number;
    zIndex: number;
    angle: number;
    color: string;
    minWidth: number;
    minHeight: number;
    selected: boolean;
    snapToGrid: boolean;
    gridX: number;
    gridY: number;
    scaleRatio: number;
    disabledKeyEvent: boolean;
    border: boolean;
    equalProportion: boolean;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
export default _default;
