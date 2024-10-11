import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [member, setMember] = useState(null);

  return (
    <UserContext.Provider value={{ member, setMember }}>
      {children}
    </UserContext.Provider>
  );
};