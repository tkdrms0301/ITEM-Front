import axios from "axios";
import { BaseUrl } from "./BaseUrl";

const api = axios.create({
  baseURL: { BaseUrl },
  //timeout : 1000,
  //headers: {'Beaerer' : 'test'},
});

const { get, post, put } = api;

export { get, post, put };
