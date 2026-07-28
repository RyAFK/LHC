import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

/**
 * A small, cohesive set of hand-drawn line icons (24x24, 1.6px stroke,
 * rounded caps) — used in place of stock medical imagery or a third-party
 * icon library. Kept deliberately restrained: no fills, no color baked in
 * (icons inherit `currentColor`), no decorative flourishes.
 */
function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12h4l2-5 3 10 2-7 1.5 2H21" />
      <path d="M12 20.5c-3-1.9-8-5.4-8-9.7A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 8 2.8c0 4.3-5 7.8-8 9.7Z" />
    </Icon>
  );
}

export function StethoscopeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 3v6a4 4 0 0 0 8 0V3" />
      <path d="M9 13v2a5 5 0 0 0 10 0v-2.5" />
      <circle cx="19" cy="9.5" r="2" />
    </Icon>
  );
}

export function CalendarCheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="1.5" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v3M16 3v3" />
      <path d="M8.5 14l2 2 4-4" />
    </Icon>
  );
}

export function ClipboardListIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5.5" y="4" width="13" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 15h6M9 8h2" />
    </Icon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l7 3v5.5c0 4.5-3 7.6-7 9.5-4-1.9-7-5-7-9.5V6Z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  );
}

export function PhoneCallIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 4h3.2l1.3 4-2 1.4a11 11 0 0 0 5.1 5.1l1.4-2 4 1.3V17a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 3 5.2 2 2 0 0 1 5 4Z" />
    </Icon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </Icon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M16 8a3 3 0 1 1 2.5 4.6" />
      <path d="M21 20c0-2.6-1.8-4.6-4-5.3" />
    </Icon>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4.2" />
      <path d="M12 17.3h.01" />
    </Icon>
  );
}

export function ActivityIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </Icon>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M8 20.5h8M12 16.5v4" />
      <path d="M6.5 12l2-3 2 4 2-6 2 3h3" />
    </Icon>
  );
}

export function DropletIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3s6 6.8 6 11.2A6 6 0 0 1 6 14.2C6 9.8 12 3 12 3Z" />
    </Icon>
  );
}

export function WindIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 8h11a2.5 2.5 0 1 0-2.3-3.4" />
      <path d="M3 12.5h15a2.5 2.5 0 1 1-2.3 3.4" />
      <path d="M3 17h9a2 2 0 1 1-1.8 2.8" />
    </Icon>
  );
}

export function DizzyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 9.5l3 3-3 3M15.5 9.5l-3 3 3 3" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19.5 19.5 15 15" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15.5M14 5.5 20.5 12 14 18.5" />
    </Icon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7Z" />
    </Icon>
  );
}

export function FileTextIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5V8h4" />
      <path d="M9 12.5h6M9 16h6" />
    </Icon>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="3" width="9" height="18" rx="1" />
      <path d="M14 9h5v12h-5" />
      <path d="M8 7h1M11 7h1M8 11h1M11 11h1M8 15h1M11 15h1" />
    </Icon>
  );
}
