import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, UpdateProfileData } from '../types';

// Internal interface for the simulated database
interface StoredUser extends User {
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session on mount
    const storedSession = localStorage.getItem('auth_session');
    if (storedSession) {
      try {
        setUser(JSON.parse(storedSession));
      } catch (e) {
        console.error("Failed to parse session", e);
        localStorage.removeItem('auth_session');
      }
    }
    setIsLoading(false);
  }, []);

  // Helper to get users "DB"
  const getStoredUsers = (): StoredUser[] => {
    const users = localStorage.getItem('auth_users_db');
    return users ? JSON.parse(users) : [];
  };

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
        throw new Error("Credenciales incorrectas o usuario no registrado.");
    }

    // Create session object (exclude password)
    const sessionUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        profilePicture: foundUser.profilePicture
    };

    setUser(sessionUser);
    localStorage.setItem('auth_session', JSON.stringify(sessionUser));
  };

  const register = async (email: string, name: string, password: string, profilePicture?: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const users = getStoredUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
        throw new Error("El correo electrónico ya está registrado.");
    }

    const newUser: StoredUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password, // NOTE: In a real app, NEVER store passwords in plain text or localStorage.
      profilePicture
    };

    // Save to "DB"
    users.push(newUser);
    try {
        localStorage.setItem('auth_users_db', JSON.stringify(users));
    } catch (e) {
        throw new Error("La imagen es demasiado grande para el almacenamiento local. Intenta con una más pequeña.");
    }

    // Auto login after register
    const sessionUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profilePicture: newUser.profilePicture
    };

    setUser(sessionUser);
    localStorage.setItem('auth_session', JSON.stringify(sessionUser));
  };

  const updateProfile = async (data: UpdateProfileData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (!user) throw new Error("No hay sesión activa.");

    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex === -1) throw new Error("Usuario no encontrado.");
    
    const currentUserInDb = users[userIndex];

    // Check email uniqueness if email is changing
    if (data.email && data.email !== currentUserInDb.email) {
      if (users.some(u => u.email === data.email && u.id !== user.id)) {
        throw new Error("Este correo electrónico ya está en uso por otro usuario.");
      }
    }

    // Handle Password Change
    if (data.newPassword) {
       if (!data.currentPassword) {
         throw new Error("Debes ingresar tu contraseña actual para establecer una nueva.");
       }
       if (currentUserInDb.password !== data.currentPassword) {
         throw new Error("La contraseña actual es incorrecta.");
       }
       // Update password
       currentUserInDb.password = data.newPassword;
    }

    // Update other fields
    if (data.name) currentUserInDb.name = data.name;
    if (data.email) currentUserInDb.email = data.email;
    if (data.profilePicture !== undefined) currentUserInDb.profilePicture = data.profilePicture;

    // Save back to DB
    users[userIndex] = currentUserInDb;
    try {
        localStorage.setItem('auth_users_db', JSON.stringify(users));
    } catch (e) {
        throw new Error("Error al guardar: La imagen puede ser demasiado grande.");
    }

    // Update session
    const updatedSessionUser: User = {
        id: currentUserInDb.id,
        name: currentUserInDb.name,
        email: currentUserInDb.email,
        profilePicture: currentUserInDb.profilePicture
    };

    setUser(updatedSessionUser);
    localStorage.setItem('auth_session', JSON.stringify(updatedSessionUser));
  };

  const resetPassword = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Check if user exists just for simulation realism
    const users = getStoredUsers();
    const exists = users.some(u => u.email === email);
    
    if (exists) {
        console.log(`Password reset email sent to: ${email}`);
    } else {
        // Security: Usually we don't tell the user if the email exists or not, 
        // but for this template we log it.
        console.log(`Password reset requested for non-existent email: ${email}`);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_session');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, updateProfile, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};