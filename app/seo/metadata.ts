import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "WebWizKit – Free Online Web Tools",
    template: "%s | WebWizKit"
  },
  description: "WebWizKit offers a modern suite of free online tools for developers, designers, and everyone. Convert, generate, beautify, and optimize your data quickly and securely!",
  metadataBase: new URL("https://www.webwizkit.com"),
  openGraph: {
    title: "WebWizKit – Free Online Web Tools",
    description: "WebWizKit offers a modern suite of free online tools for developers, designers, and everyone. Convert, generate, beautify, and optimize your data quickly and securely!",
    url: "https://www.webwizkit.com",
    siteName: "WebWizKit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebWizKit – Free Online Web Tools"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "WebWizKit – Free Online Web Tools",
    description: "WebWizKit offers a modern suite of free online tools for developers, designers, and everyone. Convert, generate, beautify, and optimize your data quickly and securely!",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico"
  }
};
