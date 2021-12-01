import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoEntityService } from '../todo-list/todo-entity.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoEntityService: TodoEntityService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.todoEntityService.entities$
      .pipe(
        map((entities) => entities?.length),
        first()
      )
      .subscribe((count) => {
        const value: Todo = this.form.getRawValue();
        if (value.title || value.content) {
          this.todoEntityService.add({
            id: count + 1,
            title: value.title,
            content: value.content,
          } as Todo);
        }
      });
  }
}
