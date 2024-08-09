// src/routes/users.ts
import express, { Request, Response } from 'express';
import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory users storage
const users: User[] = [
    { id: uuidv4(), name: 'John Doe', email: 'john.doe@example.com'},
    { id: uuidv4(), name: 'Jane Doe', email: 'jane.doe@example.com'}
];

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

// Get a single user by ID
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Create a new user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user by ID
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
});

// Delete a user by ID
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

export default router;
