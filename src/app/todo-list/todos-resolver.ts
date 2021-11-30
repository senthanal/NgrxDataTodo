import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { TodoEntityService } from './todo-entity.service';

@Injectable()
export class TodosResolver implements Resolve<boolean> {
  constructor(private todoEntityService: TodoEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.todoEntityService.getAll().pipe(map((todos) => !!todos));
  }
}
