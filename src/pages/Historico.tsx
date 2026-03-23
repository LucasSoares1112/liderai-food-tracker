import { Calendar, Package, TrendingUp, Download, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sessions = [
  { id: "SES-2026-0156", date: "22 Mar, 2026", time: "14:30", operator: "Maria Silva", team: "Grupo 3", items: 45, duration: "25 min" },
  { id: "SES-2026-0155", date: "21 Mar, 2026", time: "16:15", operator: "João Santos", team: "Grupo 1", items: 38, duration: "18 min" },
  { id: "SES-2026-0154", date: "20 Mar, 2026", time: "10:45", operator: "Ana Costa", team: "Grupo 2", items: 52, duration: "32 min" },
  { id: "SES-2026-0153", date: "19 Mar, 2026", time: "15:20", operator: "Pedro Lima", team: "Grupo 5", items: 41, duration: "22 min" },
  { id: "SES-2026-0152", date: "18 Mar, 2026", time: "13:00", operator: "Carlos Souza", team: "Grupo 4", items: 36, duration: "20 min" },
  { id: "SES-2026-0151", date: "17 Mar, 2026", time: "11:30", operator: "Lucia Ferreira", team: "Grupo 7", items: 29, duration: "16 min" },
  { id: "SES-2026-0150", date: "16 Mar, 2026", time: "09:15", operator: "Roberto Alves", team: "Grupo 6", items: 44, duration: "28 min" },
  { id: "SES-2026-0149", date: "15 Mar, 2026", time: "14:50", operator: "Fernanda Dias", team: "Grupo 8", items: 33, duration: "19 min" },
];

const totalItems = sessions.reduce((s, r) => s + r.items, 0);

const Historico = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Histórico de Sessões</h1>
          <p className="text-muted-foreground text-sm">Registro completo de todas as contagens realizadas</p>
        </div>
        <Button variant="outline" className="rounded-lg">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Total de Sessões</span>
              <p className="text-3xl font-bold text-foreground mt-1">{sessions.length}</p>
              <p className="text-xs text-muted-foreground">sessões registradas</p>
            </div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Itens Processados</span>
              <p className="text-3xl font-bold text-foreground mt-1">{totalItems}</p>
              <p className="text-xs text-muted-foreground">itens no total</p>
            </div>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Média por Sessão</span>
              <p className="text-3xl font-bold text-foreground mt-1">{Math.round(totalItems / sessions.length)}</p>
              <p className="text-xs text-muted-foreground">itens por sessão</p>
            </div>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Registro Detalhado</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold text-foreground">ID Sessão</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">Data & Hora</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">Operador</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">Equipe</th>
                  <th className="text-center py-3 px-2 font-semibold text-foreground">Itens</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">Duração</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                    <td className="py-3 px-2 font-medium text-foreground">{s.id}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <div>
                          <p className="text-foreground">{s.date}</p>
                          <p className="text-xs text-muted-foreground">{s.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-foreground">{s.operator}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="text-xs border-primary text-primary">{s.team}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center font-semibold text-foreground">{s.items}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-foreground">{s.duration}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge className="bg-primary/10 text-primary border-0 hover:bg-primary/10">Concluída</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Historico;
