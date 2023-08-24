import { CSSProperties, ExtractPropTypes } from 'vue';
import { DragerProps } from '../../../src/drager/src/drager';

type DragerType = Partial<ExtractPropTypes<typeof DragerProps>>;

export type ComponentType = DragerType & {
  id?: string;
  component?: string;
  text?: string;
  group?: boolean;
  groupStyle?: any;
  props?: any;
  style?: CSSProperties;
  editable?: boolean;
};
export type EditorType = {
  container: {
    snapToGrid: boolean
    markline: {
      color?: string
      show?: Boolean
    }
    gridSize: number
    gridColor?: string
    style: CSSProperties
    scaleRatio?: number
  }
  elements: ComponentType[]
}

export type IconType = DragerType & {
  component?: string;
  text?: string;
  style?: CSSProperties;
  props?: any;
  icon?: string;
};

export type ToolType = {
  label: string
  icon?: any
  handler: Function
}
