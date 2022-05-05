export const phoneNumberFilter = phoneNumber => {
  const countryCode = phoneNumber.slice(0, 3);
  const operatorCode = phoneNumber.slice(3, 5);
  const phone = `${phoneNumber.slice(5, 8)} ${phoneNumber.slice(8, 10)} ${phoneNumber.slice(10, 12)}`;
  return `+${countryCode} ${operatorCode} ${phone}`;
};
