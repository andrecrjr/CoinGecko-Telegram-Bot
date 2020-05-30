const convertDate = () => {
  let date = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  return date;
};

const float = (money) => {
  return parseFloat(money);
};

module.exports = { convertDate, float };
