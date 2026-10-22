import type { ComponentType } from "react";
import MortgageWidget from "./widgets/financial/MortgageWidget";
import LoanWidget from "./widgets/financial/LoanWidget";
import CompoundInterestWidget from "./widgets/financial/CompoundInterestWidget";
import RoiWidget from "./widgets/financial/RoiWidget";
import VatWidget from "./widgets/financial/VatWidget";
import BmiWidget from "./widgets/health/BmiWidget";
import BmrWidget from "./widgets/health/BmrWidget";
import CalorieWidget from "./widgets/health/CalorieWidget";
import BodyFatWidget from "./widgets/health/BodyFatWidget";
import HeartRateWidget from "./widgets/health/HeartRateWidget";
import AgeWidget from "./widgets/other/AgeWidget";
import DateWidget from "./widgets/other/DateWidget";
import TipWidget from "./widgets/other/TipWidget";
import FuelCostWidget from "./widgets/other/FuelCostWidget";
import UnitConversionWidget from "./widgets/other/UnitConversionWidget";
import ScientificWidget from "./widgets/math/ScientificWidget";
import FractionWidget from "./widgets/math/FractionWidget";
import PercentageWidget from "./widgets/math/PercentageWidget";
import RandomWidget from "./widgets/math/RandomWidget";
import PercentErrorWidget from "./widgets/math/PercentErrorWidget";
import ExponentWidget from "./widgets/math/ExponentWidget";
import BinaryWidget from "./widgets/math/BinaryWidget";
import HexWidget from "./widgets/math/HexWidget";
import HalfLifeWidget from "./widgets/math/HalfLifeWidget";
import QuadraticWidget from "./widgets/math/QuadraticWidget";
import LogWidget from "./widgets/math/LogWidget";
import RatioWidget from "./widgets/math/RatioWidget";
import RootWidget from "./widgets/math/RootWidget";
import LcmWidget from "./widgets/math/LcmWidget";
import GcfWidget from "./widgets/math/GcfWidget";
import FactorWidget from "./widgets/math/FactorWidget";
import RoundingWidget from "./widgets/math/RoundingWidget";
import MatrixWidget from "./widgets/math/MatrixWidget";
import ScientificNotationWidget from "./widgets/math/ScientificNotationWidget";
import BigNumberWidget from "./widgets/math/BigNumberWidget";
import StandardDeviationWidget from "./widgets/math/StandardDeviationWidget";
import NumberSequenceWidget from "./widgets/math/NumberSequenceWidget";
import SampleSizeWidget from "./widgets/math/SampleSizeWidget";
import ProbabilityWidget from "./widgets/math/ProbabilityWidget";
import StatisticsWidget from "./widgets/math/StatisticsWidget";
import MeanMedianModeWidget from "./widgets/math/MeanMedianModeWidget";
import PermutationCombinationWidget from "./widgets/math/PermutationCombinationWidget";
import ZScoreWidget from "./widgets/math/ZScoreWidget";
import ConfidenceIntervalWidget from "./widgets/math/ConfidenceIntervalWidget";
import TriangleWidget from "./widgets/math/TriangleWidget";
import VolumeWidget from "./widgets/math/VolumeWidget";
import SlopeWidget from "./widgets/math/SlopeWidget";
import AreaWidget from "./widgets/math/AreaWidget";
import DistanceWidget from "./widgets/math/DistanceWidget";
import CircleWidget from "./widgets/math/CircleWidget";
import SurfaceAreaWidget from "./widgets/math/SurfaceAreaWidget";
import PythagoreanWidget from "./widgets/math/PythagoreanWidget";
import RightTriangleWidget from "./widgets/math/RightTriangleWidget";

/** Maps a calculator slug to its interactive (client) widget. Only the widget rendered by a page is sent to the browser. */
export const widgets: Record<string, ComponentType> = {
  "mortgage-calculator": MortgageWidget,
  "loan-calculator": LoanWidget,
  "compound-interest-calculator": CompoundInterestWidget,
  "roi-calculator": RoiWidget,
  "vat-calculator": VatWidget,
  "bmi-calculator": BmiWidget,
  "bmr-calculator": BmrWidget,
  "calorie-calculator": CalorieWidget,
  "body-fat-calculator": BodyFatWidget,
  "target-heart-rate-calculator": HeartRateWidget,
  "age-calculator": AgeWidget,
  "date-calculator": DateWidget,
  "tip-calculator": TipWidget,
  "fuel-cost-calculator": FuelCostWidget,
  "unit-conversion-calculator": UnitConversionWidget,
  "scientific-calculator": ScientificWidget,
  "fraction-calculator": FractionWidget,
  "percentage-calculator": PercentageWidget,
  "random-number-generator": RandomWidget,
  "percent-error-calculator": PercentErrorWidget,
  "exponent-calculator": ExponentWidget,
  "binary-calculator": BinaryWidget,
  "hex-calculator": HexWidget,
  "half-life-calculator": HalfLifeWidget,
  "quadratic-formula-calculator": QuadraticWidget,
  "log-calculator": LogWidget,
  "ratio-calculator": RatioWidget,
  "root-calculator": RootWidget,
  "lcm-calculator": LcmWidget,
  "gcf-calculator": GcfWidget,
  "factor-calculator": FactorWidget,
  "rounding-calculator": RoundingWidget,
  "matrix-calculator": MatrixWidget,
  "scientific-notation-calculator": ScientificNotationWidget,
  "big-number-calculator": BigNumberWidget,
  "standard-deviation-calculator": StandardDeviationWidget,
  "number-sequence-calculator": NumberSequenceWidget,
  "sample-size-calculator": SampleSizeWidget,
  "probability-calculator": ProbabilityWidget,
  "statistics-calculator": StatisticsWidget,
  "mean-median-mode-range-calculator": MeanMedianModeWidget,
  "permutation-combination-calculator": PermutationCombinationWidget,
  "z-score-calculator": ZScoreWidget,
  "confidence-interval-calculator": ConfidenceIntervalWidget,
  "triangle-calculator": TriangleWidget,
  "volume-calculator": VolumeWidget,
  "slope-calculator": SlopeWidget,
  "area-calculator": AreaWidget,
  "distance-calculator": DistanceWidget,
  "circle-calculator": CircleWidget,
  "surface-area-calculator": SurfaceAreaWidget,
  "pythagorean-theorem-calculator": PythagoreanWidget,
  "right-triangle-calculator": RightTriangleWidget,
};
