actor {
  type BarGraphData = {
    categories : [Text];
    values : [Float];
  };

  type TableData = {
    headers : [Text];
    rows : [[Text]];
  };

  public query ({ caller }) func fetchBarGraphData(_researchTopic : Text, figureCount : Nat) : async [BarGraphData] {
    let barGraphData = {
      categories = ["A", "B", "C"];
      values = [10.0, 20.5, 30.0];
    };
    Array.repeat<BarGraphData>(barGraphData, figureCount);
  };

  public query ({ caller }) func fetchTableData(_researchTopic : Text, figureCount : Nat) : async [TableData] {
    let tableData = {
      headers = ["Column 1", "Column 2", "Column 3"];
      rows = [
        ["1A", "1B", "1C"],
        ["2A", "2B", "2C"],
        ["3A", "3B", "3C"],
      ];
    };
    Array.repeat<TableData>(tableData, figureCount);
  };
};
