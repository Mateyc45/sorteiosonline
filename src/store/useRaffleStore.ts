import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './useAuthStore';

export type RaffleType = 'number' | 'words' | 'sequence';
export type RaffleResult = {
  id: string;
  type: RaffleType;
  result: string | number | number[];
  created_at: string;
};

interface RaffleState {
  history: RaffleResult[];
  setHistory: (history: RaffleResult[]) => void;
  fetchHistory: () => Promise<void>;
  addToHistory: (result: Omit<RaffleResult, 'id' | 'created_at'>) => Promise<void>;
  clearHistory: () => void;
}

export const useRaffleStore = create<RaffleState>()((set) => ({
  history: [],
  setHistory: (history) => set({ history }),
  fetchHistory: async () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      set({ history: [] });
      return;
    }

    const { data, error } = await supabase
      .from('draw_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching history:', error);
      return;
    }

    set({ history: data || [] });
  },
  addToHistory: async (result) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const { data, error } = await supabase
      .from('draw_history')
      .insert([
        {
          user_id: user.id,
          type: result.type,
          result: result.result,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding to history:', error);
      return;
    }

    set((state) => ({
      history: [data, ...state.history],
    }));
  },
  clearHistory: () => set({ history: [] }),
}));