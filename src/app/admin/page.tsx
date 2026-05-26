"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Mail,
  MessageSquare,
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
  Globe,
  Database,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ──────────────────────────────────────────────────────────────────────

interface DashboardStats {
  contacts: { total: number; new: number; thisMonth: number };
  blog: { total: number; published: number; draft: number };
  projects: { total: number; published: number; featured: number };
  team: { total: number };
  newsletter: { total: number; thisMonth: number };
  careers: { openings: number; applications: number };
}

interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  service?: string;
  status: string;
  createdAt: string;
}

// ─── Sidebar Navigation ────────────────────────────────────────────────────────

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: MessageSquare, label: "Contacts", id: "contacts" },
  { icon: FileText, label: "Blog Posts", id: "blog" },
  { icon: Briefcase, label: "Projects", id: "projects" },
  { icon: Users, label: "Team", id: "team" },
  { icon: Mail, label: "Newsletter", id: "newsletter" },
  { icon: BarChart3, label: "Careers", id: "careers" },
  { icon: Settings, label: "Settings", id: "settings" },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiHealth, setApiHealth] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch API health
        const healthRes = await fetch("/api");
        const healthData = await healthRes.json();
        setApiHealth(healthData.services || {});

        // Fetch contacts
        const contactsRes = await fetch("/api/contacts");
        const contactsData = await contactsRes.json();
        setContacts(contactsData.data || []);

        // Build stats from available data
        setStats({
          contacts: {
            total: contactsData.data?.length || 0,
            new: contactsData.data?.filter((c: ContactItem) => c.status === "new").length || 0,
            thisMonth: 0,
          },
          blog: { total: 0, published: 0, draft: 0 },
          projects: { total: 0, published: 0, featured: 0 },
          team: { total: 3 },
          newsletter: { total: 0, thisMonth: 0 },
          careers: { openings: 0, applications: 0 },
        });
      } catch {
        // API not available yet
        setStats({
          contacts: { total: 0, new: 0, thisMonth: 0 },
          blog: { total: 0, published: 0, draft: 0 },
          projects: { total: 0, published: 0, featured: 0 },
          team: { total: 3 },
          newsletter: { total: 0, thisMonth: 0 },
          careers: { openings: 0, applications: 0 },
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const statCards = stats
    ? [
        {
          label: "New Contacts",
          value: stats.contacts.new,
          total: stats.contacts.total,
          icon: MessageSquare,
          color: "#7B1818",
          trend: "+12%",
        },
        {
          label: "Blog Posts",
          value: stats.blog.published,
          total: stats.blog.total,
          icon: FileText,
          color: "#3FCF8E",
          trend: "Published",
        },
        {
          label: "Projects",
          value: stats.projects.published,
          total: stats.projects.total,
          icon: Briefcase,
          color: "#4945FF",
          trend: `${stats.projects.featured} featured`,
        },
        {
          label: "Subscribers",
          value: stats.newsletter.total,
          total: stats.newsletter.total,
          icon: Mail,
          color: "#FFCA28",
          trend: `${stats.newsletter.thisMonth} this month`,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Clipe233" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <h1 className="font-bold font-[family-name:var(--font-poppins)] text-sm">
                Clipe233
              </h1>
              <span className="text-xs text-silver/50 font-[family-name:var(--font-inter)]">
                Admin CMS
              </span>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
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
            <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-inter)]">
              <Database className={`h-3 w-3 ${apiHealth?.database === "connected" ? "text-green-400" : "text-yellow-400"}`} />
              <span className="text-silver/60">Database</span>
              <span className={`ml-auto ${apiHealth?.database === "connected" ? "text-green-400" : "text-yellow-400"}`}>
                {apiHealth?.database === "connected" ? "Online" : "Local"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-inter)]">
              <Server className={`h-3 w-3 ${apiHealth?.supabase === "configured" ? "text-green-400" : "text-silver/30"}`} />
              <span className="text-silver/60">Supabase</span>
              <span className={`ml-auto ${apiHealth?.supabase === "configured" ? "text-green-400" : "text-silver/30"}`}>
                {apiHealth?.supabase === "configured" ? "Active" : "Setup"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-inter)]">
              <Globe className={`h-3 w-3 ${apiHealth?.strapi === "configured" ? "text-green-400" : "text-silver/30"}`} />
              <span className="text-silver/60">Strapi CMS</span>
              <span className={`ml-auto ${apiHealth?.strapi === "configured" ? "text-green-400" : "text-silver/30"}`}>
                {apiHealth?.strapi === "configured" ? "Active" : "Setup"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-[family-name:var(--font-poppins)] capitalize">
                {activeSection}
              </h2>
              <p className="text-sm text-silver/50 font-[family-name:var(--font-inter)]">
                Manage your website content and data
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Bell className="h-5 w-5 text-silver/60" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-falu-light" />
              </button>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
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
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-falu-light border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activeSection === "dashboard" ? (
            <DashboardView stats={stats} statCards={statCards} contacts={contacts} />
          ) : activeSection === "contacts" ? (
            <ContactsView contacts={contacts} />
          ) : (
            <ComingSoonView section={activeSection} />
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Dashboard View ────────────────────────────────────────────────────────────

function DashboardView({
  stats,
  statCards,
  contacts,
}: {
  stats: DashboardStats | null;
  statCards: { label: string; value: number; total: number; icon: typeof MessageSquare; color: string; trend: string }[];
  contacts: ContactItem[];
}) {
  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
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
          </motion.div>
        ))}
      </div>

      {/* Recent Contacts & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Contacts */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold font-[family-name:var(--font-poppins)]">
              Recent Contacts
            </h3>
            <Button variant="ghost" size="sm" className="text-falu-light hover:text-white text-xs font-[family-name:var(--font-inter)]">
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          {contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.slice(0, 5).map((contact, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-falu/20 flex items-center justify-center text-sm font-bold text-falu-light">
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
            <div className="text-center py-12 text-silver/40 font-[family-name:var(--font-inter)]">
              <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No contacts yet</p>
              <p className="text-xs mt-1">Contact form submissions will appear here</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { icon: FileText, label: "New Blog Post", color: "#3FCF8E" },
              { icon: Briefcase, label: "Add Project", color: "#4945FF" },
              { icon: Users, label: "Add Team Member", color: "#61DAFB" },
              { icon: Mail, label: "Send Newsletter", color: "#FFCA28" },
            ].map((action, i) => (
              <button
                key={i}
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

      {/* API Architecture Overview */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-bold font-[family-name:var(--font-poppins)] mb-6">
          Backend Architecture
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Z.ai", role: "Frontend", desc: "AI-powered UI framework", color: "#7B1818", icon: Globe },
            { name: "Supabase", role: "Backend", desc: "Auth, DB, Realtime, Edge", color: "#3FCF8E", icon: Database },
            { name: "Strapi", role: "CMS", desc: "Headless content management", color: "#4945FF", icon: FileText },
            { name: "Vercel", role: "Hosting", desc: "Edge deployment & CDN", color: "#FFFFFF", icon: Server },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold font-[family-name:var(--font-poppins)]">
                    {item.name}
                  </div>
                  <div className="text-xs font-[family-name:var(--font-inter)]" style={{ color: item.color }}>
                    {item.role}
                  </div>
                </div>
              </div>
              <p className="text-xs text-silver/40 font-[family-name:var(--font-inter)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Contacts View ──────────────────────────────────────────────────────────────

function ContactsView({ contacts }: { contacts: ContactItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver/40" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-[family-name:var(--font-inter)] text-white placeholder:text-silver/30 focus:outline-none focus:border-falu/40 transition-colors"
          />
        </div>
        <Button className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]">
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Contacts Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                Contact
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                Service
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-silver/40 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((contact, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-falu/20 flex items-center justify-center text-xs font-bold text-falu-light">
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
                  <td className="px-6 py-4">
                    <StatusBadge status={contact.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-silver/40 font-[family-name:var(--font-inter)]">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-silver/40 font-[family-name:var(--font-inter)]">
                  <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No contacts found</p>
                  <p className="text-xs mt-1">
                    {searchQuery ? "Try a different search" : "Contact submissions will appear here"}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Coming Soon View ──────────────────────────────────────────────────────────

function ComingSoonView({ section }: { section: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-falu/10 flex items-center justify-center mb-6">
        <Eye className="h-10 w-10 text-falu-light" />
      </div>
      <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] mb-3 capitalize">
        {section} Management
      </h3>
      <p className="text-silver/50 font-[family-name:var(--font-inter)] max-w-md mb-8">
        This section is being built. Configure Supabase and Strapi to enable full
        content management capabilities for {section}.
      </p>
      <div className="flex gap-4">
        <Button className="bg-falu hover:bg-falu-light text-white font-[family-name:var(--font-inter)]">
          Setup Supabase
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="border-falu/40 text-falu-light hover:bg-falu/10 font-[family-name:var(--font-inter)]"
        >
          Setup Strapi
        </Button>
      </div>
    </div>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
    new: { icon: AlertCircle, color: "text-blue-400", label: "New" },
    contacted: { icon: Clock, color: "text-yellow-400", label: "Contacted" },
    qualified: { icon: Eye, color: "text-green-400", label: "Qualified" },
    closed: { icon: CheckCircle, color: "text-silver/40", label: "Closed" },
  };

  const { icon: Icon, color, label } = config[status] || config.new;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-[family-name:var(--font-inter)] ${color} bg-white/5`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
