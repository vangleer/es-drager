import { Ref, ExtractPropTypes } from 'vue';
import { DragerProps, DragData } from './drager';
type UtilFN = {
    getBoundary: Function;
    fixBoundary: Function;
    checkDragerCollision: Function;
    emit: Function;
};
export declare function useKeyEvent(props: ExtractPropTypes<typeof DragerProps>, dragData: Ref<DragData>, selected: Ref<boolean>, { getBoundary, fixBoundary, checkDragerCollision, emit }: UtilFN): void;
export {};
