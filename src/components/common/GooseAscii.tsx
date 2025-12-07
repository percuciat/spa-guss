import { Box } from "@mantine/core";
import { GOOSE_ART } from "@/assets/goose";

interface IProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function GooseAscii({ onClick, disabled }: IProps) {
  return (
    <Box
      component="pre"
      onClick={disabled ? undefined : onClick}
      style={{
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: "10px",
        lineHeight: 1.2,
        color: disabled ? "var(--mantine-color-gray-6)" : "var(--mantine-color-cyan-4)",
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none",
        transition: "transform 0.1s, text-shadow 0.1s",
        textShadow: disabled ? "none" : "0 0 10px var(--mantine-color-cyan-9)",
        margin: "0 auto",
        textAlign: "center",
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "scale(0.95)";
        }
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {GOOSE_ART}
    </Box>
  );
}
