import { create } from 'zustand'

interface Theme {
    dark: boolean;
    switch: () => void;
    setDark: (value: boolean) => void;
    setLight: (value: boolean) => void;
}

const useTheme = create<Theme>((set) => ({
    dark: true,
    switch: () => set((state) => ({ dark: !state.dark })),
    setDark: () => set({ dark: false }),
    setLight: () => set({ dark: true }),
}))

export default useTheme;