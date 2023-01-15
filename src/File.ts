import * as sharp from 'sharp';

export class files
{
   name:string;
   size:number;
  
   location:string;

   constructor(_name:string,_size:number,_location:string)
   {
    this.name=_name;
    this.size=_size;
    this.location=_location;
   }


}
/**
 * It is to get the extension of the file from the location which is get from tauri:file-drop
 * @param location 
 * @returns extension of the file
 */
export function type(location:string):string
{
 let ext:string=location.split('.').pop();
 return ext;
}

export function imgshrink(imgpath:string){
    const metadata=sharp(imgpath).metadata();
    return metadata;

}
