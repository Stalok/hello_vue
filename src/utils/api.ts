import service from "@/utils/request";
import type { ILoginData } from "@/types/login"; //引入接口

// 登录接口
export async function loginApi(data: ILoginData) {
  //接口ILoginData接口的变量名
  return await service({
    url: "/login",
    method: "POST",
    data,
  });
}
