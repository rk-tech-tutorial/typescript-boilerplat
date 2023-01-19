import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

export class NameCorrectionInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return content.replace(/Mike/gi, "Michael");
  }
}
