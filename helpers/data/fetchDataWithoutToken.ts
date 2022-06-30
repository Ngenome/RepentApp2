import axios from "axios";
import { getValueForWithoutSetState } from "..";
import urls from "../../constants/urls";
interface fetchDataProps {
  endpoint: string;
  setData: any;
  onFetchSuccess: any;
  onFetchFail: any;
  onFetchTokenFail: any;
  userData?: object;
}

function FetchDataWithoutToken({
  endpoint,
  setData,
  onFetchSuccess,
  onFetchFail,
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
          method: "GET",
          headers: {
            ContentType: "application/json",
            Authorization: `token ${resp.data.token}`,
          },
          url: `${urls.root}${endpoint}`,
          params: userData,
        })
          .then((resp) => {
            // console.log("initial request");
            setData(resp.data);
            onFetchSuccess?.(resp);
          })
          .catch((error) => {
            onFetchFail?.(error);
          });
      })
      .catch((error) => {
        onFetchTokenFail(error);
      });
  });
}

export default FetchDataWithoutToken;
export const Test = () => {
  var xhr = new XMLHttpRequest();

  // xhr.withCredentials = true;
  // xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "token 461634b664d762efcbf07360f21b63a95133161984424ebb2789f811df77a035"
  );
  xhr.open("GET", `http://192.168.43.168:8000/api/group-attendances/`, true);
  xhr.send({
    group: 1,
  });
};
