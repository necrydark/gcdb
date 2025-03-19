"use client"
 
import {createContext, useContext, useState} from "react"
import { create } from 'zustand';

const japaneseContext = createContext({});
export const ContextProvider = ({ children }: any) => {
    const [showJapanese, setShowJapanese] = useState(false);

    const toggleShowJapanese = () => [
        setShowJapanese(!showJapanese)
    ]

    return (
        <japaneseContext.Provider value={{ showJapanese, toggleShowJapanese}}>
            {children}
        </japaneseContext.Provider>
    )
}   

type LanguageStore = {
  showJapanese: boolean;
  toggleShowJapanese: () => void;
};

export const useShowJapanese = create<LanguageStore>((set: (fn: (state: LanguageStore) => LanguageStore) => void) => ({
  showJapanese: true,
  toggleShowJapanese: () => set((state: LanguageStore) => ({ 
    ...state,
    showJapanese: !state.showJapanese 
  })),
}));