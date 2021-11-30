import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Output() selected = new EventEmitter<Todo>();
  constructor() {}

  ngOnInit(): void {}
}
