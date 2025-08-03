export default function localStorageAvailable(){
    try{
      const key='_storage_avaliable';
      window.localStorage.setItem(key,key);
      window.localStorage.removeItem(key);
    }catch(err){
        console.log(err);
        
        return false;
    }
}