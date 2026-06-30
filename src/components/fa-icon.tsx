import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FaIcon({
  icon,
  className,
  size,
  fixedWidth = false,
  title,
}: {
  icon: IconDefinition;
  className?: string;
  size?: number;
  fixedWidth?: boolean;
  title?: string;
}) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      fixedWidth={fixedWidth}
      title={title}
      aria-hidden={title ? undefined : true}
      style={size ? { height: size, width: size } : undefined}
    />
  );
}
