import { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    element: {
        type: PropType<HTMLElement | null>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("rotate" | "rotate-start" | "rotate-end" | "update:modelValue")[], "rotate" | "rotate-start" | "rotate-end" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    element: {
        type: PropType<HTMLElement | null>;
        required: true;
    };
}>> & {
    onRotate?: ((...args: any[]) => any) | undefined;
    "onRotate-start"?: ((...args: any[]) => any) | undefined;
    "onRotate-end"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: number;
}, {}>;
export default _sfc_main;
