/**
 * Apps directory data.
 *
 * To add an app, append one entry to the `apps` array below. The /apps
 * directory card and the /apps/{slug} detail page are both generated from it.
 * No other file needs to change.
 *
 * Rules for entries:
 *  - Only put verified information in an entry. Leave optional fields out
 *    (or as empty arrays) and the matching page section is hidden.
 *  - `apk.url` must be a real, verified download link (https://… or a file
 *    path such as /apps/my-app/my-app.apk). While it is missing, the
 *    "Download APK" button stays disabled and shows "Coming Soon".
 *  - App icon: put the image in /public/apps/{slug}/ and set `icon`. Without
 *    an icon, a neutral phone glyph is shown.
 *  - Set `placeholder: false` once an entry holds real app details.
 */

export type AppFeature = {
  title: string;
  description: string;
};

export type AppStep = {
  title: string;
  description: string;
};

export type AppFAQ = {
  question: string;
  answer: string;
};

export type AppArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type AppIconImage = {
  src: string;
  width: number;
  height: number;
};

export type AppApk = {
  /** Verified download link. Leave undefined until a real APK exists. */
  url?: string;
  /** Optional details shown next to the button, e.g. "v1.0.0" or "24 MB". */
  version?: string;
  size?: string;
};

export type AppEntry = {
  /** URL slug: the detail page lives at /apps/{slug}. */
  slug: string;
  name: string;
  /** Category label shown on the card and detail page. */
  category: string;
  /** One or two sentences, used on the directory card. */
  shortDescription: string;
  /** Short line under the app name on the detail page. */
  tagline: string;
  /** Introductory paragraph on the detail page. */
  intro: string;
  /** Brand color used for the card and hero accent (hex). */
  accentColor: string;
  icon?: AppIconImage;
  /** Explains the app's purpose. Hidden when empty. */
  article: AppArticleSection[];
  features: AppFeature[];
  benefits: string[];
  /** Installation steps. Falls back to `defaultInstallSteps` when omitted. */
  installSteps?: AppStep[];
  faqs: AppFAQ[];
  apk?: AppApk;
  /** True while the entry only holds placeholder content. */
  placeholder?: boolean;
};

/** General guidance for installing any APK on Android; apps may override it. */
export const defaultInstallSteps: AppStep[] = [
  {
    title: "Download the APK",
    description:
      "Tap Download APK on this page once it is available and save the file to your phone. Only download APK files from the official link on this page.",
  },
  {
    title: "Allow the install",
    description:
      "When Android asks, allow your browser or file manager to install apps from this source. The exact menu names vary by Android version and phone brand.",
  },
  {
    title: "Open the file and install",
    description:
      "Open the downloaded file from your notifications or Downloads folder, then tap Install and follow the on-screen prompts.",
  },
  {
    title: "Open the app",
    description:
      "When the installation finishes, tap Open, or find the app on your home screen or app list.",
  },
];

export const apps: AppEntry[] = [
  {
    slug: "first-app",
    name: "First App",
    category: "Coming Soon",
    shortDescription:
      "Our first app is on its way. Its full details and download will appear here as soon as they are confirmed.",
    tagline: "Details coming soon",
    intro:
      "This is the page for our first app. The name, features and download will be added here as soon as they are confirmed.",
    accentColor: "#1547E0",
    article: [
      {
        heading: "About this app",
        paragraphs: [
          "The full description of what this app does, who it is for and the problem it solves is being prepared. This page is ready to show it, along with the app's features, benefits and installation steps, as soon as those details are confirmed.",
        ],
      },
    ],
    features: [],
    benefits: [],
    faqs: [
      {
        question: "Can I download the app yet?",
        answer:
          "Not yet. The Download APK button stays disabled until a verified APK file is available. Check back on this page soon.",
      },
      {
        question: "Where should I download the APK from?",
        answer:
          "Only from the Download APK button on this page, once it is enabled. Avoid APK files shared on other websites or in messages, because they may not be genuine.",
      },
      {
        question: "How can I ask about the app?",
        answer:
          "Use the contact page and we will get back to you.",
      },
    ],
    placeholder: true,
  },
];

export const appBySlug = new Map(apps.map((app) => [app.slug, app]));

export function getApp(slug: string): AppEntry | undefined {
  return appBySlug.get(slug);
}

/**
 * Returns the download link only when it is a real-looking https URL or a
 * root-relative file path. Anything else (missing, empty, "#", "TODO") is
 * treated as "no download yet", so a fake link can never be rendered.
 */
export function getApkUrl(app: AppEntry): string | null {
  const url = app.apk?.url?.trim();
  if (!url) return null;
  if (/^https:\/\/[^\s/]+\.[^\s/]+/i.test(url)) return url;
  if (/^\/[^\s/#][^\s]*$/.test(url)) return url;
  return null;
}
