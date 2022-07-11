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
  activeLetter_: string = '';
  letters: string[] = [];

  constructor(public airtable: AirtableService) {
    airtable.terms.subscribe(terms => {
      this._terms = terms;
      this.terms = terms;
      for (const term of terms) {
        const title: string = term.title.toUpperCase();
        if (!this.letters.includes(title[0])) {
          this.letters.push(term.title[0]);
        }
        this.letters.sort()
      }
    });
  }

  ngOnInit(): void {
  }

  set query(value: string) {
    if (value) {
      this.activeLetter_ = '';
      this.terms = this._terms.filter(term => term.title.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.terms = this._terms;
    }
    this.queryStr = value;
  }

  get query(): string {
    return this.queryStr;
  }

  set activeLetter(value: string) {
    if (this.activeLetter === value) {
      value = '';
    }
    this.activeLetter_ = value;
    this.query = '';
    if (value) {
      this.terms = this._terms.filter(term => term.title.toLowerCase().startsWith(value.toLowerCase()));
    } else {
      this.terms = this._terms;
    }
  }

  get activeLetter(): string {
    return this.activeLetter_;
  }

}
