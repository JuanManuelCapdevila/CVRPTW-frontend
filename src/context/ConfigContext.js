import { createContext, useState } from 'react';

const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
  
  const [config, setConfig] = useState(null);
  const [nodes, setNodes] = useState(null);

  return (
    <ConfigContext.Provider value={{ config, setConfig, nodes, setNodes }}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, ConfigContext };


