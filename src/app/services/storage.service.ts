import { Injectable } from '@angular/core';

// import firebase
import { StorageReference, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

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
    .then(() => {console.log(file, 'uploaded');})
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

  getBucketRef(){
    return ref(this.storage);
  }

  getDirectMessagesRef(msgID: string){
    return ref(this.storage,'directMessages/' + msgID);
  }

  getChannelRef(channelID: string){
    return ref(this.storage,'channels/' + channelID);
  }

  getUserRef(userID: string){
    return ref(this.storage,'Users/' + userID);
  }


}
