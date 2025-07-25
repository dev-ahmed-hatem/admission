import { dayjs } from "./locale";

// Generate initials for names without images
export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// calculate date
export const calculateAge = (dateString: string) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// check date
export const isOverdue = (date: string) => {
  const dueDate = new Date(date);
  const today = new Date();

  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today > dueDate;
};

export const extractBirthdateFromNationalId = (id: string) => {
  if (!/^[23][0-9]{13}$/.test(id)) return null;

  const centuryCode = id[0];
  const year = parseInt(id.slice(1, 3), 10);
  const month = parseInt(id.slice(3, 5), 10);
  const day = parseInt(id.slice(5, 7), 10);

  // 29604191600467

  const fullYear =
    centuryCode === "2"
      ? 1900 + year
      : centuryCode === "3"
      ? 2000 + year
      : null;

  if (!fullYear || month > 12 || day > 31) return null;

  return dayjs(`${fullYear}-${month}-${day}`);
};
