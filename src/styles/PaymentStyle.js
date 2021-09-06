import ImagesStyle from "./ImagesStyle";
// Material-UI components
import { makeStyles } from "@material-ui/core/styles";
import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  secondaryColor,
  grayColor,
} from "./Style";

const PaymentStyle = makeStyles((theme) => ({
  box: {
    border: "1px solid #41444b",
    padding: "5px",
    margin: "5px",
    display: "grid",
    width: "100%",
  },
}));
export default PaymentStyle;
