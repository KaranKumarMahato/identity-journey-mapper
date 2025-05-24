
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Save, Share2, Zap, Shield, Users, Settings, Sparkles } from 'lucide-react';
import FlowNodePalette from './FlowNodePalette';
import FlowCanvas from './FlowCanvas';
import TemplateLibrary from './TemplateLibrary';

export interface FlowNode {
  id: string;
  type: 'start' | 'end' | 'input' | 'decision' | 'process';
  label: string;
  x: number;
  y: number;
  connections: string[];
}

const IdentityJourneyMapper = () => {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addNode = (type: FlowNode['type'], label: string) => {
    const newNode: FlowNode = {
      id: Date.now().toString(),
      type,
      label,
      x: 100,
      y: 100,
      connections: []
    };
    setNodes(prev => [...prev, newNode]);
  };

  const updateNode = (id: string, updates: Partial<FlowNode>) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, ...updates } : node
    ));
  };

  const deleteNode = (id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setSelectedNode(null);
  };

  const exportDiagram = () => {
    console.log('Exporting diagram...');
    // Implementation for export functionality
  };

  const saveDiagram = () => {
    console.log('Saving diagram...');
    localStorage.setItem('identity-journey-diagram', JSON.stringify(nodes));
  };

  const loadDiagram = () => {
    const saved = localStorage.getItem('identity-journey-diagram');
    if (saved) {
      setNodes(JSON.parse(saved));
    }
  };

  const clearCanvas = () => {
    setNodes([]);
    setSelectedNode(null);
  };

  const loadTemplate = (templateNodes: FlowNode[]) => {
    setNodes(templateNodes);
    setIsTemplateOpen(false);
  };

  return (
    <div className="min-h-screen main-gradient">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 auth-gradient rounded-xl flex items-center justify-center floating">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Identity Journey Mapper
                  </h1>
                  <p className="text-xs text-gray-500">Professional Authentication Designer</p>
                </div>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex glass-card">
                <Sparkles className="w-3 h-3 mr-1" />
                B2B SaaS Ready
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTemplateOpen(true)}
                className="hidden sm:inline-flex enhanced-button glass-card hover:bg-white/20"
              >
                <Zap className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={saveDiagram}
                className="enhanced-button glass-card hover:bg-white/20"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportDiagram}
                className="enhanced-button glass-card hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                className="auth-gradient text-white hover:opacity-90 enhanced-button"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Feature Highlights */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="feature-card border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-blue-100/50 glass-card">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-blue-900">QA Ready</span>
                    <p className="text-xs text-blue-700 mt-1">Comprehensive test case generation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-purple-100/50 glass-card">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-purple-900">Dev Ready</span>
                    <p className="text-xs text-purple-700 mt-1">Implementation-ready architecture</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-green-200/50 bg-gradient-to-br from-green-50/80 to-green-100/50 glass-card">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-green-900">Design Ready</span>
                    <p className="text-xs text-green-700 mt-1">Beautiful UI/UX flow visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content with enhanced styling */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-xl">
              <FlowNodePalette onAddNode={addNode} />
            </div>
            
            {/* Enhanced Quick Actions */}
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadDiagram}
                  className="w-full justify-start text-xs enhanced-button"
                >
                  📁 Load Saved
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCanvas}
                  className="w-full justify-start text-xs enhanced-button"
                >
                  🗑️ Clear Canvas
                </Button>
                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Active Nodes</span>
                  <Badge variant="outline" className="text-xs">
                    {nodes.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Main Canvas */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-xl overflow-hidden">
              <FlowCanvas
                ref={canvasRef}
                nodes={nodes}
                selectedNode={selectedNode}
                onSelectNode={setSelectedNode}
                onUpdateNode={updateNode}
                onDeleteNode={deleteNode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Template Library Modal */}
      {isTemplateOpen && (
        <TemplateLibrary
          onClose={() => setIsTemplateOpen(false)}
          onLoadTemplate={loadTemplate}
        />
      )}
    </div>
  );
};

export default IdentityJourneyMapper;
