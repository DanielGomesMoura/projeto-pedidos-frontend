import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog-component',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './confirm-dialog-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponentComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {} // Correção: Uso do @inject e MAT_DIALOG_DATA

  ngOnInit(): void {
  }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
