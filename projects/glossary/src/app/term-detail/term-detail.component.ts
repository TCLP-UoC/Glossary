import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirtableService } from '../airtable.service';
import { MarkdownService } from '../markdown.service';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.less']
})
export class TermDetailComponent implements OnInit {
  
  termId: string;
  term: any = {};
  definitions: any[] = [];
  references: string[] = [];
  disclaimerOpen = false;

  constructor(private airtable: AirtableService, private route: ActivatedRoute, public md: MarkdownService) {
    this.termId = this.route.snapshot.paramMap.get('id') || '';
    this.airtable.getTerm(this.termId).subscribe((term: any) => {
      this.term = term;
      this.airtable.getDefinitions(term.definitions).subscribe((definitions: any[]) => {
        console.log('definitions', definitions);
        this.definitions = definitions;
      });
      this.airtable.getReferences(term.references).subscribe((references: any[]) => {
        console.log('references', references);
        this.references = references;
      });
    });
  }

  ngOnInit(): void {
  }

}
