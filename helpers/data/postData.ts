import axios from "axios";
import urls from "../../constants/urls";

export interface fetchDataProps {
  endpoint: string;
  setData?: any;
  onPostSuccess: any;
  onPostFail: any;
  token: string;
  userData?: object;
}
function PostData({
  endpoint,
  userData,
  setData,
  onPostFail,
  onPostSuccess,
  token,
}: fetchDataProps) {
  axios({
    method: "POST",
    headers: {
      ContentType: "application/json",
      Authorization: `token ${token}`,
    },
    url: `${urls.root}${endpoint}`,
    data: userData,
  })
    .then((resp) => {
      console.log("initial request");
      setData?.(resp.data);
      onPostSuccess?.(resp);
    })
    .catch((error: any) => {
      onPostFail?.(error);
    });
}

export default PostData;
