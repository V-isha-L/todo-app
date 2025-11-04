import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from './todo.interface'; // <-- Import our interface

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // The 'inject' function is the modern way to get the HttpClient
  private http = inject(HttpClient);
  
  // This is the URL of your backend API
  private apiUrl = 'http://localhost:5000/api/todos';

  // 1. This is our "bulletin board". It holds the current list of todos.
  // We start it with an empty array.
  private _todos = new BehaviorSubject<Todo[]>([]);

  // 2. This is the public "stream" components can listen to.
  // We use .asObservable() to hide the "write" controls from them.
  public todos$ = this._todos.asObservable();

  // 3. This method fetches from the API and puts the list on the "board".
  loadTodos(): void {
    this.http.get<Todo[]>(this.apiUrl).subscribe(
      (data) => {
        this._todos.next(data); // <-- Push the new list to the board
      },
      (error) => {
        console.error('Error loading todos:', error);
      }
    );
  }

  
  // 4. GET all todos (now just returns the stream)
  // We don't use this one right now, but it's good to have.
  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  // 5. CREATE: We use .pipe() and tap()
  // tap() lets us run code (a "side effect") without changing the response.
  addTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      tap(() => {
        this.loadTodos(); // <-- MAGIC! After POST succeeds, reload the list.
      })
    );
  }

  // 6. UPDATE: We'll add the same magic here for later.
  updateTodo(id: string, changes: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, changes).pipe(
      tap(() => {
        this.loadTodos(); // <-- Reload the list after an update
      })
    );
  }

  // 7. DELETE: And here too.
  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadTodos(); // <-- Reload the list after a delete
      })
    );
  }
}