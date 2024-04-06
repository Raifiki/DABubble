// import interfaces
import { User } from "../interfaces/interfaces";

//import classes
import { Message } from "./message.class";

export class Channel {
    name:string = '';
    description: string = '';
    members: User[] = [];
    creator!: User;
    messages: Message[] = [];
}
