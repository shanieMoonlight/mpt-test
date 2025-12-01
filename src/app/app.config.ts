import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideThemeInitializer } from '@spider-baby/material-theming/init';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { THEME_CONFIG } from './config/app-theme.config';
import { appViewTransition } from './config/app.view-transitions';
import { EmpathyIoConfigOptions, EmpathyIoSetup, empathyHttpInterceptors } from './data/io';

//###########################//

const ioConfig: EmpathyIoConfigOptions = {
  baseUrl: environment.serverBaseUrl,
  authEmail: environment.authEmail,
}

//###########################//

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        ...empathyHttpInterceptors
      ])
    ),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes,
      withViewTransitions(appViewTransition)
    ), 
    provideClientHydration(withEventReplay()),
    EmpathyIoSetup.provideEmpathyIo(ioConfig),
    provideThemeInitializer(THEME_CONFIG)
  ]
};
