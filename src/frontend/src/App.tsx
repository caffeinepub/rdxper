import { useState } from 'react';
import { ResearchTopicForm } from './components/ResearchTopicForm';
import { BarGraphVisualization } from './components/BarGraphVisualization';
import { TableVisualization } from './components/TableVisualization';
import { useBarGraphData, useTableData } from './hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { SiCoffeescript } from 'react-icons/si';

function App() {
  const [researchTopic, setResearchTopic] = useState<string>('');
  const [submittedTopic, setSubmittedTopic] = useState<string>('');
  const [figureCount, setFigureCount] = useState<number>(5);

  const { data: barGraphData, isLoading: isLoadingBarGraph } = useBarGraphData(submittedTopic, figureCount);
  const { data: tableData, isLoading: isLoadingTable } = useTableData(submittedTopic, figureCount);

  const handleSubmit = (topic: string, count: number) => {
    setResearchTopic(topic);
    setSubmittedTopic(topic);
    setFigureCount(count);
  };

  const isLoading = isLoadingBarGraph || isLoadingTable;
  const hasData = submittedTopic && (barGraphData || tableData);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <SiCoffeescript className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">RDXper</h1>
              <p className="text-sm text-muted-foreground">Research Data Explorer</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Research Topic Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <ResearchTopicForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Generating visualizations for "{researchTopic}"...</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && hasData && (
          <div className="space-y-12">
            {/* Bar Graphs Section */}
            {barGraphData && barGraphData.length > 0 && (
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Bar Graph Analysis</h2>
                  <p className="text-muted-foreground">Visual representation of data for: {researchTopic}</p>
                </div>
                <BarGraphVisualization data={barGraphData} topic={researchTopic} />
              </section>
            )}

            {/* Tables Section */}
            {tableData && tableData.length > 0 && (
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Tabular Data</h2>
                  <p className="text-muted-foreground">Detailed breakdown for: {researchTopic}</p>
                </div>
                <TableVisualization data={tableData} topic={researchTopic} />
              </section>
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !hasData && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
              <SiCoffeescript className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Explore</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a research topic above to generate comprehensive bar graphs and tables with data insights.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RDXper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
