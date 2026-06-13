"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Mail,
  Settings,
  BarChart3,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Plus,
  Search,
  Bell,
  ChevronDown,
  Pencil,
  Trash2,
  X,
  Loader2,
  Database,
  Server,
  Globe,
  Star,
  ExternalLink,
  MapPin,
  CalendarDays,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ─── Types ──────────────────────────────────────────────────────────────────────

interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  service?: string;
  budget?: string;
  status: string;
  source?: string;
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  tags?: string;
  published: boolean;
  featured: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  author?: { id: string; name: string; avatar?: string };
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  coverImage?: string;
  images?: string;
  category?: string;
  client?: string;
  technologies?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  image?: string;
  expertise?: string;
  qualifications?: string;
  technicalSkills?: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  features?: string;
  benefits?: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Testimonial {
  id: string;
  name: string;
  title?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface JobOpening {
  id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  requirements?: string;
  salary?: string;
  published: boolean;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  _count?: { applications: number };
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  source?: string;
  active: boolean;
  createdAt: string;
}

interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

// ─── Sidebar Navigation ────────────────────────────────────────────────────────

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Mail, label: "Contacts", id: "contacts" },
  { icon: FileText, label: "Blog Posts", id: "blog" },
  { icon: Briefcase, label: "Projects", id: "projects" },
  { icon: Users, label: "Team", id: "team" },
  { icon: Megaphone, label: "Services", id: "services" },
  { icon: BarChart3, label: "Newsletter & Careers", id: "newsletter-careers" },
  { icon: Settings, label: "Settings", id: "settings" },
];

// ─── Utility Functions ──────────────────────────────────────────────────────────

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

// ─── Toast System ───────────────────────────────────────────────────────────────

interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error";
}

let toastIdCounter = 0;

function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const ToastContainer = (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-xl shadow-lg text-sm font-[family-name:var(--font-inter)] flex items-center gap-2 animate-in slide-in-from-right duration-300 ${
            toast.type === "success"
              ? "bg-green-500/90 text-white backdrop-blur-sm"
              : "bg-red-500/90 text-white backdrop-blur-sm"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          {toast.message}
        </div>
      ))}
    </div>
  );

  return { showToast, ToastContainer };
}

// ─── Status Badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
    new: { icon: AlertCircle, color: "text-blue-400", label: "New" },
    contacted: { icon: Clock, color: "text-yellow-400", label: "Contacted" },
    qualified: { icon: Eye, color: "text-green-400", label: "Qualified" },
    closed: { icon: CheckCircle, color: "text-silver/40", label: "Closed" },
  };
  const { icon: Icon, color, label } = config[status] || config.new;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-[family-name:var(--font-inter)] ${color} bg-white/5`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

// ─── Shared Form Dialog ─────────────────────────────────────────────────────────

function FormDialog({
  open,
  onOpenChange,
  title,
  children,
  onSubmit,
  submitLabel = "Save",
  loading = false,
  maxWidth = "sm:max-w-lg",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
  loading?: boolean;
  maxWidth?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidth} max-h-[90vh] overflow-y-auto bg-background border-white/10`}>
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-poppins)]">{title}</DialogTitle>
          <DialogDescription className="font-[family-name:var(--font-inter)] text-silver/50">
            Fill in the fields below. All required fields must be completed.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">{children}</div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="font-[family-name:var(--font-inter)] border-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={loading}
            className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm Dialog ──────────────────────────────────────────────────────

function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  loading = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemName: string;
  loading?: boolean;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-background border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-[family-name:var(--font-poppins)]">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="font-[family-name:var(--font-inter)] text-silver/50">
            Are you sure you want to delete <strong className="text-white">{itemName}</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-[family-name:var(--font-inter)] border-white/10">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-inter)]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Form Field Helpers ─────────────────────────────────────────────────────────

function FormField({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-[family-name:var(--font-inter)] text-silver/70">
        {label}
        {required && <span className="text-falu-light ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
}

function FormInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] placeholder:text-silver/30 focus:border-falu/40"
    />
  );
}

function FormTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] placeholder:text-silver/30 focus:border-falu/40 resize-none"
    />
  );
}

function FormSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm font-[family-name:var(--font-inter)] text-silver/70">{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

// ─── Loading Spinner ────────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-falu-light border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────────────

