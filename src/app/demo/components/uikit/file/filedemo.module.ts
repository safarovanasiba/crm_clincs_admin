import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { FileDemoRoutingModule } from './filedemo-routing.module';
import { FileDemoComponent } from './filedemo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PickListModule } from 'primeng/picklist';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FileDemoRoutingModule,
		FileUploadModule,
		DragDropModule,
		PickListModule,
		CardModule,
		ChipModule,
		CalendarModule,
		DialogModule,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		FullCalendarModule,
		// BrowserModule,
    	// BrowserAnimationsModule,
	],
	declarations: [FileDemoComponent],
})
export class FileDemoModule { }
