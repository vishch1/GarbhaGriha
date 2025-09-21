import { createContext, useContext, useState, ReactNode } from "react";

interface PrivacyContextType {
  localOnly: boolean;
  toggleLocalOnly: () => void;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [localOnly, setLocalOnly] = useState(false);

  const toggleLocalOnly = () => setLocalOnly((prev) => !prev);

  return (
    <PrivacyContext.Provider value={{ localOnly, toggleLocalOnly }}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) throw new Error("usePrivacy must be used inside PrivacyProvider");
  return context;
}
