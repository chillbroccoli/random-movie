export const randomDate = (start = new Date(1970, 0, 1), end = new Date()) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
