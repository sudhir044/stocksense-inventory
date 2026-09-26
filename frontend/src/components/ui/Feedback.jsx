import React from 'react';
import { Package, RefreshCw } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Package,
  title = 'No records found',
  description = 'There are no items to display at this time.',
  action,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 px-4 bg-white border border-slate-200 rounded-[8px] ${className}`}>
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export const LoadingState = ({ message = 'Loading data...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-slate-500 bg-white border border-slate-200 rounded-[8px] ${className}`}>
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-xs font-medium text-slate-600">{message}</p>
    </div>
  );
};

export const ErrorAlert = ({ message, onRetry, className = '' }) => {
  if (!message) return null;
  return (
    <div className={`p-4 rounded-[6px] bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between gap-3 mb-6 ${className}`}>
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline shrink-0 cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
};
