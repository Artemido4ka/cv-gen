import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cv-gen-component-examples',
  templateUrl: './component-examples.component.html',
  styleUrls: ['./component-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentExamplesComponent {

  constructor(private fb: FormBuilder) {}

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    textarea: ['textarea text', [Validators.required]],
  });

  onSubmit(): void {
    console.log(this.loginForm, 'FORm');
    console.log('Submitted !', this.loginForm.value);
  }
}
