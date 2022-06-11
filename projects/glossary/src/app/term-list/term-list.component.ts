import { Component, OnInit } from '@angular/core';
import { AirtableService } from '../airtable.service';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.less']
})
export class TermListComponent implements OnInit {

  constructor(public airtable: AirtableService) { }

  ngOnInit(): void {
  }

}
