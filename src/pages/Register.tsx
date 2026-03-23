import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
          <span className="text-primary-foreground text-2xl font-bold">L</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">LiderAI</h1>
        <p className="text-muted-foreground text-sm">Sistema de Gestão de Arrecadação</p>
      </div>

      <div className="w-full max-w-md bg-card rounded-2xl shadow-sm border border-border p-8">
        <h2 className="text-xl font-bold text-foreground text-center mb-1">Criar Nova Conta</h2>
        <p className="text-muted-foreground text-sm text-center mb-6">Preencha os dados para se cadastrar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="João Silva" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email Institucional</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="email" placeholder="seu.email@fecap.br" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Grupo/Equipe</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select>
                <SelectTrigger className="pl-10 rounded-lg">
                  <SelectValue placeholder="Selecione seu grupo" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => (
                    <SelectItem key={i + 1} value={`grupo-${i + 1}`}>Grupo {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Confirmar Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="Digite a senha novamente" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 rounded-lg" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm text-foreground">
              Concordo com os <Link to="#" className="text-primary hover:underline">Termos de Uso</Link> e <Link to="#" className="text-primary hover:underline">Política de Privacidade</Link>
            </label>
          </div>

          <Link to="/dashboard">
            <Button className="w-full rounded-lg h-11 mt-2" size="lg">
              <Users className="h-4 w-4 mr-2" />
              Criar Conta
            </Button>
          </Link>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já tem uma conta?{" "}
          <Link to="/" className="text-primary font-medium hover:underline">Fazer login</Link>
        </p>
      </div>

      <p className="text-xs text-muted-foreground mt-8">© 2026 FECAP - Todos os direitos reservados</p>
    </div>
  );
};

export default Register;
