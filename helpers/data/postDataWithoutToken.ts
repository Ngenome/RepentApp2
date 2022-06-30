import axios from "axios";
import { getValueForWithoutSetState } from "..";
import urls from "../../constants/urls";
interface fetchDataProps {
  endpoint: string;
  setData?: any;
  onPostSuccess?: any;
  onPostFail?: any;
  onFetchTokenFail?: any;
  userData?: object;
}

function PostDataWithoutToken({
  endpoint,
  setData,
  onPostFail,
  onPostSuccess,
  onFetchTokenFail,
  userData,
}: fetchDataProps) {
  getValueForWithoutSetState().then((data) => {
    axios({
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      url: `${urls.root}/auth/login`,
      data: {
        username: data?.username,
        password: data?.password,
      },
    })
      .then((resp) => {
        axios({
          method: "POST",
          headers: {
            ContentType: "application/json",
            Authorization: `token ${resp.data.token}`,
          },
          url: `${urls.root}${endpoint}`,
          data: userData,
        })
          .then((resp) => {
            onPostSuccess?.(resp);
          })
          .catch((error) => {
            onPostFail?.(error);
          });
      })
      .catch((error) => {
        onFetchTokenFail?.(error);
      });
  });
}
export default PostDataWithoutToken;
