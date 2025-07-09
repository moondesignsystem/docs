"use client";
import { Button, IconButton } from "@heathmont/moon-core-tw";
import ColorControls from "@/components/markdown/colorcontrols";

const MoonComponents = () => {
  return (
    <div className="flex flex-col p-40 gap-8">
      <div>
        <ColorControls />
      </div>
      <div>
        <div className="flex items-end gap-4">
          <Button
            style={{
              background: "var(--background-brand)",
              color: "var(--text-on-brand)",
              borderRadius: "var(--radius-md)",
            }}
            size="xs"
          >
            Button
          </Button>

          <Button
            style={{
              background: "var(--background-brand)",
              color: "var(--text-on-brand)",
              borderRadius: "var(--radius-md)",
            }}
            size="sm"
          >
            Button
          </Button>

          <Button
            style={{
              background: "var(--background-brand)",
              color: "var(--text-on-brand)",
              borderRadius: "var(--radius-md)",
            }}
            size="md"
          >
            Button
          </Button>

          <Button
            style={{
              background: "var(--background-brand)",
              color: "var(--text-on-brand)",
              borderRadius: "var(--radius-md)",
            }}
            size="lg"
          >
            Button
          </Button>

          <Button
            style={{
              background: "var(--background-brand)",
              color: "var(--text-on-brand)",
              borderRadius: "var(--radius-md)",
            }}
            size="xl"
          >
            Button
          </Button>
        </div>
        <div className="flex items-end gap-4">
          <Button
            style={{
              background: "var(--background-brand-subtle)",
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
            }}
            size="xs"
            variant="secondary"
          >
            Button
          </Button>

          <Button
            style={{
              background: "var(--background-brand-subtle)",
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
            }}
            size="sm"
            variant="secondary"
          >
            Button
          </Button>

          <Button
            style={{
              background: "var(--background-brand-subtle)",
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
            }}
            size="md"
            variant="secondary"
          >
            Button
          </Button>

          <Button
            style={{
              background: "var(--background-brand-subtle)",
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
            }}
            size="lg"
            variant="secondary"
          >
            Button
          </Button>

          <Button
            style={{
              background: "var(--background-brand-subtle)",
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
            }}
            size="xl"
            variant="secondary"
          >
            Button
          </Button>
        </div>
        <div className="flex items-end gap-4">
          <Button
            style={{
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-primary)",
            }}
            size="xs"
            variant="outline"
          >
            Button
          </Button>

          <Button
            style={{
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-primary)",
            }}
            size="sm"
            variant="outline"
          >
            Button
          </Button>

          <Button
            style={{
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-primary)",
            }}
            size="md"
            variant="outline"
          >
            Button
          </Button>

          <Button
            style={{
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-primary)",
            }}
            size="lg"
            variant="outline"
          >
            Button
          </Button>

          <Button
            style={{
              color: "var(--text-primary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-primary)",
            }}
            size="xl"
            variant="outline"
          >
            Button
          </Button>
        </div>
        <div className="flex items-end gap-4">
          <Button
            style={{
              color: "var(--text-primary)",
              borderRadius: "var(--radius-md)",
            }}
            size="xs"
            variant="ghost"
          >
            Button
          </Button>

          <Button
            style={{
              color: "var(--text-primary)",
              borderRadius: "var(--radius-md)",
            }}
            size="sm"
            variant="ghost"
          >
            Button
          </Button>

          <Button
            style={{
              color: "var(--text-primary)",
              borderRadius: "var(--radius-md)",
            }}
            size="md"
            variant="ghost"
          >
            Button
          </Button>

          <Button
            style={{
              color: "var(--text-primary)",
              borderRadius: "var(--radius-md)",
            }}
            size="lg"
            variant="ghost"
          >
            Button
          </Button>

          <Button
            style={{
              color: "var(--text-primary)",
              borderRadius: "var(--radius-md)",
            }}
            size="xl"
            variant="ghost"
          >
            Button
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoonComponents;
