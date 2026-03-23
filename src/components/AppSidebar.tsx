import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Brain, Trophy, History, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Detecção IA", path: "/deteccao", icon: Brain },
  { title: "Ranking", path: "/ranking", icon: Trophy },
  { title: "Histórico", path: "/historico", icon: History },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-52 bg-primary flex flex-col z-50 max-md:hidden">
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">L</span>
        </div>
        <div>
          <h1 className="text-primary-foreground font-bold text-sm">LiderAI</h1>
          <p className="text-primary-foreground/70 text-xs">Gestão de Arrecadação</p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-foreground/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">L</span>
          </div>
          <div>
            <p className="text-primary-foreground text-xs font-medium">lucasabk23</p>
            <p className="text-primary-foreground/60 text-[10px]">Grupo 1</p>
          </div>
        </div>
        <Link to="/" className="flex items-center gap-2 text-primary-foreground/70 text-xs hover:text-primary-foreground">
          <LogOut className="h-3.5 w-3.5" />
          Sair
        </Link>
      </div>
    </aside>
  );
};

export default AppSidebar;
