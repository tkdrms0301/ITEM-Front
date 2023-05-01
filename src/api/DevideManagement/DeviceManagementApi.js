import { get, post } from "../index";

const fetchDevice = async () => {
  const res = await get("/url");
  return res;
};

const createDevice = async (info) => {
  const res = await post({
    url: "/url",
    data: info,
  });
  return res;
};

const updateDevice = async (info) => {
  const res = await post({
    url: "/url",
    data: info,
  });
  return res;
};

const deleteDevice = async (info) => {
  const res = await post({
    url: "/url",
    data: info,
  });
  return res;
};

export { fetchDevice, createDevice, updateDevice, deleteDevice };
