import {
  HeartPulseIcon,
  ActivityIcon,
  WindIcon,
  DizzyIcon,
  DropletIcon,
  UsersIcon,
  type IconProps,
} from "@/components/icons/Icons";

export const symptomIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  "chest-pain": HeartPulseIcon,
  palpitations: ActivityIcon,
  breathlessness: WindIcon,
  "dizziness-blackouts": DizzyIcon,
  "high-blood-pressure": DropletIcon,
  "family-history": UsersIcon,
};
