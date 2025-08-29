'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Task } from '@/types/task';

const nanoid = (size = 21): string => {
    if (typeof window !== 'undefined' && window.crypto) {
        const crypto = window.crypto;
        const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
        const bytes = crypto.getRandomValues(new Uint8Array(size));
        let id = '';
        for (let i = 0; i < size; i++) {
            id += alphabet[bytes[i] & 63];
        }
        return id;
    } else {
        // Fallback for non-browser environments or older browsers.
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < size; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
};

const isServer = typeof window === 'undefined';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!isServer) {
      try {
        const storedTasks = localStorage.getItem('aura-list-tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isServer) {
      try {
        localStorage.setItem('aura-list-tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to localStorage', error);
      }
    }
  }, [tasks]);

  const addTask = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTask: Task = { id: nanoid(), text, completed: false };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, []);

  const editTask = useCallback((id: string, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return { tasks, addTask, editTask, deleteTask, toggleTask };
}
