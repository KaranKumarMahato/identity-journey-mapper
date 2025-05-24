
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Save, Share2, Zap, Shield, Users, Settings } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 auth-gradient rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Identity Journey Mapper</h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                B2B SaaS Authentication Designer
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTemplateOpen(true)}
                className="hidden sm:inline-flex"
              >
                <Zap className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={saveDiagram}
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportDiagram}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                className="auth-gradient text-white hover:opacity-90"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Feature Highlights */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">QA Ready</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">Generate comprehensive test cases</p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 bg-purple-50/50">
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Dev Ready</span>
                </div>
                <p className="text-xs text-purple-700 mt-1">Implementation-ready flowcharts</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Design Ready</span>
                </div>
                <p className="text-xs text-green-700 mt-1">UI/UX flow visualization</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Node Palette */}
          <div className="lg:col-span-1">
            <FlowNodePalette onAddNode={addNode} />
            
            {/* Quick Actions */}
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadDiagram}
                  className="w-full justify-start text-xs"
                >
                  Load Saved
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCanvas}
                  className="w-full justify-start text-xs"
                >
                  Clear Canvas
                </Button>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  Nodes: {nodes.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas */}
          <div className="lg:col-span-3">
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
