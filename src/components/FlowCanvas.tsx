
import React, { forwardRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Diamond, Parallelogram, Trash2, Edit3, ArrowRight } from 'lucide-react';
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
  input: Parallelogram,
  decision: Diamond,
  process: Square
};

const colorMap = {
  start: 'bg-green-100 text-green-700 border-green-200',
  end: 'bg-red-100 text-red-700 border-red-200',
  input: 'bg-blue-100 text-blue-700 border-blue-200',
  decision: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  process: 'bg-purple-100 text-purple-700 border-purple-200'
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
      <Card className="h-[600px] relative overflow-hidden">
        <div
          ref={ref}
          className="w-full h-full canvas-grid relative cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => onSelectNode(null)}
        >
          {/* Overlay instructions when empty */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-16 h-16 auth-gradient rounded-full mx-auto flex items-center justify-center mb-4">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Start Building Your Authentication Flow</h3>
                <p className="text-gray-500 max-w-md">
                  Add flowchart elements from the sidebar to design your B2B SaaS authentication journey.
                  Perfect for QA testing, UI design, and development implementation.
                </p>
                <Badge variant="outline" className="mt-2">
                  SSO • MFA • Social Login • Recovery
                </Badge>
              </div>
            </div>
          )}

          {/* Render nodes */}
          {nodes.map((node) => {
            const IconComponent = iconMap[node.type];
            const isSelected = selectedNode === node.id;
            const isEditing = editingNode === node.id;
            
            return (
              <div
                key={node.id}
                className={`absolute flow-node ${colorMap[node.type]} ${
                  isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                } ${draggedNode === node.id ? 'dragging' : ''}`}
                style={{
                  left: node.x,
                  top: node.y,
                  transform: draggedNode === node.id ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white border-2 rounded-lg shadow-lg p-3 min-w-[120px] cursor-move">
                  <div className="flex items-center space-x-2 mb-2">
                    <IconComponent className="w-4 h-4" />
                    <Badge variant="outline" className="text-xs">
                      {node.type}
                    </Badge>
                  </div>
                  
                  {isEditing ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      onBlur={saveEdit}
                      className="h-8 text-sm"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-sm font-medium cursor-text"
                      onClick={() => startEditing(node)}
                    >
                      {node.label}
                    </div>
                  )}
                  
                  {isSelected && !isEditing && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditing(node)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteNode(node.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Grid info */}
          <div className="absolute bottom-4 right-4 text-xs text-gray-400">
            Grid: 20px • {nodes.length} nodes
          </div>
        </div>
      </Card>
    );
  }
);

FlowCanvas.displayName = 'FlowCanvas';

export default FlowCanvas;
