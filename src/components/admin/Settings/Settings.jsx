import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import RingLoader from "../../RingLoader";
import Swal from "sweetalert2";
import AddSetting from "./AddSetting";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState({});
  const [addSettingOpen, setAddSettingOpen] = useState(false);

  async function fetchSettings() {
    try {
      const res = await axios.get("/settings/getAll");

      const obj = {};
      const sendingObj = {};
      const inputObj = {};
      res.data?.forEach((el) => {
        obj[el.id] = el;
        inputObj[el.id] = el.value;
        sendingObj[el.id] = false;
      });

      setSettings(obj);
      setInput(inputObj);
      setSending(sendingObj);
    } catch (err) {}
    setLoading(false);
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  async function deleteSetting(id) {
    const data = {
      id,
    };

    setSending((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await axios.delete("/settings/deleteById", { params: data });

      setSettings((prev) => ({ ...prev, [res.data?.id]: res.data }));
      setInput((prev) => ({ ...prev, [res.data?.id]: res.data?.value }));

      Swal.fire("Success", "Supprimé avec succés", "success");
    } catch (err) {
      Swal.fire("Error", "Une erreur s'est produite", "error");
    }
    setSending((prev) => ({ ...prev, [id]: false }));
  }

  async function updateSetting(id) {
    const data = {
      id,
      value: input[id],
    };

    setSending((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await axios.put("/settings/update", data);

      setSettings((prev) => ({ ...prev, [res.data?.id]: res.data }));
      setInput((prev) => ({ ...prev, [res.data?.id]: res.data?.value }));

      Swal.fire("Success", "Modifié avec succés", "success");
    } catch (err) {
      Swal.fire("Error", "Une erreur s'est produite", "error");
    }
    setSending((prev) => ({ ...prev, [id]: false }));
  }

  if (loading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (!settings) return;

  return (
    <div className="flex flex-col min-h-full rounded-lg pt-3 bg-white shadow-card1">
      <AddSetting show={addSettingOpen} hide={() => setAddSettingOpen(false)} afterLeave={fetchSettings} />
      <div className="flex scr500:items-center justify-between flex-col scr500:flex-row rounded-t-lg p-3">
        <h5 className="mb-0 mb-3">Paramètres ( {Object.keys(settings).length} )</h5>
        <button
          type="button"
          className="self-end w-fit px-4 py-2 border border-slate-300 rounded bg-blue-500 hover:bg-blue-600 outline-0 text-white transition-all duration-150 ring-blue-700 ring-offset-2 focus:ring-2"
          onClick={() => {
            setAddSettingOpen(true);
          }}
        >
          Ajouter
        </button>
      </div>
      <div className="p-3">
        {Object.entries(settings).map(([key, value]) => (
          <React.Fragment key={key}>
            <label htmlFor={key} className="block mt-3 font-medium capitalize">
              {value.name}
            </label>
            <div className="flex flex-col scr600:flex-row gap-2 mr-5">
              <input
                value={input[key] || ""}
                id={key}
                onChange={(e) => setInput((prev) => ({ ...prev, [key]: e.target.value }))}
                type="text"
                className="grow px-3 py-1 border border-slate-400 rounded"
                placeholder={value.name}
              />
              <div className="relative w-fit flex gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed duration-150"
                  onClick={() => {
                    updateSetting(key);
                  }}
                  disabled={settings[key].value === input[key]}
                >
                  Enregistrer
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm"
                  onClick={() => {
                    setInput((prev) => ({ ...prev, [key]: settings[key] }));
                  }}
                >
                  Annuler
                </button>
                {!settings[key].required && (
                  <button
                    className="grid place-items-center h-full aspect-square rounded-lg bg-red-500 text-white text-sm"
                    onClick={() => {
                      deleteSetting(key);
                    }}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
                {sending[key] ? (
                  <i className="absolute -right-6 top-1/2 -translate-y-1/2">
                    <RingLoader color="black" />
                  </i>
                ) : (
                  ""
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
