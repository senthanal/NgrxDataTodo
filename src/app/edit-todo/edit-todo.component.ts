import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, debounceTime, filter } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoEntityService } from '../todo-list/todo-entity.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  todo!: Todo;
  titleControl = new FormControl();
  contentControl = new FormControl();

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoEntityService: TodoEntityService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.titleControl.valueChanges,
      this.contentControl.valueChanges,
    ])
      .pipe(
        filter(
          ([title, content]) => title !== undefined || content !== undefined
        ),
        debounceTime(400)
      )
      .subscribe(([title, content]) =>
        this.todoEntityService.update({
          id: this.todo.id,
          title,
          content,
        } as Todo)
      );
    this.activatedRoute.data.subscribe((data) => {
      this.todo = data['todo'];
      this.titleControl.setValue(data['todo'].title);
      this.contentControl.setValue(data['todo'].content);
    });
  }
}
