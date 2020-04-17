import axios from "axios";
import { url } from "../global";

export function getClasses(param = "", afterFunc) {
  axios
    .get(
      `${
        param === ""
          ? `${url}/api/entities`
          : `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&type=item&search=${param}&language=en`
      }`
    )
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

export function getAllProperties(entityID, afterFunc) {
  axios
    .get(`${url}/filter/suggestions?entity_id=${entityID}`)
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
