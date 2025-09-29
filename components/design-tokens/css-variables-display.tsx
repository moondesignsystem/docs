"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@heathmont/moon-react-assets";

// Type definitions for variables
type VariableType =
  | "color"
  | "dimension"
  | "text"
  | "typography"
  | "style"
  | "shadow"
  | "reference"
  | "other";

interface CSSVariable {
  name: string;
  value: string;
  computedValue: string;
  type: VariableType;
  category: string;
}

// Helper function to detect variable type
function detectVariableType(
  name: string,
  value: string,
  computedValue: string,
): VariableType {
  // Check if it's a style variable (focus, opacity, shadow styles, etc.)
  if (name.startsWith("--style-")) {
    return "style";
  }

  // Check if it's a color (rgb, rgba, hex, hsl, oklch)
  if (
    name.includes("color") ||
    computedValue.match(/^(rgb|rgba|hsl|hsla|oklch|#[0-9a-f]{3,8})/i) ||
    computedValue === "transparent"
  ) {
    return "color";
  }

  // Check if it's text related (text sizes, line heights, paragraph spacing)
  if (
    name.includes("text") ||
    name.includes("leading") ||
    name.includes("paragraph-spacing")
  ) {
    return "text";
  }

  // Check if it's a dimension (px, rem, em, % or unitless zero)
  if (
    computedValue.match(
      /^\d+(\.\d+)?(px|rem|em|%|pt|pc|in|cm|mm|ex|ch|vw|vh|vmin|vmax)$/,
    ) ||
    computedValue === "0"
  ) {
    return "dimension";
  }

  // Check if it's typography related (fonts)
  if (
    name.includes("font") ||
    (computedValue.match(/^\d+$/) &&
      (name.includes("weight") || name.includes("size")))
  ) {
    return "typography";
  }

  // Check if it's a shadow
  if (name.includes("shadow") || computedValue.includes("box-shadow")) {
    return "shadow";
  }

  // Check if it's a reference to another variable
  if (value.includes("var(")) {
    return "reference";
  }

  return "other";
}

// Helper function to categorize variables
function categorizeVariable(name: string, value: string): string {
  if (name.startsWith("--color-")) {
    // Check if it's a semantic color (references another variable) or primitive (has actual color value)
    if (value.includes("var(")) {
      return "Semantic";
    } else {
      return "Primitive";
    }
  }
  if (name.startsWith("--spacing-stroke-")) return "Stroke";
  if (name.startsWith("--spacing-gap-")) return "Gap";
  if (name.startsWith("--spacing-height-")) return "Height";
  if (name.startsWith("--spacing-width-")) return "Width";
  if (name.startsWith("--spacing-padding-")) return "Padding";
  if (name.startsWith("--spacing-paragraph-spacing-"))
    return "Paragraph spacing";
  if (name.startsWith("--spacing-")) return "Primitive";

  if (name.startsWith("--context-")) return "Context";
  if (name.startsWith("--container-")) return "Container";
  if (name.startsWith("--radius-")) return "Radius";
  if (name.startsWith("--style-")) {
    // Extract style type from --style-{styleType}-{property}
    if (name.startsWith("--style-focus-")) {
      return "Focus";
    }
    if (name.startsWith("--style-shadow-")) {
      return "Shadow";
    }
    if (name.startsWith("--style-opacity-")) {
      return "Opacity";
    }
    // For any other style variables, return generic "Style"
    return "Style";
  }
  if (name.startsWith("--font-")) return "Typography";
  if (name.startsWith("--text-")) return "Font size";
  if (name.startsWith("--leading-")) return "Line height";
  return "Other";
}

// ColorSwatch component for displaying colors
function ColorSwatch({ color, size = 40 }: { color: string; size?: number }) {
  return (
    <div
      className="border border-primary"
      style={{
        width: 120,
        height: size,
        backgroundColor: color,
        minWidth: size,
        minHeight: size,
      }}
    />
  );
}

// RadiusPreview component for displaying border radius
function RadiusPreview({ radius }: { radius: string }) {
  return (
    <div
      className="border border-primary bg-secondary"
      style={{
        width: 120,
        height: 40,
        borderRadius: radius,
        minWidth: 40,
        minHeight: 40,
      }}
    />
  );
}

// SpacingPreview component for displaying spacing dimensions
function SpacingPreview({ spacing }: { spacing: string }) {
  return (
    <div
      className="bg-inverse"
      style={{
        width: spacing,
        height: "12px",
      }}
    />
  );
}

// StrokePreview component for displaying border stroke thickness
function StrokePreview({ stroke }: { stroke: string }) {
  return (
    <div
        className="bg-primary"
        style={{
          width: "120px",
          height: stroke,
          borderWidth: stroke,
          borderStyle: "solid",
          borderColor: "currentColor",
          minHeight: "1px", // Ensure visibility even for 0px strokes
        }}
      />
  );
}

// Copy button component
function CopyButton({
  text,
  onClick,
  copied,
}: {
  text: string;
  onClick?: () => void;
  copied?: boolean;
}) {
  const [localCopied, setLocalCopied] = useState(false);
  const isCopied = copied !== undefined ? copied : localCopied;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setLocalCopied(true);
      setTimeout(() => setLocalCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click when clicking the button directly
    if (onClick) {
      onClick();
    } else {
      copyToClipboard();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="moon-icon-button moon-icon-button-sm moon-icon-button-neutral moon-icon-button-ghost opacity-0 group-hover:opacity-100 transition-opacity"
      title="Copy variable name"
    >
      <Icon name={isCopied ? "check" : "copy"} />
    </button>
  );
}

// Variable row component to handle individual row state
function VariableRow({
  variable,
  themeChangeCount,
}: {
  variable: CSSVariable;
  themeChangeCount: number;
}) {
  const [nameTooltip, setNameTooltip] = useState({
    show: false,
    copied: false,
  });
  const [valueTooltip, setValueTooltip] = useState({
    show: false,
    copied: false,
  });

  const copyVariableName = async () => {
    try {
      await navigator.clipboard.writeText(variable.name);
      setNameTooltip({ show: true, copied: true });
      setTimeout(() => {
        setNameTooltip({ show: false, copied: false });
      }, 1500);
    } catch (err) {
      console.error("Failed to copy variable name: ", err);
    }
  };

  const copyVariableValue = async () => {
    try {
      await navigator.clipboard.writeText(variable.computedValue);
      setValueTooltip({ show: true, copied: true });
      setTimeout(() => {
        setValueTooltip({ show: false, copied: false });
      }, 1500);
    } catch (err) {
      console.error("Failed to copy variable value: ", err);
    }
  };

  return (
    <div
      className="group flex items-center justify-between px-2 py-4 border-t-1 border-primary"
      style={{
        animation: themeChangeCount > 0 ? "pulse 0.5s ease-in-out" : undefined,
      }}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <code
              className="text-sm flex items-center text-primary cursor-pointer hover:text-accent transition-colors"
              onClick={copyVariableName}
              onMouseEnter={() =>
                setNameTooltip((prev) => ({ ...prev, show: true }))
              }
              onMouseLeave={() =>
                setNameTooltip((prev) => ({ show: false, copied: false }))
              }
            >
              {variable.name}
            </code>
            {nameTooltip.show && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-inverse text-inverse text-xs whitespace-nowrap z-10">
                {nameTooltip.copied ? "Copied!" : "Copy to clipboard"}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 w-[120px]">
          <div
            className="cursor-pointer flex flex-col gap-2"
            onClick={copyVariableValue}
            onMouseEnter={() =>
              setValueTooltip((prev) => ({ ...prev, show: true }))
            }
            onMouseLeave={() =>
              setValueTooltip((prev) => ({ show: false, copied: false }))
            }
          >
            {variable.type === "color" && (
              <ColorSwatch color={variable.computedValue} />
            )}
            {variable.category === "Radius" && (
              <RadiusPreview radius={variable.computedValue} />
            )}
            {variable.category === "Spacing" && (
              <SpacingPreview spacing={variable.computedValue} />
            )}
            {variable.category === "Stroke" && (
              <StrokePreview stroke={variable.computedValue} />
            )}
            {variable.category === "Gap" && (
              <SpacingPreview spacing={variable.computedValue} />
            )}
            {variable.category === "Height" && (
              <SpacingPreview spacing={variable.computedValue} />
            )}
            {variable.category === "Width" && (
              <SpacingPreview spacing={variable.computedValue} />
            )}
            {variable.category === "Padding" && (
              <SpacingPreview spacing={variable.computedValue} />
            )}
            {variable.category === "Paragraph Spacing" && (
              <SpacingPreview spacing={variable.computedValue} />
            )}
            <div className="text-sm text-secondary hover:text-primary transition-colors">
              {variable.computedValue}
            </div>
          </div>
          {valueTooltip.show && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-inverse text-inverse text-xs whitespace-nowrap z-10">
              {valueTooltip.copied ? "Copied!" : "Copy to clipboard"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Props interface for the component
interface CSSVariablesDisplayProps {
  filterByType?: VariableType | "all";
  hideFilters?: boolean;
}

// Main component
export function CSSVariablesDisplay({
  filterByType,
  hideFilters = false,
}: CSSVariablesDisplayProps = {}) {
  const [variables, setVariables] = useState<CSSVariable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All tokens");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [themeChangeCount, setThemeChangeCount] = useState(0);

  useEffect(() => {
    // Function to extract all CSS variables
    const extractCSSVariables = () => {
      const variables: CSSVariable[] = [];

      try {
        // Get the computed styles of the document element
        const computedStyle = getComputedStyle(document.documentElement);

        // Detect current theme
        const bodyClasses = document.body.classList;
        const htmlClasses = document.documentElement.classList;
        let theme = "Light"; // default

        if (
          bodyClasses.contains("dark") ||
          htmlClasses.contains("dark") ||
          bodyClasses.contains("dark-theme") ||
          htmlClasses.contains("dark-theme")
        ) {
          theme = "Dark";
        }

        setCurrentTheme(theme);

        // Get all CSS rules to find variable declarations
        const styleSheets = Array.from(document.styleSheets);
        const variableNames = new Set<string>();
        const originalValues = new Map<string, string>(); // Store original CSS values

        // Extract variable names and original values from CSS rules
        styleSheets.forEach((sheet) => {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules || []);
            rules.forEach((rule) => {
              if (rule instanceof CSSStyleRule) {
                const text = rule.cssText;
                // Extract variable declarations with their values
                const variableMatches = text.match(/--[\w-]+\s*:\s*[^;]+/g);
                if (variableMatches) {
                  variableMatches.forEach((match) => {
                    const [varName, ...valueParts] = match.split(":");
                    const originalValue = valueParts.join(":").trim();
                    const cleanVarName = varName.trim();
                    variableNames.add(cleanVarName);
                    originalValues.set(cleanVarName, originalValue);
                  });
                }
              }
            });
          } catch (e) {
            // Skip inaccessible stylesheets (CORS)
            console.warn("Cannot access stylesheet:", e);
          }
        });

        // Also check for variables in inline styles and computed styles
        const allVars = Array.from(computedStyle).filter((prop) =>
          prop.startsWith("--"),
        );
        allVars.forEach((varName) => {
          variableNames.add(varName);
          // If we don't have the original value, use the computed one
          if (!originalValues.has(varName)) {
            originalValues.set(
              varName,
              computedStyle.getPropertyValue(varName).trim(),
            );
          }
        });

        // Process each variable (filter to only Moon UI variables)
        variableNames.forEach((varName) => {
          const originalValue = originalValues.get(varName) || "";
          const computedValue = computedStyle.getPropertyValue(varName).trim();

          // Only include variables that match Moon UI naming patterns (excluding component variables)
          const isMoonUIVariable =
            (varName.startsWith("--color-") ||
              varName.startsWith("--spacing-") ||
              varName.startsWith("--context-") ||
              varName.startsWith("--container-") ||
              varName.startsWith("--radius-") ||
              varName.startsWith("--style-") ||
              varName.startsWith("--font-") ||
              varName.startsWith("--text-") ||
              varName.startsWith("--leading-")) &&
            !varName.includes("-alpha-") && // Exclude Tailwind alpha variants
            !varName.match(/--color-\w+-(50|[1-9]\d{2,})$/) && // Exclude Tailwind numbered colors (50, 100, 200, 300, etc.)
            !varName.match(/^--color-(black|white)$/) && // Exclude Tailwind default colors
            !varName.match(/^--radius-(xs|xl)$/) && // Exclude Tailwind radius variables
            !varName.match(
              /^--text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
            ) && // Exclude Tailwind text sizes
            !varName.match(
              /^--text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)--line-height$/,
            ) && // Exclude Tailwind text sizes with line-height
            !varName.match(
              /^--leading-(none|tight|snug|normal|relaxed|loose|3|4|5|6|7|8|9|10)$/,
            ) && // Exclude Tailwind line heights
            !varName.match(/^--font-(sans|serif|mono)$/) && // Exclude Tailwind font families
            !varName.match(/^--spacing-(px|\d+)$/) && // Exclude Tailwind spacing utilities
            !varName.match(/^--(w|h|m|p)[trblxy]?-\d+$/) && // Exclude Tailwind width/height/margin/padding utilities
            !varName.match(/^--shadow-(sm|md|lg|xl|2xl|inner|none)$/) && // Exclude Tailwind shadow utilities
            !varName.match(
              /^--container-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)$/,
            ); // Exclude Tailwind container t-shirt sizes

          if ((originalValue || computedValue) && isMoonUIVariable) {
            const type = detectVariableType(
              varName,
              originalValue || computedValue,
              computedValue,
            );
            const category = categorizeVariable(
              varName,
              originalValue || computedValue,
            );

            variables.push({
              name: varName,
              value: originalValue || computedValue,
              computedValue,
              type,
              category,
            });
          }
        });

        // Sort variables by category and then by name (with natural number sorting)
        variables.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }

          // Natural sort for variable names to handle numbers correctly
          return a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        });

        setVariables(variables);
      } catch (error) {
        console.error("Error extracting CSS variables:", error);
      }

      setLoading(false);
    };

    // Extract variables after component mounts
    extractCSSVariables();

    // Set up theme change observer
    const observeThemeChanges = () => {
      const observer = new MutationObserver((mutations) => {
        let themeChanged = false;

        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            (mutation.attributeName === "class" ||
              mutation.attributeName === "data-theme")
          ) {
            themeChanged = true;
          }
        });

        if (themeChanged) {
          // Small delay to ensure CSS has updated
          setTimeout(() => {
            setThemeChangeCount((prev) => prev + 1);
            extractCSSVariables();
          }, 50);
        }
      });

      // Observe changes to body and html classes
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });

      return observer;
    };

    const observer = observeThemeChanges();

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [themeChangeCount]);

  // Filter variables based on selections
  const filteredVariables = variables.filter((variable) => {
    const matchesCategory =
      selectedCategory === "All tokens" ||
      variable.category === selectedCategory;
    const matchesPropFilter =
      !filterByType || filterByType === "all" || variable.type === filterByType;
    const matchesSearch =
      variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.value.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesPropFilter && matchesSearch;
  });

  // Get unique categories filtered by prop type filter if applicable
  const relevantVariables =
    !filterByType || filterByType === "all"
      ? variables
      : variables.filter((v) => v.type === filterByType);

  const categories = [
    "All tokens",
    ...Array.from(new Set(relevantVariables.map((v) => v.category))).sort(),
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading CSS variables...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
      <div className="flex items-center gap-4 mb-4 justify-between">
        <p className="text-primary">
          Displaying {filteredVariables.length} of {variables.length} CSS
          variables from moon-core.css.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-primary">Current theme:</span>
          <span className="moon-tag moon-tag-neutral moon-tag-soft">
            {currentTheme || "auto"}
          </span>
        </div>
      </div>

      {/* Filters */}
      {!hideFilters && (
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 moon-select w-auto flex-shrink-0"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search variables..."
            className="px-3 py-2 moon-input w-auto flex-shrink-0"
          />
        </div>
      )}

      {/* Variables Display */}
      <div className="space-y-6">
        {categories
          .filter((cat) => cat !== "All tokens")
          .map((category) => {
            const categoryVars = filteredVariables.filter(
              (v) => v.category === category,
            );
            if (categoryVars.length === 0) return null;

            return (
              <div key={category}>
                <h2>{category}</h2>
                {categoryVars.map((variable) => (
                  <VariableRow
                    key={variable.name}
                    variable={variable}
                    themeChangeCount={themeChangeCount}
                  />
                ))}
              </div>
            );
          })}
      </div>

      {filteredVariables.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No variables found matching your criteria.
        </div>
      )}
    </div>
  );
}

export default CSSVariablesDisplay;
