export class UserClass {
    name: string;
    channelIDs?: string[];
    directMessagesIDs?: string[];
    email: string;
    imgPath: string;
    status?: string;

  
    constructor(obj?: any) {
      this.name = obj ? obj.name : '';
      this.channelIDs = obj ? obj.channelIDs : '';
      this.directMessagesIDs = obj ? obj.directMessagesIDs : '';
      this.email = obj ? obj.email : '';
      this.imgPath = obj ? obj.imgPath : '';
      this.status = obj ? obj.status : '';

    }

    public toJSON() {
        return {
            name: this.name,
            channelIDs: this.channelIDs,
            directMessagesIDs: this.directMessagesIDs,
            email: this.email,
            imgPath: this.imgPath,
            status: this.status,
        }
    }

}