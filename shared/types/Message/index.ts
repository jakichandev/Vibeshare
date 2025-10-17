import type {User} from "../User/index"

export interface Message<T> {
    text: string;
    auth: User;
    hour: T;
    id: string;
    idSender: string | undefined;
}