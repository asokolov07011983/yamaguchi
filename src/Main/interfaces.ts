export interface ApiResponse {
    total: number;
    result: Joke[];
}
export interface Joke {
    id: string;
    value: string;
}