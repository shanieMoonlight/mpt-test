
//#################################################//

function wrapWithLeadingSlash<T>(fullPathsObj: T): T {

    if (typeof fullPathsObj === 'function') {
        return ((...args: any[]) => {
            const path = (fullPathsObj as any)(...args);
            return typeof path === 'string' && !path.startsWith('/') ? '/' + path : path;
        }) as any as T;
    }

    if (!fullPathsObj)
        return fullPathsObj;

    const wrapped: any = Array.isArray(fullPathsObj) ? [] : {};
    for (const key of Object.keys(fullPathsObj)) {
        wrapped[key] = wrapWithLeadingSlash((fullPathsObj as any)[key]);
    }

    return wrapped;
}

//#################################################//

/** Base route for the main application area. */
const BaseRoute = '';

/** Type alias for the child routes of the main application area: 'home' | 'open-source'. */
type ROUTE = 'home'
    | 'survey-builder'
    | 'survey-list'
    | 'survey-detail'


//#################################################//

/**
 * Defines application-level routes for the Hub application.
 * Centralizes base route definitions and provides structured access to major sections.
 * Full documentation available : https://spider-baby-hub.web.app/blog/route-defs-tutorial
 */
export class MptAppRouteDefs {

    /** Base path for the application (typically empty string for root). */
    static readonly BASE = BaseRoute;
    static readonly DETAIL_ID_PARAM = 'id';

    //----------------------------//


    /**
     * Returns the provided route segment.
     * Primarily for use in this area's Angular route configuration.
     * @param route - The route segment (e.g., 'home', 'survey-builder', etc).
     * @returns The route segment.
     */
    static route = (route: ROUTE) => route;

    //----------------------------//

    // /**
    //  * Access to relative route segments for descendant areas.
    //  */
    // static routes = {
    //     /** Relative routes for the 'main' application area. */
    //     surveys: MptSurveSectionRoutesDefs.routes,
    //     customers: MptCustomerSectionRoutesDefs.routes,
    // };

    // //- - - - - - - - - - - - - - - - //

    // /**
    //  * Access to full, absolute route paths from the application root.
    //  */
    // static fullPaths = {
    //     /** Full paths for the 'main' application area. */
    //     main: HubMainAreaRoutesDefs.fullPathFn(this.BASE),
    //     blog: HubBlogSectionRoutesDefs.fullPathFn(this.BASE),
    // };


    // /**
    //  * Access to full, absolute route paths from the application root.
    //  * Will prepend a leading slash to the path. Use for routing relative to base
    //  */
    // static fullPathsWithSlash = wrapWithLeadingSlash(HubAppRouteDefs.fullPaths);

} //Cls
