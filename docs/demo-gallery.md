# Demo Gallery: Scientific & Research Data Visualizations

This section documents the demo charts included in the dashboard for scientific and research purposes. Each chart uses real or realistic sample data and is implemented with either Chart.js or Recharts.

---

## 1. Global Temperature Change
- **Type:** Line Chart (Chart.js)
- **Description:** Shows global temperature anomaly (°C) from 1880 to 2020, visualizing climate change trends.
- **Data Source:** Sample data (based on NASA GISS Global Temperature data)
- **Component:** `components/visualizations/demo-gallery.tsx` (`GlobalTempChart`)

---

## 2. Population Growth by Continent
- **Type:** Bar Chart (Recharts)
- **Description:** Displays population (in millions) by continent, useful for demographic and geographic research.
- **Data Source:** Sample data (based on United Nations estimates, 2021)
- **Component:** `components/visualizations/demo-gallery.tsx` (`PopulationGrowthBar`)

---

## 3. COVID-19 Case Trends
- **Type:** Area Chart (Chart.js)
- **Description:** Shows the growth of COVID-19 cases (in millions) over time, useful for epidemiological studies.
- **Data Source:** Sample data (based on WHO/Johns Hopkins University reports)
- **Component:** `components/visualizations/demo-gallery.tsx` (`CovidAreaChart`)

---

## 4. Nobel Prize Winners by Country
- **Type:** Pie Chart (Recharts)
- **Description:** Visualizes the number of Nobel Prize winners by country, useful for historical and sociological research.
- **Data Source:** Sample data (based on NobelPrize.org statistics)
- **Component:** `components/visualizations/demo-gallery.tsx` (`NobelPieChart`)

---

## 5. Renewable Energy Production
- **Type:** Stacked Bar Chart (Chart.js)
- **Description:** Shows renewable energy production by source (solar, wind, hydro) over time, useful for energy and environmental research.
- **Data Source:** Sample data (based on IEA/World Bank reports)
- **Component:** `components/visualizations/demo-gallery.tsx` (`RenewableStackedBar`)

---

> For more details or to add new charts, see the source code in `components/visualizations/demo-gallery.tsx`. 