
import { User, Zap } from 'lucide-react';
import  * as React from 'react';

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 to-emerald-400">
      <div className="flex justify-center items-center min-h-screen">
        <nav className="absolute top-4 right-4 ">
          <User/>
        </nav>
        {children}
      </div>
      <div className="absolute bottom-4 right-4 bg-slate-800 rounded-full h-8 w-8 flex justify-center items-center text-white cursor-pointer">
        <Zap size={20} />
      </div>
    </div>
  );
}

export default Layout;