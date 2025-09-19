import React from "react";
import "./Loader.css";

type LoaderProps = {
  size?: number;
  label?: string;
};

export default function Loader({ size = 48, label = "Cargando..." }: LoaderProps) {
  return (
    <div className="loader" style={{ ["--size" as any]: `${size}px` }} role="status" aria-live="polite">
      <div className="spinner" />
      <div className="loader-label" aria-hidden="true">{label}</div>
    </div>
  );
}
