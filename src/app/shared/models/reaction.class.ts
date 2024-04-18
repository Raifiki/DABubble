//import classes
import { User } from "./user.class";


export class Reaction {
    imgPath:string;
    user: User[] = [];

    reactionList:{
        reaction1: string;
        reaction2: string;
        reaction3: string;
    } = {
        reaction1: 'path1',
        reaction2: 'path2',
        reaction3: 'path3',
    }; 

    constructor(reactionType:'reaction1'|'reaction2'|'reaction3'){
        this.imgPath = this.reactionList[reactionType];
    }

    addUser(user:User){
        let userExist = this.user.find((element) => element == user );
        if (!userExist) this.user.push(user);
    }

    deleteUser(user:User){
        let idx = this.user.findIndex((element) => element == user );
        this.user.splice(idx,1)
    }

}
