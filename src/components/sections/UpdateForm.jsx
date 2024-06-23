import React, { useState, useEffect } from "react";
import * as api from "../../api";
import { useAtom } from "jotai";
import { originalAtom } from "@/atom";
import { editAtom } from "@/atom";
import { tempAtom } from "@/atom";
import { readAtom } from "@/atom";

const UpdateForm = () => {
  const [originalData, setOriginalData] = useAtom(originalAtom);
  const [edit, setEdit] = useAtom(editAtom);
  const [tempID, setTempID] = useAtom(tempAtom);
  const [newData, setNewData] = useState({});
  const [disable, setDisable] = useState(true);
  const [readOrder, setReadOrder] = useAtom(readAtom);

  //FUNCTION: UPDATE DATA
  const updateData = async (e) => {
    e.preventDefault();
    try {
      const upload = { data: newData };
      api.strapi_update(tempID, upload);
    } catch (error) {
      console.error("Error writing data:", error);
    } finally {
      setTimeout(() => {
        //* Sending order to fetch data (se agrega el Timeout para darle tiempo a que la informacion llegue al servidor)
        setReadOrder(!readOrder);
      }, 750);

      limpiar();
      setTempID(null);
      setDisable(true);
      setEdit(false);
    }
  };

  //FUNCTION: IGUALA LOS VALUE DE LOS INPUTS CON EL MISMO QUE EL ID DEL ITEM
  useEffect(() => {
    originalData
      .filter((item) => item.id === tempID)
      .forEach((item) => {
        newData.title = item.attributes.title;
        newData.author = item.attributes.author;
        newData.image = item.attributes.image;

        document.getElementById("title-u").value = item.attributes.title;
        document.getElementById("author-u").value = item.attributes.author;
        document.getElementById("image-u").value = item.attributes.image;
      });
  }, [tempID, originalData]);

  //FUNCTION: LIMPIAR INPUTS
  const limpiar = () => {
    document.getElementById("title-u").value = "";
    document.getElementById("author-u").value = "";
    document.getElementById("image-u").value = "";
  };

  //FUNCTION: SUBMIT BUTTON DISABLE SI EXISTEN CAMPOS EN BLANCO
  useEffect(() => {
    if (
      document.getElementById("title-u").value === "" ||
      document.getElementById("author-u").value === "" ||
      document.getElementById("image-u").value === ""
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [newData]);

  return (
    <section className={edit ? "" : "hidden"}>
      {/*//* Update form*/}
      <div className="create-container">
        <div className="create-form-container">
          <form className="create-form">
            {/*//* INPUT 1*/}
            <div>
              <label>Título</label>
              <br />
              <input
                id="title-u"
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
                id="author-u"
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
                id="image-u"
                type="text"
                onChange={(e) =>
                  setNewData({ ...newData, image: e.target.value })
                }
                className="w-full sm:w-[400px]"
              />
            </div>

            <button
              className={`w-full sm:w-[400px] añadir-btn ${
                disable ? "opacity-25 pointer-events-none" : ""
              }`}
              type="submit"
              onClick={updateData}
            >
              GUARDAR
            </button>
          </form>
          <button
            onClick={() => {
              limpiar();
              setTempID(null);
              setDisable(true);
              setEdit(false);
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
export default UpdateForm;
