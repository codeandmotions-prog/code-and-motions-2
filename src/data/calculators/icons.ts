import {
  Home, Landmark, TrendingUp, PiggyBank, Percent, Receipt, Scale, Flame, UtensilsCrossed, Ruler, HeartPulse,
  Cake, CalendarDays, HandCoins, Fuel, ArrowLeftRight, Calculator, Divide, Dices, Binary, Hash, Hourglass,
  Sigma, Radical, Triangle, Circle, Box, Layers, Grid3x3, MoveDiagonal, Variable, Infinity as InfinityIcon,
  ListOrdered, Users, FlaskConical, BarChart3, Shuffle, Target, Activity, Move3d, SquareStack, Pi, Waypoints,
  Shapes, Scissors, Sparkles, Route, ChartNoAxesColumn,
  type LucideIcon,
} from "lucide-react";

/** Icon key -> Lucide component. Import this from the module that renders the icon. */
export const ICONS: Record<string, LucideIcon> = {
  home: Home, landmark: Landmark, trending: TrendingUp, piggy: PiggyBank, percent: Percent, receipt: Receipt,
  scale: Scale, flame: Flame, utensils: UtensilsCrossed, ruler: Ruler, heart: HeartPulse, cake: Cake,
  calendar: CalendarDays, coins: HandCoins, fuel: Fuel, convert: ArrowLeftRight, calculator: Calculator,
  divide: Divide, dice: Dices, binary: Binary, hash: Hash, hourglass: Hourglass, sigma: Sigma, radical: Radical,
  triangle: Triangle, circle: Circle, box: Box, layers: Layers, grid: Grid3x3, diagonal: MoveDiagonal,
  variable: Variable, infinity: InfinityIcon, list: ListOrdered, users: Users, flask: FlaskConical,
  bars: BarChart3, shuffle: Shuffle, target: Target, activity: Activity, move3d: Move3d, stack: SquareStack,
  pi: Pi, waypoints: Waypoints, shapes: Shapes, scissors: Scissors, sparkles: Sparkles, route: Route,
  column: ChartNoAxesColumn,
};

export function iconFor(key: string): LucideIcon {
  return ICONS[key] ?? Calculator;
}
