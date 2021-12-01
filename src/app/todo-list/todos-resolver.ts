import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, first, Observable, tap } from 'rxjs';
import { TodoEntityService } from './todo-entity.service';

@Injectable()
export class TodosResolver implements Resolve<boolean> {
  constructor(private todoEntityService: TodoEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.todoEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.todoEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
