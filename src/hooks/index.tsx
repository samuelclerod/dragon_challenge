import { ConfirmProvider } from "material-ui-confirm";
import { ReactNode } from "react";
import { AuthProvider } from "./useAuth";
import { ToastProvider } from "./useToast";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ConfirmProvider>
          {children}
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
