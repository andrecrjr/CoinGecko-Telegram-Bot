const convertDate = () => {
  let date = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  return date;
};

const float = (money) => {
  return parseFloat(money).toFixed(2);
};

module.exports = { convertDate, float };
