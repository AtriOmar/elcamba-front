import React, { useEffect, useState } from "react";
import getRemainingTime from "../lib/getRemainingTime";

export default function RemainingTime({ date }) {
  const [formattedDate, setFormattedDate] = useState(getRemainingTime(date));

  useEffect(() => {
    function handleTime() {
      setFormattedDate(getRemainingTime(date));
    }

    const timeInterval = setInterval(handleTime, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return formattedDate;
}
