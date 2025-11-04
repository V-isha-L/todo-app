export interface Todo {
  _id: string; // MongoDB automatically adds this
  taskName: string;
  isCompleted: boolean;
  priority: 'Low' | 'Medium' | 'High'; // Use TypeScript's literal types
  dueDate?: Date; // The '?' makes it optional
  createdAt: Date;
  updatedAt: Date;
}