export const convertDate = () => {
  let date = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  return date;
};

export const float = (money) => {
  return parseFloat(money);
};
