import { ApiModel } from "../abstraction/api-model";
import { TimeStamps } from "../abstraction/time-stamps";
export interface User extends ApiModel {

    id: number;
    code: string;
    name: string;
    birthday: string;
    profileImage?: string;
    profileImageUrl?: string;
    createdAt: string;
}