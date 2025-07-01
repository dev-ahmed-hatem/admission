import { Card, Col, Row, Statistic } from "antd";
import {
  TeamOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

type ApplicantsStats = {
  total: number;
  under_review: number;
  accepted: number;
  rejected: number;
};

const ApplicantsOverview = ({
  total,
  under_review,
  accepted,
  rejected,
}: ApplicantsStats) => {
  return (
    <Card className="shadow-lg rounded-lg">
      <Row gutter={[8, 8]}>
        {/* Total Applicants */}
        <Col xs={24} sm={12} md={8}>
          <Link to={"applicants/"}>
            <Card className="bg-calypso-800 text-white hover:shadow-xl">
              <Statistic
                title={
                  <span className="text-white text-base">إجمالي المتقدمين</span>
                }
                value={total}
                valueStyle={{ color: "#fff" }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Link>
        </Col>

        {/* Under Review */}
        <Col xs={24} sm={12} md={8}>
          <Card className="border border-gray-200">
            <Statistic
              title="قيد المراجعة"
              value={under_review}
              valueStyle={{ color: "#1890ff" }}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>

        {/* Accepted */}
        <Col xs={24} sm={12} md={8}>
          <Card className="border border-gray-200">
            <Statistic
              title="مقبول"
              value={accepted}
              valueStyle={{ color: "#52c41a" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        {/* Rejected */}
        <Col xs={24} sm={12} md={8}>
          <Card className="border border-gray-200">
            <Statistic
              title="مرفوض"
              value={rejected}
              valueStyle={{ color: "#f5222d" }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ApplicantsOverview;
