import axios from "axios";
import { ApiResponse, Joke } from "./interfaces";
export const fetchJokes = async (query: string): Promise<Joke[]> => {
    const { data } = await axios.get<ApiResponse>(`https://api.chucknorris.io/jokes/search?query=${query}`);
    return data.result;
};