import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "@/components/ui/label";

interface TypographyProps
  extends React.HTMLAttributes<
    HTMLHeadingElement | HTMLParagraphElement | HTMLQuoteElement | HTMLElement
  > {
  className?: string;
  children: React.ReactNode;
}

const defaultClassNames = "text-gray-900";

const Typography = {
  H1: forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <h1
        ref={ref}
        className={twMerge(
          `scroll-m-20 font-merriweather text-4xl font-extrabold tracking-tight ${defaultClassNames} lg:text-5xl ${defaultClassNames} ${className}`
        )}
        {...props}
      >
        {children}
      </h1>
    )
  ),

  H2: forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <h2
        ref={ref}
        className={twMerge(
          `scroll-m-20 pb-2 font-merriweather text-3xl font-semibold tracking-tight ${defaultClassNames} first:mt-0 ${className}`
        )}
        {...props}
      >
        {children}
      </h2>
    )
  ),
  H3: forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <h3
        ref={ref}
        className={twMerge(
          `scroll-m-20 font-merriweather text-2xl font-medium tracking-tight ${defaultClassNames} ${className}`
        )}
        {...props}
      >
        {children}
      </h3>
    )
  ),

  H4: forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <h4
        ref={ref}
        className={twMerge(
          `scroll-m-20 font-merriweather text-lg font-medium ${defaultClassNames} ${className}`
        )}
        {...props}
      >
        {children}
      </h4>
    )
  ),
  Paragraph: forwardRef<HTMLParagraphElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <p
        ref={ref}
        className={twMerge(
          `font-montserrat text-base leading-7 ${defaultClassNames} ${className}`
        )}
        {...props}
      >
        {children}
      </p>
    )
  ),
  Blockquote: forwardRef<HTMLQuoteElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <blockquote
        ref={ref}
        className={twMerge(
          `mt-6 border-l-2 pl-6 font-montserrat italic ${defaultClassNames} ${className}`
        )}
        {...props}
      >
        {children}
      </blockquote>
    )
  ),
  InlineCode: forwardRef<HTMLElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <code
        ref={ref}
        className={twMerge(
          `relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${defaultClassNames} ${className}`
        )}
        {...props}
      >
        {children}
      </code>
    )
  ),
  Label: forwardRef<HTMLLabelElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <Label
        ref={ref}
        className={twMerge(
          `relative mb-1 rounded font-merriweather text-sm font-normal  leading-4 ${defaultClassNames} ${className}`
        )}
        {...props}
      >
        {children}
      </Label>
    )
  ),
  Text: forwardRef<HTMLSpanElement, TypographyProps>(
    ({ children, className = "", ...props }, ref) => (
      <span
        ref={ref}
        className={twMerge(
          `relative rounded font-montserrat text-base font-medium leading-6 ${defaultClassNames} ${className}`
        )}
        {...props}
      >
        {children}
      </span>
    )
  )
};

Typography.H1.displayName = "Typography.H1";
Typography.H2.displayName = "Typography.H2";
Typography.H3.displayName = "Typography.H3";
Typography.H4.displayName = "Typography.H4";
Typography.Paragraph.displayName = "Typography.Paragraph";
Typography.Blockquote.displayName = "Typography.Blockquote";
Typography.InlineCode.displayName = "Typography.InlineCode";
Typography.Label.displayName = "Typography.Label";
Typography.Text.displayName = "Typography.Text";
export default Typography;
