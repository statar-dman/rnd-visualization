// src/app/models/rnd.model.ts

export interface RNDRequest {
    product: string;
    dte: number;
    num_days: number;
  }
  
  export interface RNDDataPoint {
    date: string;
    mode: number;
    move_grid: number[];
    pdf_values: number[];
    cdf_values: { [key: string]: number };
    cdf_curve: number[];
  }
  
  export interface RNDResponse {
    data: RNDDataPoint[];}