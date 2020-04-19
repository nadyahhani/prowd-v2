export function createDashboard(entityID, filters, afterFunc) {
  axios
    .post(`${url}/api/dashboard/`, {
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
