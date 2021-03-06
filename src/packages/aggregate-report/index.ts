import PerryReport from '@/interfaces/PerryReport';
import PerryReportInfo from '@/interfaces/PerryReportInfo';

const getItemFor = (method: string) =>
  JSON.parse(localStorage.getItem(getKeyFor(method)));

const getKeyFor = (method: string) => `perry::${method}::history`;

const orArray = (expression: any) => expression || [];

export default function aggregateReport(reportInfo: PerryReportInfo): PerryReport {
  return {
    title: reportInfo.title,
    description: reportInfo.description,
    screenshotUrl: reportInfo.screenshotUrl,
    logs: getItemFor("console.log"),
    warns: getItemFor("console.warn"),
    errors: [
      ...orArray(getItemFor("console.error")),
      ...orArray(getItemFor("window.onerror"))
    ],
    cookies: document.cookie,
    clicks: getItemFor("document.onclick"),
    notify: getItemFor("perry.notify")
  };
}