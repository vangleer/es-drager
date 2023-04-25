import { Ref, InjectionKey } from 'vue';
export type IDotSide = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type IDot = {
    side: IDotSide;
    cursor?: string;
};
export declare const DragerProps: {
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
};
type DragContext = {
    dragRef: Ref<HTMLElement | null>;
};
export declare const DragContextKey: InjectionKey<DragContext>;
export declare const dotList: IDot[];
export declare function getDotStyle(item: IDot): {
    [x: string]: string | undefined;
    cursor: string | undefined;
};
export declare const withUnit: (val?: number | string) => string;
export {};
