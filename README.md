# Provis React Application

## Summary

This report provides a concise analysis of the core technical architecture of the **Provis** application, focusing on key dependencies, routing schematic, state management paradigms (local and global), data fetching methodology, and advanced component design patterns.  

---

## I. Core Technology Stack and Dependencies

The Provis application leverages a highly efficient and standardized technology stack. The primary dependencies form a cohesive foundation for building a modern, performant React SPA.

### Key Libraries

| Library | Primary Function |
| :--- | :--- |
| **React** & **React DOM** | Core UI rendering and component architecture |
| **React Router DOM** | Declarative client-side routing |
| **TailwindCSS** | Styling |
| **DaisyUI** | Design component abstraction | 
| **React Hook Form** | Form creation and handling |
| **EmailJS** | Email service integration  |
| **React Responsive** | Media query handling and responsive rendering |

---

## II. Routing Architecture

The application uses **React Router DOM v6** with a centralized route configuration in `App.tsx`. Routes are organized hierarchically with layout wrappers for shared UI elements.

### Route Structure
```
/ → Landing page
└── /provis → Main container for marketplace
      ├── / → Available categories list
      ├── /category/:categoryId → Each category products
      └── /cart → Cart page
```

Navigation is handled programmatically via the `useNavigate` hook.

---

## III. State Management

### Local State (`useState`)

Component-specific state is managed locally using React's `useState` hook. Examples include:
- Active carousel index in `IntroductionContent`
- Form inputs in contact forms
- UI interaction states (modals, dropdowns, etc.)

### Global State (Context API)

The application implements **React Context API** for cross-component state sharing, avoiding prop drilling and maintaining a clean component hierarchy.
There are two contexts present:
- **Cart Context**: Keeps track and handles items in cart. It also handles storage and retrieval from browser's local storage.
- **Toolbar Title Context**: Handles change of title in the /provis route across pages, where each children can set the title.

---

## IV. Data Handling

### Static Data

Product catalogs and service information are stored as typed constants within component files or separate data modules. This approach suits the application's content-driven nature without requiring external APIs.

### Form Submissions

**EmailJS** integration handles contact form submissions without a backend server. Forms use **React Hook Form** for validation and state management, providing a seamless user experience with client-side validation.

---

## V. Component Design Patterns

### Reusable Components

The application follows a modular component architecture with shared components in `components/common/`:

- **PresentationCard**: Standardized content cards with icon, title, description, and optional CTA
- **SpotlightCard**: Enhanced cards with visual effects
- **RotatingText**: Animated text rotation for hero sections

### Responsive Design Strategy

**React Responsive** (`useMediaQuery` hook) enables conditional rendering based on screen size, providing optimized experiences for mobile and desktop:
```typescript
const isSmallScreen = useMediaQuery({ maxWidth: 1023 });
```

---

## VI. Key Technical Decisions

1. **No External Backend**: Static data and EmailJS reduce infrastructure complexity
2. **Context over Redux**: Lightweight state management suitable for application scope
3. **DaisyUI + Tailwind**: Rapid UI development with consistent design system
4. **Programmatic Navigation**: Enhanced UX through seamless route transitions

---

## Conclusion

The Provis application demonstrates a well-architected React SPA leveraging modern patterns and libraries. The combination of local state, Context API for global concerns, and a component-driven architecture creates a maintainable, performant, and scalable foundation.
This architecture also allows for future expansion, such as integrating a backend API, authentication, or persistent data storage, with minimal refactoring.
