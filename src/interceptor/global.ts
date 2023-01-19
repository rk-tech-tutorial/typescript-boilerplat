import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

@Interceptor()
export class changeResponse implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return {
      status: action.response.statusCode,
      message: "success",
      data: content
    };
  }
}
