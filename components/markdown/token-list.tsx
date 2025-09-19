"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// ## TYPES, ICONS, AND HOOKS ##
// This section defines the core data structures, icons, and custom React hooks used throughout the component.

// Defines the basic structure for a design token.
interface BaseToken {
  type:
    | "color"
    | "radius"
    | "width"
    | "height"
    | "gap"
    | "padding"
    | "stroke"
    | "fontSize"
    | "lineHeight"
    | "fontStyle" // Added fontStyle type
    | "shadow";
  name: string;
}

// Defines a special type of token for contextual values.
interface ContextToken {
  type: "context";
  name: string;
}

// A union type representing any kind of token.
type Token = BaseToken | ContextToken;

// Props for the main TokenTable component.
interface TokenTableProps {
  tokens: Token[];
}

// Structure for data returned by the useContextualTokens hook.
interface ContextualTokenData {
  modes: string[];
  variants: string[];
  colors: Record<string, Record<string, string>>;
}

// A simple SVG icon for copying text.
const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w.org/2000/svg"
    className="stroke-current"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
    <path
      d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
      strokeWidth="2"
    />
  </svg>
);

// A simple SVG icon to indicate a successful copy operation.
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current text-green-500"
  >
    <path
      d="M20 6L9 17L4 12"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// A custom hook to handle copying text to the clipboard.
function useCopyToClipboard(): [boolean, (text: string) => void] {
  const [isCopied, setIsCopied] = useState(false);
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, []);
  return [isCopied, copy];
}

