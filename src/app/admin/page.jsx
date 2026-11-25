
"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import AdminRoute from "@/components/auth/AdminRoute";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Layers3,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Plus,
  Shirt,
  TrendingUp,
  CircleDollarSign,
  ShoppingBag,
  UserRound,
  Clock3,
  CheckCircle2,
  Truck,
  AlertCircle,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Products",
    icon: Package,
  },
  {
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    icon: Users,
  },
  {
    label: "Categories",
    icon: Layers3,
  },
];

const secondaryNavigation = [
  {
    label: "Settings",
    icon: Settings,
  },
];

const stats = [
  {
    title: "Total Revenue",
    value: "৳ 84,250",
    change: "+12.8%",
    positive: true,
    icon: CircleDollarSign,
    description: "vs. last month",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    icon: ShoppingBag,
    description: "vs. last month",
  },
  {
    title: "Total Customers",
    value: "892",
    change: "+6.4%",
    positive: true,
    icon: UserRound,
    description: "vs. last month",
  },
  {
    title: "Total Products",
    value: "156",
    change: "-2.1%",
    positive: false,
    icon: Package,
    description: "vs. last month",
  },
];

const orders = [
  {
    id: "#VO-1048",
    customer: "Arif Rahman",
    email: "arif.rahman@gmail.com",
    date: "Nov 25, 2026",
    amount: "৳ 3,450",
    status: "Delivered",
  },
  {
    id: "#VO-1047",
    customer: "Tanvir Ahmed",
    email: "tanvir.ahmed@gmail.com",
    date: "Nov 25, 2026",
    amount: "৳ 2,890",
    status: "Processing",
  },
  {
    id: "#VO-1046",
    customer: "Nafis Hasan",
    email: "nafis.hasan@gmail.com",
    date: "Nov 24, 2026",
    amount: "৳ 5,200",
    status: "Shipped",
  },
  {
    id: "#VO-1045",
    customer: "Sakib Chowdhury",
    email: "sakib.c@gmail.com",
    date: "Nov 24, 2026",
    amount: "৳ 1,750",
    status: "Pending",
  },
  {
    id: "#VO-1044",
    customer: "Mahmud Karim",
    email: "mahmud.k@gmail.com",
    date: "Nov 23, 2026",
    amount: "৳ 4,600",
    status: "Delivered",
  },
];

const products = [
  {
    name: "Classic Oxford Shirt",
    category: "Shirts",
    sold: 124,
    revenue: "৳ 37,200",
    color: "bg-[#E9E3D8]",
    iconColor: "text-[#8B7355]",
  },
  {
    name: "Premium Slim Fit Trousers",
    category: "Trousers",
    sold: 98,
    revenue: "৳ 42,140",
    color: "bg-[#E2E4E0]",
    iconColor: "text-[#687268]",
  },
  {
    name: "Essential Cotton T-Shirt",
    category: "T-Shirts",
    sold: 86,
    revenue: "৳ 17,200",
    color: "bg-[#E8E6E1]",
    iconColor: "text-[#77746D]",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Delivered: "bg-green-50 text-green-700",
    Processing: "bg-blue-50 text-blue-700",
    Shipped: "bg-purple-50 text-purple-700",
    Pending: "bg-amber-50 text-amber-700",
  };

  const icons = {
    Delivered: CheckCircle2,
    Processing: Clock3,
    Shipped: Truck,
    Pending: AlertCircle,
  };

  const StatusIcon = icons[status] || AlertCircle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      <StatusIcon size={13} />
      {status}
    </span>
  );
}

