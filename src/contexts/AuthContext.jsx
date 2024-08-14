// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  login, register, getAllCanvases, createCanvas, 
  deleteCanvas, getCanvasById, updateCanvas, getPostItsByCanvasId, 
  createPostIt, updatePostIt, deletePostIt 
} from '../services/apiService';

// Creating the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [canvasList, setCanvasList] = useState([]);
  const [currentCanvas, setCurrentCanvas] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        const userData = await fetchUserData(); // Implement fetchUserData to get the user details using token
        setUser(userData);
      }
    };
    checkUserStatus();
  }, []);

  // Context functions for handling user actions
  const handleLogin = async (username, password) => {
    try {
      const userData = await login(username, password);
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const createNewCanvas = async () => {
    try {
      const newCanvas = await createCanvas({ title: 'New Canvas' });
      setCanvasList((prev) => [...prev, newCanvas]);
    } catch (error) {
      console.error('Error creating canvas:', error);
    }
  };

  const deleteCanvasById = async (id) => {
    try {
      await deleteCanvas(id);
      setCanvasList((prev) => prev.filter(canvas => canvas.id !== id));
    } catch (error) {
      console.error('Error deleting canvas:', error);
    }
  };

  const getCanvas = async (id) => {
    try {
      const canvas = await getCanvasById(id);
      setCurrentCanvas(canvas);
    } catch (error) {
      console.error('Error fetching canvas:', error);
    }
  };

  const saveCanvas = async (id, updatedCanvas) => {
    try {
      await updateCanvas(id, updatedCanvas);
      setCanvasList((prev) => 
        prev.map(canvas => (canvas.id === id ? updatedCanvas : canvas))
      );
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
  };

  const downloadCanvas = async (id) => {
    try {
      // Logic to download the canvas (e.g., save as image or PDF)
      console.log(`Downloading canvas ${id}`);
    } catch (error) {
      console.error('Error downloading canvas:', error);
    }
  };

  // Post-It related functions
  const getPostIts = async (canvasId, quadrant) => {
    try {
      const postIts = await getPostItsByCanvasId(canvasId, quadrant);
      // Update state or perform any action with retrieved post-its
    } catch (error) {
      console.error('Error fetching post-its:', error);
    }
  };

  const addPostIt = async (canvasId, quadrant, text) => {
    try {
      const newPostIt = await createPostIt({ canvasId, quadrant, text });
      // Update state or perform any action with new post-it
    } catch (error) {
      console.error('Error adding post-it:', error);
    }
  };

  const editPostIt = async (id, text) => {
    try {
      await updatePostIt(id, { text });
      // Update state or perform any action with updated post-it
    } catch (error) {
      console.error('Error editing post-it:', error);
    }
  };

  const removePostIt = async (id) => {
    try {
      await deletePostIt(id);
      // Update state or perform any action with removed post-it
    } catch (error) {
      console.error('Error removing post-it:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        createNewCanvas,
        deleteCanvasById,
        getCanvas,
        saveCanvas,
        downloadCanvas,
        getPostIts,
        addPostIt,
        editPostIt,
        removePostIt,
        canvasList,
        currentCanvas,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
