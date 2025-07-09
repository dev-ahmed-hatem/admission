import { HOME_STATS } from "@/types/applicants";
import { Column } from "@ant-design/plots";

const ApplicantsStats = ({
  enrollment_stats,
}: {
  enrollment_stats: HOME_STATS["enrollment"];
}) => {
  const config = {
    data: enrollment_stats
      .filter((stat) => stat.enrollment !== null)
      .map((stat) => ({ ...stat, العدد: stat.count })),
    xField: "enrollment",
    yField: "العدد",
    onReady: (plot: any) => {
      try {
        const container = plot.container;
        if (!container) return;

        const { height } = container.getBoundingClientRect();
        const tooltipItem =
          enrollment_stats[Math.floor(Math.random() * enrollment_stats.length)];

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
