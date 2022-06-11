import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { from, Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirtableService {

  API_KEY = 'key7jIbxK4zBiOYDr';

  terms = new ReplaySubject<any[]>(1);
  definitions = new ReplaySubject<any[]>(1);
  references = new ReplaySubject<any[]>(1);

  constructor(private http: HttpClient) {
    this.loadTable('Terms').subscribe((records: any[]) => this.terms.next(records))
    this.loadTable('Definitions').subscribe((records: any[]) => this.definitions.next(records))
    this.loadTable('References').subscribe((records: any[]) => this.references.next(records))
  }

  loadTableAux(table: string, accumulated: any[], offset?: string): Observable<any[]> {
    const headers = {
      'Authorization': `Bearer ${this.API_KEY}`
    };
    const params: any = {
      maxRecords: '10000',
      view: 'publish'
    };
    if (offset) {
      params['offset'] = offset;
    }
    return this.http.get(`https://api.airtable.com/v0/app78p8j3otk9SME6/${table}`, {headers, params}).pipe(
      switchMap((res: any) => {
        const combined = [...accumulated, ...res.records];
        if (res.offset) {
          return this.loadTableAux(table, combined, res.offset);
        } else {
          return from([combined]);
        }
      }),
    );
  }

  loadTable(table: string) {
    return this.loadTableAux(table, []).pipe(
      map((records: any) => {
        return records.map((record: any) => {
          const ret = record.fields;
          ret.key = record.id;
          return ret;
        });
      })
    );
  }

  getTerm(id: string) {
    return this.terms.pipe(
      map((terms: any[]) => terms.find((term: any) => term.id === id))
    );
  }

  getDefinitions(keys: string[]) {
    return this.definitions.pipe(
      map((definitions: any[]) => keys.map((key) => definitions.find((definition: any) => definition.key === key)))
    );
  }

  getReferences(keys: string[]) {
    return this.references.pipe(
      map((references: any[]) => 
        keys.map(
          (key) => references.find((references: any) => references.key === key)
        ).map(
          (reference: any) => reference.URL && reference.URL.indexOf('http') === 0 ? `[${reference.Title}](${reference.URL})` : reference.Title
        )
      )
    );
  }
}
