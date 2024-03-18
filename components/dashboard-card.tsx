import { BarChart } from "lucide-react";

export const DashboardCard = ({
  name,
  total,
}: {
  name: string;
  total: number;
}) => {
  return (
    <>
      <div className="bg-white  p-10 shadow-md">
        <h2 className="text-primary">{name}</h2>
        <div className="flex items-center space-x-1">
          <BarChart className="w-5 h-5 text-primary" />
          <h2 className="text-primary">{total}</h2>
        </div>
      </div>
    </>
  );
};
