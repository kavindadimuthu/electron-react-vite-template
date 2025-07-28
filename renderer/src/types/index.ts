/**
 * Global type definitions for the application
 */

// Electron API types (exposed through preload script)
export interface ElectronAPI {
  ping: () => Promise<string>;
  // Add more Electron API methods here as you implement them
  // Examples:
  // openFile: () => Promise<string>;
  // saveFile: (content: string) => Promise<boolean>;
  // showNotification: (title: string, body: string) => void;
}

// Extend the global Window interface to include our Electron API
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

// Common app types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AppSettings {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: boolean;
  autoSave: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Event types
export interface AppEvent {
  type: string;
  payload?: any;
  timestamp: number;
}

// Export empty object to make this a module
export {};
