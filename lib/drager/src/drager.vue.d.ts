declare const _sfc_main: import("vue").DefineComponent<{
    zoomable: {
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
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    left: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    top: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("move" | "resize")[], "move" | "resize", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    zoomable: {
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
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    left: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    top: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onMove?: ((...args: any[]) => any) | undefined;
    onResize?: ((...args: any[]) => any) | undefined;
}, {
    zoomable: boolean;
    rotatable: boolean;
    boundary: boolean;
    disabled: boolean;
    width: string | number;
    height: string | number;
    left: string | number;
    top: string | number;
    color: string;
}>;
export default _sfc_main;
