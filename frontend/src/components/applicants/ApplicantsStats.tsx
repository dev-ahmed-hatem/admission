import { HOME_STATS } from "@/types/applicants";
import { Column } from "@ant-design/plots";

const ApplicantsStats = ({
  enrollment_stats,
}: {
  enrollment_stats: HOME_STATS["enrollment"];
}) => {
  const data = [
    { enrollment: "A", count: 8167 },
    { enrollment: "B", count: 1492 },
    { enrollment: "C", count: 2782 },
    { enrollment: "D", count: 4253 },
    { enrollment: "E", count: 12702 },
    { enrollment: "F", count: 2288 },
    { enrollment: "G", count: 2015 },
    { enrollment: "H", count: 6094 },
    { enrollment: "I", count: 6966 },
    { enrollment: "J", count: 153 },
    { enrollment: "K", count: 772 },
    { enrollment: "L", count: 4025 },
  ];
  const config = {
    data: enrollment_stats,
    xField: "enrollment",
    yField: "count",
    onReady: (plot: any) => {
      try {
        const container = plot.container;
        if (!container) return;

        const { height } = container.getBoundingClientRect();
        const tooltipItem = enrollment_stats[Math.floor(Math.random() * enrollment_stats.length)];

        plot.on("afterrender", () => {
          plot.emit("tooltip:show", {
            enrollment_stats: {
              enrollment_stats: tooltipItem,
            },
            offsetY: height / 2 - 60,
          });
        });
      } catch (e) {
        console.error(e);
      }
    },
  };

  return <Column className={"text-left"} {...config} />;
};
export default ApplicantsStats;
