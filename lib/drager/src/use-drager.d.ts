import { Ref, ExtractPropTypes } from 'vue';
import { DragerProps } from './drager';
export declare function useDrager(targetRef: Ref<HTMLElement | null>, props: ExtractPropTypes<typeof DragerProps>, emit: Function): {
    isMousedown: Ref<boolean>;
    selected: Ref<boolean>;
    dragData: Ref<{
        width: number;
        height: number;
        left: number;
        top: number;
        angle: number;
    }>;
    getBoundary: () => number[];
    checkDragerCollision: () => true | undefined;
};
