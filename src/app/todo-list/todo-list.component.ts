import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoEntityService } from './todo-entity.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  constructor(private router: Router, private todoEntityService: TodoEntityService) {}

  ngOnInit(): void {
    this.todos$ = this.todoEntityService.entities$;
  }

  selectedTodo(todo: Todo): void {
    console.log(todo);
    this.router.navigate(['/todo/', todo.id]);
  }
}
