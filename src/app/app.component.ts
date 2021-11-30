import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, pluck } from 'rxjs';

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

  constructor(private router: Router) {}

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

  deleteTodo(): void {}
}
