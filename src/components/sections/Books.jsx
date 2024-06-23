import React, { useState, useEffect } from "react";
import * as api from "../../api";
import Loader from "@/components/utils/Loader";
import { useAtom } from "jotai";
import { originalAtom } from "@/atom";
import { createAtom } from "@/atom";
import { editAtom } from "@/atom";
import { tempAtom } from "@/atom";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import { RiEditFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { readAtom } from "@/atom";

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useAtom(editAtom);
  const [tempID, setTempID] = useAtom(tempAtom);
  const [create, setCreate] = useAtom(createAtom);
  const [readOrder, setReadOrder] = useAtom(readAtom);

  const [originalData, setOriginalData] = useAtom(originalAtom);

  useEffect(() => {
    readData();
    console.log("feching data");
  }, [readOrder]);

  //FUNCTION: READ DATA
  const readData = async () => {
    try {
      //* Reading data
      const result = await api.strapi_read();
      //console.log(result.data.data);
      setOriginalData(result.data.data);
    } catch (error) {
      console.error("Error reading data:", error);
    } finally {
      //* Loading false
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  //FUNCTION: DELETE DATA
  const deleteData = async (id) => {
    try {
      //* Deleting data
      await api.strapi_delete(id);
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setTimeout(() => {
        //* Sending order to fetch data (se agrega el Timeout para darle tiempo a que la informacion llegue al servidor)
        setReadOrder(!readOrder);
      }, 750);
    }
  };

  return (
    <section className="relative">
      <div className="title-container">
        {/*//* Title*/}
        <h1 className="title">Lista de libros</h1>
        <button
          onClick={() => {
            setCreate(true);
          }}
          className="new-btn"
        >
          AÑADIR LIBRO
        </button>
      </div>

      <div className="h-[391px] px-4">
        {/*//* Loader container*/}
        {loading ? (
          <div className="books-container">
            {originalData.map((item, index) => (
              <div key={index}>
                <Loader width={"200px"} height={"391px"} />
              </div>
            ))}
          </div>
        ) : (
          <div key={readOrder} className="books-container">
            {originalData.map((item, index) => (
              <div className="relative" key={index}>
                {/*//* Book image*/}
                <div
                  style={{
                    backgroundImage: `url(${item.attributes.image})`,
                  }}
                  className="book-image"
                ></div>

                {/*//* Book info*/}
                <div className="info-container">
                  <div>{item.attributes.title}</div>
                  <div className="autor">{item.attributes.author}</div>
                </div>

                {/*//* Edit button*/}
                <button
                  onClick={() => {
                    setTempID(item.id);
                    setEdit(true);
                  }}
                  className="edit-btn"
                >
                  <RiEditFill />
                </button>

                {/*//* Delete button*/}
                <button
                  onClick={() => {
                    deleteData(item.id);
                  }}
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <UpdateForm />
      <CreateForm />
    </section>
  );
};

export default Books;
