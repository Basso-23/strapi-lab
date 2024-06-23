import React, { useState, useEffect } from "react";
import * as api from "../../api";
import { useAtom } from "jotai";
import { originalAtom } from "@/atom";
import { createAtom } from "@/atom";
import { readAtom } from "@/atom";

const CreateForm = () => {
  const [originalData, setOriginalData] = useAtom(originalAtom);
  const [create, setCreate] = useAtom(createAtom);
  const [newData, setNewData] = useState({});
  const [disable, setDisable] = useState(true);
  const [readOrder, setReadOrder] = useAtom(readAtom);

  //FUNCTION: WRITE DATA
  const writeData = async (e) => {
    e.preventDefault();
    try {
      //* Writing data
      const upload = { data: newData };
      api.strapi_write(upload);
    } catch (error) {
      console.error("Error writing data:", error);
    } finally {
      setTimeout(() => {
        //* Sending order to fetch data (se agrega el Timeout para darle tiempo a que la informacion llegue al servidor)
        setReadOrder(!readOrder);
      }, 750);

      limpiar();
      setDisable(true);
      setCreate(false);
    }
  };

  //FUNCTION: LIMPIAR INPUTS
  const limpiar = () => {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("image").value = "";
  };

  //FUNCTION: SUBMIT BUTTON DISABLE SI EXISTEN CAMPOS EN BLANCO
  useEffect(() => {
    if (
      document.getElementById("title").value === "" ||
      document.getElementById("author").value === "" ||
      document.getElementById("image").value === ""
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [newData]);

  return (
    <section className={create ? "" : "hidden"}>
      <div className="create-container">
        <div className="create-form-container">
          <form className="create-form">
            {/*//* INPUT 1*/}
            <div>
              <label>Título</label>
              <br />
              <input
                id="title"
                type="text"
                onChange={(e) =>
                  setNewData({ ...newData, title: e.target.value })
                }
                className="w-full sm:w-[400px]"
              />
            </div>

            {/*//* INPUT 2*/}
            <div>
              <label>Autor</label>
              <br />
              <input
                id="author"
                type="text"
                onChange={(e) =>
                  setNewData({ ...newData, author: e.target.value })
                }
                className="w-full sm:w-[400px]"
              />
            </div>

            {/*//* INPUT 3*/}
            <div>
              <label>Imagen</label>
              <br />
              <input
                id="image"
                type="text"
                onChange={(e) =>
                  setNewData({ ...newData, image: e.target.value })
                }
                className="w-full sm:w-[400px]"
              />
            </div>

            {/*//* SUBMIT BUTTON*/}
            <button
              className={`w-full sm:w-[400px] añadir-btn ${
                disable ? "opacity-25 pointer-events-none" : ""
              }`}
              type="submit"
              onClick={writeData}
            >
              AÑADIR
            </button>
          </form>

          {/*//* CANCELAR BUTTON*/}
          <button
            onClick={() => {
              setCreate(false);
              setDisable(true);
              limpiar();
            }}
            className="w-full sm:w-[400px] cancelar-btn"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </section>
  );
};
export default CreateForm;
