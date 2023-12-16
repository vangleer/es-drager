import { ExtractPropTypes, Ref } from 'vue';
import { DragerProps, MarklineData } from '../drager';
type MarklineEvent = 'drag-start' | 'drag' | 'drag-end';
export declare function useMarkline(targetRef: Ref<HTMLElement | null>, props: ExtractPropTypes<typeof DragerProps>): {
    marklineEmit: (type: MarklineEvent) => MarklineData | undefined;
};
export {};
