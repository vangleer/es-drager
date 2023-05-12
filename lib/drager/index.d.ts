import { App, Plugin } from 'vue';
export * from './src/drager';
import Drager from './src/drager.vue';
export declare const install: (app: App) => void;
export { Drager as ESDrager };
declare const _default: Plugin & {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            resizable: boolean;
            rotatable: boolean;
            boundary: boolean;
            disabled: boolean;
            width: number;
            height: number;
            left: number;
            top: number;
            angle: number;
            color: string;
            minWidth: number;
            minHeight: number;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
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
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "resizable" | "rotatable" | "boundary" | "disabled" | "width" | "height" | "left" | "top" | "angle" | "color" | "minWidth" | "minHeight">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: (event: "change" | "drag" | "drag-start" | "drag-end" | "resize" | "resize-start" | "resize-end" | "rotate" | "rotate-start" | "rotate-end", ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
            resizable: boolean;
            rotatable: boolean;
            boundary: boolean;
            disabled: boolean;
            width: number;
            height: number;
            left: number;
            top: number;
            angle: number;
            color: string;
            minWidth: number;
            minHeight: number;
        }, {}, string> & {
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
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
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
    resizable: boolean;
    rotatable: boolean;
    boundary: boolean;
    disabled: boolean;
    width: number;
    height: number;
    left: number;
    top: number;
    angle: number;
    color: string;
    minWidth: number;
    minHeight: number;
}, {}, string> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
export default _default;
