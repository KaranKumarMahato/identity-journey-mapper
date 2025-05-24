import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Diamond, RectangleHorizontal, StopCircle } from 'lucide-react';

interface FlowNodePaletteProps {
  onAddNode: (type: 'start' | 'end' | 'input' | 'decision' | 'process', label: string) => void;
}

const nodeTypes = [
  {
    type: 'start' as const,
    label: 'Start/End',
    icon: Play,
    color: 'bg-green-100 text-green-700 border-green-200',
    description: 'Begin or end process',
    examples: ['Login Start', 'Success End', 'Error End']
  },
  {
    type: 'input' as const,
    label: 'User Input',
    icon: RectangleHorizontal,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'User provides data',
    examples: ['Enter Email', 'Enter Password', 'Select MFA Method']
  },
  {
    type: 'decision' as const,
    label: 'Decision',
    icon: Diamond,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    description: 'Yes/No decision point',
    examples: ['Valid Credentials?', 'MFA Required?', 'Account Exists?']
  },
  {
    type: 'process' as const,
    label: 'Process',
    icon: Square,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'System/API action',
    examples: ['Validate User', 'Send MFA Code', 'Create Session']
  }
];

const FlowNodePalette: React.FC<FlowNodePaletteProps> = ({ onAddNode }) => {
  const handleAddNode = (type: typeof nodeTypes[0]['type'], defaultLabel: string) => {
    onAddNode(type, defaultLabel);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          Flowchart Elements
          <Badge variant="outline" className="text-xs">Standard</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {nodeTypes.map((nodeType) => (
          <div key={nodeType.type} className="space-y-2">
            <Button
              variant="outline"
              onClick={() => handleAddNode(nodeType.type, nodeType.examples[0])}
              className={`w-full justify-start p-3 h-auto ${nodeType.color} hover:opacity-80 transition-all duration-200`}
            >
              <div className="flex items-start space-x-3">
                <nodeType.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">{nodeType.label}</div>
                  <div className="text-xs opacity-80 mt-1">{nodeType.description}</div>
                </div>
              </div>
            </Button>
            
            {/* Quick examples */}
            <div className="pl-8 space-y-1">
              {nodeType.examples.slice(1).map((example, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAddNode(nodeType.type, example)}
                  className="w-full justify-start text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
                >
                  + {example}
                </Button>
              ))}
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">💡 Pro Tips:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>Drag nodes to position</li>
              <li>Click to edit labels</li>
              <li>Connect with arrows</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowNodePalette;
