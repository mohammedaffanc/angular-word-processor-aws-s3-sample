import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ClickEventArgs } from '@syncfusion/ej2-navigations'
import { DocumentEditorContainerModule, CustomToolbarItemModel } from '@syncfusion/ej2-angular-documenteditor'



import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

/**
 * Document Editor Component
 */
@Component({
imports: [
        
        DocumentEditorContainerModule,AppComponent
    ],


      standalone: true,
      selector: 'app-root',
      template: `<ejs-documenteditorcontainer #documenteditor_default height="600px" style="width:100%;display:block" [toolbarItems]=items [enableToolbar]=true (toolbarClick)="onToolbarClick($event)"></ejs-documenteditorcontainer>`,
      encapsulation: ViewEncapsulation.None,
      providers: [ToolbarService]
})
export class AppComponent {
    @ViewChild('documenteditor_default')
    public container!: DocumentEditorContainerComponent;
    public toolItem: CustomToolbarItemModel = {
        prefixIcon: "e-de-ctnr-open",
        tooltipText: "Open from AWS S3",
        text: "Open from AWS S3",
        id: "Open"
  };
  public save: CustomToolbarItemModel = {
    prefixIcon: "e-save icon",
    tooltipText: "Save to AWS S3",
    text: "Save to AWS S3",
    id: "Save"
};
  public items = ['New',this.toolItem, this.save,'Separator','Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'Comments', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'Separator', 'Find', 'Separator', 'LocalClipboard', 'RestrictEditing'];
  public onToolbarClick(args: ClickEventArgs): void {
      switch (args.item.id) {
            case 'Open':
            this.OpenFromS3();
            break;

            case 'Save':
            this.SaveToS3();
            break;
      }
  };
  public OpenFromS3():void{
    
        let http: XMLHttpRequest = new XMLHttpRequest();
        //add the documentName in which you want to open document inside the documentName
        let content = { documentName: 'Getting Started.docx' };
        let baseurl: string = 'http://localhost:62870/api/documenteditor/LoadFromS3';
        http.open('POST', baseurl, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.onreadystatechange = () => {
          if (http.readyState === 4) {
            if (http.status === 200 || http.status === 304) {
              //open the SFDT text in Document Editor
              this.container.documentEditor.open(http.responseText);
              this.container.documentEditor.documentName = content.documentName;
            }
          }
        };
        http.send(JSON.stringify(content));
  };
  public SaveToS3(): void {
    // Export the document as a Blob object.
    this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
        // Now, save the document wherever you want.
        let formData: FormData = new FormData();
        formData.append('documentName', this.container.documentEditor.documentName);
        formData.append('file', exportedDocument);
        
        /* tslint:disable */
        let req = new XMLHttpRequest();
        // Replace your running URL here.
        req.open('POST', 'http://localhost:62870/api/documenteditor/SaveToS3', true);
        
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status === 304) {
                    console.log('Saved successfully');
                }
            }
        };
        
        req.send(formData);
    });
}
    
}