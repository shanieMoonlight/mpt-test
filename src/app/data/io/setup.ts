import { EnvironmentProviders, InjectionToken, Provider } from "@angular/core";

//############################//


export const EmpathyIoConfigService = new InjectionToken<EmpathyIoConfigOptions>('EmpathyIoConfig')


//############################//


/** Interface for IO config options */
export interface EmpathyIoConfigOptions {
  /** base empathy api url */
  baseUrl: string;
  authEmail: string;
}


//############################//


export class EmpathyIoSetup {

    /**
     * 
     */
    static provideEmpathyIo = (config: EmpathyIoConfigOptions)
        : (Provider | EnvironmentProviders)[] =>
        {            
            return [
                {
                    provide: EmpathyIoConfigService,
                    useValue: config,
                },
            ]
        }

} //Cls