// A custom hook that scans CSS stylesheets for contextual token values.
function useContextualTokens(part: string): ContextualTokenData {
  const [tokenData, setTokenData] = useState<ContextualTokenData>({
    modes: [],
    variants: [],
    colors: {},
  });
  useEffect(() => {
    const pattern = new RegExp(
      `^--context-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-${part}$`
    );
    const modes = new Set<string>();
    const variants = new Set<string>();
    const colors: Record<string, Record<string, string>> = {};
    Array.from(document.styleSheets).forEach((sheet) => {
      try {
        if (!sheet.cssRules) return;
        Array.from(sheet.cssRules).forEach((rule) => {
          if (rule instanceof CSSStyleRule && rule.style) {
            Array.from(rule.style).forEach((propName) => {
              if (propName.startsWith("--context")) {
                const match = propName.match(pattern);
                if (match) {
                  const [, mode, variant] = match;
                  modes.add(mode);
                  variants.add(variant);
                  if (!colors[mode]) {
                    colors[mode] = {};
                  }
                  colors[mode][variant] = `var(${propName})`;
                }
              }
            });
          }
        });
      } catch (e) {
        /* Silently ignore CORS errors */
      }
    });
    const desiredOrder = ['fill', 'soft', 'outline', 'ghost'];
    const sortedVariants = Array.from(variants).sort((a, b) => {
      const indexA = desiredOrder.indexOf(a);
      const indexB = desiredOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    setTokenData({
      modes: Array.from(modes),
      variants: sortedVariants,
      colors: colors,
    });
  }, [part]);
  return tokenData;
}

// ## CHILD COMPONENTS ##
// This section contains smaller, reusable components that make up the token table.

// A map of token types to their corresponding preview components.
const tokenPreviewComponents: Record<string, React.FC<any>> = {
  color: ({ varName }: { varName: string }) => (
    <div
      className="w-full h-16 rounded-md md:w-10 md:h-10 border border-[var(--color-border-primary)]"
      style={{ backgroundColor: varName }}
    />
  ),
  radius: ({ varName }: { varName: string }) => (
    <div
      className="w-10 h-10 border-1 border-dashed border-inverse bg-tertiary"
      style={{ borderRadius: varName }}
    />
  ),
  width: ({ varName }: { varName: string }) => (
    <div className="h-10 flex items-center">
      <div className="w-2 h-2 bg-inverse rounded-full flex-shrink-0" />
      <div className="h-full bg-tertiary" style={{ width: varName }} />
      <div className="w-2 h-2 bg-inverse rounded-full flex-shrink-0" />
    </div>
  ),
  height: ({ varName }: { varName: string }) => (
    <div className="w-10 flex flex-col justify-end items-center">
      <div className="w-2 h-2 bg-inverse rounded-full flex-shrink-0" />
      <div
        className="w-full bg-tertiary rounded-[2px]"
        style={{ height: varName }}
      />
      <div className="w-2 h-2 bg-inverse rounded-full flex-shrink-0" />
    </div>
  ),
  gap: ({ varName }: { varName: string }) => (
    <div className="h-10 flex items-center justify-start">
      <div className="w-2 h-2 bg-inverse rounded-full flex-shrink-0" />
      <div
        className="h-10 bg-tertiary rounded-[2px]"
        style={{ width: varName }}
      />
      <div className="w-2 h-2 bg-inverse rounded-full flex-shrink-0" />
    </div>
  ),
  padding: ({ varName }: { varName: string }) => (
    <div className="h-10 flex items-center justify-start">
      <div
        className="h-10 bg-tertiary rounded-[2px]"
        style={{ width: varName }}
      />
      <div className="w-2 h-2 bg-inverse rounded-full" />
    </div>
  ),
  stroke: ({ varName }: { varName: string }) => (
    <div className="w-10 h-10 flex items-center">
      <div
        className="w-full"
        style={{
          borderTopWidth: varName,
          borderTopStyle: "solid",
          borderTopColor: "var(--color-border-inverse)",
        }}
      />
    </div>
  ),
  fontSize: ({ varName }: { varName: string }) => (
    <div className="w-10 flex items-center text-primary">
      <span style={{ fontSize: varName }}>Aa</span>
    </div>
  ),
  lineHeight: ({ varName }: { varName: string }) => (
    <div className="w-10 flex items-center">
      <div
        className="text-sm text-primary leading-none"
        style={{ lineHeight: varName }}
      >
        Line 1
        <br />
        Line 2
      </div>
    </div>
  ),
  fontStyle: ({ token }: { token: BaseToken }) => (
    <div className="flex items-center text-primary h-full">
      <span className={token.name}>Abc</span>
    </div>
  ),
  shadow: ({ token }: { token: BaseToken }) => (
    <div className={`w-10 h-10 ${token.name}`} />
  ),
};

// Renders a visual preview for a given token based on its type.
const TokenPreview = React.memo(function TokenPreview({ token }: { token: BaseToken }) {
  const varName = `var(--${token.name})`;
  const PreviewComponent = tokenPreviewComponents[token.type];

  return PreviewComponent ? (
    <PreviewComponent varName={varName} token={token} />
  ) : (
    <div className="w-10 h-10 border border-dashed border-primary" />
  );
});

// Renders a single row in the token table for a base token.
const BaseTokenRow = React.memo(function BaseTokenRow({
  token,
  computedValue,
}: {
  token: BaseToken;
  computedValue: string;
}) {
  const [isCopied, copy] = useCopyToClipboard();

  return (
    // UPDATED: Layout is now a column on mobile (`flex-col`) and a 3-column grid on desktop (`md:grid`).
    // This creates the fully stacked layout you requested for mobile.
    <div className="flex flex-col gap-3 px-4 py-4 md:grid md:grid-cols-[120px_3fr_1fr] md:gap-4 md:items-center">
      <div className="flex justify-start">
        <TokenPreview token={token} />
      </div>

      <code className="w-fit flex items-center gap-2">
        <span>--{token.name}</span>
        <button
          onClick={() => copy(`--${token.name}`)}
          className="p-1 text-gray-500 hover:text-gray-200"
          aria-label="Copy token name"
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </code>

      <p className="text-secondary not-prose">{computedValue}</p>
    </div>
  );
});

// Renders a single row for a contextual token, including a grid of color previews.
const ContextTokenRow = React.memo(function ContextTokenRow({ token }: { token: ContextToken }) {
  const [isCopied, copy] = useCopyToClipboard();
  const part = token.name.replace("context-{mode}-{variant}-", "");
  const { modes, variants, colors } = useContextualTokens(part);
  const tokenNameToCopy = `--${token.name.replace(/{/g, "").replace(/}/g, "")}`;

  return (
    // UPDATED: Layout is a column on mobile and a 2-column grid on desktop.
    <div className="flex flex-col gap-3 px-4 py-4 md:grid md:grid-cols-[2fr_3fr] md:gap-8 md:items-center">
      {/* Column 1: Visual (The Preview Grid) */}
      <div className="w-full">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${modes.length || 1}, 1fr)` }}
        >
          {variants.length > 0 ? (
            variants.map((variant) =>
              modes.map((mode) => (
                <div
                    key={`${variant}-${mode}`}
                    title={`--context-${mode}-${variant}-${part}`}
                    className="w-full h-8 border border-primary"
                    style={{
                        backgroundColor: colors[mode]?.[variant] || "transparent",
                    }}
                />
              ))
            )
          ) : (
            <div className="text-xs text-gray-500">No tokens found</div>
          )}
        </div>
      </div>

      {/* Column 2: Name */}
      <code className="w-fit flex items-center gap-2">
        <span>--{token.name}</span>
        <button
          onClick={() => copy(tokenNameToCopy)}
          className="p-1 text-gray-500 hover:text-gray-200"
          aria-label="Copy token name"
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </code>
    </div>
  );
});

// ## FONT STYLE COMPONENTS ##
// These components are specifically for displaying fontStyle tokens.

// Renders a single property (e.g., font-weight) for a fontStyle token.
const PropertyRow = React.memo(function PropertyRow({ label, value }: { label: string; value: string }) {
  const [isCopied, copy] = useCopyToClipboard();

  // Prepend class names with a '.' for accurate copying
  const textToCopy = label === "Class name" ? `.${value}` : value;

  return (
    // UPDATED: Layout is a column on mobile and a 2-column grid on desktop.
    <div className="flex flex-col gap-2 px-6 py-4 text-sm md:grid md:grid-cols-[180px_1fr] md:gap-4 md:items-center">
      <p className="text-xs text-secondary font-medium">{label}</p>
      <code className="w-fit flex items-center gap-2 bg-tertiary text-primary font-mono border border-primary px-2">
        <span>{value}</span>
        <button
          onClick={() => copy(textToCopy)}
          className="p-1 icon-primary hover:icon-secondary"
          aria-label={`Copy ${label}`}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </code>
    </div>
  );
});

// Renders a complete view for a fontStyle token, including a large preview and a list of its properties.
const FontStyleToken = React.memo(function FontStyleToken({ token }: { token: BaseToken }) {
  const className = token.name;

  const properties = [
    { label: "Class name", value: className },
    { label: "Font-family", value: "--font-default" },
    { label: "Font-weight", value: `--style-${className}-font-weight-default` },
    { label: "Font-size", value: `--style-${className}-font-size` },
    { label: "Line-height", value: `--style-${className}-line-height` },
  ];

  return (
    <div className="not-prose overflow-hidden mt-12 mb-24">
      {/* Top Preview Section */}
      {/* UPDATED: Padding is smaller on mobile and larger on desktop. */}
      <div className="bg-primary border border-dashed border-primary flex items-center justify-center p-8 md:p-16">
        <span className={`${className} text-primary`}>Abc</span>
      </div>

      {/* Details Section */}
      <div className="not-prose divide-y divide-[var(--color-border-primary)]">
        {properties.map(({ label, value }) => (
          <PropertyRow key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
});

// Renders a complete view for a shadow token, including a preview and a list of its properties.
const ShadowToken = React.memo(function ShadowToken({ token }: { token: BaseToken }) {
  const className = token.name;

  const properties = [
    { label: "Class name", value: className },
    { label: "Layer 1/X", value: `--style-${className}-layer-1-x` },
    { label: "Layer 1/Y", value: `--style-${className}-layer-1-y` },
    { label: "Layer 1/Blur", value: `--style-${className}-layer-1-blur` },
    { label: "Layer 1/Spread", value: `--style-${className}-layer-1-spread` },
    { label: "Layer 1/Color", value: `--style-${className}-layer-1-color` },
    { label: "Layer 2/X", value: `--style-${className}-layer-2-x` },
    { label: "Layer 2/Y", value: `--style-${className}-layer-2-y` },
    { label: "Layer 2/Blur", value: `--style-${className}-layer-2-blur` },
    { label: "Layer 2/Spread", value: `--style-${className}-layer-2-spread` },
    { label: "Layer 2/Color", value: `--style-${className}-layer-2-color` },
  ];

  return (
    <div className="not-prose overflow-hidden mt-12 mb-24">
      {/* Top Preview Section */}
      {/* UPDATED: Padding is smaller on mobile and larger on desktop. */}
      <div className="bg-primary border border-dashed border-primary flex items-center justify-center p-8 md:p-16">
        <div className={`${className} w-32 h-32 bg-tertiary`}></div>
      </div>

      {/* Details Section */}
      <div className="not-prose divide-y divide-[var(--color-border-primary)]">
        {properties.map(({ label, value }) => (
          <PropertyRow key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
});

// ## MAIN TOKEN TABLE COMPONENT ##
// This is the primary component that orchestrates the rendering of the entire token table.
export default function TokenTable({ tokens }: TokenTableProps) {
  const rgbToHex = (rgb: string): string => {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return rgb;
    const toHex = (c: string) => ("0" + parseInt(c, 10).toString(16)).slice(-2);
    return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`;
  };

  // State to hold the computed CSS values for each token.
  const [computedValues, setComputedValues] = useState<Record<string, string>>(
    {}
  );

  // Determines the type of table to render based on the first token in the list.
  const tableType = useMemo(
    () => (tokens.length > 0 ? tokens[0].type : null),
    [tokens]
  );

  // A function that dynamically measures the computed value of CSS variables in the browser.
  const measureValues = useCallback(() => {
    const baseTokens = tokens.filter(
      (t) => t.type !== "context"
    ) as BaseToken[];
    if (baseTokens.length === 0) return;

    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    document.body.appendChild(tempElement);

    const newValues: Record<string, string> = {};
    const propertyMap: Partial<
      Record<Exclude<BaseToken["type"], "fontStyle" | "shadow">, keyof CSSStyleDeclaration>
    > = {
      color: "backgroundColor",
      radius: "borderRadius",
      width: "width",
      height: "height",
      gap: "gap",
      padding: "paddingLeft",
      stroke: "borderTopWidth",
      fontSize: "fontSize",
      lineHeight: "lineHeight",
    };

    baseTokens.forEach((token) => {
      const propertyToMeasure = propertyMap[token.type as keyof typeof propertyMap];
      if (!propertyToMeasure) {
        newValues[token.name] = "N/A";
        return;
      }

      tempElement.style.cssText = "";
      tempElement.style[propertyToMeasure as any] = `var(--${token.name})`;
      let value = window.getComputedStyle(tempElement)[propertyToMeasure];

      if (token.type === "color" && value.startsWith("rgb")) {
        value = rgbToHex(value);
      }

      newValues[token.name] = value || "Not Found";
    });

    document.body.removeChild(tempElement);
    setComputedValues(newValues);
  }, [tokens]);

  // This effect runs when the table type changes to measure the values of the tokens.
  useEffect(() => {
    // Avoid measuring values for context, fontStyle and shadow types, as they are handled differently.
    if (tableType && tableType !== "context" && tableType !== "fontStyle" && tableType !== "shadow") {
      measureValues();
    }
  }, [tableType, measureValues]);

  // Special renderer for fontStyle tokens, which have a unique layout.
  if (tableType === "fontStyle") {
    return (
      <div className="my-6">
        {tokens.map((token) => (
          <FontStyleToken key={token.name} token={token as BaseToken} />
        ))}
      </div>
    );
  }

  // Special renderer for shadow tokens, which have a unique layout.
  if (tableType === "shadow") {
    return (
      <div className="my-6">
        {tokens.map((token) => (
          <ShadowToken key={token.name} token={token as BaseToken} />
        ))}
      </div>
    );
  }

  // Dynamically set the grid class for the table header based on the table type.
  const headerGridClass =
    tableType === "context"
      ? "grid-cols-[2fr_3fr]"
      : "grid-cols-[120px_3fr_1fr]";

  // The main render block for the token table.
  return (
    <div className="my-6 py-10 text-sm">
      {/* Table Header */}
      {/* UPDATED: Header is now hidden on mobile (`hidden`) and displays as a grid on desktop (`md:grid`). */}
      <div
        className={`hidden md:grid ${headerGridClass} gap-4 px-4 pb-3 border-b border-[var(--color-border-primary)] text-xs text-secondary font-medium`}
      >
        <div>Visual</div>
        <div>Name</div>
        {tableType !== "context" && <div>Value</div>}
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[var(--color-border-primary)]">
        {/* Render the correct row type based on the table type. */}
        {tableType === "context"
          ? tokens.map((token) => (
              <ContextTokenRow
                key={token.name}
                token={token as ContextToken}
              />
            ))
          : tokens.map((token) => (
              <BaseTokenRow
                key={token.name}
                token={token as BaseToken}
                computedValue={computedValues[token.name] || "..."}
              />
            ))}
      </div>
    </div>
  );
}
