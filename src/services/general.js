import axios from "axios";
import { url } from "../global";

export function getClasses(param = "", afterFunc) {
  axios
    .get(`${url}/api/entities?search=${param}`)
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

export function getPropSuggestions(entityID, filled = "", afterFunc) {
  axios
    .get(
      `${url}/api/filter/suggestions?entity_id=${entityID}&filled_properties=${filled}`
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

export function searchProperties(param = "", afterFunc) {
  axios
    .get(`${url}/api/properties?search=${param}`)
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

export function getPropValues(entityID, propertyID, afterFunc) {
  axios
    .post(`${url}/api/property/value/suggestions`, {
      entityID,
      propertyID,
      filters: [],
    })
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

export function getDashboards(afterFunc) {
  axios
    .get(`${url}/api/browse`)
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
