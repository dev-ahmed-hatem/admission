import { Column } from "@ant-design/plots";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";

const ApplicantsStats = () => {
  const data = [
    { letter: "A", frequency: 8167 },
    { letter: "B", frequency: 1492 },
    { letter: "C", frequency: 2782 },
    { letter: "D", frequency: 4253 },
    { letter: "E", frequency: 12702 },
    { letter: "F", frequency: 2288 },
    { letter: "G", frequency: 2015 },
    { letter: "H", frequency: 6094 },
    { letter: "I", frequency: 6966 },
    { letter: "J", frequency: 153 },
    { letter: "K", frequency: 772 },
    { letter: "L", frequency: 4025 },
  ];
  const config = {
    data,
    xField: "letter",
    yField: "frequency",
    onReady: (plot: any) => {
      try {
        const container = plot.container;
        if (!container) return;

        const { height } = container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];

        plot.on("afterrender", () => {
          plot.emit("tooltip:show", {
            data: {
              data: tooltipItem,
            },
            offsetY: height / 2 - 60,
          });
        });
      } catch (e) {
        console.error(e);
      }
    },
  };

  return (
    <ConfigProvider locale={enUS}>
      <Column {...config} />
    </ConfigProvider>
  );
};
export default ApplicantsStats;
