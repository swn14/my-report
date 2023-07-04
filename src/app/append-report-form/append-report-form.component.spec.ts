import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendReportFormComponent } from './append-report-form.component';

describe('AppendReportFormComponent', () => {
  let component: AppendReportFormComponent;
  let fixture: ComponentFixture<AppendReportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppendReportFormComponent]
    });
    fixture = TestBed.createComponent(AppendReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
