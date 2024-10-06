import { create } from 'zustand';

const useCurrencyStore = create((set) => ({
    currencies: [],
    setCurrencies: (currencies) => set({ currencies }),
    loading: false,
    setLoading: (loadingState) => set({ loading: loadingState }),
}))

export default useCurrencyStore;