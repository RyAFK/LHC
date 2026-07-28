import {
  ActivityIcon,
  MonitorIcon,
  ClockIcon,
  HeartPulseIcon,
  WindIcon,
  DropletIcon,
  StethoscopeIcon,
  type IconProps,
} from "@/components/icons/Icons";

export const testIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  electrocardiogram: ActivityIcon,
  echocardiogram: MonitorIcon,
  "heart-monitor": ClockIcon,
  "exercise-stress-test": HeartPulseIcon,
  "cardiopulmonary-exercise-test": WindIcon,
  "blood-pressure-monitoring": DropletIcon,
  "heart-screening": StethoscopeIcon,
};
