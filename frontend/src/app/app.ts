import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { AddTodoForm} from './components/add-todo-form/add-todo-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddTodoForm, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
