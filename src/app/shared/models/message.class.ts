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

    constructor(obj?:any , id?:string){
        this.id = id? id : '';
        this.creator = obj? obj.creator : '';
        this.date = obj? this.getDate(obj.date) : {} as Date;
        this.content = obj? obj.content : '';
        this.answers = obj? obj.answers : [];
        this.reactions = obj? obj.Reaction : [];
        this.files = obj? obj.files : [];
    }

    private getDate(time :number){
        return  new Date(time);
    }

    getCleanBEJSON(){
        return {
            creatorId: this.creator.id,
            date: this.date.getTime(),
            content: this.content,
            reaction: this.getReactionArray(),
            files: this.files,
        }
    }

    getReactionArray(){
        return []// store Reation in JSON for backend
    }

}
