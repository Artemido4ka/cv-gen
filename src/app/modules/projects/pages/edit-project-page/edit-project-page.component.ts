import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { requiredValidator } from 'src/app/shared/validators/required.validator';

@Component({
  selector: 'cv-gen-edit-project-page',
  templateUrl: './edit-project-page.component.html',
  styleUrls: ['./edit-project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectPageComponent {
  constructor(private fb: FormBuilder) {}

  projectForm = this.fb.group({
    projectName: ['', [requiredValidator('shared.errors.input.required')]],
    startDate: [''],
    endDate: [''],
    teamSize: [''],
    description: [''],
    teachStack: [[]],
    roles: [[]],
    responsibilities: [[]],
  });

  teachStackOptions = ['tech1', 'tech2', 'tech3'];
  rolesOptions = ['roles1', 'roles2', 'roles3'];
  responsibilitiesOptions = ['responsibility1', 'responsibility2', 'responsibility3'];
}
