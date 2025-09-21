"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconBrandSketch,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,IconBox,IconShoppingCart,IconBrandCouchdb,IconCalendarFilled
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"

const data = {
  user: {
    name: "admin",
    email: "admin@magasin.com",
    avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: IconBrandCouchdb,
    },
    {
      title: "Produits",
      url: "/dashboard/products",
      icon: IconBox,
    },
    {
      title: "Ventes",
      url: "/dashboard/sales",
      icon: IconShoppingCart,
    }
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },

  ],
  documents: [
    {
      name: "Ventes du jour",
      url: "/dashboard/rapports/ventesdujour",
      icon: IconCalendarFilled,
    },
    {
      name: "Ventes de la semaine",
      url: "/dashboard/rapports/ventesdelasemaine",
      icon: IconReport,
    },
    {
      name: "Ventes du mois",
      url: "/dashboard/rapports/ventesdudumois",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const  {data: session} = useSession();
  console.log("session -> ",session?.user);
  if(session){
    data.user.name = session.user.prenom + " " + session.user.nom;
    data.user.email = session.user.email;
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/">
                <IconBrandSketch className="!size-5" />
                <span className="text-base font-semibold">OKOUME MANAGER</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {session?.user && <NavUser user={session.user} />}
        
      </SidebarFooter>
    </Sidebar>
  );
}
