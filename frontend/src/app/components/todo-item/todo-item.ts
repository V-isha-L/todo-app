import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import for [class] and *ngIf
import { Todo } from '../../todo.interface';
import { TodoService } from '../../todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule], // <-- Add CommonModule
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss'
})
export class TodoItemComponent {
  
  // 1. Inject the service
  private todoService = inject(TodoService);

  // 2. This @Input() decorator allows the parent (todo-list)
  // to pass the 'todo' object in. The '!' means it's required.
  @Input() todo!: Todo;

  // 3. This runs when the user clicks the "Delete" button
  onDelete(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoService.deleteTodo(this.todo._id).subscribe(
        () => console.log('Todo deleted'),
        (err) => console.error('Error deleting todo:', err)
      );
    }
  }

  // 4. This runs when the user clicks the checkbox
  onToggleComplete(): void {
    const changes = { isCompleted: !this.todo.isCompleted };

    this.todoService.updateTodo(this.todo._id, changes).subscribe(
      () => console.log('Todo updated'),
      (err) => console.error('Error updating todo:', err)
    );
  }
}