import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { employeesTableColumns } from '../../constants/employees.constant';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IFormatedEmployee } from 'src/app/shared/types/employees.types';
import { RequestStatusEnum } from 'src/app/shared/constants/request.status';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  selectEmployees,
  selectEmployeesReqStatus,
} from 'src/app/store/employees/employees-selectors';
import { getEmployeesAction } from 'src/app/store/employees/employees.actions';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

@UntilDestroy()
@Component({
  selector: 'cv-gen-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent implements OnInit {
  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) {}

  linkUrl = `${this.router.url}/${RoutingPaths.EDIT}`;
  employeesTableColumns = employeesTableColumns;
  employees: MatTableDataSource<IFormatedEmployee, MatTableDataSourcePaginator>;

  employees$: Observable<IFormatedEmployee[]> = this.store.pipe(select(selectEmployees));
  reqStatus$: Observable<RequestStatusEnum> = this.store.pipe(select(selectEmployeesReqStatus));

  ngOnInit(): void {
    this.store.dispatch(getEmployeesAction());

    this.employees$.pipe(untilDestroyed(this)).subscribe(employees => {
      if (!employees) return;
      this.employees = new MatTableDataSource(employees);
      this.cdRef.markForCheck();
    });
  }

  onSubmit() {
    this.router.navigate([RoutingPaths.ADD], { relativeTo: this.route });
  }
}
