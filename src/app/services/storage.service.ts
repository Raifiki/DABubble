import { Injectable } from '@angular/core';

// import firebase
import { StorageReference, deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

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
    await uploadBytes(ref(this.getUserRef(userID),'customProfileIMG'), file)
    .then(() => {console.log(file.name, 'uploaded', 'to user storage');})
    .catch((err) => {alert('upload failed:' + err);});
  }

  async getFileURL(storageRef: StorageReference, fileName: string){
    getDownloadURL(ref(storageRef, fileName))
    .then((url) => {
      console.log(url);
      return url;
    })
    .catch((err) => {alert('download file URL not possible:' + err)});
  }

  async deleteFile(storageRef: StorageReference, fileName: string){
    deleteObject(ref(storageRef,fileName))
      .then(() => {console.log(fileName, 'wurde gelöscht');})
      .catch((err) => {alert('file konnte nicht gelöscht werden :' + err)});
  }

  getBucketRef(){
    return ref(this.storage);
  }

  getDirectMessagesRef(msgID: string){
    return ref(this.storage,'directMessages/' + msgID);
  }

  getChannelRef(channelID: string){
    return ref(this.storage,'channels/' + channelID);
  }

  getChannelMsgRef(channelID: string, msgID: string){
    return ref(this.getChannelRef(channelID),msgID);
  }

  getUserRef(userID: string){
    return ref(this.storage,'Users/' + userID);
  }


}
