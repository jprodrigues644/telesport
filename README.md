# TéléSport - Olympic Games Dashboard
Angular application to visualize Olympic medal statistics by country with interactive charts.
---
##  Table of Contents
1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Technologies Used](#-technologies-used)
4. [Prerequisites](#-prerequisites)
5. [Installation](#-installation)
6. [Running the Project](#-running-the-project)
7. [Architecture](#-architecture)
8. [Screenshots](#-screenshots)
9. [Tests](#-tests)


---
##  Project Overview
TéléSport is a web application developed with **Angular 18** that allows users to:
- Visualize the distribution of Olympic medals by country via an interactive pie chart
- View details of a selected country's participations
- Navigate between countries using Previous/Next buttons
- Enjoy a responsive interface adapted for mobile, tablet, and desktop
---
##  Features
### Home Page (Dashboard)
-  **Interactive pie chart** displaying medal distribution by country
-  **KPIs**: Total number of Olympic Games and participating countries
-  **Click navigation**: Click on a pie segment to access country details
### Country Details Page
-  **Bar chart** showing medal evolution by year
-  **Key statistics**: Number of participations, total medals, number of athletes
-  **Navigation between countries** with Previous/Next buttons
-  **Back button** to return to the dashboard
### Cross-Cutting Features
-  **Responsive design** (mobile, tablet, desktop)
-  **Sober and professional color palette**
-  **Error handling** with a custom 404 page
-  **Optimized performance** with standalone components
---
##  Technologies Used
| Technology | Version | Description |
|------------|---------|-------------|
| **Angular** | 18.0.6 | Front-end framework |
| **TypeScript** | 5.5.4 | Typed language |
| **Chart.js** | 4.2.1 | Charting library |
| **RxJS** | 7.8.0 | Reactive programming |
| **SCSS** | - | CSS preprocessor |
| **Roboto Font** | - | Google Fonts typeface |
---
##  Prerequisites
Before starting, ensure you have installed:
- **Node.js**: version 18 or higher
- **npm**: version 9 or higher
- **Angular CLI**: version 18
```bash
# Check installed versions
node --version
npm --version
ng version
```
---
## Installation

```bash
git clone https://github.com/jprodrigues644/telesport.git
cd telesport
npm install
```
---
## Running the Project
```bash
ng serve
# App running at http://localhost:4200
```
---

## Architecture

### Structure & Components
- **Component-driven architecture** where each feature is isolated and easy to maintain.  
- **Standalone components**: Angular components that work independently without modules.  
- **Clear separation of concerns**: services handle business logic and API calls, while UI components remain purely presentational and fully reusable.  
- **Reusable components**: charts, cards, tables, and other UI elements designed for easy reuse.

### Services & State Management
- **Dedicated service** for all Olympic data handling and HTTP communication.  
- **Observables with Async Pipe** to ensure reactive flows with zero manual `unsubscribe()` management.  
- **Integrated error handling**: automatic redirection + a dedicated `NotFound` component.

See the **[architecture.md](./architecture.md)** and the **[notes-architecture.md](./notes-architecture.md)** files for more details.

---

## Screenshots

Below are some previews of the application on both desktop and mobile devices.

###  Home Page
- **Desktop**  
  ![Home Desktop](.src/assets/images/screenshots/pageHomeDesktop.png)

- **Mobile – iPhone 12 Pro**  
  ![Home Mobile](.src/assets/images/screenshots/pageHomeMobileIphone12Pro.png)

###  Country Details Page
- **Desktop**  
  ![Country Details Desktop](.src/assets/images/screenshots/pageCountryDetailsDesktop.png)

- **Mobile – iPhone 12 Pro**  
  ![Country Details Mobile](.src/assets/images/screenshots/pageCountryDetailsMobileIphone12Pro.png)


---
## 🧪 Tests

- **Unit tests** powered by **Jasmine + Karma**  
- Easy debugging with Angular’s built-in testing tools

### Test Debug Preview
![Test Debug](.src/assets/images/screenshots/testDebug.png)

