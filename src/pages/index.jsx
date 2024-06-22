import React, { useState, useEffect } from "react";
import * as api from "../api";
import Loader from "@/components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.strapi_read();
        setOriginalData(result.data.data);
      } catch (error) {
        console.error("Error data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 750);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <section className="min-h-screen">
        <div className="w-full mt-10 px-4">
          <div className="leading-none text-2xl font-semibold">
            Lista de libros
          </div>

          {loading ? (
            <div className="w-full overflow-x-auto pb-6 flex gap-10 mt-10">
              {originalData.map((item, index) => (
                <Loader w={"200px"} h={"391px"} />
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto pb-6 flex gap-10 mt-10">
              {originalData.map((item, index) => (
                <div key={index}>
                  <div
                    style={{
                      backgroundImage: `url(${item.attributes.image})`,
                    }}
                    className="bg-top bg-cover bg-no-repeat aspect-[9/14] w-[200px]"
                  ></div>

                  <div className="w-[200px] flex flex-col mt-2 pl-1">
                    <div>{item.attributes.title}</div>
                    <div>{item.attributes.author}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
