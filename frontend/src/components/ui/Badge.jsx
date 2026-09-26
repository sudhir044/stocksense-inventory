import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const normalized = (typeof children === 'string' ? children.toLowerCase() : variant.toLowerCase()).trim();

  let style = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-500';

  if (['done', 'active', 'completed', 'in stock', 'validated', 'success'].includes(normalized)) {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (['ready', 'in transit', 'receipt', 'primary', 'info'].includes(normalized)) {
    style = 'bg-blue-50 text-blue-700 border-blue-200';
    dotColor = 'bg-blue-500';
  } else if (['waiting', 'low stock', 'in progress', 'pending', 'warning'].includes(normalized)) {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (['out of stock', 'canceled', 'cancelled', 'inactive', 'danger', 'failed'].includes(normalized)) {
    style = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (['transfer', 'transfer_in', 'transfer_out'].includes(normalized)) {
    style = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    dotColor = 'bg-indigo-500';
  }

  const sizes = {
    sm: 'text-[11px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-xs px-2.5 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-full capitalize shrink-0 ${sizes[size] || sizes.md} ${style} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor}`} />}
      {children}
    </span>
  );
};

export default Badge;
