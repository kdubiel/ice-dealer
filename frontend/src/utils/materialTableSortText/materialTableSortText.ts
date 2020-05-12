export const materialTableSortText = (text1: string, text2: string) => {
  if (text1 < text2) {
    return -1;
  }
  if (text1 > text2) {
    return 1;
  }
  return 0;
};
