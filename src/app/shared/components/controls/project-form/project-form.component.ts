import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteSelectComponent } from '../autocomplete-select/autocomplete-select.component';

@Component({
  selector: 'cv-gen-project-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    DatepickerComponent,
    AutocompleteSelectComponent,
    TextareaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent {
  @Input() projectForm: FormGroup;

  teachStackOptions = ['tech1', 'tech2', 'tech3'];
  rolesOptions = ['roles1', 'roles2', 'roles3'];
  responsibilitiesOptions = ['responsibility1', 'responsibility2', 'responsibility3'];
}
