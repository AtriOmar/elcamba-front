import { InboxIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../../../utils/API";
import AddPartnerModal from "./AddPartnerModal";
import EditPartnerModal from "./EditPartnerModal";

export default function Partners() {
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [toEdit, setToEdit] = useState({});

  function getItems() {
    API.getPartners()
      .then((res) => {
        setItemsList(res.data);
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
      title: "Delete Partner",
      text: `Are you sure to delete ${item.name} ?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        API.deletePartnerById(item.id)
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
    return <div>loading</div>;
  }

  var items_HTMLTABLE = [];
  if (itemsList.length > 0) {
    items_HTMLTABLE = (
      <>
        <div className="mx-0 grid grid-cols-12 text-center break-all">
          <div className="pb-3 hidden md:block text-start col-span-1">ID</div>
          <div className="pb-3 col-span-5 md:col-span-2 text-start">Name</div>
          <div className="pb-3 col-span-5 md:col-span-6 text-start">Email</div>
          <div className="pb-3 text-end sm:text-center col-span-2 md:col-span-3">Actions</div>
        </div>
        <div className="divide-y">
          {itemsList.map((item) => {
            return (
              <div key={item.id} className="mx-0 grid grid-cols-12 text-center break-all">
                <div className="pt-3 hidden md:block text-start col-span-1">{item.id}</div>
                <div className="pt-3 col-span-5 md:col-span-2 text-start">{item.name}</div>
                <div className="pt-3 col-span-5 md:col-span-6 text-start">{item.email}</div>
                <div className="pt-3 text-end sm:text-center col-span-2 md:col-span-3">
                  <div className="grid grid-cols-12">
                    <div className="col-span-12 sm:col-span-6 text-end sm:text-center">
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
                    <div className="col-span-12 sm:col-span-6 text-end sm:text-center">
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
      <div className="flex flex-col gap-4 items-center justify-center text-center h-[25vh]">
        <InboxIcon className="block h-20 w-20" aria-hidden="true" />
        <h3 className="text-2xl font-bold">Theres no Partners</h3>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-[80rem] p-5 mx-auto">
        <div className="rounded-lg shadow-lg">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-t-lg">
            <h5 className="mb-3 mb-0">Partners ( {itemsList.length} )</h5>
            <button
              type="button"
              className="bg-blue-600 text-white p-2 rounded"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Add Partners
            </button>
          </div>
          <div className="p-5">{items_HTMLTABLE}</div>
        </div>
      </div>
      <AddPartnerModal
        show={modalShow}
        hide={() => {
          setModalShow(false);
          getItems();
        }}
      />
      <EditPartnerModal
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
