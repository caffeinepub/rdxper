import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Sparkles } from 'lucide-react';

interface ResearchTopicFormProps {
  onSubmit: (topic: string, figureCount: number) => void;
  isLoading?: boolean;
}

export function ResearchTopicForm({ onSubmit, isLoading = false }: ResearchTopicFormProps) {
  const [topic, setTopic] = useState('');
  const [figureCount, setFigureCount] = useState<number>(5);
  const [error, setError] = useState('');
  const [countError, setCountError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!topic.trim()) {
      setError('Please enter a research topic');
      return;
    }

    if (figureCount < 1 || figureCount > 100) {
      setCountError('Please enter a number between 1 and 100');
      return;
    }

    setError('');
    setCountError('');
    onSubmit(topic.trim(), figureCount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
    if (error) setError('');
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setFigureCount(value);
    } else if (e.target.value === '') {
      setFigureCount(0);
    }
    if (countError) setCountError('');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Enter Research Topic
        </CardTitle>
        <CardDescription>
          Provide a research topic to generate comprehensive data visualizations and tables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="research-topic">Research Topic</Label>
            <Input
              id="research-topic"
              type="text"
              placeholder="e.g., Climate Change Impact, AI in Healthcare, Renewable Energy..."
              value={topic}
              onChange={handleInputChange}
              disabled={isLoading}
              className={error ? 'border-destructive' : ''}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="figure-count">Number of Figures</Label>
            <Input
              id="figure-count"
              type="number"
              min="1"
              max="100"
              placeholder="e.g., 5"
              value={figureCount || ''}
              onChange={handleCountChange}
              disabled={isLoading}
              className={countError ? 'border-destructive' : ''}
            />
            {countError && (
              <p className="text-sm text-destructive">{countError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Enter a number between 1 and 100
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !topic.trim() || figureCount < 1 || figureCount > 100}
            size="lg"
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? 'Generating...' : 'Generate Visualizations'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
