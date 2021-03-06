import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegularFormComponent } from './components/regular-form/regular-form.component';
import { MultitypeFieldComponent } from './components/multitype-field/multitype-field.component';
import { SingleMultitypeFieldComponent } from './components/single-multitype-field/single-multitype-field.component';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SpinnerModule } from 'primeng/spinner';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [
    AppComponent,
    RegularFormComponent,
    MultitypeFieldComponent,
    SingleMultitypeFieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    TabViewModule,
    SpinnerModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    SelectButtonModule,
    ScrollPanelModule,
    OverlayPanelModule,
    DialogModule,
    ListboxModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