function EmptyState({ icon: Icon, title, description }: { icon: typeof Mail; title: string; description: string }) {
  return (
    <div className="text-center py-12 text-silver/40 font-[family-name:var(--font-inter)]">
      <Icon className="h-12 w-12 mx-auto mb-3 opacity-30" />
      <p className="font-semibold text-silver/60">{title}</p>
      <p className="text-xs mt-1">{description}</p>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiHealth, setApiHealth] = useState<Record<string, string> | null>(null);
  const { showToast, ToastContainer } = useToast();

  // Data states
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({ dashboard: true });

  // Fetch helpers
  const fetchData = useCallback(
    async (endpoint: string, setter: (data: any[]) => void, key: string) => {
      setLoading((prev) => ({ ...prev, [key]: true }));
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        setter(json.data || []);
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
        showToast(`Failed to load ${key}`, "error");
      } finally {
        setLoading((prev) => ({ ...prev, [key]: false }));
      }
    },
    [showToast]
  );

  // Initial dashboard load
  useEffect(() => {
    async function fetchDashboardData() {
      setLoading((prev) => ({ ...prev, dashboard: true }));
      try {
        const healthRes = await fetch("/api");
        const healthData = await healthRes.json();
        setApiHealth(healthData.services || {});

        const [contactsRes, blogRes, projectsRes, teamRes, servicesRes, newsletterRes, careersRes] =
          await Promise.all([
            fetch("/api/contacts"),
            fetch("/api/blog?admin=true"),
            fetch("/api/projects?admin=true"),
            fetch("/api/team?admin=true"),
            fetch("/api/services?admin=true"),
            fetch("/api/newsletter"),
            fetch("/api/careers?admin=true"),
          ]);

        const [contactsData, blogData, projectsData, teamData, servicesData, newsletterData, careersData] =
          await Promise.all([
            contactsRes.json(),
            blogRes.json(),
            projectsRes.json(),
            teamRes.json(),
            servicesRes.json(),
            newsletterRes.json(),
            careersRes.json(),
          ]);

        setContacts(contactsData.data || []);
        setBlogPosts(blogData.data || []);
        setProjects(projectsData.data || []);
        setTeamMembers(teamData.data || []);
        setServices(servicesData.data || []);
        setSubscribers(newsletterData.data || []);
        setJobs(careersData.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading((prev) => ({ ...prev, dashboard: false }));
      }
    }
    fetchDashboardData();
  }, []);

  // Fetch on section change (lazy load)
  useEffect(() => {
    const sectionFetchMap: Record<string, () => void> = {
      contacts: () => fetchData("/api/contacts", setContacts, "contacts"),
      blog: () => fetchData("/api/blog?admin=true", setBlogPosts, "blog"),
      projects: () => fetchData("/api/projects?admin=true", setProjects, "projects"),
      team: () => fetchData("/api/team?admin=true", setTeamMembers, "team"),
      services: () => fetchData("/api/services?admin=true", setServices, "services"),
      "newsletter-careers": () => {
        fetchData("/api/newsletter", setSubscribers, "newsletter");
        fetchData("/api/careers?admin=true", setJobs, "careers");
      },
      settings: () => fetchData("/api/settings", setSettings, "settings"),
    };
    if (sectionFetchMap[activeSection]) {
      sectionFetchMap[activeSection]();
    }
  }, [activeSection, fetchData]);

  // Shared CRUD operations
  const createItem = useCallback(
    async (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to create");
        showToast("Created successfully!");
        onSuccess();
        return json.data;
      } catch (err: any) {
        showToast(err.message || "Failed to create", "error");
        return null;
      }
    },
    [showToast]
  );

  const updateItem = useCallback(
    async (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => {
      try {
        const res = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to update");
        showToast("Updated successfully!");
        onSuccess();
        return json.data;
      } catch (err: any) {
        showToast(err.message || "Failed to update", "error");
        return null;
      }
    },
    [showToast]
  );

  const deleteItem = useCallback(
    async (endpoint: string, id: string, onSuccess: () => void) => {
      try {
        const res = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to delete");
        showToast("Deleted successfully!");
        onSuccess();
        return true;
      } catch (err: any) {
        showToast(err.message || "Failed to delete", "error");
        return false;
      }
    },
    [showToast]
  );

  const sectionTitle: Record<string, string> = {
    dashboard: "Dashboard",
    contacts: "Contacts",
    blog: "Blog Posts",
    projects: "Projects",
    team: "Team Members",
    services: "Services",
    "newsletter-careers": "Newsletter & Careers",
    settings: "Settings",
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {ToastContainer}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Clipe233" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <h1 className="font-bold font-[family-name:var(--font-poppins)] text-sm">Clipe233</h1>
              <span className="text-xs text-silver/50 font-[family-name:var(--font-inter)]">
                Admin CMS
              </span>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-[family-name:var(--font-inter)] transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-falu/20 text-falu-light border border-falu/30"
                  : "text-silver/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Backend Status */}
        <div className="p-4 border-t border-white/10">
          <h4 className="text-xs font-semibold text-silver/40 mb-3 font-[family-name:var(--font-inter)] uppercase tracking-wider">
            Backend Status
          </h4>
          <div className="space-y-2">
            {[
              { icon: Database, label: "Database", status: apiHealth?.database === "connected" ? "Online" : "Local", ok: apiHealth?.database === "connected" },
              { icon: Server, label: "Supabase", status: apiHealth?.supabase === "configured" ? "Active" : "Setup", ok: apiHealth?.supabase === "configured" },
              { icon: Globe, label: "Strapi CMS", status: apiHealth?.strapi === "configured" ? "Active" : "Setup", ok: apiHealth?.strapi === "configured" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-[family-name:var(--font-inter)]">
                <item.icon className={`h-3 w-3 ${item.ok ? "text-green-400" : "text-yellow-400"}`} />
                <span className="text-silver/60">{item.label}</span>
                <span className={`ml-auto ${item.ok ? "text-green-400" : "text-yellow-400"}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <svg className="h-5 w-5 text-silver/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl font-bold font-[family-name:var(--font-poppins)]">
                  {sectionTitle[activeSection] || activeSection}
                </h2>
                <p className="text-sm text-silver/50 font-[family-name:var(--font-inter)]">
                  Manage your website content and data
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Bell className="h-5 w-5 text-silver/60" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-falu-light" />
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                <div className="w-8 h-8 rounded-full bg-falu/30 flex items-center justify-center text-xs font-bold text-falu-light">
                  A
                </div>
                <span className="text-sm font-[family-name:var(--font-inter)]">Admin</span>
                <ChevronDown className="h-4 w-4 text-silver/40" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-8">
          {loading.dashboard && activeSection === "dashboard" ? (
            <LoadingSpinner />
          ) : activeSection === "dashboard" ? (
            <DashboardView
              contacts={contacts}
              blogPosts={blogPosts}
              projects={projects}
              teamMembers={teamMembers}
              services={services}
              subscribers={subscribers}
              jobs={jobs}
              onNavigate={setActiveSection}
            />
          ) : activeSection === "contacts" ? (
            <ContactsView
              contacts={contacts}
              loading={!!loading.contacts}
              onRefresh={() => fetchData("/api/contacts", setContacts, "contacts")}
              updateItem={updateItem}
              deleteItem={deleteItem}
              showToast={showToast}
            />
          ) : activeSection === "blog" ? (
            <BlogView
              posts={blogPosts}
              loading={!!loading.blog}
              onRefresh={() => fetchData("/api/blog?admin=true", setBlogPosts, "blog")}
              createItem={createItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              showToast={showToast}
            />
          ) : activeSection === "projects" ? (
            <ProjectsView
              projects={projects}
              loading={!!loading.projects}
              onRefresh={() => fetchData("/api/projects?admin=true", setProjects, "projects")}
              createItem={createItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              showToast={showToast}
            />
          ) : activeSection === "team" ? (
            <TeamView
              members={teamMembers}
              loading={!!loading.team}
              onRefresh={() => fetchData("/api/team?admin=true", setTeamMembers, "team")}
              createItem={createItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              showToast={showToast}
            />
          ) : activeSection === "services" ? (
            <ServicesView
              services={services}
              loading={!!loading.services}
              onRefresh={() => fetchData("/api/services?admin=true", setServices, "services")}
              createItem={createItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              showToast={showToast}
            />
          ) : activeSection === "newsletter-careers" ? (
            <NewsletterCareersView
              subscribers={subscribers}
              jobs={jobs}
              loadingNewsletter={!!loading.newsletter}
              loadingCareers={!!loading.careers}
              onRefreshNewsletter={() => fetchData("/api/newsletter", setSubscribers, "newsletter")}
              onRefreshCareers={() => fetchData("/api/careers?admin=true", setJobs, "careers")}
              createItem={createItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              showToast={showToast}
            />
          ) : activeSection === "settings" ? (
            <SettingsView
              settings={settings}
              loading={!!loading.settings}
              onRefresh={() => fetchData("/api/settings", setSettings, "settings")}
              updateItem={updateItem}
              showToast={showToast}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}

// ─── 1. Dashboard View ──────────────────────────────────────────────────────────

function DashboardView({
  contacts,
  blogPosts,
  projects,
  teamMembers,
  services,
  subscribers,
  jobs,
  onNavigate,
}: {
  contacts: ContactItem[];
  blogPosts: BlogPost[];
  projects: Project[];
  teamMembers: TeamMember[];
  services: ServiceItem[];
  subscribers: NewsletterSubscriber[];
  jobs: JobOpening[];
  onNavigate: (section: string) => void;
}) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const newContactsWeek = contacts.filter((c) => new Date(c.createdAt) >= oneWeekAgo).length;

  const statCards = [
    {
      label: "New Contacts",
      value: contacts.filter((c) => c.status === "new").length,
      total: contacts.length,
      icon: Mail,
      color: "#7B1818",
      trend: `${newContactsWeek} this week`,
    },
    {
      label: "Blog Posts",
      value: blogPosts.filter((p) => p.published).length,
      total: blogPosts.length,
      icon: FileText,
      color: "#3FCF8E",
      trend: `${blogPosts.filter((p) => p.featured).length} featured`,
    },
    {
      label: "Projects",
      value: projects.filter((p) => p.published).length,
      total: projects.length,
      icon: Briefcase,
      color: "#4945FF",
      trend: `${projects.filter((p) => p.featured).length} featured`,
    },
    {
      label: "Team Members",
      value: teamMembers.filter((m) => m.published).length,
      total: teamMembers.length,
      icon: Users,
      color: "#61DAFB",
      trend: `${services.length} services`,
    },
    {
      label: "Services",
      value: services.filter((s) => s.published).length,
      total: services.length,
      icon: Megaphone,
      color: "#FF9800",
      trend: "Active",
    },
    {
      label: "Newsletter",
      value: subscribers.length,
      total: subscribers.length,
      icon: Mail,
      color: "#FFCA28",
      trend: `${jobs.filter((j) => j.published).length} job openings`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${card.color}20`, color: card.color }}
              >
                <card.icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">
                {card.trend}
              </span>
            </div>
            <div className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] mb-1">
              {card.value}
            </div>
            <div className="text-sm text-silver/50 font-[family-name:var(--font-inter)]">
              {card.label}
              {card.total > card.value && (
                <span className="text-silver/30"> / {card.total} total</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Contacts & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Contacts */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold font-[family-name:var(--font-poppins)]">Recent Contacts</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("contacts")}
              className="text-falu-light hover:text-white text-xs font-[family-name:var(--font-inter)]"
            >
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          {contacts.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {contacts.slice(0, 5).map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-falu/20 flex items-center justify-center text-sm font-bold text-falu-light shrink-0">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold font-[family-name:var(--font-inter)] truncate">
                      {contact.name}
                    </div>
                    <div className="text-xs text-silver/40 font-[family-name:var(--font-inter)] truncate">
                      {contact.email}
                    </div>
                  </div>
                  <StatusBadge status={contact.status} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Mail} title="No contacts yet" description="Contact form submissions will appear here" />
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { icon: FileText, label: "New Blog Post", section: "blog", color: "#3FCF8E" },
              { icon: Briefcase, label: "Add Project", section: "projects", color: "#4945FF" },
              { icon: Users, label: "Add Team Member", section: "team", color: "#61DAFB" },
              { icon: Megaphone, label: "Add Service", section: "services", color: "#FF9800" },
            ].map((action, i) => (
              <button
                key={i}
                onClick={() => onNavigate(action.section)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}20`, color: action.color }}
                >
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-[family-name:var(--font-inter)] text-silver/70">
                  {action.label}
                </span>
                <Plus className="h-4 w-4 text-silver/20 ml-auto" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Contacts View ───────────────────────────────────────────────────────────

function ContactsView({
  contacts,
  loading,
  onRefresh,
  updateItem,
  deleteItem,
  showToast,
}: {
  contacts: ContactItem[];
  loading: boolean;
  onRefresh: () => void;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ContactItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStatusChange = async (contact: ContactItem, newStatus: string) => {
    setUpdating(true);
    await updateItem("/api/contacts", { id: contact.id, status: newStatus }, onRefresh);
    setUpdating(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteItem("/api/contacts", deleteTarget.id, onRefresh);
    setDeleting(false);
    if (ok) {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver/40" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-[family-name:var(--font-inter)] text-white placeholder:text-silver/30 focus:outline-none focus:border-falu/40 transition-colors"
          />
        </div>
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {filtered.length} contact{filtered.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Contacts Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Contact", "Service", "Status", "Date", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedContact(contact);
                      setDetailOpen(true);
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-falu/20 flex items-center justify-center text-xs font-bold text-falu-light shrink-0">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold font-[family-name:var(--font-inter)]">
                            {contact.name}
                          </div>
                          <div className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">
                            {contact.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/60 font-[family-name:var(--font-inter)]">
                      {contact.service || "—"}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={contact.status}
                        onValueChange={(v) => handleStatusChange(contact, v)}
                        disabled={updating}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs font-[family-name:var(--font-inter)] bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/40 font-[family-name:var(--font-inter)]">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDeleteTarget(contact);
                          setDeleteOpen(true);
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <EmptyState
                      icon={Mail}
                      title="No contacts found"
                      description={searchQuery ? "Try a different search" : "Contact submissions will appear here"}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg bg-background border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-poppins)]">
              Contact Details
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4 font-[family-name:var(--font-inter)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-falu/20 flex items-center justify-center text-xl font-bold text-falu-light">
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-lg">{selectedContact.name}</div>
                  <div className="text-sm text-silver/50">{selectedContact.email}</div>
                </div>
              </div>
              <Separator className="bg-white/10" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedContact.phone && (
                  <div><span className="text-silver/40">Phone:</span> <span className="ml-2">{selectedContact.phone}</span></div>
                )}
                {selectedContact.company && (
                  <div><span className="text-silver/40">Company:</span> <span className="ml-2">{selectedContact.company}</span></div>
                )}
                {selectedContact.service && (
                  <div><span className="text-silver/40">Service:</span> <span className="ml-2">{selectedContact.service}</span></div>
                )}
                {selectedContact.budget && (
                  <div><span className="text-silver/40">Budget:</span> <span className="ml-2">{selectedContact.budget}</span></div>
                )}
                {selectedContact.source && (
                  <div><span className="text-silver/40">Source:</span> <span className="ml-2">{selectedContact.source}</span></div>
                )}
                <div>
                  <span className="text-silver/40">Status:</span>
                  <span className="ml-2"><StatusBadge status={selectedContact.status} /></span>
                </div>
              </div>
              {selectedContact.subject && (
                <div>
                  <span className="text-silver/40 text-sm">Subject:</span>
                  <p className="mt-1 text-sm">{selectedContact.subject}</p>
                </div>
              )}
              {selectedContact.message && (
                <div>
                  <span className="text-silver/40 text-sm">Message:</span>
                  <p className="mt-1 text-sm bg-white/5 p-3 rounded-xl whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              )}
              <div className="text-xs text-silver/30">
                Submitted {formatDate(selectedContact.createdAt)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        itemName={deleteTarget?.name || ""}
        loading={deleting}
      />
    </div>
  );
}

// ─── 3. Blog Posts View ─────────────────────────────────────────────────────────

function BlogView({
  posts,
  loading,
  onRefresh,
  createItem,
  updateItem,
  deleteItem,
  showToast,
}: {
  posts: BlogPost[];
  loading: boolean;
  onRefresh: () => void;
  createItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const emptyForm = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    tags: "",
    published: false,
    featured: false,
  };
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      coverImage: post.coverImage || "",
      category: post.category || "",
      tags: post.tags || "",
      published: post.published,
      featured: post.featured,
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      showToast("Title and slug are required", "error");
      return;
    }
    setSaving(true);
    const data = {
      ...form,
      ...(editingPost ? { id: editingPost.id } : { authorId: "admin" }),
    };
    if (editingPost) {
      await updateItem("/api/blog", data, onRefresh);
    } else {
      await createItem("/api/blog", data, onRefresh);
    }
    setSaving(false);
    setFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteItem("/api/blog", deleteTarget.id, onRefresh);
    setDeleting(false);
    if (ok) {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  const toggleField = async (post: BlogPost, field: "published" | "featured") => {
    await updateItem("/api/blog", { id: post.id, [field]: !post[field] }, onRefresh);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          onClick={openCreate}
          className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Title", "Category", "Published", "Featured", "Date", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold font-[family-name:var(--font-inter)] max-w-xs truncate">
                        {post.title}
                      </div>
                      <div className="text-xs text-silver/30 font-[family-name:var(--font-inter)]">{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/60 font-[family-name:var(--font-inter)]">
                      {post.category || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Switch
                        checked={post.published}
                        onCheckedChange={() => toggleField(post, "published")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleField(post, "featured")}>
                        <Star
                          className={`h-4 w-4 ${
                            post.featured ? "text-yellow-400 fill-yellow-400" : "text-silver/30"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/40 font-[family-name:var(--font-inter)]">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(post)}
                          className="text-silver/60 hover:text-white hover:bg-white/5 h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteTarget(post);
                            setDeleteOpen(true);
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <EmptyState icon={FileText} title="No blog posts" description="Create your first blog post" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Form */}
      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingPost ? "Edit Post" : "New Blog Post"}
        onSubmit={handleSave}
        loading={saving}
        maxWidth="sm:max-w-2xl"
      >
        <FormField label="Title" required>
          <FormInput
            value={form.title}
            onChange={(v) => {
              setForm((f) => ({ ...f, title: v, slug: f.slug || generateSlug(v) }));
            }}
            placeholder="Post title"
            required
          />
        </FormField>
        <FormField label="Slug" required>
          <FormInput
            value={form.slug}
            onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
            placeholder="post-url-slug"
            required
          />
        </FormField>
        <FormField label="Excerpt">
          <FormTextarea
            value={form.excerpt}
            onChange={(v) => setForm((f) => ({ ...f, excerpt: v }))}
            placeholder="Brief summary..."
            rows={2}
          />
        </FormField>
        <FormField label="Content">
          <FormTextarea
            value={form.content}
            onChange={(v) => setForm((f) => ({ ...f, content: v }))}
            placeholder="Full post content..."
            rows={6}
          />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Cover Image URL">
            <FormInput
              value={form.coverImage}
              onChange={(v) => setForm((f) => ({ ...f, coverImage: v }))}
              placeholder="https://..."
            />
          </FormField>
          <FormField label="Category">
            <FormInput
              value={form.category}
              onChange={(v) => setForm((f) => ({ ...f, category: v }))}
              placeholder="e.g. Technology"
            />
          </FormField>
        </div>
        <FormField label="Tags (comma-separated)">
          <FormInput
            value={form.tags}
            onChange={(v) => setForm((f) => ({ ...f, tags: v }))}
            placeholder="react, nextjs, web"
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormSwitch
            checked={form.published}
            onChange={(v) => setForm((f) => ({ ...f, published: v }))}
            label="Published"
          />
          <FormSwitch
            checked={form.featured}
            onChange={(v) => setForm((f) => ({ ...f, featured: v }))}
            label="Featured"
          />
        </div>
      </FormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title || ""}
        loading={deleting}
      />
    </div>
  );
}

// ─── 4. Projects View ───────────────────────────────────────────────────────────

function ProjectsView({
  projects,
  loading,
  onRefresh,
  createItem,
  updateItem,
  deleteItem,
  showToast,
}: {
  projects: Project[];
  loading: boolean;
  onRefresh: () => void;
  createItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const emptyForm = {
    title: "",
    slug: "",
    description: "",
    content: "",
    coverImage: "",
    images: "",
    category: "",
    client: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    published: false,
    startDate: "",
    endDate: "",
  };
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description || "",
      content: project.content || "",
      coverImage: project.coverImage || "",
      images: project.images || "",
      category: project.category || "",
      client: project.client || "",
      technologies: project.technologies || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured,
      published: project.published,
      startDate: project.startDate ? project.startDate.split("T")[0] : "",
      endDate: project.endDate ? project.endDate.split("T")[0] : "",
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      showToast("Title and slug are required", "error");
      return;
    }
    setSaving(true);
    const data: Record<string, unknown> = {
      title: form.title,
      slug: form.slug,
      description: form.description || null,
      content: form.content || null,
      coverImage: form.coverImage || null,
      images: form.images || null,
      category: form.category || null,
      client: form.client || null,
      technologies: form.technologies || null,
      liveUrl: form.liveUrl || null,
      githubUrl: form.githubUrl || null,
      featured: form.featured,
      published: form.published,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
    };
    if (editingProject) {
      data.id = editingProject.id;
      await updateItem("/api/projects", data, onRefresh);
    } else {
      await createItem("/api/projects", data, onRefresh);
    }
    setSaving(false);
    setFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteItem("/api/projects", deleteTarget.id, onRefresh);
    setDeleting(false);
    if (ok) {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  const toggleField = async (project: Project, field: "published" | "featured") => {
    await updateItem("/api/projects", { id: project.id, [field]: !project[field] }, onRefresh);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          onClick={openCreate}
          className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Project", "Category", "Client", "Published", "Featured", "Date", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold font-[family-name:var(--font-inter)] max-w-xs truncate">
                        {project.title}
                      </div>
                      <div className="text-xs text-silver/30 font-[family-name:var(--font-inter)]">{project.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/60 font-[family-name:var(--font-inter)]">
                      {project.category || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/60 font-[family-name:var(--font-inter)]">
                      {project.client || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Switch
                        checked={project.published}
                        onCheckedChange={() => toggleField(project, "published")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleField(project, "featured")}>
                        <Star
                          className={`h-4 w-4 ${
                            project.featured ? "text-yellow-400 fill-yellow-400" : "text-silver/30"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/40 font-[family-name:var(--font-inter)]">
                      {formatDate(project.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(project)}
                          className="text-silver/60 hover:text-white hover:bg-white/5 h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteTarget(project);
                            setDeleteOpen(true);
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <EmptyState icon={Briefcase} title="No projects" description="Add your first project" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Form */}
      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingProject ? "Edit Project" : "Add Project"}
        onSubmit={handleSave}
        loading={saving}
        maxWidth="sm:max-w-2xl"
      >
        <FormField label="Title" required>
          <FormInput
            value={form.title}
            onChange={(v) => setForm((f) => ({ ...f, title: v, slug: f.slug || generateSlug(v) }))}
            placeholder="Project title"
            required
          />
        </FormField>
        <FormField label="Slug" required>
          <FormInput
            value={form.slug}
            onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
            placeholder="project-url-slug"
            required
          />
        </FormField>
        <FormField label="Description">
          <FormTextarea
            value={form.description}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            placeholder="Short description..."
            rows={2}
          />
        </FormField>
        <FormField label="Content">
          <FormTextarea
            value={form.content}
            onChange={(v) => setForm((f) => ({ ...f, content: v }))}
            placeholder="Full project details..."
            rows={4}
          />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Cover Image URL">
            <FormInput value={form.coverImage} onChange={(v) => setForm((f) => ({ ...f, coverImage: v }))} placeholder="https://..." />
          </FormField>
          <FormField label="Category">
            <FormInput value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} placeholder="e.g. Web Development" />
          </FormField>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Client">
            <FormInput value={form.client} onChange={(v) => setForm((f) => ({ ...f, client: v }))} placeholder="Client name" />
          </FormField>
          <FormField label="Technologies (comma-separated)">
            <FormInput value={form.technologies} onChange={(v) => setForm((f) => ({ ...f, technologies: v }))} placeholder="React, Node.js" />
          </FormField>
        </div>
        <FormField label="Image URLs (comma-separated)">
          <FormInput value={form.images} onChange={(v) => setForm((f) => ({ ...f, images: v }))} placeholder="https://img1.jpg, https://img2.jpg" />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Live URL">
            <FormInput value={form.liveUrl} onChange={(v) => setForm((f) => ({ ...f, liveUrl: v }))} placeholder="https://..." />
          </FormField>
          <FormField label="GitHub URL">
            <FormInput value={form.githubUrl} onChange={(v) => setForm((f) => ({ ...f, githubUrl: v }))} placeholder="https://github.com/..." />
          </FormField>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Start Date">
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
              className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] focus:border-falu/40"
            />
          </FormField>
          <FormField label="End Date">
            <Input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
              className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] focus:border-falu/40"
            />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormSwitch checked={form.published} onChange={(v) => setForm((f) => ({ ...f, published: v }))} label="Published" />
          <FormSwitch checked={form.featured} onChange={(v) => setForm((f) => ({ ...f, featured: v }))} label="Featured" />
        </div>
      </FormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title || ""}
        loading={deleting}
      />
    </div>
  );
}

// ─── 5. Team Members View ───────────────────────────────────────────────────────

function TeamView({
  members,
  loading,
  onRefresh,
  createItem,
  updateItem,
  deleteItem,
  showToast,
}: {
  members: TeamMember[];
  loading: boolean;
  onRefresh: () => void;
  createItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const emptyForm = {
    name: "",
    title: "",
    bio: "",
    image: "",
    expertise: "",
    qualifications: "",
    technicalSkills: "",
    order: 0,
    published: true,
  };
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setEditingMember(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      title: member.title,
      bio: member.bio || "",
      image: member.image || "",
      expertise: member.expertise || "",
      qualifications: member.qualifications || "",
      technicalSkills: member.technicalSkills || "",
      order: member.order,
      published: member.published,
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.title) {
      showToast("Name and title are required", "error");
      return;
    }
    setSaving(true);
    const data: Record<string, unknown> = {
      name: form.name,
      title: form.title,
      bio: form.bio || null,
      image: form.image || null,
      expertise: form.expertise || null,
      qualifications: form.qualifications || null,
      technicalSkills: form.technicalSkills || null,
      order: form.order,
      published: form.published,
    };
    if (editingMember) {
      data.id = editingMember.id;
      await updateItem("/api/team", data, onRefresh);
    } else {
      await createItem("/api/team", data, onRefresh);
    }
    setSaving(false);
    setFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteItem("/api/team", deleteTarget.id, onRefresh);
    setDeleting(false);
    if (ok) {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {members.length} member{members.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          onClick={openCreate}
          className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Team Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="glass-card rounded-2xl p-6 hover:border-falu/30 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center text-lg font-bold text-falu-light shrink-0 overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold font-[family-name:var(--font-inter)] truncate">{member.name}</div>
                  <div className="text-sm text-silver/50 font-[family-name:var(--font-inter)] truncate">
                    {member.title}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge
                    variant={member.published ? "default" : "outline"}
                    className={`text-xs font-[family-name:var(--font-inter)] ${
                      member.published ? "bg-green-500/20 text-green-400 border-0" : "border-white/10 text-silver/40"
                    }`}
                  >
                    {member.published ? "Active" : "Draft"}
                  </Badge>
                </div>
              </div>
              {member.bio && (
                <p className="text-xs text-silver/40 font-[family-name:var(--font-inter)] line-clamp-2 mb-3">
                  {member.bio}
                </p>
              )}
              {member.expertise && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {member.expertise.split(",").map((skill, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs font-[family-name:var(--font-inter)] border-white/10 text-silver/50"
                    >
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xs text-silver/30 font-[family-name:var(--font-inter)]">
                  Order: {member.order}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(member)}
                    className="text-silver/60 hover:text-white hover:bg-white/5 h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDeleteTarget(member);
                      setDeleteOpen(true);
                    }}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState icon={Users} title="No team members" description="Add your first team member" />
          </div>
        )}
      </div>

      {/* Create/Edit Form */}
      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingMember ? "Edit Team Member" : "Add Team Member"}
        onSubmit={handleSave}
        loading={saving}
        maxWidth="sm:max-w-lg"
      >
        <FormField label="Name" required>
          <FormInput value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Full name" required />
        </FormField>
        <FormField label="Title" required>
          <FormInput value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="e.g. Senior Developer" required />
        </FormField>
        <FormField label="Bio">
          <FormTextarea value={form.bio} onChange={(v) => setForm((f) => ({ ...f, bio: v }))} placeholder="Short biography..." rows={3} />
        </FormField>
        <FormField label="Image URL">
          <FormInput value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} placeholder="https://..." />
        </FormField>
        <FormField label="Expertise (comma-separated)">
          <FormInput value={form.expertise} onChange={(v) => setForm((f) => ({ ...f, expertise: v }))} placeholder="Web Dev, Cloud, DevOps" />
        </FormField>
        <FormField label="Qualifications (comma-separated)">
          <FormInput value={form.qualifications} onChange={(v) => setForm((f) => ({ ...f, qualifications: v }))} placeholder="BSc Computer Science, AWS Certified" />
        </FormField>
        <FormField label="Technical Skills (comma-separated)">
          <FormInput value={form.technicalSkills} onChange={(v) => setForm((f) => ({ ...f, technicalSkills: v }))} placeholder="React, Python, AWS" />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Display Order">
            <Input
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
              className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] focus:border-falu/40"
            />
          </FormField>
          <div className="flex items-end pb-1">
            <FormSwitch checked={form.published} onChange={(v) => setForm((f) => ({ ...f, published: v }))} label="Published" />
          </div>
        </div>
      </FormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        itemName={deleteTarget?.name || ""}
        loading={deleting}
      />
    </div>
  );
}

// ─── 6. Services View ───────────────────────────────────────────────────────────

function ServicesView({
  services,
  loading,
  onRefresh,
  createItem,
  updateItem,
  deleteItem,
  showToast,
}: {
  services: ServiceItem[];
  loading: boolean;
  onRefresh: () => void;
  createItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const emptyForm = {
    title: "",
    slug: "",
    description: "",
    icon: "",
    features: "",
    benefits: "",
    order: 0,
    published: true,
  };
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setEditingService(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (service: ServiceItem) => {
    setEditingService(service);
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description || "",
      icon: service.icon || "",
      features: service.features || "",
      benefits: service.benefits || "",
      order: service.order,
      published: service.published,
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      showToast("Title and slug are required", "error");
      return;
    }
    setSaving(true);
    const data: Record<string, unknown> = {
      title: form.title,
      slug: form.slug,
      description: form.description || null,
      icon: form.icon || null,
      features: form.features || null,
      benefits: form.benefits || null,
      order: form.order,
      published: form.published,
    };
    if (editingService) {
      data.id = editingService.id;
      await updateItem("/api/services", data, onRefresh);
    } else {
      await createItem("/api/services", data, onRefresh);
    }
    setSaving(false);
    setFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteItem("/api/services", deleteTarget.id, onRefresh);
    setDeleting(false);
    if (ok) {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {services.length} service{services.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          onClick={openCreate}
          className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Service", "Icon", "Order", "Published", "Date", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold font-[family-name:var(--font-inter)]">{service.title}</div>
                      <div className="text-xs text-silver/30 font-[family-name:var(--font-inter)]">{service.slug}</div>
                      {service.description && (
                        <div className="text-xs text-silver/40 font-[family-name:var(--font-inter)] mt-1 line-clamp-1 max-w-xs">
                          {service.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/60 font-[family-name:var(--font-inter)]">
                      {service.icon || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/60 font-[family-name:var(--font-inter)]">
                      {service.order}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={service.published ? "default" : "outline"}
                        className={`text-xs font-[family-name:var(--font-inter)] ${
                          service.published ? "bg-green-500/20 text-green-400 border-0" : "border-white/10 text-silver/40"
                        }`}
                      >
                        {service.published ? "Active" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/40 font-[family-name:var(--font-inter)]">
                      {formatDate(service.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(service)}
                          className="text-silver/60 hover:text-white hover:bg-white/5 h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteTarget(service);
                            setDeleteOpen(true);
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <EmptyState icon={Megaphone} title="No services" description="Add your first service" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Form */}
      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingService ? "Edit Service" : "Add Service"}
        onSubmit={handleSave}
        loading={saving}
      >
        <FormField label="Title" required>
          <FormInput
            value={form.title}
            onChange={(v) => setForm((f) => ({ ...f, title: v, slug: f.slug || generateSlug(v) }))}
            placeholder="Service title"
            required
          />
        </FormField>
        <FormField label="Slug" required>
          <FormInput
            value={form.slug}
            onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
            placeholder="service-url-slug"
            required
          />
        </FormField>
        <FormField label="Description">
          <FormTextarea value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Service description..." rows={3} />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Icon Name">
            <FormInput value={form.icon} onChange={(v) => setForm((f) => ({ ...f, icon: v }))} placeholder="e.g. Globe, Code" />
          </FormField>
          <FormField label="Display Order">
            <Input
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
              className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] focus:border-falu/40"
            />
          </FormField>
        </div>
        <FormField label="Features (comma-separated)">
          <FormInput value={form.features} onChange={(v) => setForm((f) => ({ ...f, features: v }))} placeholder="Feature 1, Feature 2, Feature 3" />
        </FormField>
        <FormField label="Benefits (comma-separated)">
          <FormInput value={form.benefits} onChange={(v) => setForm((f) => ({ ...f, benefits: v }))} placeholder="Benefit 1, Benefit 2" />
        </FormField>
        <FormSwitch checked={form.published} onChange={(v) => setForm((f) => ({ ...f, published: v }))} label="Published" />
      </FormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title || ""}
        loading={deleting}
      />
    </div>
  );
}

// ─── 7. Newsletter & Careers View ───────────────────────────────────────────────

function NewsletterCareersView({
  subscribers,
  jobs,
  loadingNewsletter,
  loadingCareers,
  onRefreshNewsletter,
  onRefreshCareers,
  createItem,
  updateItem,
  deleteItem,
  showToast,
}: {
  subscribers: NewsletterSubscriber[];
  jobs: JobOpening[];
  loadingNewsletter: boolean;
  loadingCareers: boolean;
  onRefreshNewsletter: () => void;
  onRefreshCareers: () => void;
  createItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  return (
    <Tabs defaultValue="newsletter" className="space-y-6">
      <TabsList className="bg-white/5 border border-white/10">
        <TabsTrigger value="newsletter" className="font-[family-name:var(--font-inter)] data-[state=active]:bg-falu/20 data-[state=active]:text-falu-light">
          <Mail className="h-4 w-4 mr-2" />
          Newsletter
        </TabsTrigger>
        <TabsTrigger value="careers" className="font-[family-name:var(--font-inter)] data-[state=active]:bg-falu/20 data-[state=active]:text-falu-light">
          <Briefcase className="h-4 w-4 mr-2" />
          Careers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="newsletter">
        <NewsletterTab
          subscribers={subscribers}
          loading={loadingNewsletter}
          onRefresh={onRefreshNewsletter}
          deleteItem={deleteItem}
        />
      </TabsContent>

      <TabsContent value="careers">
        <CareersTab
          jobs={jobs}
          loading={loadingCareers}
          onRefresh={onRefreshCareers}
          createItem={createItem}
          updateItem={updateItem}
          deleteItem={deleteItem}
          showToast={showToast}
        />
      </TabsContent>
    </Tabs>
  );
}

function NewsletterTab({
  subscribers,
  loading,
  onRefresh,
  deleteItem,
}: {
  subscribers: NewsletterSubscriber[];
  loading: boolean;
  onRefresh: () => void;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<NewsletterSubscriber | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteItem("/api/newsletter", deleteTarget.id, onRefresh);
    setDeleting(false);
    if (ok) {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Email", "Source", "Date", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscribers.length > 0 ? (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-[family-name:var(--font-inter)]">{sub.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/50">
                        {sub.source || "website"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/40 font-[family-name:var(--font-inter)]">
                      {formatDate(sub.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDeleteTarget(sub);
                          setDeleteOpen(true);
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <EmptyState icon={Mail} title="No subscribers" description="Newsletter signups will appear here" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        itemName={deleteTarget?.email || ""}
        loading={deleting}
      />
    </div>
  );
}

function CareersTab({
  jobs,
  loading,
  onRefresh,
  createItem,
  updateItem,
  deleteItem,
  showToast,
}: {
  jobs: JobOpening[];
  loading: boolean;
  onRefresh: () => void;
  createItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<JobOpening | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const emptyForm = {
    title: "",
    slug: "",
    department: "",
    location: "",
    type: "full-time",
    description: "",
    requirements: "",
    salary: "",
    published: false,
    deadline: "",
  };
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setEditingJob(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (job: JobOpening) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      slug: job.slug,
      department: job.department || "",
      location: job.location || "",
      type: job.type || "full-time",
      description: job.description || "",
      requirements: job.requirements || "",
      salary: job.salary || "",
      published: job.published,
      deadline: job.deadline ? job.deadline.split("T")[0] : "",
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      showToast("Title and slug are required", "error");
      return;
    }
    setSaving(true);
    const data: Record<string, unknown> = {
      title: form.title,
      slug: form.slug,
      department: form.department || null,
      location: form.location || null,
      type: form.type,
      description: form.description || null,
      requirements: form.requirements || null,
      salary: form.salary || null,
      published: form.published,
      deadline: form.deadline || null,
    };
    if (editingJob) {
      data.id = editingJob.id;
      await updateItem("/api/careers", data, onRefresh);
    } else {
      await createItem("/api/careers", data, onRefresh);
    }
    setSaving(false);
    setFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteItem("/api/careers", deleteTarget.id, onRefresh);
    setDeleting(false);
    if (ok) {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {jobs.length} job{jobs.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          onClick={openCreate}
          className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Job
        </Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Job Title", "Department", "Location", "Type", "Applications", "Published", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold font-[family-name:var(--font-inter)]">{job.title}</div>
                      <div className="text-xs text-silver/30 font-[family-name:var(--font-inter)]">{job.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/60 font-[family-name:var(--font-inter)]">
                      {job.department || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/60 font-[family-name:var(--font-inter)]">
                      {job.location || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/50">
                        {job.type || "—"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-[family-name:var(--font-inter)]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-falu/10 text-falu-light text-xs font-semibold">
                        {job._count?.applications || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={job.published ? "default" : "outline"}
                        className={`text-xs font-[family-name:var(--font-inter)] ${
                          job.published ? "bg-green-500/20 text-green-400 border-0" : "border-white/10 text-silver/40"
                        }`}
                      >
                        {job.published ? "Active" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(job)}
                          className="text-silver/60 hover:text-white hover:bg-white/5 h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteTarget(job);
                            setDeleteOpen(true);
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <EmptyState icon={Briefcase} title="No job openings" description="Create your first job opening" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Form */}
      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingJob ? "Edit Job Opening" : "Add Job Opening"}
        onSubmit={handleSave}
        loading={saving}
        maxWidth="sm:max-w-2xl"
      >
        <FormField label="Job Title" required>
          <FormInput
            value={form.title}
            onChange={(v) => setForm((f) => ({ ...f, title: v, slug: f.slug || generateSlug(v) }))}
            placeholder="e.g. Senior Software Engineer"
            required
          />
        </FormField>
        <FormField label="Slug" required>
          <FormInput value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} placeholder="job-url-slug" required />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Department">
            <FormInput value={form.department} onChange={(v) => setForm((f) => ({ ...f, department: v }))} placeholder="Engineering" />
          </FormField>
          <FormField label="Location">
            <FormInput value={form.location} onChange={(v) => setForm((f) => ({ ...f, location: v }))} placeholder="Accra, Ghana" />
          </FormField>
          <FormField label="Employment Type">
            <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
              <SelectTrigger className="w-full bg-white/5 border-white/10 font-[family-name:var(--font-inter)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <FormField label="Description">
          <FormTextarea value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Job description..." rows={4} />
        </FormField>
        <FormField label="Requirements">
          <FormTextarea value={form.requirements} onChange={(v) => setForm((f) => ({ ...f, requirements: v }))} placeholder="Job requirements..." rows={3} />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Salary Range">
            <FormInput value={form.salary} onChange={(v) => setForm((f) => ({ ...f, salary: v }))} placeholder="e.g. GHS 5,000 - 8,000" />
          </FormField>
          <FormField label="Application Deadline">
            <Input
              type="date"
              value={form.deadline}
              onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
              className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] focus:border-falu/40"
            />
          </FormField>
        </div>
        <FormSwitch checked={form.published} onChange={(v) => setForm((f) => ({ ...f, published: v }))} label="Published" />
      </FormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title || ""}
        loading={deleting}
      />
    </div>
  );
}

// ─── 8. Settings View ───────────────────────────────────────────────────────────

function SettingsView({
  settings,
  loading,
  onRefresh,
  updateItem,
  showToast,
}: {
  settings: SiteSetting[];
  loading: boolean;
  onRefresh: () => void;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const commonSettings = [
    "site_name",
    "site_description",
    "contact_email",
    "contact_phone",
    "whatsapp_number",
    "address",
    "social_links",
  ];

  const openEditor = (setting: SiteSetting) => {
    setEditKey(setting.key);
    setEditValue(setting.value);
  };

  const handleSave = async () => {
    if (!editKey) return;
    setSaving(true);
    await updateItem("/api/settings", { key: editKey, value: editValue }, onRefresh);
    setSaving(false);
    setEditKey(null);
  };

  const handleAdd = async () => {
    if (!newKey || !newValue) {
      showToast("Key and value are required", "error");
      return;
    }
    setSaving(true);
    await updateItem("/api/settings", { key: newKey, value: newValue }, onRefresh);
    setSaving(false);
    setAddOpen(false);
    setNewKey("");
    setNewValue("");
  };

  if (loading) return <LoadingSpinner />;

  const existingKeys = new Set(settings.map((s) => s.key));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {settings.length} setting{settings.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          onClick={() => setAddOpen(true)}
          className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Setting
        </Button>
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {settings.length > 0 ? (
          settings.map((setting) => (
            <div key={setting.id} className="glass-card rounded-xl p-4 sm:p-6">
              {editKey === setting.key ? (
                <div className="space-y-3">
                  <div className="text-sm font-semibold font-[family-name:var(--font-inter)] text-falu-light">
                    {setting.key}
                  </div>
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows={3}
                    className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] placeholder:text-silver/30 focus:border-falu/40 resize-none"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      size="sm"
                      className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
                    >
                      {saving ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <CheckCircle className="h-3 w-3 mr-1" />}
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditKey(null)}
                      className="font-[family-name:var(--font-inter)] text-silver/50"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold font-[family-name:var(--font-inter)] text-falu-light mb-1">
                      {setting.key}
                    </div>
                    <div className="text-sm text-silver/70 font-[family-name:var(--font-inter)] break-all">
                      {setting.value.length > 200 ? setting.value.slice(0, 200) + "..." : setting.value}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditor(setting)}
                    className="text-silver/60 hover:text-white hover:bg-white/5 shrink-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <EmptyState icon={Settings} title="No settings" description="Add your first site setting" />
        )}
      </div>

      {/* Quick-add common settings */}
      {settings.length === 0 && (
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-4">Common Settings</h3>
          <p className="text-sm text-silver/50 font-[family-name:var(--font-inter)] mb-4">
            Click any setting below to quickly add it:
          </p>
          <div className="flex flex-wrap gap-2">
            {commonSettings.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setNewKey(key);
                  setNewValue("");
                  setAddOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-silver/60 font-[family-name:var(--font-inter)] hover:bg-white/10 hover:text-white transition-colors"
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add Setting Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-poppins)]">Add Setting</DialogTitle>
            <DialogDescription className="font-[family-name:var(--font-inter)] text-silver/50">
              Create or update a site setting.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <FormField label="Key">
              <FormInput value={newKey} onChange={(v) => setNewKey(v)} placeholder="e.g. site_name" />
            </FormField>
            <FormField label="Value">
              <FormTextarea value={newValue} onChange={(v) => setNewValue(v)} placeholder="Setting value..." rows={3} />
            </FormField>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddOpen(false)}
              className="font-[family-name:var(--font-inter)] border-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={saving}
              className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Setting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
