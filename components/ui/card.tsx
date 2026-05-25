'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-white/15 hover:shadow-2xl hover:shadow-cyan-500/5',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

/* ------------------------------------------------------------------ */
/*  CardHeader                                                         */
/* ------------------------------------------------------------------ */
export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

/* ------------------------------------------------------------------ */
/*  CardTitle                                                          */
/* ------------------------------------------------------------------ */
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-none tracking-tight text-white',
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

/* ------------------------------------------------------------------ */
/*  CardDescription                                                    */
/* ------------------------------------------------------------------ */
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-400', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/* ------------------------------------------------------------------ */
/*  CardContent                                                        */
/* ------------------------------------------------------------------ */
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

/* ------------------------------------------------------------------ */
/*  CardFooter                                                         */
/* ------------------------------------------------------------------ */
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
