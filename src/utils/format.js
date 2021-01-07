import { format } from 'date-fns';

export const formatNum = (n) => { return Math.round(n).toLocaleString(undefined, {maximumFractionDigits:0}); };
export const formatDim = (n) => { return n.toLocaleString(undefined, {maximumFractionDigits:2}); };
export const formatFAR = (n) => { return n.toFixed(2); };
export const currentISODate = () => format(new Date(), "yyyy-MM-dd")