export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

export type SharePayload = {
  title: string;
  text: string;
  /** Path such as /shop/royal-designs-r-01; resolved against the current origin. */
  path: string;
};

export function absoluteUrl(path: string): string {
  return new URL(path, window.location.origin).toString();
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    area.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

/** Copy only: used by the explicit "Copy link" buttons. */
export async function copyLink(path: string): Promise<ShareResult> {
  return (await copyText(absoluteUrl(path))) ? "copied" : "failed";
}

/**
 * Share with the native Web Share API where available (WhatsApp and other
 * installed apps on phones, the system share sheet on supported desktops).
 * Falls back to copying the link when the API is missing, rejected, or
 * fails for any reason other than the person dismissing the sheet.
 */
export async function shareDesign({ title, text, path }: SharePayload): Promise<ShareResult> {
  const url = absoluteUrl(path);
  const data: ShareData = { title, text, url };

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    let allowed = true;
    if (typeof navigator.canShare === "function") {
      try {
        allowed = navigator.canShare(data);
      } catch {
        allowed = false;
      }
    }
    if (allowed) {
      try {
        await navigator.share(data);
        return "shared";
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return "cancelled";
        }
        // Any other failure (e.g. NotAllowedError): use the copy fallback.
      }
    }
  }

  return (await copyText(url)) ? "copied" : "failed";
}
