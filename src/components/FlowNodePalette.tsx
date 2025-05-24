
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Diamond, RectangleHorizontal, Palette, Sparkles } from 'lucide-react';

interface FlowNodePaletteProps {
  onAddNode: (type: 'start' | 'end' | 'input' | 'decision' | 'process', label: string) => void;
}

const nodeTypes = [
  {
    type: 'start' as const,
    label: 'Start/End',
    icon: Play,
    color: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300/50 hover:from-green-200 hover:to-green-300',
    description: 'Begin or end process',
    examples: ['🚀 Login Start', '✅ Success End', '❌ Error End'],
    emoji: '🟢'
  },
  {
    type: 'input' as const,
    label: 'User Input',
    icon: RectangleHorizontal,
    color: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300/50 hover:from-blue-200 hover:to-blue-300',
    description: 'User provides data',
    examples: ['📧 Enter Email', '🔐 Enter Password', '🔒 Select MFA Method'],
    emoji: '🔵'
  },
  {
    type: 'decision' as const,
    label: 'Decision',
    icon: Diamond,
    color: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300/50 hover:from-yellow-200 hover:to-yellow-300',
    description: 'Yes/No decision point',
    examples: ['✓ Valid Credentials?', '🔐 MFA Required?', '👤 Account Exists?'],
    emoji: '🔶'
  },
  {
    type: 'process' as const,
    label: 'Process',
    icon: Square,
    color: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300/50 hover:from-purple-200 hover:to-purple-300',
    description: 'System/API action',
    examples: ['🔍 Validate User', '📱 Send MFA Code', '🎫 Create Session'],
    emoji: '🟣'
  }
];

const FlowNodePalette: React.FC<FlowNodePaletteProps> = ({ onAddNode }) => {
  const handleAddNode = (type: typeof nodeTypes[0]['type'], defaultLabel: string) => {
    onAddNode(type, defaultLabel);
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>Flowchart Elements</span>
          </div>
          <Badge variant="outline" className="text-xs glass-card">
            <Sparkles className="w-3 h-3 mr-1" />
            Standard
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nodeTypes.map((nodeType) => (
          <div key={nodeType.type} className="space-y-3">
            <Button
              variant="outline"
              onClick={() => handleAddNode(nodeType.type, nodeType.examples[0].replace(/[🚀✅❌📧🔐🔒✓👤🔍📱🎫]/g, '').trim())}
              className={`w-full justify-start p-4 h-auto ${nodeType.color} enhanced-button transition-all duration-300 hover:scale-[1.02] border-2`}
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{nodeType.emoji}</span>
                  <nodeType.icon className="w-5 h-5 flex-shrink-0" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">{nodeType.label}</div>
                  <div className="text-xs opacity-80 mt-1">{nodeType.description}</div>
                </div>
              </div>
            </Button>
            
            {/* Enhanced quick examples */}
            <div className="pl-6 space-y-2">
              {nodeType.examples.slice(1).map((example, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAddNode(nodeType.type, example.replace(/[🚀✅❌📧🔐🔒✓👤🔍📱🎫]/g, '').trim())}
                  className="w-full justify-start text-xs h-8 px-3 text-muted-foreground hover:text-foreground enhanced-button hover:bg-white/50"
                >
                  <span className="mr-2">+</span>
                  {example}
                </Button>
              ))}
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-white/20">
          <div className="glass-card rounded-lg p-4">
            <div className="text-xs text-muted-foreground space-y-2">
              <p className="font-medium flex items-center">
                💡 <span className="ml-1">Pro Tips:</span>
              </p>
              <ul className="list-none space-y-1 ml-6">
                <li className="flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Drag nodes to position</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✏️</span>
                  <span>Click to edit labels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>🔗</span>
                  <span>Connect with arrows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowNodePalette;
