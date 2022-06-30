const GroupSetNull = (items: Array<any>) => {
  items.forEach((item) => {
    item(null);
  });
};

export const GroupStringSetNull = (items: Array<any>) => {
  items.forEach((item) => {
    item("");
  });
};
export default GroupSetNull;
