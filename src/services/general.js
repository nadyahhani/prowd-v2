import axios from "axios";
import { url } from "../global";

export function getClasses(afterFunc) {
  axios
    .get(`${url}/api/entities/sample`)
    .then(
      (response) => {
        afterFunc({ success: true, ...response.data });
      },
      (error) => {
        afterFunc({ success: false, ...error });
      }
    )
    .catch((err) => {
      afterFunc({ success: false, ...err });
    });
}
