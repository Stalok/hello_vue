import service from "@/utils/request";
import type { ILoginData } from "@/types/login"; //引入接口

// 登录接口
export function login(data: ILoginData) {
  //接口ILoginData接口的变量名
  return service({
    url: "/login",
    method: "POST",
    data,
  });
}
