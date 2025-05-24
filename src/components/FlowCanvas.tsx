import React, { forwardRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Diamond, RectangleHorizontal, Trash2, Edit3, ArrowRight, Sparkles } from 'lucide-react';
import { FlowNode } from './IdentityJourneyMapper';

interface FlowCanvasProps {
  nodes: FlowNode[];
  selectedNode: string | null;
  onSelectNode: (id: string | null) => void;
  onUpdateNode: (id: string, updates: Partial<FlowNode>) => void;
  onDeleteNode: (id: string) => void;
}

const iconMap = {
  start: Play,
  end: Play,
  input: RectangleHorizontal,
  decision: Diamond,
  process: Square
};

const colorMap = {
  start: 'node-start',
  end: 'node-end',
  input: 'node-input',
  decision: 'node-decision',
  process: 'node-process'
};

const emojiMap = {
  start: '🟢',
  end: '🔴',
  input: '🔵',
  decision: '🔶',
  process: '🟣'
};

const FlowCanvas = forwardRef<HTMLDivElement, FlowCanvasProps>(
  ({ nodes, selectedNode, onSelectNode, onUpdateNode, onDeleteNode }, ref) => {
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const [editingNode, setEditingNode] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
      e.preventDefault();
      setDraggedNode(nodeId);
      onSelectNode(nodeId);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (draggedNode && ref && 'current' in ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        onUpdateNode(draggedNode, { x: Math.max(0, x - 50), y: Math.max(0, y - 25) });
      }
    };

    const handleMouseUp = () => {
      setDraggedNode(null);
    };

    const startEditing = (node: FlowNode) => {
      setEditingNode(node.id);
      setEditValue(node.label);
    };

    const saveEdit = () => {
      if (editingNode) {
        onUpdateNode(editingNode, { label: editValue });
        setEditingNode(null);
        setEditValue('');
      }
    };

    const cancelEdit = () => {
      setEditingNode(null);
      setEditValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        saveEdit();
      } else if (e.key === 'Escape') {
        cancelEdit();
      }
    };

    return (
      <Card className="h-[600px] relative overflow-hidden border-0 shadow-none">
        <div
          ref={ref}
          className="w-full h-full canvas-grid relative cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => onSelectNode(null)}
        >
          {/* Enhanced overlay instructions when empty */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 p-8 glass-card rounded-2xl max-w-md">
                <div className="w-20 h-20 auth-gradient rounded-full mx-auto flex items-center justify-center mb-6 floating">
                  <ArrowRight className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Start Building Your Authentication Flow
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Drag and drop flowchart elements from the sidebar to design your B2B SaaS authentication journey.
                    Perfect for QA testing, UI design, and development implementation.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline" className="glass-card">
                      <Sparkles className="w-3 h-3 mr-1" />
                      SSO
                    </Badge>
                    <Badge variant="outline" className="glass-card">
                      <Sparkles className="w-3 h-3 mr-1" />
                      MFA
                    </Badge>
                    <Badge variant="outline" className="glass-card">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Social Login
                    </Badge>
                    <Badge variant="outline" className="glass-card">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Recovery
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced rendered nodes */}
          {nodes.map((node) => {
            const IconComponent = iconMap[node.type];
            const isSelected = selectedNode === node.id;
            const isEditing = editingNode === node.id;
            
            return (
              <div
                key={node.id}
                className={`absolute flow-node ${
                  isSelected ? 'ring-4 ring-blue-400/50 ring-offset-2 pulse-glow' : ''
                } ${draggedNode === node.id ? 'dragging' : ''}`}
                style={{
                  left: node.x,
                  top: node.y,
                  transform: draggedNode === node.id ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="glass-card border-2 border-white/30 rounded-xl shadow-xl p-4 min-w-[140px] cursor-move backdrop-blur-md">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{emojiMap[node.type]}</span>
                      <IconComponent className="w-4 h-4 text-gray-700" />
                    </div>
                    <Badge variant="outline" className="text-xs glass-card border-white/30">
                      {node.type}
                    </Badge>
                  </div>
                  
                  {isEditing ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      onBlur={saveEdit}
                      className="h-8 text-sm bg-white/20 border-white/30 text-black"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-sm font-medium cursor-text text-black min-h-[20px]"
                      onClick={() => startEditing(node)}
                    >
                      {node.label}
                    </div>
                  )}
                  
                  {isSelected && !isEditing && (
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-white/20">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditing(node)}
                        className="h-7 w-7 p-0 hover:bg-white/20 text-gray-700"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteNode(node.id)}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-800 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Enhanced grid info */}
          <div className="absolute bottom-4 right-4 glass-card px-3 py-2 rounded-lg">
            <div className="text-xs text-gray-600 flex items-center space-x-2">
              <span>Grid: 20px</span>
              <span>•</span>
              <span>{nodes.length} nodes</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

FlowCanvas.displayName = 'FlowCanvas';

export default FlowCanvas;
