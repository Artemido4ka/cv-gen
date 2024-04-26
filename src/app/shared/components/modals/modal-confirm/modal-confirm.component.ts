import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cv-gen-modal-confirm',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatButtonModule],
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { method: () => void; message: string },
    private dialogRef: MatDialogRef<ModalConfirmComponent>
  ) {
    this.message = data.message;
  }

  message: string;

  handleSubmit() {
    this.data.method();
    this.closeDialog();
  }

  handleClose() {
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
