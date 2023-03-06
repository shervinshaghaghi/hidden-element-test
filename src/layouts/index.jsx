import { DarkModeButton } from 'components/dark-mode-button';

function AppLayout({ children }) {
  return (
    <div className="w-full relative overflow-x-hidden min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-50">
      <DarkModeButton className="absolute right-4 bottom-4" />
      {children}
    </div>
  );
}

export { AppLayout };
