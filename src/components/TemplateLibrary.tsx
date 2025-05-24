
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Key, Smartphone, Mail, Link } from 'lucide-react';
import { FlowNode } from './IdentityJourneyMapper';

interface TemplateLibraryProps {
  onClose: () => void;
  onLoadTemplate: (nodes: FlowNode[]) => void;
}

const templates = [
  {
    id: 'basic-login',
    name: 'Basic Email/Password Login',
    description: 'Standard authentication flow with email and password validation',
    icon: Mail,
    category: 'Basic Auth',
    nodes: [
      { id: '1', type: 'start' as const, label: 'Login Start', x: 50, y: 50, connections: ['2'] },
      { id: '2', type: 'input' as const, label: 'Enter Email', x: 50, y: 150, connections: ['3'] },
      { id: '3', type: 'input' as const, label: 'Enter Password', x: 50, y: 250, connections: ['4'] },
      { id: '4', type: 'process' as const, label: 'Validate Credentials', x: 50, y: 350, connections: ['5'] },
      { id: '5', type: 'decision' as const, label: 'Valid?', x: 50, y: 450, connections: ['6', '7'] },
      { id: '6', type: 'end' as const, label: 'Login Success', x: 200, y: 450, connections: [] },
      { id: '7', type: 'end' as const, label: 'Login Failed', x: 50, y: 550, connections: [] }
    ]
  },
  {
    id: 'mfa-flow',
    name: 'Multi-Factor Authentication',
    description: 'Complete MFA flow with SMS/Email verification options',
    icon: Smartphone,
    category: 'Security',
    nodes: [
      { id: '1', type: 'start' as const, label: 'MFA Required', x: 50, y: 50, connections: ['2'] },
      { id: '2', type: 'decision' as const, label: 'MFA Method Available?', x: 50, y: 150, connections: ['3', '4'] },
      { id: '3', type: 'input' as const, label: 'Select MFA Method', x: 200, y: 150, connections: ['5'] },
      { id: '4', type: 'process' as const, label: 'Setup MFA', x: 50, y: 250, connections: ['5'] },
      { id: '5', type: 'process' as const, label: 'Send Verification Code', x: 200, y: 250, connections: ['6'] },
      { id: '6', type: 'input' as const, label: 'Enter Verification Code', x: 200, y: 350, connections: ['7'] },
      { id: '7', type: 'decision' as const, label: 'Code Valid?', x: 200, y: 450, connections: ['8', '9'] },
      { id: '8', type: 'end' as const, label: 'MFA Success', x: 350, y: 450, connections: [] },
      { id: '9', type: 'end' as const, label: 'MFA Failed', x: 200, y: 550, connections: [] }
    ]
  },
  {
    id: 'sso-flow',
    name: 'Single Sign-On (SSO)',
    description: 'Enterprise SSO flow with SAML/OIDC integration',
    icon: Users,
    category: 'Enterprise',
    nodes: [
      { id: '1', type: 'start' as const, label: 'SSO Login', x: 50, y: 50, connections: ['2'] },
      { id: '2', type: 'input' as const, label: 'Enter Organization', x: 50, y: 150, connections: ['3'] },
      { id: '3', type: 'process' as const, label: 'Redirect to IdP', x: 50, y: 250, connections: ['4'] },
      { id: '4', type: 'process' as const, label: 'IdP Authentication', x: 50, y: 350, connections: ['5'] },
      { id: '5', type: 'decision' as const, label: 'Auth Success?', x: 50, y: 450, connections: ['6', '7'] },
      { id: '6', type: 'process' as const, label: 'Create Session', x: 200, y: 450, connections: ['8'] },
      { id: '7', type: 'end' as const, label: 'SSO Failed', x: 50, y: 550, connections: [] },
      { id: '8', type: 'end' as const, label: 'SSO Success', x: 200, y: 550, connections: [] }
    ]
  },
  {
    id: 'social-login',
    name: 'Social Authentication',
    description: 'Google, LinkedIn, and other social provider integration',
    icon: Link,
    category: 'Social',
    nodes: [
      { id: '1', type: 'start' as const, label: 'Social Login', x: 50, y: 50, connections: ['2'] },
      { id: '2', type: 'input' as const, label: 'Select Provider', x: 50, y: 150, connections: ['3'] },
      { id: '3', type: 'process' as const, label: 'Redirect to Provider', x: 50, y: 250, connections: ['4'] },
      { id: '4', type: 'process' as const, label: 'Provider Auth', x: 50, y: 350, connections: ['5'] },
      { id: '5', type: 'decision' as const, label: 'User Exists?', x: 50, y: 450, connections: ['6', '7'] },
      { id: '6', type: 'process' as const, label: 'Link Account', x: 200, y: 450, connections: ['8'] },
      { id: '7', type: 'process' as const, label: 'Create Account', x: 50, y: 550, connections: ['8'] },
      { id: '8', type: 'end' as const, label: 'Login Success', x: 200, y: 550, connections: [] }
    ]
  },
  {
    id: 'password-recovery',
    name: 'Password Recovery',
    description: 'Secure password reset flow with email verification',
    icon: Key,
    category: 'Recovery',
    nodes: [
      { id: '1', type: 'start' as const, label: 'Forgot Password', x: 50, y: 50, connections: ['2'] },
      { id: '2', type: 'input' as const, label: 'Enter Email', x: 50, y: 150, connections: ['3'] },
      { id: '3', type: 'decision' as const, label: 'Email Exists?', x: 50, y: 250, connections: ['4', '5'] },
      { id: '4', type: 'process' as const, label: 'Send Reset Email', x: 200, y: 250, connections: ['6'] },
      { id: '5', type: 'end' as const, label: 'Email Not Found', x: 50, y: 350, connections: [] },
      { id: '6', type: 'input' as const, label: 'Click Reset Link', x: 200, y: 350, connections: ['7'] },
      { id: '7', type: 'input' as const, label: 'Enter New Password', x: 200, y: 450, connections: ['8'] },
      { id: '8', type: 'process' as const, label: 'Update Password', x: 200, y: 550, connections: ['9'] },
      { id: '9', type: 'end' as const, label: 'Password Reset', x: 200, y: 650, connections: [] }
    ]
  },
  {
    id: 'account-creation',
    name: 'Account Registration',
    description: 'Complete user registration with email verification',
    icon: Shield,
    category: 'Registration',
    nodes: [
      { id: '1', type: 'start' as const, label: 'Sign Up', x: 50, y: 50, connections: ['2'] },
      { id: '2', type: 'input' as const, label: 'Enter Details', x: 50, y: 150, connections: ['3'] },
      { id: '3', type: 'decision' as const, label: 'Email Available?', x: 50, y: 250, connections: ['4', '5'] },
      { id: '4', type: 'process' as const, label: 'Create Account', x: 200, y: 250, connections: ['6'] },
      { id: '5', type: 'end' as const, label: 'Email Taken', x: 50, y: 350, connections: [] },
      { id: '6', type: 'process' as const, label: 'Send Verification', x: 200, y: 350, connections: ['7'] },
      { id: '7', type: 'decision' as const, label: 'Email Verified?', x: 200, y: 450, connections: ['8', '9'] },
      { id: '8', type: 'end' as const, label: 'Account Active', x: 350, y: 450, connections: [] },
      { id: '9', type: 'end' as const, label: 'Pending Verification', x: 200, y: 550, connections: [] }
    ]
  }
];

const categories = ['All', 'Basic Auth', 'Security', 'Enterprise', 'Social', 'Recovery', 'Registration'];

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onClose, onLoadTemplate }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Authentication Flow Templates</span>
          </DialogTitle>
        </DialogHeader>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <template.icon className="w-5 h-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {template.nodes.length} steps
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onLoadTemplate(template.nodes)}
                    className="auth-gradient text-white hover:opacity-90"
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Template Benefits</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>QA Teams:</strong> Use flows to create comprehensive test scenarios</li>
            <li>• <strong>Design Teams:</strong> Visualize user journeys and edge cases</li>
            <li>• <strong>Dev Teams:</strong> Reference implementation logic and validation points</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateLibrary;
