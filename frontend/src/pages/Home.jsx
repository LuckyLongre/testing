import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Home() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
     const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

        setLoading(false);
        
    }, []); 
  return (
    <div>
        <h2>Home Page</h2>
        {loading ? <p>Loading...</p> : <p>{data?.message || "Welcome to the Home Page!"}</p>}
    </div>
  );
}

export default Home;
