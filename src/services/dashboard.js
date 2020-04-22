import axios from "axios";
import { url } from "../global";

export function createDashboard(entityID, filters, afterFunc) {
  axios
    .post(`${url}/api/dashboard`, {
      entityID: entityID,
      filters: filters,
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

export function getDashInfo(hash, afterFunc) {
  axios
    .get(`${url}/api/entity/information?hash_code=${hash}`)
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

export function getGiniEntity(hash, afterFunc) {
  axios
    .get(`${url}/api/entity/gini?hash_code=${hash}`)
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

export function getAllProperties(hash, afterFunc) {
  console.log("getting properties");

  axios
    .get(`${url}/api/properties/info?hash_code=${hash}`)
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

export function getPropertyGap(hash, afterFunc) {
  axios
    .get(`${url}/api/properties/gap?hash_code=${hash}`)
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
