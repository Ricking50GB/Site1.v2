export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  profilePicture?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string, profilePicture?: string) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
}

export interface ApiError {
  message: string;
}