import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@models/index';
import { createCustomerDto, Customer } from '@models/index';
import { MyValidators } from 'app/utils/validators';
import { ChangePasswordDialogComponent } from '@modules/website/components/change-password-dialog/change-password-dialog.component';
import { UsersService } from 'app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '@models/index';
import { MessageService } from 'app/services/message.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthStateModel, Logout } from 'app/store/auth/auth.actions';
import { AuthState } from 'app/store/auth/auth.state';

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
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private message: MessageService,
    public dialog: MatDialog,
    private store: Store
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

  @Select(AuthState) user$!: Observable<AuthStateModel>;

  ngOnInit(): void {
    this.usersService.getCustomer().subscribe({
      next: (customer) => {
        this.customer = customer;
        console.log('Customer', customer);
        this.form.patchValue(customer);
      },
      error: (err) => {
        console.log('Err', err);
      },
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
          // this.authService.logout();
          this.store.dispatch(new Logout());
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
