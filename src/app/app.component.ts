import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, first, map, Observable, pluck, tap } from 'rxjs';
import { TodoEntityService } from './todo-list/todo-entity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NgrxDataTodo';
  isListView$!: Observable<boolean>;
  isAddView$!: Observable<boolean>;
  isEditView$!: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoEntityService: TodoEntityService
  ) {}

  ngOnInit(): void {
    this.isListView$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      pluck('url'),
      map((url) => (url === '/' ? true : false))
    );
    this.isAddView$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      pluck('url'),
      map((url: any) => url.indexOf('/todo') > -1)
    );
    this.isEditView$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      pluck('url'),
      map((url: any) => {
        return /^\/todo\/[0-9]*$/.test(url);
      })
    );
  }

  deleteTodo(): void {
    const id = this.route.snapshot.children[0].paramMap.get('id');
    this.todoEntityService.entities$
      .pipe(
        map(
          (entities) =>
            entities.filter((entity) => {
              return entity.id === (id ? parseInt(id, 10) : -1);
            })[0]
        ),
        tap((todo) => {
          if (todo) {
            this.todoEntityService.delete(todo);
            this.router.navigateByUrl('/');
          }
        }),
        first()
      )
      .subscribe();
  }
}
