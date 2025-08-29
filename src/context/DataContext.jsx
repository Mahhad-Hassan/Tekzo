import axios from "axios";
import { createContext, useState, useCallback } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(true); 

  const fetchingAllProducts = useCallback(async () => {
    try {
      const res = await axios.get('https://fakestoreapi.in/api/products?limit=150');
    
      
    
      setData(res.data.products); // Adjust based on actual response structure
    } catch (error) {
      console.error('API Error:', error);
    }
  }, []);

  const getUniqueCategory=(data,property)=>{
        let newVal =data?.map((curElem=>{
            return curElem[property]
        }))

        newVal=["All",...new Set(newVal)]
        return newVal;
    }


    const categoryOnlyData = getUniqueCategory(data,"category") 
    const brandOnlyData=getUniqueCategory(data,"brand") 

  return (
    <DataContext.Provider value={{ data, setData, fetchingAllProducts,categoryOnlyData,brandOnlyData,user,setUser }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
