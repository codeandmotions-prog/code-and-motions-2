import Link from "next/link";
import { Download, FileCheck2, Monitor, ShieldAlert } from "lucide-react";
import { getSoftwareProduct } from "@/data/softwareProducts";

type ProductDownloadSectionProps = {
  slug: string;
};

const steps = [
  { title: "Download the installer", body: "Use the button on this page to save the setup file to your PC." },
  { title: "Run the setup", body: "Open the downloaded file and follow the setup wizard." },
  { title: "Start LabNova", body: "When setup finishes, open LabNova and begin setting up your lab." },
];

/** Server-rendered download section. Renders nothing unless the product has a published installer. */
export default function ProductDownloadSection({ slug }: ProductDownloadSectionProps) {
  const product = getSoftwareProduct(slug);
  const download = product?.download;
  if (!product || !download) return null;

  const meta = [
    { label: "Version", value: download.version },
    { label: "Platform", value: download.platform },
    { label: "File size", value: download.sizeLabel },
    { label: "Publisher", value: download.publisher },
  ];

  return (
    <section id="download" aria-labelledby="download-heading" className="scroll-mt-24 border-y border-(--color-line) bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em]" style={{ color: product.accentColor }}>
            Download
          </span>
          <h2 id="download-heading" className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Download {product.name} for {download.platform}
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
            Get the official {product.name} installer and set up your laboratory on your own PC.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-(--color-line) bg-white p-7 shadow-[0_30px_60px_-45px_rgba(15,20,40,0.35)] sm:p-9">
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white"
                style={{ background: `linear-gradient(155deg, ${product.accentColor} 0%, #0B1C4D 100%)` }}
              >
                <Monitor size={26} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[20px] font-bold text-(--color-ink)">
                  {product.name} for {download.platform}
                </p>
                <p className="text-[14px] text-(--color-ink-soft)">Installer, version {download.version}</p>
              </div>
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] text-(--color-ink-soft)">{item.label}</dt>
                  <dd className="mt-1 text-[15px] font-bold text-(--color-ink)">{item.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={download.href}
              download={download.fileName}
              className="group mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[16px] font-bold text-white transition-colors hover:bg-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-blue) sm:w-auto"
              style={{ backgroundColor: product.accentColor }}
            >
              <Download size={19} aria-hidden="true" />
              Download for {download.platform}
            </a>
            <p className="mt-3 text-[13px] text-(--color-ink-soft)">
              {download.fileName} · {download.sizeLabel}
            </p>

            <div className="mt-8 border-t border-(--color-line) pt-6">
              <p className="flex items-center gap-2 text-[14px] font-semibold text-(--color-ink)">
                <FileCheck2 size={17} aria-hidden="true" className="text-(--color-blue)" />
                Verify your download (SHA-256)
              </p>
              <p className="mt-2 break-all rounded-xl bg-(--color-surface) px-4 py-3 font-mono text-[12.5px] leading-relaxed text-(--color-ink)">
                {download.sha256}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-(--color-ink-soft)">
                In PowerShell, run{" "}
                <code className="rounded bg-(--color-surface) px-1.5 py-0.5 font-mono text-[12px] text-(--color-ink)">
                  Get-FileHash .\{download.fileName}
                </code>{" "}
                and compare the result with the value above.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[28px] border border-(--color-line) bg-white p-7 sm:p-9">
              <h3 className="text-[18px] font-bold text-(--color-ink)">How to install</h3>
              <ol className="mt-5 space-y-5">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-white"
                      style={{ backgroundColor: product.accentColor }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[15.5px] font-bold text-(--color-ink)">{step.title}</p>
                      <p className="mt-0.5 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-[13.5px] leading-relaxed text-amber-950">
              <ShieldAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
              <span>
                This installer is not code-signed yet, so Windows SmartScreen may show a warning the first time you run it.
                If you downloaded the file from this page, choose <strong>More info</strong>, then <strong>Run anyway</strong>.
                Only download {product.name} from this page.
              </span>
            </p>

            <p className="text-[14px] text-(--color-ink-soft)">
              Need help getting started?{" "}
              <Link href="/contact" className="font-semibold text-(--color-blue) underline-offset-4 hover:underline">
                Contact our team
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
