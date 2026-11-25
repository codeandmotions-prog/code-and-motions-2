import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 18, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconDashboard = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7.5" height="9" rx="1.8" />
    <rect x="13.5" y="3" width="7.5" height="5.5" rx="1.8" />
    <rect x="13.5" y="12" width="7.5" height="9" rx="1.8" />
    <rect x="3" y="15.5" width="7.5" height="5.5" rx="1.8" />
  </Svg>
);
export const IconFlask = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 3h6M10 3v6.2L4.6 18.6A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.4-2.4L14 9.2V3" />
    <path d="M7.6 14.5h8.8" />
  </Svg>
);
export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 4.5 6v5.4c0 4.5 3.1 8.2 7.5 9.6 4.4-1.4 7.5-5.1 7.5-9.6V6L12 3z" />
    <path d="m9 12 2.1 2.1L15.2 10" />
  </Svg>
);
export const IconKey = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="m10.9 12.1 9.1-9.1M17 6l3 3M14.5 8.5l2 2" />
  </Svg>
);
export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Svg>
);
export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);
export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const IconCopy = (p: IconProps) => (
  <Svg {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.2" />
    <path d="M5 15V6.2A2.2 2.2 0 0 1 7.2 4H16" />
  </Svg>
);
export const IconAlert = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.6 2.6 20h18.8L12 3.6z" />
    <path d="M12 10v4.5M12 17.4v.1" />
  </Svg>
);
export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.2M12 7.8v.1" />
  </Svg>
);
export const IconLogout = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 4H5.6A1.6 1.6 0 0 0 4 5.6v12.8A1.6 1.6 0 0 0 5.6 20H9M16 16l4-4-4-4M20 12H9" />
  </Svg>
);
export const IconChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
);
export const IconArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const IconRefresh = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 11a8 8 0 0 0-14.5-4.2L4 9M4 4v5h5M4 13a8 8 0 0 0 14.5 4.2L20 15M20 20v-5h-5" />
  </Svg>
);
export const IconMonitor = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2.2" />
    <path d="M8 20h8M12 16v4" />
  </Svg>
);
export const IconSliders = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
    <circle cx="15" cy="7" r="2" />
    <circle cx="9" cy="17" r="2" />
  </Svg>
);
export const IconMessage = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5.6A1.6 1.6 0 0 1 5.6 4h12.8A1.6 1.6 0 0 1 20 5.6v8.8a1.6 1.6 0 0 1-1.6 1.6H10l-4.6 4v-4H5.6A1.6 1.6 0 0 1 4 14.4V5.6z" />
  </Svg>
);
export const IconFlaskLogo = (p: IconProps) => (
  <Svg strokeWidth={2} {...p}>
    <path d="M9.5 3.5h5M10.5 3.5v5.6L5.6 17.4A1.6 1.6 0 0 0 7 19.8h10a1.6 1.6 0 0 0 1.4-2.4l-4.9-8.3V3.5" />
    <path d="M8.2 14.2h7.6" />
  </Svg>
);
export const IconDownload = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />
  </Svg>
);
export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Svg>
);
export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);
export const IconArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </Svg>
);
export const IconTrash = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M10 11v6M14 11v6" />
    <path d="m6 7 1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7" />
    <path d="M9 7V4.5h6V7" />
  </Svg>
);
export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3.2" />
    <path d="m4.5 7.5 7.5 5.6 7.5-5.6" />
  </Svg>
);
export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="3" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Svg>
);
export const IconSparkle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11 3.5 12.9 9 18.5 11l-5.6 2L11 18.5 9.1 13 3.5 11l5.6-2L11 3.5Z" />
    <path d="M19 16.5v4M17 18.5h4" />
  </Svg>
);
export const IconUsers = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
    <circle cx="17" cy="9.5" r="2.4" />
    <path d="M16.2 14.4a4.6 4.6 0 0 1 4.8 4.4" />
  </Svg>
);
export const IconBars = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 20V11M12 20V4.5M18.5 20v-7.5" />
  </Svg>
);
export const IconHistory = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5" />
    <path d="M3.5 3.5v5h5M12 7.5V12l3 2" />
  </Svg>
);
export const IconCheckCircle = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.3 2.5 2.5 4.6-5" />
  </Svg>
);
export const IconKeyRound = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="15" r="3.8" />
    <path d="m10.8 12.2 8.2-8.2M15 8l2.5 2.5M17.5 5.5 20 8" />
  </Svg>
);
