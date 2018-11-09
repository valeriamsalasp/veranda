import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';
import { NoteComponent } from '../../components/note/note';

@NgModule({
  declarations: [
    NoteComponent,
    IonicModule
  ],
  imports: [
    IonicPageModule.forChild(NoteComponent),
  ],
})
export class IonicComponentModule {}