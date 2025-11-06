import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import Users from './Users';
import Projects from './Projects';
import Allocations from './Allocations';
import History from './History';

function ProjectAllocationTracker() {
  const [activeTab, setActiveTab] = useState('users');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="project-allocation-tracker">
      <header className="tracker-header">
        <h1>📊 Project Allocation Tracker</h1>
      </header>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="mb-4">
          {/* @ts-expect-error - TabsList accepts children via forwardRef props spread */}
          <TabsList className="w-full justify-start">
            {/* @ts-expect-error - TabsTrigger accepts children via forwardRef props spread */}
            <TabsTrigger value="users">👥 Users</TabsTrigger>
            {/* @ts-expect-error - TabsTrigger accepts children via forwardRef props spread */}
            <TabsTrigger value="projects">📁 Projects</TabsTrigger>
            {/* @ts-expect-error - TabsTrigger accepts children via forwardRef props spread */}
            <TabsTrigger value="allocations">📋 Allocations</TabsTrigger>
            {/* @ts-expect-error - TabsTrigger accepts children via forwardRef props spread */}
            <TabsTrigger value="history">📜 History</TabsTrigger>
          </TabsList>
        </div>
        <main className="tracker-main-content">
          {/* @ts-expect-error - TabsContent accepts children via forwardRef props spread */}
          <TabsContent value="users">
            <Users />
          </TabsContent>
          {/* @ts-expect-error - TabsContent accepts children via forwardRef props spread */}
          <TabsContent value="projects">
            <Projects />
          </TabsContent>
          {/* @ts-expect-error - TabsContent accepts children via forwardRef props spread */}
          <TabsContent value="allocations">
            <Allocations />
          </TabsContent>
          {/* @ts-expect-error - TabsContent accepts children via forwardRef props spread */}
          <TabsContent value="history">
            <History />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}

export default ProjectAllocationTracker;
