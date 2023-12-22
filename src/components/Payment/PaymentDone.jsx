import React, { useEffect } from "react";
import { useParams } from "react-router";

const event = new Event("message", { hello: "hello" });

export default function PaymentDone() {
  const { status } = useParams();

  useEffect(() => {
    window.parent.postMessage({ id: "payment_done", status });
  }, []);

  return;
}
