import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectComponent } from '../../controls/select/select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { Observable } from 'rxjs';
import { IFormatedProject } from 'src/app/shared/types/project.types';
import { selectProjects } from 'src/app/store/projects/projects.selectors';
import { getProjectsAction } from 'src/app/store/projects/project.actions';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@UntilDestroy()
@Component({
  selector: 'cv-gen-projects-modal',
  standalone: true,
  imports: [CommonModule, SelectComponent, ReactiveFormsModule, TranslateModule, MatButtonModule],
  templateUrl: './projects-modal.component.html',
  styleUrls: ['./projects-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ProjectsModalComponent>,
    private store: Store<IAppState>
  ) {}

  projects$: Observable<IFormatedProject[]> = this.store.pipe(select(selectProjects));

  options: IFormatedProject[];

  ngOnInit() {
    this.store.dispatch(getProjectsAction());

    this.projects$.pipe(untilDestroyed(this)).subscribe(projects => {
      if (!projects) return;
      this.options = projects;
    });
  }

  formControl = new FormControl();

  handleSubmit() {
    this.closeDialog();
  }

  handleClose() {
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close(this.formControl.value);
  }
}
