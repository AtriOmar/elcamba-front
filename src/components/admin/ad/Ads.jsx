import { InboxIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../../../utils/API";
import AddAdModal from "./AddAdModal";
import EditProductModal from "./EditAdModal";
import axios from "axios";
import Loader from "../../Loader";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Ads() {
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [toEdit, setToEdit] = useState({});

  function getItems() {
    axios
      .get("/ads/getAll")
      .then((res) => {
        setItemsList(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data, "error");
      });
  }
  useEffect(() => {
    getItems();
    return;
  }, []);

  const deleteItem = (e, item) => {
    e.preventDefault();

    Swal.fire({
      title: "Delete Product",
      text: `Are you sure to delete ${item.name} ?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/ads/deleteById", {
            data: {
              id: item.id,
            },
          })
          .then((res) => {
            Swal.fire("Success", res.data.message, "success");
            getItems();
          })
          .catch((err) => {
            if (err.response.data.status === 404) {
              Swal.fire("Erreur", err.response.data.message, "error");
            } else if (err.response.status === 401) {
              Swal.fire("Error", err.response.data.message, "error");
            }
          });
      } else if (result.isDenied) {
      }
    });
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  var items_HTMLTABLE = [];
  if (itemsList.length > 0) {
    items_HTMLTABLE = (
      <>
        <div className="mx-0 grid grid-cols-12 break-all text-center">
          <div className="col-span-1 hidden pb-3 text-start md:block">ID</div>

          <div className="col-span-3 pb-3 text-start md:col-span-3">Photo</div>
          <div className="col-span-4 pb-3 text-start md:col-span-4">Nom</div>
          <div className="col-span-2 pb-3 text-start md:col-span-1">Type</div>
          <div className="col-span-2 pb-3 text-start md:col-span-1">Durée</div>

          <div className="col-span-2 pb-3 text-end sm:text-center md:col-span-2">Actions</div>
        </div>
        <div className="divide-y">
          {itemsList.map((item) => {
            return (
              <div key={item.id} className="mx-0 grid grid-cols-12 break-all text-center">
                <div className="col-span-1 hidden items-center pt-3 text-start md:flex">{item.id}</div>
                <div className="col-span-3 flex items-center pt-3 text-start md:col-span-3">
                  <img className="h-20 w-20 rounded-lg object-cover" src={`${BACKEND_URL}/uploads/ads/${item.photo}`} alt={`Photo of ${item.name}`} />
                </div>
                <div className="col-span-4 flex items-center pt-3 text-start md:col-span-4">{item.name}</div>
                <div className="col-span-2 flex items-center pt-3 text-start md:col-span-1">{item.type}</div>
                <div className="col-span-2 flex items-center pt-3 text-start md:col-span-1">{item.duration}</div>
                <div className="col-span-2 flex items-center pt-3 text-end sm:text-center md:col-span-2">
                  <div className="grid w-full grid-cols-12">
                    <div className="col-span-12 text-end sm:col-span-6 sm:text-center">
                      <button
                        type="button"
                        className="btn p-0"
                        onClick={(e) => {
                          setToEdit(item);
                          setEditModalShow(true);
                        }}
                      >
                        <PencilSquareIcon className="block h-8 w-8 text-blue-600" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="col-span-12 text-end sm:col-span-6 sm:text-center">
                      <button
                        type="button"
                        className="btn p-0"
                        onClick={(e) => {
                          deleteItem(e, item);
                        }}
                      >
                        <TrashIcon className="block h-8 w-8 text-red-600" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    items_HTMLTABLE = (
      <div className="flex h-[25vh] flex-col items-center justify-center gap-4 text-center">
        <InboxIcon className="block h-20 w-20" aria-hidden="true" />
        <h3 className="text-2xl font-bold">Il n'y a aucune publicié</h3>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto max-w-[80rem] p-5">
        <div className="rounded-lg shadow-lg">
          <div className="flex items-center justify-between rounded-t-lg bg-gray-100 p-3">
            <h5 className="mb-0 mb-3">Publicités ( {itemsList.length} )</h5>
            <button
              type="button"
              className="rounded bg-blue-600 p-2 text-white"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Ajouter une publicité
            </button>
          </div>
          <div className="p-5">{items_HTMLTABLE}</div>
        </div>
      </div>
      <AddAdModal
        show={modalShow}
        hide={() => {
          setModalShow(false);
          getItems();
        }}
      />
      <EditProductModal
        show={editModalShow}
        hide={() => {
          setEditModalShow(false);
          getItems();
        }}
        toedit={toEdit}
      />
    </>
  );
}
