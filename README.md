Project: MPT Test (Survey Builder)
=================================

This repository contains a small Angular application for creating, storing, listing and editing surveys. It is structured as an NX-style workspace and uses Angular standalone components, signals, reactive forms, and a lightweight state helper (MiniState) to manage server and UI state.

**Quick Summary**
- **What it does:** Build and manage surveys (create, save draft, list, edit).
- **Primary pages:** `home`, `survey-builder`, `survey-list`, `survey-detail`.
- **Core patterns:** Smart/dumb separation (pages manage state, forms are dumb), MiniState for declarative state, `NotificationsModal` for consistent loader/error/success UI, `SurveyStorage` for draft persistence.



**Project Structure (high level)**
- **Pages**
  - `src/app/pages/home/*` — Home dashboard with navigation cards to the main flows.
  - `src/app/pages/survey-builder/*` — Page to create surveys. Loads a draft from `SurveyStorage` if present, displays `SurveyFormComponent` to trigger create operations. (Could be changed to save to a Drafts endpoint if one existed)
  - `src/app/pages/survey-list/*` — Calls the API to fetch all surveys and displays them via `MptUiSurveyCard`.
  - `src/app/pages/survey-detail/*` — Reads the survey id from `ActivatedRoute`, fetches the survey with that id and displays it in `SurveyFormComponent` for editing.  Uses `MiniStateBuilder` for upate and get states, then combines the loaders and messages with `MiniStateCombined`.

- **Forms and Components**
  - `src/app/ui/forms/survey-form/survey-form.ts` — The reactive form used for create/edit. Exposes outputs: `newSurvey`, `updateSurvey`, and `surveyDraft`.
  - `src/app/ui/forms/questions/mpt-choice-question-form.cva.ts` — Choice question ControlValueAccessor (CVA) implementation used inside the survey form.
  - `src/app/ui/notifications/notifications/notifications.component.ts` — `NotificationsModal` (standalone) used by pages to render loading, error and success messages without calling services directly.
  - `src/app/ui/cards/survey-card/*` — UI card used to present individual surveys in the list.

- **Services & Models**
  - `src/app/services/survey-storage/survey-storage.ts` — Wraps `SsrLocalStorage` to persist a survey draft under the `SURVEY_KEY` constant.
  - `src/app/data/models/survey-dto.ts` — `SurveyDto` interface (id, title, description, questions).
  - `src/app/data/io/*` — API layer / IO services used by pages to `getAll`, `getById`, `create`, and `update` surveys.

**Key Data Flow & Behavior**
- Creating a survey
  - `SurveyFormComponent` exposes `newSurvey` output when a valid form is submitted.
  - `MptSurveyBuilder` listens for the form outputs and triggers `_createState` (MiniState) to call the API via `SurveyIoService.create`.
  - On success a `setOnSuccessFn` clears the stored draft (`SurveyStorage.removeSurveyDraft()`).

- Draft saving & recovery
  - `SurveyFormComponent` emits `surveyDraft` whenever the questions control becomes valid (a draft-ready state).
  - `MptSurveyBuilder` captures that draft and calls `SurveyStorage.storeSurveyDraft(...)` to persist it in localStorage.
  - When `MptSurveyBuilder` loads it attempts to read the draft (`SurveyStorage.getSurveyDraft()`); if found it sets `_draftSurvey` and calls `SurveyFormComponent` via an input so the draft loads into the form. `SbToastService` is used to notify the user a draft was loaded.

- Listing & editing
  - `MptSurveyList` uses `MiniStateBuilder.Create(() => SurveyIoService.getAll()).trigger()` to fetch the list and exposes `_data` (computed) for the template.
  - Clicking a survey card navigates to the detail page. `MptSurveyDetail` uses `ActivatedRoute.paramMap` to extract the id, `MiniStateBuilder` to call `getById(id)` and show the survey in a `SurveyFormComponent` for editing. Updates call `_updateState.trigger(dto)`.

**State & UI Patterns**
- MiniState: Pages use `MiniStateBuilder` and `MiniStateCombined` to declaratively model server interaction (inputs/outputs, success and error messages, loading flags).
- NotificationsModal: Pages include `mpt-notifications-modal` in their templates and pass `_loading()`, `_errorMsg()` and `_successMsg()` so the same UI component handles loaders and messages consistently.
- Smart/Dumb Separation: Page components orchestrate I/O and state; `SurveyFormComponent` is primarily a presentational form component exposing outputs and an input (`surveyToEdit`).

**Testing**
- Jest is used for unit tests. Key patterns used in tests:
  - Standalone components are provided through `TestBed.configureTestingModule({ imports: [MyComponent] })` and inputs are set with `fixture.componentRef.setInput(...)` when needed.
  - `data-testid` attributes and helper functions (e.g. `byTestIdAll`) are used for stable DOM queries.
  - Child components are accessed via `By.directive(...)` and their instances inspected to avoid brittle internal DOM assertions.

**Files of interest**
- `src/app/pages/survey-builder/survey-builder.ts` — builder page, draft load/store, create logic.
- `src/app/ui/forms/survey-form/survey-form.ts` — reactive form and `surveyDraft` output.
- `src/app/services/survey-storage/survey-storage.ts` — local draft persistence.
- `src/app/pages/survey-list/survey-list.ts` — list page using MiniState.
- `src/app/pages/survey-detail/survey-detail.ts` — detail + update flow.
- `src/app/ui/notifications/notifications/notifications.component.ts` — `NotificationsModal` used across pages.



**Contributing**
- Follow the existing test patterns. Keep components small and prefer signals and computed for derived state.
- Use `data-testid` for stable DOM testing where templates render multiple similar rows.




<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨This is a [Nx workspace](https://nx.dev). I chose standard workspace (single application) rather than a monorepo becuase that would be overkill for an interview test.

[Learn more about this workspace setup and its capabilities](https://nx.dev/docs/technologies/angular) 

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve mpt-test
```

To create a production bundle:

```sh
npx nx build mpt-test
```


[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)



[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/docs/guides/nx-console)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-standalone-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [NX on Discord](https://go.nx.dev/community)
- [NX on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [NX Youtube channel](https://www.youtube.com/@nxdevtools)
- [NX blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
