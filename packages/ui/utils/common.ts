export function IsEmptyArray(data: any) {
  return !(Array.isArray(data) && data.length > 0);
}

export function IsUndefined(data: any) {
  return typeof data === "undefined";
}
export function FormatCurrency({ amount }: { amount: number }) {
  var formatter = new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
}
