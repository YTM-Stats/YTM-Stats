import React from "react";

export default function Button({
  children,
  className,
  type = "primary",
  variant = "text",
  disabled = false,
  icon,
  iconPosition,
  fullWidth,
  href,
  ...props
}) {
  let classes = `flex gap-2 justify-center px-4 py-2 border-2 border-solid ${
    variant === "text"
      ? "border-transparent hover:bg-neutral-50/10 active:bg-neutral-50/20"
      : ""
  } text-base font-bold cursor-pointer transition-colors `;

  switch (type) {
    case "primary":
      classes += `
            ${
              variant === "filled"
                ? "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white"
                : ""
            }
            ${
              variant !== "text"
                ? "border-rose-500 hover:border-rose-600 active:border-rose-700"
                : ""
            }
            ${
              variant === "text" || variant === "outline" ? "text-rose-500" : ""
            }
            `;
      break;
    case "secondary":
      classes += `
            ${
              variant === "filled"
                ? "bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white"
                : ""
            }
            ${
              variant !== "text"
                ? "border-slate-500 hover:border-slate-600 active:border-slate-700"
                : ""
            }
            ${
              variant === "text" || variant === "outline"
                ? "text-slate-500"
                : ""
            }
            `;
      break;

    default:
      break;
  }

  const ButtonTag = href ? "a" : "button";
  let content = children;

  if (icon) {
    content =
      iconPosition === "right" ? (
        <>
          {children}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      );
  }

  return (
    <ButtonTag href={href} className={`${className} ${classes}`} {...props}>
      {content}
    </ButtonTag>
  );
}
