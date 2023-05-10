import { Ref, ExtractPropTypes } from 'vue';
import { DragerProps } from './drager';
export declare function useDrager(targetRef: Ref<HTMLElement | null>, props: ExtractPropTypes<typeof DragerProps>, emit: Function): {
    isMousedown: Ref<boolean>;
    selected: Ref<boolean>;
    dragRef: Ref<any>;
    dragData: Ref<{
        width: number;
        height: number;
        left: number;
        top: number;
        angle: number;
    }>;
};
export declare function useZIndex(): string;
/**
 * 统一处理拖拽事件
 * @param onMousemove 鼠标移动处理函数
 */
export declare function setupMove(onMousemove: (e: MouseEvent) => void, onMouseupCb?: (e: MouseEvent) => void): void;
