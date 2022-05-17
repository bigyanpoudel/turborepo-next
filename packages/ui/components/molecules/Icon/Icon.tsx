import { Ripple } from "../../atoms";
type IconProps = {
  source: string | (() => any);
  onClick?: (_?: any) => void | unknown;
  style?: object;
  outlined?: "circular" | "rectangle";
  size?: number;
  height?: number;
  iconClass?: string;
  className?: string;
  iconColor?: string;
  ripple?: boolean;
  isSvg?: boolean;
};

export const Icon = ({
  source,
  className = "",
  style,
  iconClass = "",
  iconColor = "text-current",
  onClick,
  outlined,
  ripple: rippleEffect = false,
  size = 20,
  height,
  isSvg = false,
}: IconProps) => {
  const CircularStyle = `icon-container  rounded-full`;
  const RectangleStyle = `icon-container rounded`;

  /** Getting style depends on outline  */
  const getContainetStyle = (type?: string) => {
    const styles: any = {
      circular: `${CircularStyle} ${className}`,
      rectangle: `${RectangleStyle} ${className}`,
      default: `icon-container ${className}`,
    };

    return styles[type || "default"];
  };

  if (rippleEffect || onClick) {
    return (
      <Ripple>
        <div
          className={getContainetStyle(outlined)}
          style={style}
          onClick={onClick}
        >
          <IconComponent
            iconClass={iconClass}
            iconColor={iconColor}
            source={source}
            size={size}
            isSvg={isSvg}
            height={height}
          />
        </div>
      </Ripple>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${getContainetStyle(outlined)}`}
      style={style}
    >
      <IconComponent
        source={source}
        iconColor={iconColor}
        iconClass={iconClass}
        size={size}
        isSvg={isSvg}
        height={height}
      />
    </div>
  );
};

const IconComponent = ({
  source,
  height,
  size,
  iconClass,
  iconColor,
  isSvg,
}: any) => {
  const iconStyle = { height: height ? height : size, width: size };
  if (isSvg) {
    const SVGComp = source;
    return (
      <div style={iconStyle} className={`${iconClass} ${iconColor}`}>
        <SVGComp />
      </div>
    );
  }
  if (typeof source === "string" && source.length > 0) {
    return (
      <i
        style={{ fontSize: size }}
        className={`material-icons ${iconClass} ${iconColor}`}
      >
        {source}
      </i>
    );
  }
  return (
    <img
      style={iconStyle}
      className={`${iconClass} ${iconColor}`}
      src={source() as any}
    />
  );
};
