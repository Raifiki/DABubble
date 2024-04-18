// import classes
import { Reaction } from "./reaction.class";
import { User } from "./user.class";

export class Message {
    creator!: User;
    date!: Date;
    content: string = '';
    answers: Message[]= [];
    reactions: Reaction[] = [];
    files: any[] = []; // muss noch geklärt werden was wir hier speichern --> Idee: Link/name auf Datei in store
}
