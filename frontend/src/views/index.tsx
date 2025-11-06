import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/index";
import Users from "./Users";
import Projects from "./Projects";
import Allocations from "./Allocations";
import History from "./History";

function ProjectAllocationTracker() {
  const [activeTab, setActiveTab] = useState("users");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full max-w-7xl"
      >
        <div className="mb-6 mt-8 flex justify-center">
          <TabsList className="flex space-x-4 bg-white shadow-sm p-4">
            <TabsTrigger
              value="users"
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all text-gray-700 hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Users
            </TabsTrigger>

            <TabsTrigger
              value="projects"
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all text-gray-700 hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Projects
            </TabsTrigger>

            <TabsTrigger
              value="allocations"
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all text-gray-700 hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Allocations
            </TabsTrigger>

            <TabsTrigger
              value="history"
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all text-gray-700 hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <main className="p-6 w-full bg-white shadow-sm">
          <TabsContent value="users">
            <Users />
          </TabsContent>

          <TabsContent value="projects">
            <Projects />
          </TabsContent>

          <TabsContent value="allocations">
            <Allocations />
          </TabsContent>

          <TabsContent value="history">
            <History />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}

export default ProjectAllocationTracker;
