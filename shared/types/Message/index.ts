import type {User} from "../User/index"

export interface Message {
    text: string;
    auth: User;
    hour: number;
    id: string;
    idSender: string | undefined;
}