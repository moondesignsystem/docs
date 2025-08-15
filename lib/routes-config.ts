// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  type?: "static" | "collapsible" | "expanded";
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Get started",
    href: "/get-started",
    noLink: true,
    type: "static",
    items: [
      { title: "Introduction", href: "/introduction" },
      { title: "Designer", href: "/designer" },
      {
        title: "Developer",
        href: "/developer",
        noLink: true,
        type: "expanded",
        items: [
          { title: "CSS", href: "/css" },
          { title: "React", href: "/react" },
          { title: "LiveView", href: "/liveview" },
          { title: "Fluter", href: "/flutter" },
        ],
      },
    ],
  },
  {
    title: "Design language",
    href: "/design-language",
    noLink: true,
    type: "static",
    items: [
      { title: "Color", href: "/color" },
      { title: "Typography", href: "/typography" },
      { title: "Elevation", href: "/elevation" },
    ],
  },
  {
    title: "Components",
    href: "/components",
    noLink: true,
    type: "static",
    items: [
      {
        title: "Actions",
        href: "/actions",
        noLink: true,
        type: "expanded",
        items: [
          { title: "Button", href: "/button" },
          { title: "Icon button", href: "/icon-button" },
        ],
      },
      {
        title: "Forms & selection controls",
        href: "/forms-and-selection-controls",
        noLink: true,
        type: "expanded",
        items: [
          { title: "Input", href: "/input" },
          { title: "Select", href: "/select" },
          { title: "Textarea", href: "/textarea" },
          { title: "Checkbox", href: "/checkbox" },
          { title: "Radio", href: "/radio" },
          { title: "Switch", href: "/switch" },
          { title: "Chip", href: "/chip" },
          { title: "Authenticator", href: "/authenticator" },
          { title: "Segmented control", href: "/segmented-control" },
        ],
      },
      {
        title: "Content display",
        href: "/content-display",
        noLink: true,
        type: "expanded",
        items: [
          { title: "Accordion", href: "/accordion" },
          { title: "Avatar", href: "/avatar" },
          { title: "Carousel", href: "/carousel" },
          { title: "List", href: "/list" },
          { title: "Table", href: "/table" },
        ],
      },
      {
        title: "Indicators & status",
        href: "/indicators-and-status",
        noLink: true,
        type: "expanded",
        items: [
          { title: "Badge", href: "/badge" },
          { title: "Loader", href: "/loader" },
          { title: "Linear progress", href: "/linear-progress" },
          { title: "Circular progress", href: "/circular-progress" },
          { title: "Placeholder", href: "/placeholder" },
          { title: "Tag", href: "/tag" },
        ],
      },
      {
        title: "Containers & layout",
        href: "/containers-and-layout",
        noLink: true,
        type: "expanded",
        items: [
          { title: "Bottom sheet", href: "/bottom-sheet" },
          { title: "Drawer", href: "/drawer" },
          { title: "Dialog", href: "/dialog" },
          { title: "Dropdown", href: "/dropdown" },
        ],
      },
      {
        title: "Messaging & feedback",
        href: "/messaging-and-feedback",
        noLink: true,
        type: "expanded",
        items: [
          { title: "Alert", href: "/alert" },
          { title: "Snackbar", href: "/snackbar" },
          { title: "Tooltip", href: "/tooltip" },
        ],
      },
      {
        title: "Navigation",
        href: "/navigation",
        noLink: true,
        type: "expanded",
        items: [
          { title: "Menu", href: "/menu" },
          { title: "Breadcrumb", href: "/breadcrumb" },
          { title: "Pagination", href: "/pagination" },
          { title: "Tab list", href: "/tab-list" },
        ],
      },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
