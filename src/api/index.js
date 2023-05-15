import axios from "axios";
import { BaseUrl } from "./BaseUrl";

const api = axios.create({
  baseURL: { BaseUrl },
  //timeout : 1000,
  //headers: {'Beaerer' : 'test'},
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token")).accessToken.split(
    " "
  )[1];
  if (token) {
    config.headers["X-AUTH-TOKEN"] = "Bearer " + token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    // ACCESS TOKEN이 만료된 경우, 홈 화면으로 이동하도록 처리
    if (error.response.status === 401) {
      window.location.href = "/";
    }
    // 그 외의 경우, 에러 처리 코드 작성
    // 예를 들어, 사용자에게 알림을 표시하거나 로그를 출력
    return Promise.reject(error);
  }
);

const { get, post, put } = api;

export { get, post, put };
