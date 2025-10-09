# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AgroApp is an Angular 20 application for agricultural field management. The application uses Server-Side Rendering (SSR) and is built with zoneless change detection. It provides farmers with tools to manage crops, fields, tasks, and community recommendations.

## Development Commands

### Development Server
```bash
ng serve
# Or using npm
npm start
```
The application runs at `http://localhost:4200/`

### Build
```bash
ng build                                    # Production build
ng build --configuration development        # Development build
```

### Tests
```bash
ng test                                     # Run all unit tests with Karma
ng test --include='**/component.spec.ts'    # Run specific test file
```

### Serve SSR Build
```bash
npm run serve:ssr:frontend-agroapp
```
Serves the server-rendered application from `dist/frontend-agroapp/server/server.mjs`

### Mock API Server
The project uses json-server for mock data. Start it with:
```bash
npx json-server --watch db.json --port 3000
```
The mock database is located at `/db.json` or `/server/db.json`

### Code Generation
```bash
ng generate component component-name
ng generate service service-name
ng generate guard guard-name
```

## Architecture

### Directory Structure

The application follows a domain-driven design with clear separation of concerns:

```
src/app/
├── plants/                 # Domain modules (business logic)
│   ├── crop/              # Crop management domain
│   ├── field/             # Field management domain
│   ├── task/              # Task management domain
│   ├── profile/           # User profile domain
│   └── community_recommendations/
├── shared/                # Shared infrastructure and presentation
│   ├── infrastructure/    # Guards, services, i18n
│   └── presentation/      # UI components and views
```

### Domain Layer (`plants/`)

Each domain module follows this structure:
- `domain/model/` - Entity definitions and assemblers
- `services/` - HTTP services for API communication

**Entity Pattern**: Each entity has:
1. `*.entity.ts` - Plain TypeScript class with properties
2. `*.assembler.ts` - Transforms API responses to entity objects

**Example**: `src/app/plants/crop/`
- Entity: `crop.entity.ts`
- Assembler: `crop.assembler.ts`
- Service: `crop.services.ts`

### Shared Layer

**Infrastructure** (`shared/infrastructure/`):
- `guards/` - Route guards (auth.guard.ts, login.guard.ts)
- `services/` - Shared services (language, sidebar)
- `i18n/` - Translation loader

**Presentation** (`shared/presentation/`):
- `components/` - Reusable components (navbar, sidebar, language-switcher)
- `views/` - Page components (dashboard, my-crops, my-fields, my-tasks, etc.)

### Key Architectural Patterns

**1. Environment Configuration**
API endpoints are centralized in `src/enviroment/enviroment.development.ts`:
```typescript
BASE_URL: "http://localhost:3000"
ENDPOINT_PATH_CROP_FIELDS: "/crop_fields"
```

**2. Authentication**
- Uses localStorage-based authentication
- `authGuard` protects authenticated routes
- `loginGuard` prevents authenticated users from accessing login page
- Check `src/app/shared/infrastructure/guards/`

**3. Routing Structure**
- Public route: `/login`
- Protected routes wrapped in `MainLayoutComponent` with sidebar/navbar
- All authenticated routes use `authGuard`
- See `src/app/app.routes.ts`

**4. SSR Configuration**
- Application is configured for server-side rendering
- Uses `outputMode: "server"` in angular.json
- Entry point: `src/server.ts`
- Main server: `src/main.server.ts`

**5. Internationalization (i18n)**
- Uses `@ngx-translate/core` for translations
- Translation files in `public/i18n/` (en.json, es.json)
- Custom loader: `CustomTranslateLoader` in `shared/infrastructure/i18n/translate-loader.ts`
- Language switcher component available

**6. Zoneless Change Detection**
- Application uses `provideZonelessChangeDetection()`
- No Zone.js dependency for better performance
- Components must use signals or manual change detection

## TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `strictTemplates: true`

When adding new code, ensure compliance with these strict checks.

## Code Formatting

Prettier is configured in package.json:
- Print width: 100 characters
- Single quotes: true
- Angular parser for HTML files

## Common Patterns

### Creating a New Service
Services follow Angular's dependency injection pattern and use HttpClient:
```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  private apiUrl = enviroment.BASE_URL + enviroment.ENDPOINT_PATH;
  constructor(private http: HttpClient) {}
}
```

### Adding New Routes
1. Create component in appropriate domain or shared/presentation/views
2. Add route to `src/app/app.routes.ts`
3. For protected routes, add as child of MainLayoutComponent with authGuard
4. Update sidebar navigation if needed

### Working with Entities
1. Create entity class in `domain/model/*.entity.ts`
2. Create assembler in `domain/model/*.assembler.ts`
3. Create service in `services/*.services.ts`
4. Service should use assembler to transform API responses

## Dependencies of Note

- **Angular 20.3**: Latest Angular version with SSR
- **Angular Material 20**: UI component library
- **@ngx-translate**: Internationalization
- **json-server**: Mock REST API for development
- **Express 5**: Server for SSR
- **RxJS 7.8**: Reactive programming

## SSR Considerations

When working with SSR:
- Check for browser context using `isPlatformBrowser(platformId)` before accessing browser APIs
- Avoid direct DOM manipulation in component lifecycle hooks
- Use `PLATFORM_ID` injection to detect execution environment
- See `auth.guard.ts` for example of platform checking with localStorage
