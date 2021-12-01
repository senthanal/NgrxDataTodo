import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, first, map, Observable, tap } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoEntityService } from '../todo-list/todo-entity.service';

@Injectable()
export class EditTodoResolver implements Resolve<Todo> {
  constructor(private todoEntityService: TodoEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo> {
    const id = route.paramMap.get('id');
    return this.todoEntityService.entities$.pipe(
      map((entities) =>
        entities.find((entity) => entity.id === (id ? parseInt(id, 10) : -1))
      ),
      map((response) => response as Todo),
      filter((todo) => todo.hasOwnProperty('id')),
      tap((todo) => console.log(todo)),
      first()
    );
  }
}
