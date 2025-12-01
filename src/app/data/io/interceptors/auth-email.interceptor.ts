import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { EmpathyIoConfigService } from '../setup';

//###########################//

/**
 * HTTP header key used to transmit the auth email / API key to the server.
 *
 * This header is added to outgoing requests by `authEmailInterceptorFn` when
 * an auth email is present in the `EmpathyIoConfigService`.
 */
export const AUTH_EMAIL_HEADER = 'X-API-KEY'


//###########################//

/**
 * Interceptor that attaches the configured auth email (if any) to outgoing
 * HTTP requests using the `X-API-KEY` header.
 *
 * The interceptor reads the auth value from the `EmpathyIoConfigService` via
 * Angular's `inject()` helper and delegates header mutation to `addAuthHeader`.
 */
export const authEmailInterceptorFn: HttpInterceptorFn = (req, next) => {

    const authEmailStore = inject(EmpathyIoConfigService)
    const reqWithAuth = addAuthHeader(req, authEmailStore.baseUrl)

    return next(reqWithAuth)
};

//---------------//

/**
 * Adds the auth email (if present) to the provided request's headers.
 *
 * @param request - The outgoing `HttpRequest` to clone and augment.
 * @param authEmail - The auth email or API key to add to the header. If
 *   falsy, the original request is returned unchanged.
 * @returns A cloned `HttpRequest` with the `AUTH_EMAIL_HEADER` set, or the
 *   original request when `authEmail` is not provided.
 */
function addAuthHeader(request: HttpRequest<unknown>, authEmail: string): HttpRequest<unknown> {

    if (!authEmail)
        return request;

    console.log('1: Adding Auth Email Header:', authEmail);
    return request.clone({
        headers: request.headers.set(
            AUTH_EMAIL_HEADER,
            authEmail
        )
    })

}//Cls
