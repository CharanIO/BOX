// import { invoke } from "@tauri-apps/api/tauri";

// let greetInputEl: HTMLInputElement | null;
// let greetMsgEl: HTMLElement | null;

// async function greet() {
//   if (greetMsgEl && greetInputEl) {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     greetMsgEl.textContent = await invoke("greet", {
//       name: greetInputEl.value,
//     });
//   }
// }

// window.addEventListener("DOMContentLoaded", () => {
//   greetInputEl = document.querySelector("#greet-input");
//   greetMsgEl = document.querySelector("#greet-msg");
//   document
//     .querySelector("#greet-button")
//     ?.addEventListener("click", () => greet());
// });

import * as pdfjs from 'pdfjs-dist';
import {listen} from '@tauri-apps/api/event';
import {convertFileSrc} from '@tauri-apps/api/tauri'

var convertedUrl:string;
var data:[];
listen('tauri://file-drop',event=>{
  let url=(event.payload).toString();
  console.log(url);
  convertedUrl= convertFileSrc(url);
  console.log(convertedUrl);

  const canvas = document.getElementById('pdf');
pdfjs.GlobalWorkerOptions.workerSrc = "../node_modules/pdfjs-dist/build/pdf.worker.js";
// Load the PDF "C:\\Users\\charan\\Downloads\\Juluri_Akhil_Kumar_Resume.pdf"
pdfjs.getDocument(convertedUrl).promise.then((pdf) => {
  // Render the PDF on the canvas
  pdf.getPage(1).then((page) => {
    const viewport = page.getViewport({scale:2});
    const context = canvas.getContext('2d');
    
    var resolution =  2 ; // for example

    canvas.height = resolution*viewport.height; //actual size
    canvas.width = resolution*viewport.width;

    canvas.style.height = viewport.height/2+"px"; //showing size will be smaller size
    canvas.style .width = viewport.width/2+"px";
    var rendertask=page.render({
      canvasContext: context,
      viewport: viewport,
      transform:[resolution, 0, 0, resolution, 0, 0]
    });
    rendertask.promise.then(()=>{
      var img=document.createElement("img");
      img.setAttribute('src',canvas.toDataURL('image/png'));
      document.body.appendChild(img);

     console.log(canvas.toDataURL('image/png'));
     
    });
  });
});
});





let file=document.getElementById("fileinput")?.addEventListener("change",(event)=>{
  var input=event.target;
  var file=input.files[0];
  console.log(event);
  console.log(file);
  var reader=new FileReader();
  reader.onload=()=>{
    var data=reader.result;
    console.log(data);
    // Get the canvas element

}
});












