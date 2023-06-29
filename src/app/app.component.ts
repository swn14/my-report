import { Component } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private storage: StorageMap) {}
  title = 'my-report';

  onSubmit(
    value: Partial<{
      year: number | null;
      month: string | null;
      hours: number | null;
      placements: number | null;
      videoShowings: number | null;
      returnVisits: number | null;
      bibleStudies: number | null;
    }>
  ) {
    console.log(value);
    console.log('submit event happened!');
    this.storage.set(`${value.year}-${value.month}`, value).subscribe();
  }
}
