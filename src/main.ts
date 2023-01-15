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
import * as sharp from 'sharp';
import * as pdfjs from 'pdfjs-dist';
import {listen} from '@tauri-apps/api/event';
import {convertFileSrc} from '@tauri-apps/api/tauri'
import {type,imgshrink} from './File'

var convertedUrl:string;
var data:[];
listen('tauri://file-drop',event=>{
  let url=(event.payload).toString();
  console.log(url);
  convertedUrl= convertFileSrc(url);
  console.log(convertedUrl);
  var extenstion=type(url);
  if(extenstion=='pdf')
  {
    const canvas = document.getElementById('pdf');
    pdfjs.GlobalWorkerOptions.workerSrc = "../node_modules/pdfjs-dist/build/pdf.worker.js";
    pdfjs.getDocument(convertedUrl).promise.then((pdf) => {
  // Render the PDF on the canvas
  pdf.getPage(1).then((page) => {
    

   
  
    // page.getTextContent().then(textContent => {
    //   // Initialize a variable to store the text
    //   console.log(textContent);
    //   textContent.items.push({str: "This is my added text", fontName:"g_d0_f1",hasEOL:true, dir: "ltr", width: 13, height: 12, transform: [15, 0, 0, 15, 171.53, 745.54]});
    //   let extractedText = '';
    //   for(var i=0;i<textContent.items.length;i++)
    //   {

    //     if(textContent.items[i].str==="Rise of Augmented Reality: Current and Future")
    //     {
    //        textContent.items[i].str="hi this is charan";

    //     }
    //   }
    //   // Iterate through the items of the text content object
    //   for (let item of textContent.items) {
    //     // Append the text to the variable
    //     extractedText += item.str;
    //   }
    //   // Log the extracted text
    //   console.log(extractedText);
    // });


  
     // Get the operator list for the page
    page.getOperatorList().then((optlist)=>{
      console.log(optlist);
      // Iterate through the operator list
      for(var i=0;i<optlist.fnArray.length;i++){
         // Check for image rendering operator
        if(optlist.fnArray[i]===pdfjs.OPS.paintImageXObject|| optlist.fnArray[i] === pdfjs.OPS.paintInlineImageXObject)
        {
            // Extract the image data
            var imagedata=optlist.argsArray[i][0];
            page.objs.get(imagedata,(args)=>{
              console.log(args);
              const data = new Uint8ClampedArray(args.width * args.height * 4);
              console.log(data);
              let k = 0;
              let i = 0;
              while (i < args.data.length) {
               data[k] = args.data[i]; // r
               data[k + 1] = args.data[i + 1]; // g
               data[k + 2] = args.data[i + 2]; // b
               data[k + 3] = 255; // a
       
               i += 3;
               k += 4;
              }
              console.log(args.data);
              let canvas=document.createElement('canvas');
              let ctx=canvas.getContext('2d');

              const imgData = ctx.createImageData(args.width, args.height);
              imgData.data.set(data);
              ctx.putImageData(imgData, 1, 1);
              document.body.appendChild(canvas);
             

            });
            console.log(imagedata);
        }

      }

      
    });
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
  }
  else if(extenstion=='jpeg'||extenstion=='png')
  {
    const meta=imgshrink(convertedUrl);
    console.log(meta);
  }
  
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












