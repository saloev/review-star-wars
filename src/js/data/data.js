import { LS_GLOBAL_DATA } from "../config/config";

const GLOBAL_DATA = JSON.parse(localStorage.getItem(LS_GLOBAL_DATA)) || {
  list: [],
};

localStorage.setItem(LS_GLOBAL_DATA, JSON.stringify(GLOBAL_DATA));

export default GLOBAL_DATA;
