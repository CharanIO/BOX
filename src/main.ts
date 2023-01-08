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

listen('tauri://file-drop',event=>{
  let url=(event.payload).toString();
  console.log(url);
  let convertedUrl= convertFileSrc(url);
  console.log(convertedUrl);
})

// Get the canvas element
const canvas = document.getElementById('pdf');
pdfjs.GlobalWorkerOptions.workerSrc = "../node_modules/pdfjs-dist/build/pdf.worker.js";
// Load the PDF
pdfjs.getDocument('src\\Rise_of_Augmented_Reality_Current_and_Future_Appli.pdf').promise.then((pdf) => {
  // Render the PDF on the canvas
  pdf.getPage(2).then((page) => {
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





