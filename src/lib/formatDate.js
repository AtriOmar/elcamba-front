export default function formatDate(date, dateStyle = true) {
  if (dateStyle) {
    var intl = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } else {
    var intl = new Intl.DateTimeFormat("fr-FR", {
      timeStyle: "short",
    });
  }
  const formatted = intl.format(new Date(date));
  return formatted;
}

export function formatDateRelative(date) {
  const rtf = new Intl.RelativeTimeFormat("fr");
  const currTS = Date.now();
  const difference = currTS - new Date(date).getTime();
  const msToMin = 60000;
  const msToH = msToMin * 60;
  const msToD = msToH * 24;

  if (difference < msToMin) {
    return "Moins d'une minute";
  } else if (difference < 60 * msToMin) {
    return rtf.format(-Math.floor(difference / msToMin), "minute");
  } else if (difference < msToD) {
    return rtf.format(-Math.floor(difference / msToH), "hour");
  } else if (difference < 7 * msToD) {
    return rtf.format(-Math.floor(difference / msToD), "day");
  } else {
    return formatDate(date);
  }
}
