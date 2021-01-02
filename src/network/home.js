import { request } from "./request";

export function gteHoMultidata() {
  return request({
    url: "/home/multidata"
  });
}
