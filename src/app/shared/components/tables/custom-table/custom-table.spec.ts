import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTableComponent } from './custom-table.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent<any>;
  let fixture: ComponentFixture<CustomTableComponent<any>>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomTableComponent,
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      //   declarations: [CustomTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    // component.columns = TEST_EMPLOYEE_TABLE_COLUMNS;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayedColumns correctly', () => {
    const columns = [
      { columnDef: 'name', header: 'Name' },
      { columnDef: 'age', header: 'Age' },
    ];
    component.columns = columns;

    component.ngOnInit();

    expect(component.displayedColumns).toEqual(['name', 'age']);
  });

  it('should navigate to linkUrl when handleRowClick is called', () => {
    const id = 123;
    const linkUrl = '/details';
    spyOn(router, 'navigate');
    component.linkUrl = linkUrl;

    component.handleRowClick(id);

    expect(router.navigate).toHaveBeenCalledWith([linkUrl, id]);
  });

  it('should set tableData paginator when ngAfterViewInit is called', () => {
    const tableData = new MatTableDataSource([]);
    component.tableData = tableData;

    const paginator = {
      page: jasmine.createSpyObj('MatPaginator', ['firstPage']),
    } as MatPaginator;

    component.ngAfterViewInit();

    expect(tableData.paginator).toBeTruthy();
  });
});
