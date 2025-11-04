import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Import the components
import { AddTodoForm } from '../../components/add-todo-form/add-todo-form';
import { TodoList } from '../../components/todo-list/todo-list';

@Component({
  selector: 'app-home',
  standalone: true,
  // 2. Add them to the imports array
  imports: [CommonModule, AddTodoForm, TodoList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

}