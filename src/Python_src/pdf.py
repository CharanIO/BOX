from PyPDF2 import PdfReader

def extrctinfo(pdfpath):
    with open(pdfpath,'rb') as f:
        pdf=PdfReader(f)
        information=pdf.metadata
        noofpages=len(pdf.pages)
       # noofpages=pdf.getNumPages()

        txt = f"""
          Information about {pdfpath}: 
           Author: {information.author}
           Creator: {information.creator}
            Producer: {information.producer}
           Subject: {information.subject}
           Title: {information.title}

           
           Number of pages: {noofpages}
           """

        print(txt)
    return information
pdfpath="pdflocation"
extrctinfo(pdfpath)