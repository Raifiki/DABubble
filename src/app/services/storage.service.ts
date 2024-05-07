import { Injectable } from '@angular/core';

// import firebase
import { StorageReference, deleteObject, getBlob, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = getStorage();

  constructor() { 
    console.log('ich bin der storage',this.getBucketRef().fullPath);
    
  }

  getLocalStorageData(key: string): any[]{
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : [];
  }

  async uploadFile(storageRef: StorageReference, file: File){
    await uploadBytes(ref(storageRef,file.name), file)
    .then(() => {console.log(file.name, 'uploaded', 'to' , storageRef.fullPath);})
    .catch((err) => {alert('upload failed:' + err);});
  }

  async uploadProfileIMG(userID:string, file: File){
    let fileName = 'customProfileIMG.' + file.name.split('.').slice(-1);
    await uploadBytes(ref(this.getUserRef(userID),fileName), file)
    .then(() => {console.log(file.name, 'uploaded', 'to user storage');})
    .catch((err) => {alert('upload failed:' + err);});
  }

  async getFileURL(storageRef: StorageReference, fileName: string){
    let url;
    try {url = await getDownloadURL(ref(storageRef, fileName));} 
    catch (error) {alert('File URL Error:' + error)}
    return url;
  }

  async deleteFile(storageRef: StorageReference, fileName: string){
    deleteObject(ref(storageRef,fileName))
      .then(() => {console.log(fileName, 'wurde gelöscht');})
      .catch((err) => {alert('file konnte nicht gelöscht werden :' + err)});
  }

  private getBucketRef(){
    return ref(this.storage);
  }

  private getDirectMessagesRef(msgID: string){
    return ref(this.storage,'directMessages/' + msgID);
  }

  getDirectMessagesMsgRef(dmID:string ,msgID: string){
    return ref(this.getChannelRef(dmID),msgID);
  }

  private getChannelRef(channelID: string){
    return ref(this.storage,'channels/' + channelID);
  }

  getChannelMsgRef(channelID: string, msgID: string){
    return ref(this.getChannelRef(channelID),msgID);
  }

  private getThreadRef(channelID: string, msgID: string){
    return ref(this.getChannelMsgRef(channelID,msgID),'thread/');
  };

  getThreadMsgRef(channelID: string, msgID: string, threadMsgID:string){
    return ref(this.getThreadRef(channelID, msgID),threadMsgID);
  };

  getUserRef(userID: string){
    return ref(this.storage,'Users/' + userID);
  }

  async downloadFile(storageRef: StorageReference, fileName: string){
    getBlob(ref(storageRef, fileName))
      .then(blob => {
        let blobURL = window.URL.createObjectURL(blob);
        let tempLink = document.createElement('a');
        tempLink.href = blobURL;
        tempLink.setAttribute('download', fileName);
        tempLink.click();
      })
      .catch(err => console.log('Download file failed:',err));
  }
}
