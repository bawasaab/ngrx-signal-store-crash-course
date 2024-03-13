import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoStore } from './todos.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from "./todos-list/todos-list.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, JsonPipe, TodosListComponent, MatProgressSpinnerModule]
})
export class AppComponent implements OnInit {
  title = 'ngrx-signal-store-crash-course';

  store = inject(TodoStore)

  ngOnInit(): void {
    this.loadTodos().then(() => {
      console.log('todos loaded')
    })
  }

  async loadTodos() {
    await this.store.loadAll()
  }
}
