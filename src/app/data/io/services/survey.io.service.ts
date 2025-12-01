
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyDto } from '../../models/index.js';
import { ServerRoutes } from '../controllers/all-server-routes.js';
import { ABaseHttpService } from '../data-service/a-base-data.io.service.js';
import { EmpathyIoConfigService } from '../setup.js';

/**
 * Service for server-side I/O operations related to surveys.
 *
 * Extends the generic `AServerIoService` base and exposes typed CRUD helpers
 * that forward requests to the server routes defined in `ServerRoutes.Survey.Controller`.
 *
 * Provided in the application root injector.
 */
@Injectable({ providedIn: 'root' })
export class SurveyIoService extends ABaseHttpService {

    /**
     * Create a new SurveyIoService instance.
     *
     * The constructor passes the survey controller route to the base server IO
     * service so that all HTTP helpers are scoped to the survey endpoints.
     */
    constructor() {
        super(inject(EmpathyIoConfigService), ServerRoutes.Survey.Controller);
    }

    //---------------------//

    /**
     * Create a new survey on the server.
     *
     * @param dto - The survey DTO to create.
     * @param opts - Optional request options forwarded to the base service.
     * @returns An observable that emits an array of created `SurveyDto` objects.
     */
    create = (dto: SurveyDto, opts?: unknown): Observable<SurveyDto[]> =>
        this._post<SurveyDto[]>(dto, opts ?? {});

    //- - - - - - - - - - -//

    /**
     * Retrieve a survey by its id.
     *
     * @param surveyId - The id of the survey to fetch.
     * @param opts - Optional request options forwarded to the base service.
     * @returns An observable that emits the requested `SurveyDto`.
     */
    getById = (surveyId: string, opts?: unknown): Observable<SurveyDto> =>
        this._getById<SurveyDto>(surveyId, opts ?? {});

    //- - - - - - - - - - -//

    /**
     * Retrieve all surveys (or the server's representation of surveys).
     *
     * @param opts - Optional request options forwarded to the base service.
     * @returns An observable that emits survey data (type depends on the server API).
     */
    getAll = (opts?: unknown): Observable<SurveyDto[]> =>
        this._get<SurveyDto[]>(opts ?? {});

    //- - - - - - - - - - -//

    /**
     * Update a survey by id.
     *
     * @param id - The id of the survey to update.
     * @param dto - The updated survey DTO.
     * @param opts - Optional request options forwarded to the base service.
     * @returns An observable that emits an array of `SurveyDto` objects returned by the server.
     */
    update = (id: string, dto: SurveyDto, opts?: unknown): Observable<SurveyDto[]> =>
        this._put<SurveyDto[]>(id, dto, opts ?? {});


}//Cls
