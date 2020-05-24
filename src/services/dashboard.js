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

export function copyDashboard(hash, afterFunc) {
  axios
    .get(`${url}/api/dashboard/duplicate?hash_code=${hash}`)
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
    .get(`${url}/api/dashboard/info?hash_code=${hash}`)
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

export function getGiniEntity(hash, entityCheck, afterFunc) {
  axios
    .get(
      `${url}/api/entity/gini?hash_code=${hash}${
        entityCheck ? `&property=${entityCheck}` : ""
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

export function getAllProperties(hash, afterFunc) {
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

export function editGlobal(
  hash,
  publicity,
  classID,
  filters,
  dashData,
  afterFunc
) {
  axios
    .post(`${url}/api/dashboard/edit/global`, {
      ...dashData,
      hashCode: hash,
      entityID: classID,
      filters: filters,
      public: publicity,
      properties: [],
      additionalFilters: "[]",
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

export function editCompare(hash, compareFilters, afterFunc) {
  axios
    .post(`${url}/api/dashboard/edit/compare`, {
      hashCode: hash,
      compareFilters: compareFilters,
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

export function getCompareGini(hash, item, afterFunc) {
  axios
    .get(
      `${url}/api/entity/gini/compare?hash_code=${hash}&item_number=${item}
    `
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

export function getCompareProperties(hash, afterFunc) {
  axios
    .get(
      `${url}/api/properties/info/compare?hash_code=${hash}
    `
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

// DISCOVER
export function editDiscover(hash, filters, afterFunc) {
  axios
    .post(
      `${url}/api/dashboard/edit/analysis
    `,
      {
        hashCode: hash,
        analysisFilters: filters,
      }
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

export function getPropertyValues(hash, id, afterFunc) {
  axios
    .get(
      `${url}/api/entity/analysis/information?hash_code=${hash}&property_id=${id}
    `
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

export function getDiscoverGini(hash, afterFunc) {
  axios
    .get(
      `${url}/api/entity/gini/analysis?hash_code=${hash}
    `
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

export function getActualItemCount(hash, afterFunc) {
  axios
    .get(
      `${url}/api/entities/count?hash_code=${hash}
    `
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

