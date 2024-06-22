import React, { useState, useEffect } from "react";
import * as api from "../api";

const Home = () => {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fecthData = async () => {
      const result = await api.strapi_read();
      //console.log(result.data.data);
      setOriginalData(result.data.data);
    };

    fecthData();
  }, []);

  return (
    <main>
      <section>
        {originalData.map((item, index) => (
          <div key={index}>
            <div>{item.attributes.title}</div>
            <div>{item.attributes.image}</div>
            <div>{item.attributes.author}</div>
          </div>
        ))}
      </section>
    </main>
  );
};
export default Home;
