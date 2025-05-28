import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts"; // Only import recharts components
import { getData } from "../../APIConfig/ConfigAPI";

const PieChartBrand = () => {
  const [salesData, setSalesData] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data and sales data in one go
  const fetchData = async () => {
    try {
      const response = await getData("Graphs/PieChart/");

      if (response && Array.isArray(response.result)) {
        setSalesData(response.result); 
      } else {
        console.error("API response is not an array:", response);
        setSalesData([]); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSalesData([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const chartData = Array.isArray(salesData)
    ? salesData.map((item) => ({
        name: item.fullName,
        value: parseFloat(item.percentageOfTotalSales.toFixed(2)), 
      }))
    : []; 

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div
      className="icon"
      style={{
        display: "flex",          
        justifyContent: "center",  
        alignItems: "center",      
        height: "100%",          
        minHeight: "400px",      
        perspective: "1500px",    
      }}
    >
      {loading ? (
        <p>Loading Pie Chart...</p>
      ) : (
        <div style={{ transform: "rotateX(10deg) rotateY(20deg)", transition: "transform 1s ease-out" }}>
          <PieChart width={500} height={500}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={200}
              innerRadius={150}
              startAngle={90}
              endAngle={-270}
              fill="#8884d8"
              label
              paddingAngle={5}
              animationBegin={0} // Starts the animation immediately
              animationDuration={1000} // Duration of the animation in ms
              animationEasing="ease-in-out" // Smooth easing function for the animation
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    filter: "drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.2))", // Shadow effect for 3D feel
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value.toFixed(2)}%`} // Format the value to 2 decimal places
            />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default PieChartBrand;
