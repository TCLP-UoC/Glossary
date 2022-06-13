import { Component, OnInit } from '@angular/core';
import { AirtableService } from '../airtable.service';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.less']
})
export class TermListComponent implements OnInit {
  
  private _terms: any[] = [];
  terms: any[] = [];
  queryStr: string = '';

  constructor(public airtable: AirtableService) {
    airtable.terms.subscribe(terms => {
      this._terms = terms;
      this.terms = terms;
    });
  }

  ngOnInit(): void {
  }

  set query(value: string) {
    if (value) {
      this.terms = this._terms.filter(term => term.title.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.terms = this._terms;
    }
    this.queryStr = value;
  }
}
