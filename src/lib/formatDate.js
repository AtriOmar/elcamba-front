export default function formatDate(date) {
  const intl = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formatted = intl.format(new Date(date));
  return formatted;
}
