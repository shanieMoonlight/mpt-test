import { authEmailInterceptorFn } from "./auth-email.interceptor";

export const empathyHttpInterceptors = [
  authEmailInterceptorFn
]