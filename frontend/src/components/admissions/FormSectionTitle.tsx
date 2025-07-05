import { Typography } from "antd";

const { Title } = Typography;

const FormSectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="relative w-full m-auto my-6 flex justify-center">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-calypso-950"></div>
      <div className="relative z-10 rounded-3xl bg-calypso-950 px-10 md:px-16 lg:px-20 py-2 border-4 border-white flex justify-center items-center w-fit">
        <h3 className="text-center text-white font-bold text-lg lg:text-xl">{title}</h3>
      </div>
    </div>
  );
};

export default FormSectionTitle;
