import {
  HeartPulseIcon,
  ActivityIcon,
  WindIcon,
  DropletIcon,
  MonitorIcon,
  DizzyIcon,
  type IconProps,
} from "@/components/icons/Icons";

export const conditionIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  "coronary-artery-disease": HeartPulseIcon,
  "atrial-fibrillation": ActivityIcon,
  "heart-failure": WindIcon,
  hypertension: DropletIcon,
  "valvular-heart-disease": MonitorIcon,
  cardiomyopathy: DizzyIcon,
};
