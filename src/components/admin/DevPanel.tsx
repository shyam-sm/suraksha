import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  X, 
  Play, 
  Copy, 
  Code, 
  Save,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface DevPanelProps {
  title: string;
  defaultEndpoint?: string;
  defaultMethod?: string;
  defaultBody?: string;
  sampleResponse?: string;
  todos?: string[];
}

export default function DevPanel({
  title,
  defaultEndpoint = '',
  defaultMethod = 'GET',
  defaultBody = '',
  sampleResponse = '',
  todos = []
}: DevPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [endpoint, setEndpoint] = useState(defaultEndpoint);
  const [method, setMethod] = useState(defaultMethod);
  const [requestBody, setRequestBody] = useState(defaultBody);
  const [todoNotes, setTodoNotes] = useState(todos.join('\n'));
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code snippet copied successfully",
    });
  };

  const generateCode = () => {
    const hasBody = ['POST', 'PATCH', 'PUT'].includes(method);
    const bodyCode = hasBody ? `
  body: JSON.stringify(${requestBody || '{}'})` : '';
    
    return `// ${title} API Integration
const response = await fetch('${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN'
  },${bodyCode}
});

const data = await response.json();
console.log(data);`.trim();
  };

  const simulateCall = () => {
    toast({
      title: "API Call Simulated",
      description: `${method} ${endpoint} - Replace with actual implementation`,
      variant: "default"
    });
  };

  return (
    <>
      {/* Dev Panel Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed top-20 right-4 z-40 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
      >
        <Settings className="w-4 h-4 mr-2" />
        Dev Panel
      </Button>

      {/* Dev Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <Card className="border-0 shadow-none">
                <CardHeader className="bg-blue-50 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-900 flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Developer Integration Panel - {title}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* API Configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endpoint">API Endpoint</Label>
                      <Input
                        id="endpoint"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                        placeholder="https://api.example.com/endpoint"
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">HTTP Method</Label>
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Request Body */}
                  {['POST', 'PATCH', 'PUT'].includes(method) && (
                    <div className="space-y-2">
                      <Label htmlFor="body">Request Body (JSON)</Label>
                      <Textarea
                        id="body"
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        placeholder='{ "key": "value" }'
                        className="font-mono text-sm min-h-32"
                      />
                    </div>
                  )}

                  {/* Sample Response */}
                  {sampleResponse && (
                    <div className="space-y-2">
                      <Label>Sample Response</Label>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm font-mono overflow-x-auto">
                          {sampleResponse}
                        </pre>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => copyToClipboard(sampleResponse)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Response
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Generated Code */}
                  <div className="space-y-2">
                    <Label>Generated Code (JavaScript/TypeScript)</Label>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
                      <pre className="text-sm font-mono overflow-x-auto">
                        {generateCode()}
                      </pre>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 text-white border-gray-600 hover:bg-gray-800"
                        onClick={() => copyToClipboard(generateCode())}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Code
                      </Button>
                    </div>
                  </div>

                  {/* TODO Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="todos">
                      <FileText className="w-4 h-4 inline mr-2" />
                      TODO / Integration Notes
                    </Label>
                    <Textarea
                      id="todos"
                      value={todoNotes}
                      onChange={(e) => setTodoNotes(e.target.value)}
                      placeholder="Add implementation notes, security requirements, etc."
                      className="min-h-24"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Button onClick={simulateCall} className="bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Test API Call
                    </Button>
                    <Button variant="outline">
                      <Save className="w-4 h-4 mr-2" />
                      Save Configuration
                    </Button>
                    <Badge variant="secondary" className="ml-auto">
                      Environment: Development
                    </Badge>
                  </div>

                  {/* Security Warning */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800 text-sm">
                      <strong>Security Note:</strong> Replace placeholder tokens with actual API keys. 
                      Ensure sensitive data is encrypted and audit logs are implemented for data access.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}