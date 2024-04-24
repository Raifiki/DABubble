// import classes
import { Reaction } from "./reaction.class";
import { User } from "./user.class";

export class Message {
    creator!: User;
    date!: Date;
    id: string;
    content: string = '';
    answers: Message[]= [];
    reactions: Reaction[] = [];
    files: any[] = []; // muss noch geklärt werden was wir hier speichern --> Idee: Link/name auf Datei in store

    constructor(obj:any , id:string){
        this.id = id || '';
        this.creator = obj.creator || '';
        this.date = this.getDate(obj.date) || '';
        this.content = obj.content || '';
        this.answers = obj.answers || [];
        this.reactions = obj.Reaction || [];
        this.files = obj.files || [];
    }

    private getDate(time :number){
        return  new Date(time);
    }
}
