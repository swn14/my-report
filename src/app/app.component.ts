import { Component } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, map, mergeMap, switchMap, toArray } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private storage: StorageMap) {}
  refreshReports$ = new BehaviorSubject<boolean>(true);
  title = 'my-report';
  reports$ = this.refreshReports$.pipe(
    switchMap((_) =>
      this.storage.keys().pipe(
        mergeMap((key) => {
          return this.storage.get<
            Partial<{
              year: number | null;
              month: string | null;
              monthNumber: number | null;
              hours: number | null;
              placements: number | null;
              videoShowings: number | null;
              returnVisits: number | null;
              bibleStudies: number | null;
            }>
          >(key, {
            type: 'object',
            properties: {
              year: { type: 'number' },
              month: { type: 'string' },
              monthNumber: { type: 'number' },
              hours: { type: 'number' },
              placements: { type: 'number' },
              videoShowings: { type: 'number' },
              returnVisits: { type: 'number' },
              bibleStudies: { type: 'number' },
            },
          });
        }),
        toArray(),
        map((list, i) => {
          return list.sort((a, b) => {
            const objectAMonthNumber = a?.monthNumber ?? 0;
            const objectBMonthNumber = b?.monthNumber ?? 0;
            return objectBMonthNumber - objectAMonthNumber;
          });
        })
      )
    )
  );

  onSubmit(
    value: Partial<{
      year: number | null;
      month: string | null;
      monthNumber: string | null;
      hours: number | null;
      placements: number | null;
      videoShowings: number | null;
      returnVisits: number | null;
      bibleStudies: number | null;
    }>
  ) {
    this.storage
      .set(`${value.year}-${value.month}`, value)
      .subscribe((_) => this.refreshReports$.next(true));
  }

  onAppendFormSubmit(
    value: Partial<{
      year: number | null;
      month: string | null;
      monthNumber: string | null;
      hours: number | null;
      placements: number | null;
      videoShowings: number | null;
      returnVisits: number | null;
      bibleStudies: number | null;
    }>
  ) {
    this.storage.get(`${value.year}-${value.month}`).subscribe((report) => {
      let existingReport: any = report;
      if (existingReport == null) {
        return;
      }
      const newValue = {
        year: existingReport.year,
        month: existingReport.month,
        monthNumber: existingReport.monthNumber,
        hours: existingReport.hours + value.hours,
        placements: existingReport.placements + value.placements,
        videoShowings: existingReport.videoShowings + value.videoShowings,
        returnVisits: existingReport.returnVisits + value.returnVisits,
        bibleStudies: existingReport.bibleStudies + value.bibleStudies,
      };
      this.storage
        .set(`${newValue.year}-${newValue.month}`, newValue)
        .subscribe((_) => this.refreshReports$.next(true));
    });
  }
}
