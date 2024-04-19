export class User {
    id: string;
    name: string;
    channelIDs?: string[];
    directMessagesIDs?: string[];
    email: string;
    imgPath: string;
    status?: 'Aktiv' | 'Abwesend';
    password?:string;
    

  
    constructor(obj?: any) {
      this.id = obj? obj.id : '';
      this.name = obj ? obj.name : '';
      this.channelIDs = obj ? obj.channelIDs : '';
      this.directMessagesIDs = obj ? obj.directMessagesIDs : '';
      this.email = obj ? obj.email : '';
      this.imgPath = obj ? obj.imgPath : '';
      this.status = obj ? obj.status : 'Abwesend';
      this.password = obj ? obj.password : '';
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            channelIDs: this.channelIDs ? this.channelIDs : [],
            directMessagesIDs: this.directMessagesIDs ? this.directMessagesIDs : [],
            email: this.email,
            imgPath: this.imgPath,
            status: this.status,
        }
    }

}