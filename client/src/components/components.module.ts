import { NgModule } from '@angular/core';
import { CanvasDrawComponent } from './canvas-draw/canvas-draw';
import { NoteComponent } from './note/note';
@NgModule({
	declarations: [CanvasDrawComponent,
    NoteComponent],
	imports: [],
	exports: [CanvasDrawComponent,
    NoteComponent]
})
export class ComponentsModule {}
