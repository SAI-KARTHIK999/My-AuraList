'use client';

import { useState, useEffect, useCallback } from 'react';
import { isBefore, startOfToday } from 'date-fns';

const nanoid = (size = 21) => {
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
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!isServer) {
      try {
        const storedTasks = localStorage.getItem('aura-list-tasks');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          const today = startOfToday();
          // Reset daily tasks that were completed before today
          const updatedTasks = parsedTasks.map(task => {
            if (task.isDaily && task.completed && task.completedOn) {
              const completedDate = new Date(task.completedOn);
              if (isBefore(completedDate, today)) {
                return { ...task, completed: false, completedOn: null };
              }
            }
            return task;
          });
          setTasks(updatedTasks);
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

  const addTask = useCallback((text, isDaily) => {
    if (text.trim() === '') return;
    const newTask = { id: nanoid(), text, completed: false, isDaily };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, []);

  const editTask = useCallback((id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed;
          return { 
            ...task, 
            completed: newCompleted,
            completedOn: newCompleted && task.isDaily ? new Date().toISOString() : task.completedOn
          };
        }
        return task;
      })
    );
  }, []);

  return { tasks, addTask, editTask, deleteTask, toggleTask };
}
