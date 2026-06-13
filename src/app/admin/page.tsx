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
  MessageSquare,
  Download,
  Upload,
  Activity,
  TrendingUp,
  Filter,
  CheckSquare,
  Square,
  Reply,
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
  { icon: Star, label: "Testimonials", id: "testimonials" },
  { icon: BarChart3, label: "Newsletter & Careers", id: "newsletter-careers" },
  { icon: Activity, label: "Analytics", id: "analytics" },
  { icon: Globe, label: "Pages", id: "pages" },
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

        const [contactsRes, blogRes, projectsRes, teamRes, servicesRes, newsletterRes, careersRes, testimonialsRes, settingsRes] =
          await Promise.all([
            fetch("/api/contacts"),
            fetch("/api/blog?admin=true"),
            fetch("/api/projects?admin=true"),
            fetch("/api/team?admin=true"),
            fetch("/api/services?admin=true"),
            fetch("/api/newsletter"),
            fetch("/api/careers?admin=true"),
            fetch("/api/testimonials?admin=true"),
            fetch("/api/settings"),
          ]);

        const [contactsData, blogData, projectsData, teamData, servicesData, newsletterData, careersData, testimonialsData, settingsData] =
          await Promise.all([
            contactsRes.json(),
            blogRes.json(),
            projectsRes.json(),
            teamRes.json(),
            servicesRes.json(),
            newsletterRes.json(),
            careersRes.json(),
            testimonialsRes.json(),
            settingsRes.json(),
          ]);

        setContacts(contactsData.data || []);
        setBlogPosts(blogData.data || []);
        setProjects(projectsData.data || []);
        setTeamMembers(teamData.data || []);
        setServices(servicesData.data || []);
        setSubscribers(newsletterData.data || []);
        setJobs(careersData.data || []);
        setTestimonials(testimonialsData.data || []);
        setSettings(settingsData.data || []);
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
      testimonials: () => fetchData("/api/testimonials?admin=true", setTestimonials, "testimonials"),
      "newsletter-careers": () => {
        fetchData("/api/newsletter", setSubscribers, "newsletter");
        fetchData("/api/careers?admin=true", setJobs, "careers");
      },
      analytics: () => {
        fetchData("/api/contacts", setContacts, "analytics-contacts");
        fetchData("/api/settings", setSettings, "analytics-settings");
      },
      pages: () => fetchData("/api/settings", setSettings, "pages"),
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
    testimonials: "Testimonials",
    "newsletter-careers": "Newsletter & Careers",
    analytics: "Analytics",
    pages: "Pages / Content Editor",
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
              testimonials={testimonials}
              apiHealth={apiHealth}
              settings={settings}
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
          ) : activeSection === "testimonials" ? (
            <TestimonialsView
              testimonials={testimonials}
              loading={!!loading.testimonials}
              onRefresh={() => fetchData("/api/testimonials?admin=true", setTestimonials, "testimonials")}
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
          ) : activeSection === "analytics" ? (
            <AnalyticsView
              contacts={contacts}
              blogPosts={blogPosts}
              services={services}
              subscribers={subscribers}
              settings={settings}
            />
          ) : activeSection === "pages" ? (
            <PagesView
              settings={settings}
              loading={!!loading.pages}
              onRefresh={() => fetchData("/api/settings", setSettings, "pages")}
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
  testimonials,
  apiHealth,
  settings,
  onNavigate,
}: {
  contacts: ContactItem[];
  blogPosts: BlogPost[];
  projects: Project[];
  teamMembers: TeamMember[];
  services: ServiceItem[];
  subscribers: NewsletterSubscriber[];
  jobs: JobOpening[];
  testimonials: Testimonial[];
  apiHealth: Record<string, string> | null;
  settings: SiteSetting[];
  onNavigate: (section: string) => void;
}) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  const newContactsWeek = contacts.filter((c) => new Date(c.createdAt) >= oneWeekAgo).length;
  const newContactsMonth = contacts.filter((c) => new Date(c.createdAt) >= oneMonthAgo).length;
  const closedContacts = contacts.filter((c) => c.status === "closed").length;
  const conversionRate = contacts.length > 0 ? Math.round((closedContacts / contacts.length) * 100) : 0;

  // Last 7 days contacts chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const contactsPerDay = last7Days.map((day) => {
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);
    return contacts.filter((c) => {
      const cd = new Date(c.createdAt);
      return cd >= day && cd < nextDay;
    }).length;
  });
  const maxContactsPerDay = Math.max(...contactsPerDay, 1);

  // Contact status breakdown
  const statusBreakdown = [
    { label: "New", count: contacts.filter((c) => c.status === "new").length, color: "bg-blue-400" },
    { label: "Contacted", count: contacts.filter((c) => c.status === "contacted").length, color: "bg-yellow-400" },
    { label: "Qualified", count: contacts.filter((c) => c.status === "qualified").length, color: "bg-green-400" },
    { label: "Closed", count: contacts.filter((c) => c.status === "closed").length, color: "bg-silver/40" },
  ];

  // Top services by inquiries
  const serviceInquiries: Record<string, number> = {};
  contacts.forEach((c) => {
    if (c.service) {
      serviceInquiries[c.service] = (serviceInquiries[c.service] || 0) + 1;
    }
  });
  const topServices = Object.entries(serviceInquiries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const maxServiceCount = topServices.length > 0 ? topServices[0][1] : 1;

  // System health
  const systemHealth = [
    { label: "Database", icon: Database, status: apiHealth?.database === "connected" ? "healthy" : "degraded", ok: apiHealth?.database === "connected" },
    { label: "Email Service", icon: Mail, status: "healthy", ok: true },
    { label: "API Server", icon: Server, status: apiHealth ? "healthy" : "degraded", ok: !!apiHealth },
  ];

  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";

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

      {/* Quick Stats Row */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">{newContactsWeek}</div>
            <div className="text-xs text-silver/50 font-[family-name:var(--font-inter)]">This Week Contacts</div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <Activity className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">{newContactsMonth}</div>
            <div className="text-xs text-silver/50 font-[family-name:var(--font-inter)]">This Month Contacts</div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-falu/20 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-falu-light" />
          </div>
          <div>
            <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">{conversionRate}%</div>
            <div className="text-xs text-silver/50 font-[family-name:var(--font-inter)]">Conversion Rate</div>
          </div>
        </div>
      </div>

      {/* Activity Chart + Status Breakdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Last 7 Days Activity Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">Contact Activity (Last 7 Days)</h3>
          <div className="flex items-end gap-2 h-40">
            {last7Days.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative" style={{ height: "120px" }}>
                  <div
                    className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-falu to-falu-light transition-all duration-500"
                    style={{ height: `${Math.max((contactsPerDay[i] / maxContactsPerDay) * 100, 4)}%` }}
                  />
                </div>
                <span className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-xs font-semibold text-silver/60 font-[family-name:var(--font-inter)]">
                  {contactsPerDay[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Status Breakdown */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">Contact Status</h3>
          <div className="space-y-4">
            {statusBreakdown.map((status) => (
              <div key={status.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-[family-name:var(--font-inter)] text-silver/70">{status.label}</span>
                  <span className="text-sm font-semibold font-[family-name:var(--font-inter)]">{status.count}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${status.color} rounded-full transition-all duration-500`}
                    style={{ width: `${contacts.length > 0 ? (status.count / contacts.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
              { icon: Star, label: "Add Testimonial", section: "testimonials", color: "#FFCA28" },
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

      {/* Recent Blog Posts + System Health + Top Services */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Blog Posts */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold font-[family-name:var(--font-poppins)]">Recent Posts</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("blog")}
              className="text-falu-light hover:text-white text-xs font-[family-name:var(--font-inter)]"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {blogPosts.length > 0 ? (
              blogPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold font-[family-name:var(--font-inter)] truncate">{post.title}</div>
                    <div className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">{formatDate(post.createdAt)}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs font-[family-name:var(--font-inter)] ${
                      post.published ? "bg-green-500/20 text-green-400 border-0" : "border-white/10 text-silver/40"
                    }`}
                  >
                    {post.published ? "Live" : "Draft"}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-silver/40 font-[family-name:var(--font-inter)]">No posts yet</p>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-4">System Health</h3>
          <div className="space-y-4">
            {systemHealth.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  item.ok ? "bg-green-500/20" : "bg-yellow-500/20"
                }`}>
                  <item.icon className={`h-4 w-4 ${item.ok ? "text-green-400" : "text-yellow-400"}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold font-[family-name:var(--font-inter)]">{item.label}</div>
                  <div className="text-xs text-silver/40 font-[family-name:var(--font-inter)] capitalize">{item.status}</div>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  item.ok ? "bg-green-400" : "bg-yellow-400 animate-pulse"
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-4">Top Services by Inquiries</h3>
          <div className="space-y-3">
            {topServices.length > 0 ? (
              topServices.map(([service, count]) => (
                <div key={service}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-[family-name:var(--font-inter)] text-silver/70 truncate">{service}</span>
                    <span className="text-xs font-semibold font-[family-name:var(--font-inter)] text-falu-light">{count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-falu rounded-full"
                      style={{ width: `${(count / maxServiceCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-silver/40 font-[family-name:var(--font-inter)]">No service inquiries yet</p>
            )}
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ContactItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState(false);
  const [bulkStatusValue, setBulkStatusValue] = useState("contacted");

  // Get unique sources
  const sources = [...new Set(contacts.map((c) => c.source).filter(Boolean))];

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchSource = sourceFilter === "all" || c.source === sourceFilter;
    return matchSearch && matchStatus && matchSource;
  });

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

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((c) => c.id)));
    }
  };

  const handleBulkStatusChange = async () => {
    if (selectedIds.size === 0) return;
    setUpdating(true);
    let successCount = 0;
    for (const id of selectedIds) {
      const result = await updateItem("/api/contacts", { id, status: bulkStatusValue }, () => {});
      if (result) successCount++;
    }
    onRefresh();
    setSelectedIds(new Set());
    setBulkStatus(false);
    setUpdating(false);
    showToast(`Updated ${successCount} contact${successCount !== 1 ? "s" : ""}`);
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Subject", "Service", "Budget", "Status", "Source", "Date"];
    const rows = filtered.map((c) => [
      c.name,
      c.email,
      c.phone || "",
      c.company || "",
      c.subject || "",
      c.service || "",
      c.budget || "",
      c.status,
      c.source || "",
      c.createdAt,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Contacts exported successfully!");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-10 text-xs font-[family-name:var(--font-inter)] bg-white/5 border-white/10">
            <Filter className="h-3 w-3 mr-1" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-36 h-10 text-xs font-[family-name:var(--font-inter)] bg-white/5 border-white/10">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {sources.map((source) => (
              <SelectItem key={source} value={source!}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {filtered.length} contact{filtered.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={exportCSV}
          className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60 hover:text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="glass-card rounded-xl p-3 flex items-center gap-4 flex-wrap">
          <span className="text-sm font-[family-name:var(--font-inter)] text-silver/60">
            {selectedIds.size} selected
          </span>
          <Select value={bulkStatusValue} onValueChange={setBulkStatusValue}>
            <SelectTrigger className="w-36 h-8 text-xs font-[family-name:var(--font-inter)] bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            onClick={handleBulkStatusChange}
            disabled={updating}
            className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)] h-8"
          >
            {updating ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
            Apply Status
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedIds(new Set())}
            className="font-[family-name:var(--font-inter)] text-silver/50 h-8"
          >
            Clear Selection
          </Button>
        </div>
      )}

      {/* Contacts Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-4 w-10">
                  <button onClick={toggleSelectAll} className="text-silver/40 hover:text-white transition-colors">
                    {selectedIds.size === filtered.length && filtered.length > 0 ? (
                      <CheckSquare className="h-4 w-4 text-falu-light" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </button>
                </th>
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
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                      selectedIds.has(contact.id) ? "bg-falu/10" : ""
                    }`}
                    onClick={() => {
                      setSelectedContact(contact);
                      setDetailOpen(true);
                    }}
                  >
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => toggleSelect(contact.id)} className="text-silver/40 hover:text-white transition-colors">
                        {selectedIds.has(contact.id) ? (
                          <CheckSquare className="h-4 w-4 text-falu-light" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                    </td>
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
                  <td colSpan={6}>
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
              <Separator className="bg-white/10" />
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || "Your inquiry"}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-falu hover:bg-falu-light text-white text-sm font-[family-name:var(--font-inter)] transition-colors"
                >
                  <Reply className="h-4 w-4" />
                  Reply via Email
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDetailOpen(false);
                    handleStatusChange(selectedContact, "contacted");
                  }}
                  className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60"
                >
                  Mark Contacted
                </Button>
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
  const [activeGroup, setActiveGroup] = useState("site-info");

  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";

  // Grouped settings with friendly labels
  const settingGroups = [
    {
      id: "site-info",
      label: "Site Info",
      icon: Globe,
      fields: [
        { key: "site_name", label: "Site Name", placeholder: "Clipe233" },
        { key: "site_description", label: "Site Description", placeholder: "Technology solutions company" },
        { key: "site_keywords", label: "Site Keywords (SEO)", placeholder: "tech, software, ghana" },
      ],
    },
    {
      id: "contact-info",
      label: "Contact Info",
      icon: Mail,
      fields: [
        { key: "contact_email", label: "Contact Email", placeholder: "info@clipe233.com" },
        { key: "contact_phone", label: "Phone", placeholder: "+233 XX XXX XXXX" },
        { key: "whatsapp_number", label: "WhatsApp Number", placeholder: "+233 XX XXX XXXX" },
        { key: "address", label: "Address", placeholder: "Accra, Ghana" },
      ],
    },
    {
      id: "social-media",
      label: "Social Media",
      icon: ExternalLink,
      fields: [
        { key: "facebook_url", label: "Facebook URL", placeholder: "https://facebook.com/..." },
        { key: "twitter_url", label: "Twitter / X URL", placeholder: "https://twitter.com/..." },
        { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/..." },
        { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/..." },
      ],
    },
    {
      id: "seo",
      label: "SEO & Analytics",
      icon: BarChart3,
      fields: [
        { key: "google_analytics_id", label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX" },
        { key: "google_tag_manager_id", label: "Google Tag Manager ID", placeholder: "GTM-XXXXXXX" },
        { key: "meta_robots", label: "Meta Robots", placeholder: "index, follow" },
      ],
    },
  ];

  const commonSettings = [
    "site_name",
    "site_description",
    "contact_email",
    "contact_phone",
    "whatsapp_number",
    "address",
    "social_links",
  ];

  const openEditor = (key: string) => {
    setEditKey(key);
    setEditValue(getSetting(key));
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

  const handleGroupFieldSave = async (key: string, value: string) => {
    setSaving(true);
    await updateItem("/api/settings", { key, value }, onRefresh);
    setSaving(false);
  };

  const exportSettings = () => {
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `settings-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Settings exported successfully!");
  };

  const importSettings = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (!Array.isArray(data)) throw new Error("Invalid format");
        setSaving(true);
        let count = 0;
        for (const item of data) {
          if (item.key && item.value !== undefined) {
            await updateItem("/api/settings", { key: item.key, value: item.value }, () => {});
            count++;
          }
        }
        onRefresh();
        setSaving(false);
        showToast(`Imported ${count} settings!`);
      } catch (err: any) {
        showToast("Invalid settings file", "error");
      }
    };
    input.click();
  };

  if (loading) return <LoadingSpinner />;

  const existingKeys = new Set(settings.map((s) => s.key));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {settings.length} setting{settings.length !== 1 ? "s" : ""}
        </Badge>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportSettings}
            className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60 hover:text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={importSettings}
            disabled={saving}
            className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60 hover:text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button
            onClick={() => setAddOpen(true)}
            className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Setting
          </Button>
        </div>
      </div>

      {/* Grouped Settings */}
      <div className="space-y-6">
        {settingGroups.map((group) => (
          <div key={group.id} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-falu/20 flex items-center justify-center">
                <group.icon className="h-4 w-4 text-falu-light" />
              </div>
              <h3 className="font-bold font-[family-name:var(--font-poppins)]">{group.label}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {group.fields.map((field) => {
                const currentValue = getSetting(field.key);
                const isEditing = editKey === field.key;
                return (
                  <div key={field.key} className="space-y-1">
                    <Label className="text-xs font-[family-name:var(--font-inter)] text-silver/50">{field.label}</Label>
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          placeholder={field.placeholder}
                          className="bg-white/5 border-white/10 text-white font-[family-name:var(--font-inter)] text-sm placeholder:text-silver/30 focus:border-falu/40"
                        />
                        <Button
                          size="sm"
                          onClick={handleSave}
                          disabled={saving}
                          className="bg-falu hover:bg-falu-light text-white h-8 w-8 p-0 shrink-0"
                        >
                          {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditKey(null)}
                          className="text-silver/50 h-8 w-8 p-0 shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:border-white/10 transition-colors min-h-[38px]"
                        onClick={() => openEditor(field.key)}
                      >
                        <span className="text-sm font-[family-name:var(--font-inter)] text-silver/70 flex-1 truncate">
                          {currentValue || <span className="text-silver/30 italic">Not set</span>}
                        </span>
                        <Pencil className="h-3 w-3 text-silver/30 shrink-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* All Settings List */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-4">All Settings (Raw)</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {settings.length > 0 ? (
            settings.map((setting) => (
              <div key={setting.id} className="flex items-start justify-between gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold font-[family-name:var(--font-inter)] text-falu-light mb-0.5">
                    {setting.key}
                  </div>
                  <div className="text-sm text-silver/70 font-[family-name:var(--font-inter)] break-all">
                    {setting.value.length > 150 ? setting.value.slice(0, 150) + "..." : setting.value}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditor(setting.key)}
                  className="text-silver/60 hover:text-white hover:bg-white/5 shrink-0 h-8 w-8 p-0"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <EmptyState icon={Settings} title="No settings" description="Add your first site setting" />
          )}
        </div>
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

// ─── 9. Testimonials View ───────────────────────────────────────────────────────

function TestimonialsView({
  testimonials,
  loading,
  onRefresh,
  createItem,
  updateItem,
  deleteItem,
  showToast,
}: {
  testimonials: Testimonial[];
  loading: boolean;
  onRefresh: () => void;
  createItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  updateItem: (endpoint: string, data: Record<string, unknown>, onSuccess: () => void) => Promise<any>;
  deleteItem: (endpoint: string, id: string, onSuccess: () => void) => Promise<boolean>;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const emptyForm = {
    name: "",
    title: "",
    company: "",
    avatar: "",
    content: "",
    rating: 5,
    featured: false,
    published: true,
  };
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      title: item.title || "",
      company: item.company || "",
      avatar: item.avatar || "",
      content: item.content,
      rating: item.rating || 5,
      featured: item.featured,
      published: item.published,
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.content) {
      showToast("Name and content are required", "error");
      return;
    }
    setSaving(true);
    const data: Record<string, unknown> = {
      name: form.name,
      title: form.title || null,
      company: form.company || null,
      avatar: form.avatar || null,
      content: form.content,
      rating: form.rating,
      featured: form.featured,
      published: form.published,
    };
    if (editingItem) {
      data.id = editingItem.id;
      await updateItem("/api/testimonials", data, onRefresh);
    } else {
      await createItem("/api/testimonials", data, onRefresh);
    }
    setSaving(false);
    setFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const ok = await deleteItem("/api/testimonials", deleteTarget.id, onRefresh);
    setDeleting(false);
    if (ok) {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  const toggleField = async (item: Testimonial, field: "published" | "featured") => {
    await updateItem("/api/testimonials", { id: item.id, [field]: !item[field] }, onRefresh);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-silver/20"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          onClick={openCreate}
          className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Name", "Rating", "Featured", "Published", "Date", ""].map((h) => (
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
              {testimonials.length > 0 ? (
                testimonials.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-falu/20 flex items-center justify-center text-xs font-bold text-falu-light shrink-0 overflow-hidden">
                          {item.avatar ? (
                            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            item.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold font-[family-name:var(--font-inter)]">{item.name}</div>
                          <div className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">
                            {item.title && item.company ? `${item.title}, ${item.company}` : item.title || item.company || ""}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{renderStars(item.rating || 5)}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleField(item, "featured")}>
                        <Star
                          className={`h-4 w-4 ${
                            item.featured ? "text-yellow-400 fill-yellow-400" : "text-silver/30"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={item.published ? "default" : "outline"}
                        className={`text-xs font-[family-name:var(--font-inter)] ${
                          item.published ? "bg-green-500/20 text-green-400 border-0" : "border-white/10 text-silver/40"
                        }`}
                      >
                        {item.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-silver/40 font-[family-name:var(--font-inter)]">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(item)}
                          className="text-silver/60 hover:text-white hover:bg-white/5 h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteTarget(item);
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
                    <EmptyState icon={Star} title="No testimonials" description="Add your first testimonial" />
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
        title={editingItem ? "Edit Testimonial" : "Add Testimonial"}
        onSubmit={handleSave}
        loading={saving}
        maxWidth="sm:max-w-lg"
      >
        <FormField label="Name" required>
          <FormInput
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            placeholder="Person's name"
            required
          />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Title">
            <FormInput value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="e.g. CEO" />
          </FormField>
          <FormField label="Company">
            <FormInput value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} placeholder="e.g. Acme Inc" />
          </FormField>
        </div>
        <FormField label="Avatar URL">
          <FormInput value={form.avatar} onChange={(v) => setForm((f) => ({ ...f, avatar: v }))} placeholder="https://..." />
        </FormField>
        <FormField label="Content" required>
          <FormTextarea
            value={form.content}
            onChange={(v) => setForm((f) => ({ ...f, content: v }))}
            placeholder="Testimonial text..."
            rows={4}
          />
        </FormField>
        <FormField label="Rating">
          <Select value={String(form.rating)} onValueChange={(v) => setForm((f) => ({ ...f, rating: parseInt(v) }))}>
            <SelectTrigger className="w-full bg-white/5 border-white/10 font-[family-name:var(--font-inter)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">★★★★★ (5)</SelectItem>
              <SelectItem value="4">★★★★☆ (4)</SelectItem>
              <SelectItem value="3">★★★☆☆ (3)</SelectItem>
              <SelectItem value="2">★★☆☆☆ (2)</SelectItem>
              <SelectItem value="1">★☆☆☆☆ (1)</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormSwitch checked={form.featured} onChange={(v) => setForm((f) => ({ ...f, featured: v }))} label="Featured" />
          <FormSwitch checked={form.published} onChange={(v) => setForm((f) => ({ ...f, published: v }))} label="Published" />
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

// ─── 10. Analytics View ──────────────────────────────────────────────────────────

function AnalyticsView({
  contacts,
  blogPosts,
  services,
  subscribers,
  settings,
}: {
  contacts: ContactItem[];
  blogPosts: BlogPost[];
  services: ServiceItem[];
  subscribers: NewsletterSubscriber[];
  settings: SiteSetting[];
}) {
  // Contact conversion funnel
  const funnelData = [
    { label: "New", count: contacts.filter((c) => c.status === "new").length, color: "bg-blue-400" },
    { label: "Contacted", count: contacts.filter((c) => c.status === "contacted").length, color: "bg-yellow-400" },
    { label: "Qualified", count: contacts.filter((c) => c.status === "qualified").length, color: "bg-green-400" },
    { label: "Closed", count: contacts.filter((c) => c.status === "closed").length, color: "bg-falu-light" },
  ];
  const maxFunnelCount = Math.max(...funnelData.map((d) => d.count), 1);

  // Contacts by source
  const sourceBreakdown: Record<string, number> = {};
  contacts.forEach((c) => {
    const source = c.source || "website";
    sourceBreakdown[source] = (sourceBreakdown[source] || 0) + 1;
  });
  const sourceEntries = Object.entries(sourceBreakdown).sort(([, a], [, b]) => b - a);
  const maxSourceCount = sourceEntries.length > 0 ? sourceEntries[0][1] : 1;
  const sourceColors = ["bg-falu-light", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400"];

  // Monthly contacts chart (last 6 months)
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const contactsPerMonth = last6Months.map((month) => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return contacts.filter((c) => {
      const cd = new Date(c.createdAt);
      return cd >= month && cd < nextMonth;
    }).length;
  });
  const maxContactsPerMonth = Math.max(...contactsPerMonth, 1);

  // Recent activity timeline (last 10)
  const recentActivity = [...contacts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)
    .map((c) => ({
      id: c.id,
      type: c.status === "new" ? "new_contact" : "status_change",
      message: c.status === "new" ? `New contact from ${c.name}` : `${c.name} marked as ${c.status}`,
      date: c.createdAt,
      icon: c.status === "new" ? AlertCircle : c.status === "closed" ? CheckCircle : Clock,
      color: c.status === "new" ? "text-blue-400" : c.status === "closed" ? "text-green-400" : c.status === "qualified" ? "text-green-400" : "text-yellow-400",
    }));

  // Page views estimate from contacts + subscribers growth
  const totalContacts = contacts.length;
  const totalSubscribers = subscribers.length;
  const pageViewsEstimate = totalContacts * 15 + totalSubscribers * 8;

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-falu/20 flex items-center justify-center">
              <Eye className="h-4 w-4 text-falu-light" />
            </div>
            <span className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">Est. Page Views</span>
          </div>
          <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">{pageViewsEstimate.toLocaleString()}</div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Mail className="h-4 w-4 text-blue-400" />
            </div>
            <span className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">Total Contacts</span>
          </div>
          <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">{totalContacts}</div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-400" />
            </div>
            <span className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">Conversion Rate</span>
          </div>
          <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            {totalContacts > 0 ? Math.round((funnelData[3].count / totalContacts) * 100) : 0}%
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-yellow-400" />
            </div>
            <span className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">Subscribers</span>
          </div>
          <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">{totalSubscribers}</div>
        </div>
      </div>

      {/* Conversion Funnel + Contacts by Source */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">Contact Conversion Funnel</h3>
          <div className="space-y-4">
            {funnelData.map((step) => (
              <div key={step.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-[family-name:var(--font-inter)] text-silver/70">{step.label}</span>
                  <span className="text-sm font-semibold font-[family-name:var(--font-inter)]">{step.count}</span>
                </div>
                <div className="w-full h-8 bg-white/5 rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${step.color} rounded-lg transition-all duration-700 flex items-center justify-end pr-3`}
                    style={{ width: `${Math.max((step.count / maxFunnelCount) * 100, step.count > 0 ? 8 : 0)}%` }}
                  >
                    {step.count > 0 && (
                      <span className="text-xs font-semibold text-white/80 font-[family-name:var(--font-inter)]">
                        {totalContacts > 0 ? Math.round((step.count / totalContacts) * 100) : 0}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts by Source */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">Contacts by Source</h3>
          {sourceEntries.length > 0 ? (
            <div className="space-y-4">
              {sourceEntries.map(([source, count], i) => (
                <div key={source}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-[family-name:var(--font-inter)] text-silver/70 capitalize">{source}</span>
                    <span className="text-sm font-semibold font-[family-name:var(--font-inter)]">{count}</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${sourceColors[i % sourceColors.length]} rounded-full transition-all duration-500`}
                      style={{ width: `${(count / maxSourceCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-silver/40 font-[family-name:var(--font-inter)]">No contact sources yet</p>
          )}
        </div>
      </div>

      {/* Monthly Contacts Chart + Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Contacts Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">Monthly Contacts (Last 6 Months)</h3>
          <div className="flex items-end gap-3 h-48">
            {last6Months.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold font-[family-name:var(--font-inter)] text-silver/60">
                  {contactsPerMonth[i]}
                </span>
                <div className="w-full relative" style={{ height: "160px" }}>
                  <div
                    className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-falu to-falu-light/60 transition-all duration-700"
                    style={{ height: `${Math.max((contactsPerMonth[i] / maxContactsPerMonth) * 100, 3)}%` }}
                  />
                </div>
                <span className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">
                  {month.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">Recent Activity</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, i) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-white/5 ${activity.color}`}>
                      <activity.icon className="h-3 w-3" />
                    </div>
                    {i < recentActivity.length - 1 && (
                      <div className="w-px h-6 bg-white/10 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-[family-name:var(--font-inter)] text-silver/70 truncate">
                      {activity.message}
                    </div>
                    <div className="text-xs text-silver/30 font-[family-name:var(--font-inter)]">
                      {formatDate(activity.date)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-silver/40 font-[family-name:var(--font-inter)]">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 11. Pages / Content Editor View ─────────────────────────────────────────────

function PagesView({
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
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";

  const pages = [
    { id: "home", label: "Home", path: "/", icon: Globe },
    { id: "about", label: "About", path: "/about", icon: Users },
    { id: "contact", label: "Contact", path: "/contact", icon: Mail },
    { id: "clipe-pos", label: "Clipe POS", path: "/clipe-pos", icon: Briefcase },
    { id: "clipe-medic", label: "Clipe Medic", path: "/clipe-medic", icon: Activity },
    { id: "clipe-pharma", label: "Clipe Pharma", path: "/clipe-pharma", icon: Star },
    { id: "clipe-complaint", label: "Clipe Complaint", path: "/clipe-complaint", icon: MessageSquare },
    { id: "clipe-school", label: "Clipe School", path: "/clipe-school", icon: FileText },
  ];

  const getPageSettings = (pageId: string) => ({
    title: getSetting(`${pageId}_title`),
    description: getSetting(`${pageId}_description`),
    hero_heading: getSetting(`${pageId}_hero_heading`),
    hero_subheading: getSetting(`${pageId}_hero_subheading`),
  });

  const openEditor = (pageId: string) => {
    const pageSettings = getPageSettings(pageId);
    setEditForm({
      title: pageSettings.title,
      description: pageSettings.description,
      hero_heading: pageSettings.hero_heading,
      hero_subheading: pageSettings.hero_subheading,
    });
    setEditingPage(pageId);
  };

  const handleSave = async () => {
    if (!editingPage) return;
    setSaving(true);
    const fields = [
      { key: `${editingPage}_title`, value: editForm.title },
      { key: `${editingPage}_description`, value: editForm.description },
      { key: `${editingPage}_hero_heading`, value: editForm.hero_heading },
      { key: `${editingPage}_hero_subheading`, value: editForm.hero_subheading },
    ];
    for (const field of fields) {
      await updateItem("/api/settings", { key: field.key, value: field.value }, () => {});
    }
    onRefresh();
    setSaving(false);
    setEditingPage(null);
    showToast("Page settings saved!");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Badge variant="outline" className="font-[family-name:var(--font-inter)] border-white/10 text-silver/60">
          {pages.length} pages
        </Badge>
      </div>

      {/* Pages Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {pages.map((page) => {
          const pageSettings = getPageSettings(page.id);
          const hasContent = Object.values(pageSettings).some((v) => v);
          return (
            <div key={page.id} className="glass-card rounded-2xl p-6 hover:border-falu/30 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-falu/20 flex items-center justify-center shrink-0">
                  <page.icon className="h-5 w-5 text-falu-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold font-[family-name:var(--font-poppins)]">{page.label}</div>
                  <div className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">{page.path}</div>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-[family-name:var(--font-inter)] ${
                    hasContent ? "bg-green-500/20 text-green-400 border-0" : "border-white/10 text-silver/40"
                  }`}
                >
                  {hasContent ? "Configured" : "Empty"}
                </Badge>
              </div>
              {pageSettings.title && (
                <p className="text-sm text-silver/60 font-[family-name:var(--font-inter)] truncate mb-1">
                  {pageSettings.title}
                </p>
              )}
              {pageSettings.hero_heading && (
                <p className="text-xs text-silver/40 font-[family-name:var(--font-inter)] truncate mb-3">
                  Hero: {pageSettings.hero_heading}
                </p>
              )}
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditor(page.id)}
                  className="text-falu-light hover:text-white text-xs font-[family-name:var(--font-inter)]"
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <a
                  href={page.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-[family-name:var(--font-inter)] text-silver/40 hover:text-white transition-colors px-2 py-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Preview
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Page Dialog */}
      <FormDialog
        open={!!editingPage}
        onOpenChange={(open) => { if (!open) setEditingPage(null); }}
        title={`Edit ${pages.find((p) => p.id === editingPage)?.label || "Page"} Settings`}
        onSubmit={handleSave}
        loading={saving}
        maxWidth="sm:max-w-lg"
      >
        <FormField label="Page Title">
          <FormInput
            value={editForm.title || ""}
            onChange={(v) => setEditForm((f) => ({ ...f, title: v }))}
            placeholder="Page title for SEO and display"
          />
        </FormField>
        <FormField label="Page Description">
          <FormTextarea
            value={editForm.description || ""}
            onChange={(v) => setEditForm((f) => ({ ...f, description: v }))}
            placeholder="Meta description for SEO..."
            rows={2}
          />
        </FormField>
        <FormField label="Hero Heading">
          <FormInput
            value={editForm.hero_heading || ""}
            onChange={(v) => setEditForm((f) => ({ ...f, hero_heading: v }))}
            placeholder="Main hero section heading"
          />
        </FormField>
        <FormField label="Hero Subheading">
          <FormTextarea
            value={editForm.hero_subheading || ""}
            onChange={(v) => setEditForm((f) => ({ ...f, hero_subheading: v }))}
            placeholder="Hero section subheading or description..."
            rows={3}
          />
        </FormField>
      </FormDialog>
    </div>
  );
}
