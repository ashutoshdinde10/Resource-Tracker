import React, { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import Users from './components/Users'
import Projects from './components/Projects'
import Allocations from './components/Allocations'
import History from './components/History'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'users':
        return <Users />
      case 'projects':
        return <Projects />
      case 'allocations':
        return <Allocations />
      case 'history':
        return <History />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📊 Project Allocation Tracker</h1>
      </header>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App

