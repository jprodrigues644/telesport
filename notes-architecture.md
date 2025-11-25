# Analysis and Refactoring – TéléSport Project

---

## **1. Issues Identified in the Starter Code**

### **1.1. Angular Bad Practices**

| Issue Type                     | Description                                                                                         | Example (File/Line)                                   |
|-------------------------------|-----------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| **HTTP calls inside components** | API calls are made directly inside components instead of being centralized in a service.            | `country-details.component.ts`                         |
| **Lack of strict typing**       | Use of `any` instead of strongly typed interfaces.                                                   | `home.component.ts`                                    |
| **Duplicated code**             | Logic for calculating totals is duplicated across multiple components.                               | `country.component.ts`                                 |
| **Oversized files**             | Some files contain too many responsibilities (UI + business logic).                                  | `dashboard.component.ts`                               |
| **Obsolete code**               | Presence of unnecessary `console.log` statements and commented-out code.                             | `country.component.ts`                                 |
| **Poor observable management**  | Observables are not properly handled (no `pipe`, no `async` pipe).                                   | `home.component.ts`                                    |
| **Poor folder structure**       | The current structure is confusing and hard to maintain.                                             | `components/data.service.ts`                           |

### **1.2. Technical Debt Risks**

- **Maintainability**: Difficult to maintain due to duplicated logic and lack of structure.  
- **Scalability**: Adding new features becomes harder without a clear architecture.  
- **Testing**: The code is not easily testable because responsibilities are mixed.

---

## **2. Proposed New Architecture**

### **2.1. Target Folder Structure**

![TéléSport Project Structure](src/assets/images/notesDiag.png)

### **2.2. Roles and Responsibilities**

| Folder                  | Role                                                                                  | Example Content                                  |
|-------------------------|----------------------------------------------------------------------------------------|--------------------------------------------------|
| `components/ui/charts/` | Reusable chart components.                                                             | `OlympicMedalsPieChartComponent`                 |
| `components/layout/`    | Layout components (header, footer, layout container).                                   | `HeaderComponent`                                |
| `models/`               | TypeScript interfaces for data typing.                                                 | `Olympic`, `Participation`                       |
| `pages/`                | Main application pages.                                                                | `HomeComponent`, `CountryDetailsComponent`       |
| `services/`             | Services for API calls and business logic.                                             | `DataService`                                    |

### **2.3. Design Patterns to Apply**

| Pattern                         | Application                                                                             | Benefits                                                    |
|---------------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| **Singleton**                   | `DataService` provided at the root level (`providedIn: 'root'`).                         | One single instance across the entire app.                 |
| **Separation of Concerns**     | Components handle display; services handle data and business logic.                      | More maintainable and testable code.                       |

### **2.4. Improvements to Implement**

- **API call centralization**: All HTTP calls must be moved to `DataService`.  
- **Strict typing**: Use TypeScript interfaces instead of `any`.  
- **Reusable components**: Charts and header are implemented as standalone components.  
- **Proper observable handling**: Use `pipe` and the `async` pipe in templates.  
- **Clear structure**: Features grouped in well-defined folders.

### **2.5. Backend Integration Facilitation**

- **Services as API interfaces**: Only `DataService` needs modification to connect a real backend.  
- **TypeScript interfaces**: Ensure strong typing for API data (`Olympic`, `Participation`).  
- **Observables ready**: Reactive data handling makes backend integration smoother.

---

## **3. Refactoring Steps**

### **3.1. Component Separation**

- Create `country-medals-bar-chart` component for displaying country medal counts.  
- Create `medals-pie-chart` component for total medal visualization.  
- This makes the `country` component lighter and better structured.

### **3.2. Removing Obsolete Code**

- Remove unnecessary `console.log` statements.  
- Remove outdated commented code.