function Sidebar({ mobileOpen, setMobileOpen, activePage, setActivePage }) {
  const { data: session } = useSession();

  const adminName = session?.user?.name || "Administrator";
  const adminEmail = session?.user?.email || "Admin account";

  function handleNavigation(label) {
    setActivePage(label);
    setMobileOpen(false);
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-[#EAE8E3] bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[78px] items-center justify-between border-b border-[#EAE8E3] px-6">
          <div>
            <h1 className="text-[22px] font-bold tracking-[0.22em] text-[#171717]">
              VELOR
            </h1>
            <p className="mt-0.5 text-[9px] font-medium tracking-[0.3em] text-[#A18B69]">
              OUTFITS · ADMIN
            </p>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                    isActive
                      ? "bg-[#1C1C1C] font-medium text-white shadow-sm"
                      : "text-gray-600 hover:bg-[#F5F4F1] hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>

                  {item.label === "Orders" && (
                    <span className="ml-auto rounded-md bg-[#F0E7D9] px-1.5 py-0.5 text-[10px] font-semibold text-[#8C7048]">
                      12
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            Preferences
          </p>

          <nav className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                    isActive
                      ? "bg-[#1C1C1C] font-medium text-white"
                      : "text-gray-600 hover:bg-[#F5F4F1]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Store card */}
          <div className="mt-8 rounded-2xl bg-[#F6F5F2] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white">
              <Shirt size={17} className="text-[#9B805E]" />
            </div>

            <p className="text-xs font-semibold text-gray-900">
              VELOR Online Store
            </p>

            <p className="mt-1 text-[11px] leading-5 text-gray-500">
              Manage your fashion store from one place.
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Store is active
            </div>
          </div>
        </div>

        {/* Admin profile */}
        <div className="border-t border-[#EAE8E3] p-4">
          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9E2D7] text-sm font-semibold text-[#806A4B]">
              {adminName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {adminName}
              </p>
              <p className="truncate text-[11px] text-gray-500">
                {adminEmail}
              </p>
            </div>

            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </aside>
    </>
  );
}

function RevenueChart() {
  const chartPoints =
    "0,160 45,135 90,148 135,105 180,118 225,80 270,92 315,50 360,67 405,35 450,58 495,22";

  return (
    <div className="mt-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Revenue Overview
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Sales performance over the last 12 months
          </p>
        </div>

        <select className="rounded-lg border border-[#EAE8E3] bg-white px-3 py-2 text-xs text-gray-600 outline-none">
          <option>Last 12 months</option>
          <option>Last 30 days</option>
          <option>Last 7 days</option>
        </select>
      </div>

      <div className="relative h-[220px] w-full overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className="w-full border-t border-dashed border-[#EAE8E3]"
            />
          ))}
        </div>

        <svg
          viewBox="0 0 500 190"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B69A70" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#B69A70" stopOpacity="0" />
            </linearGradient>
          </defs>

          <polygon
            points={`0,190 ${chartPoints} 495,190`}
            fill="url(#revenueFill)"
          />

          <polyline
            points={chartPoints}
            fill="none"
            stroke="#A68A61"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          <circle
            cx="495"
            cy="22"
            r="5"
            fill="#A68A61"
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-gray-400 sm:text-xs">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
          (month) => (
            <span key={month}>{month}</span>
          )
        )}
      </div>
    </div>
  );
}

function DashboardContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const { data: session } = useSession();

  const adminName = session?.user?.name || "Admin";

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    return (
      order.id.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.email.toLowerCase().includes(searchText)
    );
  });

  function handleComingSoon(label) {
    setNotice(`${label} management will be available in the next development phase.`);
    setTimeout(() => setNotice(""), 3500);
  }

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#202020]">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        activePage={activePage}
        setActivePage={(label) => {
          setActivePage(label);

          if (label !== "Overview") {
            handleComingSoon(label);
          }
        }}
      />

      {/* Main area */}
      <div className="min-h-screen lg:pl-[260px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-[#EAE8E3] bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-[#EAE8E3] p-2 text-gray-700 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#A18B69]">
                VELOR ADMIN
              </p>
              <h1 className="mt-0.5 text-base font-semibold text-gray-900 sm:text-lg">
                Overview
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="hidden h-10 w-[220px] items-center gap-2 rounded-xl border border-[#EAE8E3] bg-[#FAFAF9] px-3 md:flex lg:w-[280px]">
              <Search size={16} className="text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders..."
                className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
              />

              <span className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] text-gray-400">
                /
              </span>
            </div>

            {/* Notification */}
            <button
              onClick={() =>
                setNotice("You are all caught up with notifications.")
              }
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#EAE8E3] bg-white text-gray-600 hover:bg-gray-50"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#B69A70]" />
            </button>

            {/* Admin avatar */}
            <div className="hidden items-center gap-2.5 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9E2D7] text-sm font-semibold text-[#806A4B]">
                {adminName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden xl:block">
                <p className="text-xs font-semibold text-gray-900">
                  {adminName}
                </p>
                <p className="text-[10px] text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard body */}
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {/* Welcome */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Welcome back, {adminName.split(" ")[0]} 👋
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Here&apos;s what&apos;s happening with your store today.
              </p>
            </div>

            <button
              onClick={() => handleComingSoon("Add Product")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C1C1C] px-4 py-3 text-xs font-medium text-white transition hover:bg-[#333333]"
            >
              <Plus size={16} />
              Add New Product
            </button>
          </div>

          {/* Notice */}
          {notice && (
            <div className="mb-5 rounded-xl border border-[#E8DDC9] bg-[#FBF7F0] px-4 py-3 text-xs text-[#8C7048]">
              {notice}
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-[#EAE8E3] bg-white p-5 transition hover:shadow-sm sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6F5F2]">
                      <Icon size={17} className="text-[#9B805E]" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
                    {stat.value}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        stat.positive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {stat.positive ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownRight size={14} />
                      )}
                      {stat.change}
                    </span>

                    <span className="text-[10px] text-gray-400">
                      {stat.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Analytics and order summary */}
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
            {/* Revenue chart */}
            <div className="rounded-2xl border border-[#EAE8E3] bg-white p-5 sm:p-6 xl:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Total Revenue
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    ৳ 84,250
                  </h3>
                  <p className="mt-1 text-xs text-green-600">
                    +12.8% compared to last year
                  </p>
                </div>

                <button className="rounded-lg border border-[#EAE8E3] p-2 text-gray-500 hover:bg-gray-50">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <RevenueChart />
            </div>

            {/* Orders summary */}
            <div className="rounded-2xl border border-[#EAE8E3] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Orders Overview
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    1,284
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F5F2]">
                  <TrendingUp size={18} className="text-[#9B805E]" />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {[
                  {
                    label: "Delivered",
                    value: 72,
                    color: "bg-green-500",
                    count: "924",
                  },
                  {
                    label: "Processing",
                    value: 16,
                    color: "bg-blue-500",
                    count: "205",
                  },
                  {
                    label: "Pending",
                    value: 8,
                    color: "bg-amber-400",
                    count: "103",
                  },
                  {
                    label: "Cancelled",
                    value: 4,
                    color: "bg-red-400",
                    count: "52",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${item.color}`}
                        />
                        <span className="text-xs text-gray-600">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-xs font-medium text-gray-900">
                        {item.count}
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F1F0ED]">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleComingSoon("Order management")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#EAE8E3] py-3 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
              >
                View All Orders
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Recent orders + best sellers */}
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
            {/* Recent Orders */}
            <div className="overflow-hidden rounded-2xl border border-[#EAE8E3] bg-white xl:col-span-2">
              <div className="flex items-center justify-between border-b border-[#EAE8E3] p-5 sm:p-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Recent Orders
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Latest customer orders
                  </p>
                </div>

                <button
                  onClick={() => handleComingSoon("Order management")}
                  className="flex items-center gap-1 text-xs font-medium text-[#9B805E] hover:text-[#806A4B]"
                >
                  View all
                  <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead>
                    <tr className="bg-[#FAFAF9] text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="px-5 py-3 font-medium">Order</th>
                      <th className="px-5 py-3 font-medium">Customer</th>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Amount</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-t border-[#F0EFEC] transition hover:bg-[#FAFAF9]"
                      >
                        <td className="px-5 py-4 text-xs font-semibold text-gray-900">
                          {order.id}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-xs font-medium text-gray-800">
                            {order.customer}
                          </p>
                          <p className="mt-1 text-[10px] text-gray-400">
                            {order.email}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-xs text-gray-500">
                          {order.date}
                        </td>

                        <td className="px-5 py-4 text-xs font-semibold text-gray-900">
                          {order.amount}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={order.status} />
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() => handleComingSoon("Order details")}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            aria-label="View order"
                          >
                            <Eye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredOrders.length === 0 && (
                  <div className="p-8 text-center text-sm text-gray-500">
                    No orders found for &quot;{search}&quot;.
                  </div>
                )}
              </div>
            </div>

            {/* Top selling products */}
            <div className="rounded-2xl border border-[#EAE8E3] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Top Selling Products
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Best performing items
                  </p>
                </div>

                <button
                  onClick={() => handleComingSoon("Product management")}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-50"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                {products.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${product.color}`}
                    >
                      <Shirt
                        size={20}
                        className={product.iconColor}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-gray-900">
                        {product.name}
                      </p>

                      <p className="mt-1 text-[10px] text-gray-400">
                        {product.category} · {product.sold} sold
                      </p>

                      <p className="mt-1 text-xs font-medium text-gray-700">
                        {product.revenue}
                      </p>
                    </div>

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F6F5F2] text-[10px] font-semibold text-gray-500">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleComingSoon("Product management")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#EAE8E3] py-3 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
              >
                View All Products
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 border-t border-[#EAE8E3] py-5">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <p className="text-[10px] text-gray-400">
                © 2026 VELOR OUTFITS. Admin Dashboard.
              </p>

              <p className="text-[10px] text-gray-400">
                Crafted for modern fashion.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminRoute>
      <DashboardContent />
    </AdminRoute>
  );
}
