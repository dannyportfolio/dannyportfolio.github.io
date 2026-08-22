import { ParallaxLayer } from "@/components/motion/parallax-layer";

export function TerminalCard({ className = "" }: { className?: string }) {
  return (
    <ParallaxLayer speed={0.13} className={`terminal-wrap ${className}`}>
      <div className="terminal-card">
        <div className="terminal-top">
          <i />
          <i />
          <i />
          <span>production.demo</span>
        </div>
        <pre>
          <span className="terminal-muted">GET</span> /api/providers{`\n\n`}
          <span className="terminal-good">200 OK</span>
          {`\n\n`}response_time: <b>42ms</b>
          {`\n`}cache: <b>HIT</b>
        </pre>
        <p>Illustrative telemetry</p>
      </div>
    </ParallaxLayer>
  );
}
