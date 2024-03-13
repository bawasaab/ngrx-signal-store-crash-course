import { Component, effect, inject, viewChild } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";
import { MatButtonToggleGroup, MatButtonToggle, MatButtonToggleChange } from "@angular/material/button-toggle";
import { MatSelectionList, MatListOption } from "@angular/material/list";
import { TodoStore, TodosFilter } from '../todos.store';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, MatIcon, MatLabel, MatButtonToggleGroup, MatButtonToggle, MatSelectionList, MatListOption, NgStyle],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {

  store = inject(TodoStore)

  filter = viewChild.required(MatButtonToggleGroup)

  constructor() {
    effect(() => {
      const filter = this.filter()
      filter.value = this.store.filter()
    })
  }

  async onAddTodo(title: string) {
    await this.store.addTodo(title)
  }

  async onDeleteTodo(id: number, event: MouseEvent) {
    event.stopPropagation();

    await this.store.deleteTodo(id)
  }

  async onTodoToggled(id: number, completed: boolean) {
    await this.store.updateTodo(id, completed)
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter
    this.store.updateFilter(filter)
  }

}
