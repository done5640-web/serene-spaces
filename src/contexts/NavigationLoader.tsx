import { createContext, useContext, useState, useCallback } from "react";

interface NavigationLoaderContextType {
  isNavigating: boolean;
  triggerNavLoading: (callback: () => void) => void;
}

const NavigationLoaderContext = createContext<NavigationLoaderContextType>({
  isNavigating: false,
  triggerNavLoading: () => {},
});

const NAV_LOADING_MS = 1800; // Shorter animation for page-to-page transitions

export const NavigationLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const triggerNavLoading = useCallback((callback: () => void) => {
    setIsNavigating(true);
    // Small delay to let the loading screen render before navigating
    setTimeout(() => {
      callback();
      window.scrollTo({ top: 0 });
    }, 100);
    setTimeout(() => {
      setIsNavigating(false);
    }, NAV_LOADING_MS);
  }, []);

  return (
    <NavigationLoaderContext.Provider value={{ isNavigating, triggerNavLoading }}>
      {children}
    </NavigationLoaderContext.Provider>
  );
};

export const useNavigationLoader = () => useContext(NavigationLoaderContext);
