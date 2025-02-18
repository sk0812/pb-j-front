import React, { createContext, useContext, useState } from "react";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface SignupContextType {
  signupData: Partial<SignupData>;
  updateSignupData: (data: Partial<SignupData>) => void;
  clearSignupData: () => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [signupData, setSignupData] = useState<Partial<SignupData>>({});

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const clearSignupData = () => {
    setSignupData({});
  };

  return (
    <SignupContext.Provider
      value={{ signupData, updateSignupData, clearSignupData }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
}
