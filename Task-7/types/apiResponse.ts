import { JobType } from "./job";

export interface apiResponse<T> {
    success: boolean;
    message: string;
    data: T
    error: string;
    

}