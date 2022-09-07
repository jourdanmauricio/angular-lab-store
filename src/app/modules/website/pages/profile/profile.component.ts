import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { createCustomerDto, Customer } from 'src/app/models/customer.model';
import { MyValidators } from 'src/app/utils/validators';
import { ChangePasswordDialogComponent } from 'src/app/modules/website/components/change-password-dialog/change-password-dialog.component';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from 'src/app/models/confirm-dialog-data.models';
import { MessageService } from 'src/app/services/message.service';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/state/selectors/user.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  form: FormGroup;
  customer: Customer | null = null;
  documentTypes: string[] = ['DNI', 'LE', 'CUIT', 'CUIL', 'LC'];
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private message: MessageService,
    public dialog: MatDialog,
    private store: Store<any>
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', Validators.required],
      document_type: [
        '',
        [Validators.required, MyValidators.validDocumentType],
      ],
      document_number: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.store.select(getUser).subscribe((user) => (this.user = user));

    this.usersService.getCustomer().subscribe((customer) => {
      this.customer = customer;
      this.form.patchValue(customer);
    });
  }

  administration() {
    this.router.navigate(['cms']);
  }

  updateCustomer() {
    this.loading = true;
    const data: createCustomerDto = {
      name: this.form.value.name,
      last_name: this.form.value.last_name,
      document_type: this.form.value.document_type,
      document_number: this.form.value.document_number,
      phone: this.form.value.phone,
      user_id: this.user!.id,
    };
    if (this.customer?.id) {
      this.usersService.updateCustomer(this.user!.id, data).subscribe((res) => {
        this.message.showMsg('Perfil modificado', 'success');
        this.loading = false;
        this.router.navigate(['/home']);
      });
    } else {
      this.usersService.createCustomer(data).subscribe((res) => {
        this.message.showMsg('Perfil creado', 'success');
        this.loading = false;
        this.router.navigate(['/home']);
      });
    }
  }

  openDialogDeleteAccount(): void {
    const data: ConfirmDialogData = {
      title: '¿Estas seguro?',
      message: '¿Deseas eliminar tu usuario?',
      cancelText: 'No',
      confirmText: 'Si',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      autoFocus: '.actions>button',
      data: data,
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.usersService.delete(this.user!.id).subscribe(() => {
          this.authService.logout();
          this.router.navigate(['/home']);
        });
      }
    });
  }

  openDialogChangePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '290px',
      autoFocus: 'input',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);
    });
  }

  get nameValue() {
    return this.form.get('name');
  }

  get lastNameValue() {
    return this.form.get('last_name');
  }

  get documenTypeValue() {
    return this.form.get('document_type');
  }

  get documentNumberValue() {
    return this.form.get('document_number');
  }

  get phoneValue() {
    return this.form.get('phone');
  }
}
