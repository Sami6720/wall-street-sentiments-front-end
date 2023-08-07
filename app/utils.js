export const convertSnakeToTitleCase = (variableName) => {
  const words = variableName.split("_");
  const normalName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return normalName;
};
