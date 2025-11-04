import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../todo'; // Our service

@Component({
  selector: 'app-add-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-todo-form.html',
  styleUrl: './add-todo-form.scss'
})
export class AddTodoForm {

  // 1. Inject the services we need
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);

  // 2. Create the FormGroup
  public todoForm: FormGroup;

  constructor() {
    // 3. Define the form's structure and validators
    this.todoForm = this.fb.group({
      taskName: ['', Validators.required], // taskName is required
      priority: ['Medium'], // Default value
      dueDate: [null]
    });
  }

  // 4. This method runs when the form is submitted
  onSubmit(): void {
    if (this.todoForm.invalid) {
      console.log('Form is invalid');
      return; // Don't submit if invalid
    }

    console.log('Form data:', this.todoForm.value);

    // 5. Send the form data to our service
    this.todoService.addTodo(this.todoForm.value).subscribe(
      (newTodo) => {
        console.log('Successfully added new todo:', newTodo);
        // 6. Reset the form to its default state
        this.todoForm.reset({
          taskName: '',
          priority: 'Medium',
          dueDate: null
        });
      },
      (error) => {
        console.error('Error adding todo:', error);
      }
    );
  }
}