
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getSocket, initSocket } from '../components/SocketConnection/SocketConnection';


const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState({
    coins: JSON.parse(localStorage.getItem("client-wallet-balance")) || "",
    exposure: JSON.parse(localStorage.getItem("client-wallet-exposure")) || ""
  });


  useEffect(() => {
    updateSocket();

    function updateSocket() {
      let userID = JSON.parse(localStorage.getItem("user_id"));
      let token_Id = userID?.token;
      let socket = getSocket();

      if (!socket || socket == null) {
        socket = initSocket(token_Id);
        const loginData = {
          userId: userID?.data?.userId,
          token: token_Id,
        };
        socket.emit(`login`, loginData);
      }


      

      socket.on("coinUpdate", (data) => {

        localStorage.setItem("client-wallet-balance", JSON.stringify(data.coins));
        localStorage.setItem("client-wallet-exposure", JSON.stringify(data.exposure));
        setBalance({
          coins: data.coins,
          exposure: data.exposure,
        });
      });



    }
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  return useContext(BalanceContext);
};
