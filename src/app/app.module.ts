import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DocumentEditorModule, DocumentEditorContainerModule, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';

@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    DocumentEditorModule, DocumentEditorContainerModule
  ],
  providers: [ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
