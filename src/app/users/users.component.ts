import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;
  successMessage: boolean;
  errorMessage: boolean;
  errorResponse: Response;

  rules: Array<any> = [
    {description: 'Admin', value: 'ROLE_ADMIN'},
    {description: "Normal", value: 'ROLE_NORMAL'},
    {description: "Guess", value: 'ROLE_GUESS'}
  ];

  constructor
  (
    private formBuilder: FormBuilder,
    private http: Http
  ) {}

  ngOnInit()
  {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });
  }

  onSubmit()
  {
    this.successMessage = false;
    this.errorMessage = false;

    this.http.post('https://httpbin.org/post', JSON.stringify(this.userForm.value))
      .map(res => res)
      .subscribe
      (
        data =>
        {
          console.log(data);
          this.resetForm();
          this.successMessage = true;
        },
        (error: Response) =>
        {
          console.log(error);
          this.errorResponse = error;
          this.errorMessage = true;
        }
      );
  }

  resetForm()
  {
    this.userForm.reset();
  }

  verifyValidTouched(field : string)
  {
    return !this.userForm.get(field).valid && this.userForm.get(field).touched;
  }

  applyCSSError(field : string)
  {
    if (this.verifyValidTouched(field)) {
      return 'has-danger'
    }
  }

  getFieldError(field) : ValidationErrors
  {
    let errors: Array<string> = new Array<string>();

    if (this.userForm.get(field).errors)
    {
      if (this.userForm.get(field).errors['required'])
      {
        errors.push("This field is required");
      }
      if (this.userForm.get(field).errors['minlength'])
      {
        errors.push("Minimum length: " + this.userForm.get(field).errors['minlength'].requiredLength);
      }
      if (this.userForm.get(field).errors['maxlength'])
      {
        errors.push("Maximum length: " + this.userForm.get(field).errors['maxlength'].requiredLength);
      }

      return errors;
    }
  }
}
