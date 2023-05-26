export interface PlotlyConfig {
  data: Data[];
  layout: Layout;
  config?: any;
}

export interface Layout {
  width?: number;
  height?: number;
  title?: string;
  showlegend?: boolean;
  paper_bgcolor?: string; // * background color for the whole plot
  legend?: { x?: number; y?: number; xanchor?: string };
  hoverlabel?: { bgcolor?: string };
  margin?: {
    l: number;
    r: number;
    b: number;
    t: number;
    pad: number;
  };
  font?: {
    family?: string;
    size?: number;
    color?: string;
  };
}

export interface Data {
  type?: string; // * type of chart
  hole?: number; // * if it is pie chart, the hole makes it a donut
  values?: number[];
  labels?: string[];
  marker?: { colors: string[] }; // * colors for the each section of the plot
  automargin?: boolean;
}
