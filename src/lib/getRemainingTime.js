export default function getRemainingTime(date) {
  // Get the current time
  var now = new Date();

  // Calculate the time difference in milliseconds
  var timeDiff = date.getTime() - now.getTime();

  // Convert the time difference to days, hours, and minutes
  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  // Create an array to store the non-zero time units
  var remainingTime = [];

  // Add non-zero time units to the array
  if (days > 0) {
    remainingTime.push(days + " jr" + (days > 1 ? "s" : ""));
  }
  if (hours > 0) {
    remainingTime.push(hours + " hr" + (hours > 1 ? "s" : ""));
  }
  if (minutes > 0) {
    remainingTime.push(minutes + " min" + (minutes > 1 ? "s" : ""));
  }

  // Return the formatted remaining time
  return remainingTime.join(", ");
}
