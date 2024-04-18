// import interfaces
import { User } from "../interfaces/interfaces";

//import classes
import { Message } from "./message.class";

export class Channel {
    id: string;
    name:string;
    description: string;
    members: User[];
    creator: User;
    messages: Message[];

    constructor(id:string, name:string, creatorID:string, description?:string, memberIDs?:string[], messages?: Message[]){
        this.id = id;
        this.name = name;
        this.creator = this.createUserObject(creatorID);
        this.description = description || '';
        this.members = (memberIDs)? this.createMemberList(memberIDs) : [];
        this.messages = messages || [];
    }

    createUserObject(userID: string): User{
        // add code to get User from Backend
        return {
                id:'dummyIDSignedInUser',
                name: 'Leo Weiß',
                avatarImgPath: 'assets/img/avatar/avatar1.svg',
                email: 'test@dev.com',
                status: 'Aktiv' ,
                password: 'Test12345!',
              };
    }

    createMemberList(userIDs:string[]): User[]{
        let userList:User[] = [];
        userIDs.forEach(userID => {
            userList.push(this.createUserObject(userID));
        });
        return userList;
    }

    getCleanBEJSON(){
        return {
            creatorID: this.creator.id,
            description: this.description,
            name: this.name,
            userID: this.members.map(member => member.id),
        }
    }
}
