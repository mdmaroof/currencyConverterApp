import { create } from 'zustand';

const useCurrencyStore = create((set) => ({
    currencies: [],
    setCurrencies: (currencies) => set({ currencies }),
    lastUpdate: null,
    setLastUpdate: () => set({ lastUpdate: Date.now() }),
    loading: false,
    setLoading: (loadingState) => set({ loading: loadingState }),
}))

export default useCurrencyStore;