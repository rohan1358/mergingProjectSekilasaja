const primaryColor = "#FFE05D";
const secondaryColor = "#41444b";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
const grayColor = "#D9DDDC";
const beigeColor = "#FFFEF8";

const containerFluid = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%",
};

const container = {
  ...containerFluid,
  "@media (min-width: 576px)": {
    maxWidth: "540px",
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px",
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px",
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1140px",
  },
};

export {
  //variables
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  grayColor,
  container,
  containerFluid,
  beigeColor,
};
