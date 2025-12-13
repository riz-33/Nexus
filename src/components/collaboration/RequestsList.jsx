// src/components/collaboration/RequestsList.jsx
import React from "react";
import { List, Avatar, Button, Tag, Empty } from "antd";
import dayjs from "dayjs";
import { useMeetings } from "../../context/MeetingsContext";
import { useAuth } from "../../context/AuthContext";

const RequestsList = ({ currentRole }) => {
  const { requests, acceptRequest, declineRequest } = useMeetings();
  const { user } = useAuth();
  const role = currentRole || (user && user.role) || "entrepreneur";

  const incoming = requests.filter((r) => r.toRole === role);

  if (!incoming.length) return <Empty description="No pending meeting requests" />;

  return (
    <List
      itemLayout="horizontal"
      dataSource={incoming}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button key="accept" type="primary" onClick={() => acceptRequest(item.id)}>
              Accept
            </Button>,
            <Button key="decline" danger onClick={() => declineRequest(item.id)}>
              Decline
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar>{item.fromRole?.charAt(0)?.toUpperCase()}</Avatar>}
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{item.title}</span>
                <Tag color="orange">{item.status}</Tag>
              </div>
            }
            description={`${dayjs(item.date).format("DD MMM YYYY")} ${item.time ? " • " + item.time : ""}`}
          />
        </List.Item>
      )}
    />
  );
};

export default RequestsList;
