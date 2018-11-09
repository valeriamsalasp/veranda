import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { NoteComponent } from '../../components/note/note';
import { IonicModule } from 'ionic-angular';


@NgModule({
  declarations: [
    NoteComponent,
  ],
  imports: [
    NoteComponent,
    IonicPageModule.forChild(HomePage),
    IonicModule
  ],
    entryComponents: [NoteComponent]
})
export class HomePageModule {}
