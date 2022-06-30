import axios from "axios";
import urls from "../../constants/urls";
export interface fetchDataProps {
  endpoint: string;
  setData?: any;
  onFetchSuccess: any;
  onFetchFail: any;
  token: string;
  userData?: object;
}
function FetchData({
  endpoint,
  setData,
  onFetchSuccess,
  onFetchFail,
  userData,
  token,
}: fetchDataProps) {
  axios({
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `token ${token}`,
    },
    url: `${urls.root}${endpoint}`,
    params: userData,
  })
    .then((resp) => {
      console.log("");
      setData(resp.data);
      onFetchSuccess(resp);
    })
    .catch((error) => {
      onFetchFail(error);
      console.warn(error);
    });
}
export default FetchData;
