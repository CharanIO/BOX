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
    const viewport = page.getViewport({scale: 1});
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({
      canvasContext: context,
      viewport: viewport
    });
  });
});
})

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












