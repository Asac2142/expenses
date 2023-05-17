export interface PlotlyConfig {
  data: any[];
  layout: Layout;
  config?: any;
}

export interface Layout {
  width?: number;
  height?: number;
  title?: string;
  showlegend?: boolean;
  legend?: { x?: number; y?: number; xanchor?: string };
  hoverlabel?: { bgcolor?: string };
  margin?: {
    l: number;
    r: number;
    b: number;
    t: number;
    pad: number;
  };
}
