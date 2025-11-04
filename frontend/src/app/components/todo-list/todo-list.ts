import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../todo.interface'; // Import our interface
import { TodoService } from '../../todo'; // Import our service
import { TodoItemComponent } from '../todo-item/todo-item'; // <-- 1. Import the child

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule,TodoItemComponent], // Add CommonModule for *ngFor
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList implements OnInit {
  
  private todoService = inject(TodoService);

  public todos: Todo[] = []; // This array will now be filled by the service

  ngOnInit(): void {
    // 1. Subscribe to the "bulletin board" (todos$)
    // This will update the 'this.todos' array whenever the board changes.
    this.todoService.todos$.subscribe(
      (data) => {
        this.todos = data;
        console.log('Todo list component updated!', this.todos);
      }
    );

    // 2. Tell the service to fetch the *initial* list.
    this.todoService.loadTodos();
  }
}