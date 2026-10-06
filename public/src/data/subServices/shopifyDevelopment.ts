import { ShoppingBag, ShoppingCart, Package, Truck, Wrench, Search } from "lucide-react";
import type { SubService } from "../subServiceTypes";

/**
 * Sub-services nested under /services/shopify-development/{slug}.
 *
 * All 6 entries here have genuine dedicated pages — unlike Software
 * Development and Video & Animation, none of these overlap with an
 * existing AI Development page, so there's no externalHref entry in
 * this group.
 */
export const shopifyDevelopmentSubServices: SubService[] = [
  {
    slug: "shopify-store-development",
    name: "Shopify Store Development",
    shortDescription:
      "Full Shopify store builds — theme setup, catalog structure and checkout, built for stores with a full product range.",
    tags: ["Shopify store development", "Shopify website development", "custom Shopify store"],
    icon: ShoppingBag,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #1547E0 55%, #22D3EE 100%)",
    seoTitle: "Shopify Store Development Services",
    metaDescription:
      "Custom Shopify store development — theme setup, catalog structure and checkout configuration for multi-product online stores in the USA, UK and Europe.",
    h1: "Shopify Store Development",
    primaryKeyword: "Shopify store development",
    secondaryKeywords: ["Shopify website development", "custom Shopify store", "Shopify store builder"],
    intro:
      "We build full Shopify stores from the ground up — theme setup, catalog and collection structure, and checkout configuration — for businesses launching or rebuilding a multi-product online store.",
    whatIsQuestion: "What Is Shopify Store Development?",
    whatIsAnswer:
      "Shopify store development is building a complete online store on Shopify — theme and layout, product catalog structure, collections, and checkout — set up around your actual product range rather than left as a generic default theme. At Code & Motions, this covers the full build, from a blank Shopify account to a store ready to take orders.",
    capabilitiesHeading: "Shopify Store Development, Covered End to End",
    capabilities: [
      "Theme setup and customization",
      "Product catalog and collection structure",
      "Checkout and payment configuration",
      "App integrations for shipping, reviews and marketing",
    ],
    benefitsHeading: "Why Choose Our Shopify Store Team",
    benefits: [
      {
        title: "Built Around Your Catalog",
        description: "Store structure shaped around your actual products and collections, not a generic theme default.",
      },
      {
        title: "Ready For Checkout On Day One",
        description: "Payment and checkout configuration is handled as part of the build, not left for you to figure out.",
      },
      {
        title: "App Integrations Done Right",
        description: "We set up shipping, reviews and marketing apps so they work together instead of conflicting.",
      },
      {
        title: "Ongoing Support",
        description: "We stay involved after launch — fixing, extending and maintaining your store.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Businesses launching their first full Shopify store",
      "Businesses migrating an existing store to Shopify from another platform",
      "Stores needing a full catalog rebuild rather than a single theme swap",
      "Multi-product retailers who need a store structure that scales as the catalog grows",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Discovery", description: "We map your product range and how you want customers to browse and buy before building anything." },
      { title: "Theme & Structure", description: "We set up the theme, collections and catalog structure around your products." },
      { title: "Checkout & Apps", description: "We configure payments, checkout and the app integrations your store needs." },
      { title: "Launch & Support", description: "We launch the store, and stay involved after launch." },
    ],
    faqHeading: "Shopify Store Development FAQs",
    faqs: [
      {
        question: "Do you build the store from scratch or customize a theme?",
        answer:
          "Most projects start from a Shopify theme that fits your brand and get customized around your catalog and structure; a fully custom theme is possible where the project calls for it.",
      },
      {
        question: "Can you migrate my existing store to Shopify?",
        answer:
          "Yes, migrating an existing store's products and structure to Shopify is part of this service — check our free WooCommerce-to-Shopify migration checker if you're moving from WooCommerce specifically.",
      },
      {
        question: "Do you set up payment processing?",
        answer: "Yes, checkout and payment configuration is included as part of the store build.",
      },
      {
        question: "Is ongoing support included after launch?",
        answer: "We stay involved after launch to fix issues, make changes and support your store as it grows.",
      },
    ],
    relatedLink: {
      label: "Shopify Development",
      href: "/services/shopify-development",
      description: "Our core Shopify service — Shopify Store Development is the end-to-end build at the center of it.",
    },
    relatedTool: {
      label: "WooCommerce to Shopify Migration Checker",
      href: "/tools/woocommerce-to-shopify-migration-checker",
      description: "Moving from WooCommerce? Run our free checker first to see what a Shopify migration involves.",
    },
  },
  {
    slug: "shopify-tools-services",
    name: "Shopify Tools & Services",
    shortDescription:
      "Ongoing Shopify support — app setup, performance fixes and store maintenance for stores already live.",
    tags: ["Shopify maintenance", "Shopify support services", "Shopify app setup"],
    icon: Wrench,
    gradient: "linear-gradient(155deg, #142B6B 0%, #0070FE 55%, #22D3EE 100%)",
    seoTitle: "Shopify Tools & Support Services",
    metaDescription:
      "Ongoing Shopify support services — app setup, performance fixes and store maintenance for Shopify stores already live, for businesses in the USA, UK and Europe.",
    h1: "Shopify Tools & Services",
    primaryKeyword: "Shopify support services",
    secondaryKeywords: ["Shopify maintenance", "Shopify app setup", "Shopify store optimization"],
    intro:
      "Not every Shopify project is a new build. We support stores that are already live — fixing performance issues, setting up or troubleshooting apps, and handling the ongoing maintenance a growing store needs.",
    whatIsQuestion: "What Are Shopify Tools & Services?",
    whatIsAnswer:
      "Shopify tools and services covers the ongoing work a live store needs after launch — app setup and troubleshooting, performance fixes, and general maintenance — rather than a one-time build. At Code & Motions, this is for store owners who need a technical team on call for an existing Shopify store, not a full rebuild.",
    capabilitiesHeading: "Shopify Tools & Services, Covered End to End",
    capabilities: [
      "App installation, configuration and troubleshooting",
      "Store performance and speed fixes",
      "Theme fixes and small feature additions",
      "Ongoing maintenance and technical support",
    ],
    benefitsHeading: "Why Choose Our Shopify Support Team",
    benefits: [
      {
        title: "Fixes, Not Just New Builds",
        description: "We work on existing stores as readily as new ones — fixing what's slowing you down or breaking.",
      },
      {
        title: "Free Speed Checker To Start",
        description: "Our own free Shopify Speed Checker tool gives you a baseline before we start any performance work.",
      },
      {
        title: "App Conflicts Resolved",
        description: "We troubleshoot app conflicts and configuration issues that generic app support can't diagnose.",
      },
      {
        title: "Ongoing, Not One-Off",
        description: "We're available for ongoing support, not just a single fix.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Store owners whose Shopify site has gotten slow or unreliable",
      "Stores with app conflicts or configuration issues they can't resolve themselves",
      "Businesses that need a technical team on call without a full redevelopment",
      "Stores needing small feature additions or theme fixes",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Diagnosis", description: "We run our free Shopify Speed Checker and review your store to find what actually needs fixing." },
      { title: "Fix & Configure", description: "We resolve the issues found — performance, app conflicts, or theme problems." },
      { title: "Verify", description: "We confirm the fix worked and the store is stable." },
      { title: "Ongoing Support", description: "We remain available for further support as issues come up." },
    ],
    faqHeading: "Shopify Tools & Services FAQs",
    faqs: [
      {
        question: "Can you fix a slow Shopify store?",
        answer:
          "Yes — start with our free Shopify Speed Checker tool to get a read on what's slowing your store down, then we can scope the fix.",
      },
      {
        question: "Do you work on stores you didn't build originally?",
        answer: "Yes, we regularly take on support and fixes for existing Shopify stores we didn't originally build.",
      },
      {
        question: "Can you fix app conflicts on my store?",
        answer: "Yes, troubleshooting app configuration and conflicts is a core part of this service.",
      },
      {
        question: "Is this a one-time fix or ongoing support?",
        answer: "Both — we can handle a single fix or stay on as ongoing support, depending on what you need.",
      },
    ],
    relatedLink: {
      label: "Shopify Development",
      href: "/services/shopify-development",
      description: "Our core Shopify service — Shopify Tools & Services covers the ongoing support side of it.",
    },
    relatedTool: {
      label: "Shopify Speed Checker",
      href: "/tools/shopify-speed-checker",
      description: "Run our free tool to see where your store's performance stands before any fix work starts.",
    },
  },
  {
    slug: "dropshipping-store-development",
    name: "Dropshipping Store Development",
    shortDescription:
      "Shopify stores built for dropshipping — supplier integration, order routing and catalog setup for a dropship model.",
    tags: ["dropshipping store development", "Shopify dropshipping", "dropship store setup"],
    icon: Truck,
    gradient: "linear-gradient(155deg, #384057 0%, #1547E0 55%, #22D3EE 100%)",
    seoTitle: "Dropshipping Store Development Services",
    metaDescription:
      "Shopify dropshipping store development — supplier integration, order routing and catalog setup for a dropship business model, for businesses in the USA, UK and Europe.",
    h1: "Dropshipping Store Development",
    primaryKeyword: "dropshipping store development",
    secondaryKeywords: ["Shopify dropshipping store", "dropship store setup", "supplier integration Shopify"],
    intro:
      "We build Shopify stores set up specifically for dropshipping — supplier and sourcing app integration, automated order routing, and a catalog structure that works without holding your own stock.",
    whatIsQuestion: "What Is Dropshipping Store Development?",
    whatIsAnswer:
      "Dropshipping store development is building a Shopify store around a dropship model — where orders route automatically to a supplier instead of being fulfilled from your own stock. At Code & Motions, this means setting up supplier or print-on-demand app integrations and order routing correctly from the start, not bolting them onto a standard store build afterward.",
    capabilitiesHeading: "Dropshipping Store Development, Covered End to End",
    capabilities: [
      "Supplier and sourcing app integration",
      "Automated order routing to suppliers",
      "Print-on-demand app setup where relevant",
      "Catalog and pricing structure built for a dropship margin model",
    ],
    benefitsHeading: "Why Choose Our Dropshipping Team",
    benefits: [
      {
        title: "Built For The Dropship Model Specifically",
        description: "Order routing and supplier integration are set up correctly from the start, not adapted from a standard store build.",
      },
      {
        title: "Supplier App Experience",
        description: "We work with common sourcing and print-on-demand apps rather than treating integration as guesswork.",
      },
      {
        title: "Pricing Structured For Margin",
        description: "Catalog and pricing are set up with your supplier costs and margins in mind.",
      },
      {
        title: "Ongoing Support",
        description: "We stay involved after launch as you add suppliers or products.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Entrepreneurs launching a new dropshipping store",
      "Existing dropship stores needing a supplier integration fixed or added",
      "Print-on-demand sellers needing a store built around that model",
      "Stores switching from one dropship supplier app to another",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Discovery", description: "We confirm your supplier or print-on-demand setup and how orders need to route." },
      { title: "Store & Catalog Build", description: "We build the store and set up the catalog and pricing structure." },
      { title: "Supplier Integration", description: "We connect and test the supplier or sourcing app integration and order routing." },
      { title: "Launch & Support", description: "We launch the store and stay involved as your supplier setup evolves." },
    ],
    faqHeading: "Dropshipping Store Development FAQs",
    faqs: [
      {
        question: "Which dropshipping or sourcing apps do you work with?",
        answer: "We work with common Shopify sourcing and print-on-demand apps — tell us which supplier or app you're using and we'll confirm fit.",
      },
      {
        question: "Can you fix order routing issues on an existing dropship store?",
        answer: "Yes, diagnosing and fixing supplier integration and order routing issues on an existing store is part of this service.",
      },
      {
        question: "Do you help set up pricing for a dropship margin model?",
        answer: "Yes, we help structure catalog pricing around your supplier costs so your margins are built in from the start.",
      },
      {
        question: "Is this different from a standard Shopify store build?",
        answer:
          "Yes — the store build itself is similar, but supplier integration and automated order routing are specific to a dropship model and are the core focus of this service.",
      },
    ],
    relatedLink: {
      label: "Shopify Development",
      href: "/services/shopify-development",
      description: "Our core Shopify service — Dropshipping Store Development is a specialized application of it.",
    },
  },
  {
    slug: "shopify-ecommerce-development",
    name: "Shopify E-commerce Development",
    shortDescription:
      "Deep Shopify functionality work — custom checkout logic, product variants, inventory and app development beyond a standard store setup.",
    tags: ["Shopify ecommerce development", "Shopify custom development", "Shopify app development"],
    icon: ShoppingCart,
    gradient: "linear-gradient(155deg, #060D24 0%, #0B1C4D 55%, #1547E0 100%)",
    seoTitle: "Shopify E-commerce Development Services",
    metaDescription:
      "Custom Shopify e-commerce development — product variants, inventory logic, checkout customization and app development for businesses in the USA, UK and Europe.",
    h1: "Shopify E-commerce Development",
    primaryKeyword: "Shopify ecommerce development",
    secondaryKeywords: ["Shopify custom development", "Shopify app development", "Shopify checkout customization"],
    intro:
      "When a standard Shopify store setup isn't enough, we build the custom functionality underneath it — product variants and inventory logic, checkout customization, and custom Shopify apps for features the platform doesn't offer out of the box.",
    whatIsQuestion: "What Is Shopify E-commerce Development?",
    whatIsAnswer:
      "Shopify e-commerce development is custom functionality work on top of a Shopify store — product variants and inventory logic, checkout customization within Shopify's platform rules, and custom app development — for stores that need more than theme setup and standard apps provide. At Code & Motions, this is the functionality-depth service that goes beyond a standard Shopify Store Development build.",
    capabilitiesHeading: "Shopify E-commerce Development, Covered End to End",
    capabilities: [
      "Complex product variant and inventory logic",
      "Checkout customization within Shopify's platform rules",
      "Custom Shopify app development",
      "Third-party system integrations (ERP, fulfillment, CRM)",
    ],
    benefitsHeading: "Why Choose Our Shopify E-commerce Team",
    benefits: [
      {
        title: "Goes Beyond Standard Apps",
        description: "When an off-the-shelf app can't do what you need, we build the custom functionality that can.",
      },
      {
        title: "Senior Engineering On Shopify",
        description: "The same senior software team behind our core development work builds on Shopify's platform.",
      },
      {
        title: "Integrates With Your Other Systems",
        description: "We connect your store to ERP, fulfillment or CRM systems you already run.",
      },
      {
        title: "Ongoing Support",
        description: "We stay involved after launch to maintain and extend custom functionality.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Stores with complex product variants or inventory rules standard apps can't handle",
      "Businesses needing a custom Shopify app built for a specific workflow",
      "Stores needing checkout behavior standard themes and apps don't support",
      "Businesses connecting Shopify to an existing ERP, fulfillment or CRM system",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Scoping", description: "We identify exactly what standard apps and themes can't do and what needs custom development." },
      { title: "Design & Build", description: "We design and build the custom functionality or app within Shopify's platform constraints." },
      { title: "Testing", description: "The functionality is tested against your real catalog and order flow before launch." },
      { title: "Launch & Support", description: "We deploy, and stay involved to maintain and extend it." },
    ],
    faqHeading: "Shopify E-commerce Development FAQs",
    faqs: [
      {
        question: "How is this different from Shopify Store Development?",
        answer:
          "Shopify Store Development is the end-to-end store build; this service is the deeper, custom functionality work — variants, checkout logic, custom apps — that some stores need on top of a standard build.",
      },
      {
        question: "Can you build a custom Shopify app?",
        answer: "Yes, custom Shopify app development for workflows standard apps don't cover is a core part of this service.",
      },
      {
        question: "Can you customize Shopify's checkout?",
        answer: "Yes, within the customization options Shopify's platform allows for your plan level.",
      },
      {
        question: "Can you connect Shopify to our ERP or CRM system?",
        answer: "Yes, integrating Shopify with existing ERP, fulfillment or CRM systems is part of this service.",
      },
    ],
    relatedLink: {
      label: "Shopify Development",
      href: "/services/shopify-development",
      description: "Our core Shopify service — Shopify E-commerce Development covers the deeper functionality work within it.",
    },
  },
  {
    slug: "shopify-ecommerce-seo",
    name: "Shopify E-commerce SEO",
    shortDescription:
      "SEO built for Shopify's platform specifically — product and collection page optimization, site speed and structured data.",
    tags: ["Shopify SEO", "Shopify ecommerce SEO", "Shopify product page SEO"],
    icon: Search,
    gradient: "linear-gradient(155deg, #1547E0 0%, #2F6BFF 55%, #7CE6F7 100%)",
    seoTitle: "Shopify E-commerce SEO Services",
    metaDescription:
      "Shopify-specific SEO — product and collection page optimization, site speed and structured data for Shopify stores in the USA, UK and Europe.",
    h1: "Shopify E-commerce SEO",
    primaryKeyword: "Shopify SEO",
    secondaryKeywords: ["Shopify ecommerce SEO", "Shopify product page SEO", "Shopify site speed SEO"],
    intro:
      "SEO on Shopify has its own constraints — URL structure, app-generated pages, and theme-driven page speed all affect it differently than on other platforms. We optimize product and collection pages, site speed and structured data specifically within what Shopify allows.",
    whatIsQuestion: "What Is Shopify E-commerce SEO?",
    whatIsAnswer:
      "Shopify e-commerce SEO is search optimization work scoped specifically to Shopify's platform — product and collection page structure, URL handling, site speed, and structured data within Shopify's theme and app constraints. At Code & Motions, this is distinct from our general SEO service: it's focused on the platform-specific factors that affect how a Shopify store ranks.",
    capabilitiesHeading: "Shopify E-commerce SEO, Covered End to End",
    capabilities: [
      "Product and collection page SEO optimization",
      "Shopify-specific technical SEO (URL structure, canonical handling)",
      "Site speed improvements within theme constraints",
      "Structured data (Product, Offer) for Shopify pages",
    ],
    benefitsHeading: "Why Choose Our Shopify SEO Team",
    benefits: [
      {
        title: "Shopify-Specific, Not Generic",
        description: "We work within Shopify's actual URL structure and theme constraints, not generic SEO advice that doesn't apply to the platform.",
      },
      {
        title: "Speed Checked, Not Guessed",
        description: "Our own free Shopify Speed Checker tool gives a real baseline for the site-speed side of SEO.",
      },
      {
        title: "Product-Page Focused",
        description: "Product and collection pages — where most Shopify stores actually earn traffic — get direct attention.",
      },
      {
        title: "Works Alongside Our General SEO Service",
        description: "For broader content and off-page SEO beyond the Shopify-specific technical work, our general SEO service covers the rest.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Shopify stores with product and collection pages that aren't ranking",
      "Stores that suspect theme or app bloat is slowing down SEO-relevant site speed",
      "Stores migrating to Shopify that need SEO carried over correctly",
      "Shopify stores that want Shopify-specific technical SEO alongside broader content SEO work",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Audit", description: "We review your product and collection page structure, speed and structured data." },
      { title: "Technical Fixes", description: "We fix Shopify-specific technical SEO issues — URL structure, canonical tags, structured data." },
      { title: "Speed Improvements", description: "We address site speed issues within what your theme and apps allow." },
      { title: "Ongoing Monitoring", description: "We track results and keep optimizing as your catalog changes." },
    ],
    faqHeading: "Shopify E-commerce SEO FAQs",
    faqs: [
      {
        question: "How is this different from your general SEO service?",
        answer:
          "This service is scoped to Shopify-specific technical factors — URL structure, theme speed, structured data on product pages. Our general SEO service covers broader content and off-page strategy, and the two work well together.",
      },
      {
        question: "Can you check my Shopify store's speed first?",
        answer: "Yes — run our free Shopify Speed Checker tool to get a baseline before any SEO work starts.",
      },
      {
        question: "Do you optimize product and collection pages specifically?",
        answer: "Yes, product and collection page SEO is the core focus of this service.",
      },
      {
        question: "Can you add structured data to my Shopify product pages?",
        answer: "Yes, adding Product and Offer structured data to Shopify pages is part of this service.",
      },
    ],
    relatedLink: {
      label: "SEO Services",
      href: "/services/seo",
      description: "Our general SEO service — pair it with Shopify E-commerce SEO for broader content and off-page work.",
    },
    relatedTool: {
      label: "Shopify Speed Checker",
      href: "/tools/shopify-speed-checker",
      description: "Site speed affects SEO — run our free checker to see where your store stands.",
    },
  },
  {
    slug: "single-product-shopify-store",
    name: "Single Product Shopify Store",
    shortDescription:
      "Focused, single-product Shopify stores — a landing-page-style build for one hero product rather than a full catalog.",
    tags: ["single product Shopify store", "Shopify landing page store", "one product store"],
    icon: Package,
    gradient: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #22D3EE 100%)",
    seoTitle: "Single Product Shopify Store Development",
    metaDescription:
      "Single-product Shopify store development — a focused, landing-page-style build for one hero product, for businesses in the USA, UK and Europe.",
    h1: "Single Product Shopify Store",
    primaryKeyword: "single product Shopify store",
    secondaryKeywords: ["Shopify landing page store", "one product Shopify store", "hero product store"],
    intro:
      "Not every store needs a full catalog. For a single hero product, we build a focused, landing-page-style Shopify store designed to sell that one product well, rather than a general multi-product layout.",
    whatIsQuestion: "What Is A Single Product Shopify Store?",
    whatIsAnswer:
      "A single product Shopify store is a store built around one hero product, structured more like a conversion-focused landing page than a general catalog store — with the homepage, checkout flow and layout all centered on that one product. At Code & Motions, this is a distinct build from a full Shopify Store Development project, with a different structure and goal.",
    capabilitiesHeading: "Single Product Store Development, Covered End to End",
    capabilities: [
      "Conversion-focused, landing-page-style homepage",
      "Streamlined checkout built around a single product flow",
      "Variant handling for a single product's options (size, color, bundle)",
      "Upsell and bundle setup for a single hero product",
    ],
    benefitsHeading: "Why Choose Our Single Product Store Team",
    benefits: [
      {
        title: "Built For One Product, Not Adapted From A Catalog Theme",
        description: "The whole store is structured around a single conversion goal, not a general-purpose catalog layout.",
      },
      {
        title: "Streamlined Checkout",
        description: "Fewer steps and distractions between the product and checkout than a general multi-product store.",
      },
      {
        title: "Upsell-Ready",
        description: "Bundle and upsell options are built in for the single product, where they genuinely add value.",
      },
      {
        title: "Ongoing Support",
        description: "We stay involved after launch to adjust and optimize the store.",
      },
    ],
    useCasesHeading: "Who This Is For",
    useCases: [
      "Entrepreneurs launching one flagship product",
      "Brands running a focused product launch separate from their main catalog",
      "Crowdfunded or newly manufactured products going to market for the first time",
      "Businesses that want a dedicated, focused store for one product rather than adding it to a general catalog",
    ],
    processHeading: "Our Process",
    process: [
      { title: "Discovery", description: "We understand the product, its variants and how you want to present and sell it." },
      { title: "Build", description: "We build the landing-page-style store structure, checkout flow and variant handling." },
      { title: "Upsell Setup", description: "We configure any bundles or upsells that make sense for the product." },
      { title: "Launch & Support", description: "We launch the store and stay involved after launch." },
    ],
    faqHeading: "Single Product Shopify Store FAQs",
    faqs: [
      {
        question: "Is this just a smaller version of a full Shopify store?",
        answer:
          "Not quite — it's structured differently, more like a conversion-focused landing page built around one product rather than a scaled-down catalog store.",
      },
      {
        question: "Can the product have multiple variants, like size or color?",
        answer: "Yes, variant handling for a single product's options is part of this service.",
      },
      {
        question: "Can you add upsells or bundles?",
        answer: "Yes, bundle and upsell setup for the hero product is part of this service where it makes sense.",
      },
      {
        question: "Can we add more products to this store later?",
        answer: "Yes, though if your plans include a full catalog from the start, our broader Shopify Store Development service may be the better starting structure — we can advise based on your plans.",
      },
    ],
    relatedLink: {
      label: "Shopify Development",
      href: "/services/shopify-development",
      description: "Our core Shopify service — Single Product Shopify Store is a focused, specialized build within it.",
    },
  },
];
