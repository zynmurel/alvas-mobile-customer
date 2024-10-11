import {create} from 'zustand';
import { User } from '../../@types/user';

// Create a store for user state
interface UserState {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

// Create a Zustand store
export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));