import type { SubService } from "../../subServiceTypes";
import { demandForecastingSoftware } from "./demandForecasting";
import { inventoryOptimizationSoftware } from "./inventoryOptimization";
import { supplyChainPlanningSoftware } from "./supplyChainPlanning";
import { aiBusinessPlanningSoftware } from "./aiBusinessPlanning";
import { salesOperationsPlanningSoftware } from "./salesOperationsPlanning";
import { replenishmentPlanningSoftware } from "./replenishmentPlanning";
import { productionPlanningSoftware } from "./productionPlanning";
import { retailWholesalePlanningSoftware } from "./retailWholesalePlanning";
import { businessAnalyticsReportingSoftware } from "./businessAnalyticsReporting";
import { erpIntegrationServices } from "./erpIntegration";

/** The ten AI-powered business software services, in display order. */
export const planningSubServices: SubService[] = [
  demandForecastingSoftware,
  inventoryOptimizationSoftware,
  supplyChainPlanningSoftware,
  aiBusinessPlanningSoftware,
  salesOperationsPlanningSoftware,
  replenishmentPlanningSoftware,
  productionPlanningSoftware,
  retailWholesalePlanningSoftware,
  businessAnalyticsReportingSoftware,
  erpIntegrationServices,
];
