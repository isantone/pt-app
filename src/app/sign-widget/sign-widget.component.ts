import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable, EMPTY } from 'rxjs';

import { SignService } from '../sign/sign.service';
import { SignFormComponent } from '../sign-form/sign-form.component';

import { ISignParams } from 'src/interfaces/user.interfaces';

@Component({
  selector: 'pt-sign-widget',
  templateUrl: './sign-widget.component.html',
  styleUrls: ['./sign-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignWidgetComponent {

  constructor(
    private readonly dialogService: MatDialog,
    private readonly signService: SignService,
  ) {}


  public get user$() {
    return this.signService.userStatusChanged$;
    // return EMPTY;
  }

  public signUser() {
    this.openSignForm()
      .subscribe((signParams) => {
        if (signParams) {
          this.signService.signUser(signParams);
        }
      });
  }

  private openSignForm() {
    const dialogRef = this.dialogService.open(SignFormComponent);

    return dialogRef.afterClosed() as Observable<ISignParams>;
  }

}
