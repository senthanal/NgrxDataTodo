import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EntityDataModuleConfig, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { TodoComponent } from '../todo/todo.component';
import { TodoEntityService } from './todo-entity.service';
import { TodoListComponent } from './todo-list.component';
import { TodosResolver } from './todos-resolver';

const entityMetadata: EntityMetadataMap = {
    Todo: {
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    }
};

const pluralNames = { Todo: 'Todos' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

@NgModule({
  declarations: [TodoListComponent, TodoComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  providers: [TodoEntityService, TodosResolver],
})
export class TodoListModule {
  constructor(private entityDefinitionService: EntityDefinitionService) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
  }
}
