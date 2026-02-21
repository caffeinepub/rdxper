import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TableData {
    rows: Array<Array<string>>;
    headers: Array<string>;
}
export interface BarGraphData {
    categories: Array<string>;
    values: Array<number>;
}
export interface backendInterface {
    fetchBarGraphData(_researchTopic: string, figureCount: bigint): Promise<Array<BarGraphData>>;
    fetchTableData(_researchTopic: string, figureCount: bigint): Promise<Array<TableData>>;
}
