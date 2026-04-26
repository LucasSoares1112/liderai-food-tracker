import { useMemo, useState } from "react";
import { Plus, Search, Users, Trash2, UserCog, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  group: string | null;
}

const initialGroups = ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4"];

const initialUsers: User[] = [
  { id: "1", name: "Lucas Albuquerque", email: "lucasabk23@fecap.br", group: "Grupo 1" },
  { id: "2", name: "Maria Oliveira", email: "maria.oliveira@fecap.br", group: "Grupo 2" },
  { id: "3", name: "Pedro Santos", email: "pedro.santos@fecap.br", group: null },
  { id: "4", name: "Ana Costa", email: "ana.costa@fecap.br", group: "Grupo 1" },
  { id: "5", name: "João Pereira", email: "joao.pereira@fecap.br", group: "Grupo 3" },
  { id: "6", name: "Beatriz Lima", email: "beatriz.lima@fecap.br", group: null },
  { id: "7", name: "Rafael Souza", email: "rafael.souza@fecap.br", group: "Grupo 2" },
  { id: "8", name: "Camila Ribeiro", email: "camila.ribeiro@fecap.br", group: "Grupo 4" },
  { id: "9", name: "Felipe Almeida", email: "felipe.almeida@fecap.br", group: null },
  { id: "10", name: "Juliana Martins", email: "juliana.martins@fecap.br", group: "Grupo 1" },
];

const UNASSIGNED = "__unassigned__";

const Admin = () => {
  const [groups, setGroups] = useState<string[]>(initialGroups);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [newGroup, setNewGroup] = useState("");
  const [search, setSearch] = useState("");
  const [onlyUnassigned, setOnlyUnassigned] = useState(false);

  const handleCreateGroup = () => {
    const name = newGroup.trim();
    if (!name) {
      toast.error("Digite um nome para o grupo");
      return;
    }
    if (groups.some((g) => g.toLowerCase() === name.toLowerCase())) {
      toast.error("Este grupo já existe");
      return;
    }
    setGroups((g) => [...g, name]);
    setNewGroup("");
    toast.success(`Grupo "${name}" criado`);
  };

  const handleRemoveGroup = (group: string) => {
    setGroups((gs) => gs.filter((g) => g !== group));
    setUsers((us) =>
      us.map((u) => (u.group === group ? { ...u, group: null } : u)),
    );
    toast.success(`Grupo "${group}" removido`);
  };

  const handleChangeUserGroup = (userId: string, value: string) => {
    const next = value === UNASSIGNED ? null : value;
    setUsers((us) =>
      us.map((u) => (u.id === userId ? { ...u, group: next } : u)),
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());
      const matchesUnassigned = onlyUnassigned ? u.group === null : true;
      return matchesSearch && matchesUnassigned;
    });
  }, [users, search, onlyUnassigned]);

  const unassignedCount = users.filter((u) => u.group === null).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <UserCog className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--dark-green))] md:text-3xl">
                Alocação de Utilizadores
              </h1>
              <p className="text-sm text-muted-foreground">
                Gestão de grupos e atribuição de utilizadores · LiderAI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start rounded-2xl bg-card px-4 py-2 shadow-sm ring-1 ring-border md:self-auto">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-[hsl(var(--dark-green))]">
              {users.length} utilizadores
            </span>
            <span className="mx-1 h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">
              {groups.length} grupos
            </span>
          </div>
        </header>

        {/* Group management */}
        <section className="mb-6 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[hsl(var(--dark-green))]">
            <Plus className="h-4 w-4 text-primary" />
            Criar Novo Grupo
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateGroup()}
              placeholder="Ex.: Grupo 5, Equipe Logística..."
              className="h-11 flex-1 rounded-xl"
            />
            <Button
              onClick={handleCreateGroup}
              className="h-11 gap-2 rounded-xl px-6"
            >
              <Plus className="h-4 w-4" />
              Criar Grupo
            </Button>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Grupos existentes
            </p>
            {groups.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum grupo criado ainda.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {groups.map((g) => {
                  const count = users.filter((u) => u.group === g).length;
                  return (
                    <div
                      key={g}
                      className="group flex items-center gap-2 rounded-xl bg-primary/10 py-2 pl-3 pr-2 text-sm font-medium text-primary ring-1 ring-primary/20 transition-all hover:bg-primary/15"
                    >
                      <span>{g}</span>
                      <Badge
                        variant="secondary"
                        className="h-5 rounded-full bg-primary/20 px-2 text-[10px] text-primary hover:bg-primary/20"
                      >
                        {count}
                      </Badge>
                      <button
                        onClick={() => handleRemoveGroup(g)}
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-primary/60 transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Remover ${g}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Users */}
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold text-[hsl(var(--dark-green))]">
              <Users className="h-4 w-4 text-primary" />
              Utilizadores
              <span className="text-xs font-normal text-muted-foreground">
                ({filteredUsers.length} resultado{filteredUsers.length !== 1 && "s"})
              </span>
            </h2>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nome..."
                  className="h-10 w-full rounded-xl pl-9 sm:w-64"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted"
                    aria-label="Limpar busca"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <Button
                variant={onlyUnassigned ? "default" : "outline"}
                onClick={() => setOnlyUnassigned((v) => !v)}
                className="h-10 gap-2 rounded-xl"
              >
                <Filter className="h-4 w-4" />
                Sem grupo
                <Badge
                  className={cn(
                    "h-5 rounded-full px-1.5 text-[10px]",
                    onlyUnassigned
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground"
                      : "bg-primary/10 text-primary hover:bg-primary/10",
                  )}
                >
                  {unassignedCount}
                </Badge>
              </Button>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl ring-1 ring-border md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead className="text-[hsl(var(--dark-green))]">Nome</TableHead>
                  <TableHead className="text-[hsl(var(--dark-green))]">E-mail</TableHead>
                  <TableHead className="w-[220px] text-[hsl(var(--dark-green))]">
                    Grupo Atual
                  </TableHead>
                  <TableHead className="w-[120px] text-right text-[hsl(var(--dark-green))]">
                    Ação
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      Nenhum utilizador encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.id} className="hover:bg-secondary/40">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <span className="font-medium text-[hsl(var(--dark-green))]">
                            {u.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell>
                        <Select
                          value={u.group ?? UNASSIGNED}
                          onValueChange={(v) => handleChangeUserGroup(u.id, v)}
                        >
                          <SelectTrigger className="h-9 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={UNASSIGNED}>
                              <span className="text-muted-foreground">Sem grupo</span>
                            </SelectItem>
                            {groups.map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        {u.group ? (
                          <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">
                            Alocado
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="rounded-full border-orange-300 bg-orange-50 text-orange-600"
                          >
                            Pendente
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredUsers.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Nenhum utilizador encontrado.
              </p>
            ) : (
              filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className="rounded-xl bg-secondary/40 p-4 ring-1 ring-border"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-[hsl(var(--dark-green))]">
                          {u.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                    {u.group ? (
                      <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">
                        Alocado
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="rounded-full border-orange-300 bg-orange-50 text-orange-600"
                      >
                        Pendente
                      </Badge>
                    )}
                  </div>
                  <Select
                    value={u.group ?? UNASSIGNED}
                    onValueChange={(v) => handleChangeUserGroup(u.id, v)}
                  >
                    <SelectTrigger className="h-10 rounded-lg bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UNASSIGNED}>
                        <span className="text-muted-foreground">Sem grupo</span>
                      </SelectItem>
                      {groups.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
