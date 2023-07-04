import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-append-report-form',
  templateUrl: './append-report-form.component.html',
  styleUrls: ['./append-report-form.component.scss'],
})
export class AppendReportFormComponent {
  @Output() public onSubmitEvent = new EventEmitter();
  private fb = inject(FormBuilder);
  currentDate = new Date();
  years = this.range(
    this.currentDate.getFullYear() - 1,
    this.currentDate.getFullYear() + 10
  );
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth();
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  myReportForm = this.fb.group({
    year: [this.currentYear, Validators.required],
    month: [this.months[this.currentMonth], Validators.required],
    monthNumber: [this.currentMonth, Validators.required],
    hours: [0, Validators.required],
    placements: 0,
    videoShowings: 0,
    returnVisits: 0,
    bibleStudies: 0,
  });

  range(start: number, end: number, step = 1) {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len)
      .fill(null)
      .map((_, idx) => start + idx * step);
  }

  onSubmit(): void {
    this.onSubmitEvent.emit(this.myReportForm.value);
  }
}
