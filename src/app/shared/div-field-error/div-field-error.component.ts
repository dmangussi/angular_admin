import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'div-field-error',
  templateUrl: './div-field-error.component.html',
  styleUrls: ['./div-field-error.component.scss']
})
export class DivFieldErrorComponent implements OnInit {

  @Input() msgError: string;
  @Input() showError: boolean;

  constructor() { }

  ngOnInit() {
  }

}
