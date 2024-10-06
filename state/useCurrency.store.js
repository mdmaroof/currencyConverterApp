import { create } from 'zustand';

const useCurrencyStore = create((set) => ({
    currencies: [],
    setCurrencies: (currencies) => set({ currencies }),
}))

export default useCurrencyStore;