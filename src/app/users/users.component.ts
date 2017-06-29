import { Checkbox } from './../shared/checkbox';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, FormArray } from '@angular/forms';
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
  rules: Array<Checkbox> = [
    {description: 'Admin', value: 'ROLE_ADMIN'},
    {description: "Normal", value: 'ROLE_NORMAL'},
    {description: "Guess", value: 'ROLE_GUESS'},
  ];

  constructor
  (
    private formBuilder: FormBuilder,
    private http: Http
  ) {}

  ngOnInit()
  {
    let arrayRules: FormArray = new FormArray([]);
    for (let i = 0; i < this.rules.length; i++)
    {
      let formGroup = new FormGroup({});
      formGroup.addControl(this.rules[i].value, new FormControl(false));
      arrayRules.push(formGroup);
    }

    this.userForm = this.formBuilder.group
    ({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      rules: arrayRules
    });
  }

  onSubmit()
  {
    console.log(JSON.stringify(this.userForm.value))

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
    if (this.verifyValidTouched(field))
    {
      return 'has-danger'
    }
  }

  getFieldError(field: string) : Array<string>
  {
    let errors: Array<string> = new Array<string>();
    let vErrors: ValidationErrors = this.userForm.get(field).errors;

    if (vErrors)
    {
      if (vErrors['required'])
      {
        errors.push("This field is required");
      }
      if (vErrors['minlength'])
      {
        errors.push("Minimum length: " + vErrors['minlength'].requiredLength);
      }
      if (vErrors['maxlength'])
      {
        errors.push("Maximum length: " + vErrors['maxlength'].requiredLength);
      }

      return errors;
    }
  }
}
