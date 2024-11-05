import { useState } from "react";
import { Button, Modal } from "antd";
import { useDeleteRoomMutation } from "../../../redux/features/admin/roomManagement/meetingRoom";
import { NavLink } from "react-router-dom";
import { useGetAllSlotsQuery } from "../../../redux/features/admin/slotManagement/slotManagement";

const ManageSlot = () => {
  const { data: AllSlots, error } = useGetAllSlotsQuery(undefined);
  const [DeleteRoom] = useDeleteRoomMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  if (error) {
    return <div>Error fetching slots.</div>;
  }

  const showDeleteModal = (roomId: string) => {
    setRoomToDelete(roomId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setRoomToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (roomToDelete !== null) {
      handleDelete(roomToDelete);
    }
    setIsModalVisible(false);
  };

  const handleDelete = (roomId: string) => {
    console.log("Deleting Room No:", roomId);
    DeleteRoom(roomId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Slots</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Start Time</th>
              <th className="py-3 px-6 text-left">End Time</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {AllSlots?.data?.map((slot, index) => (
              <tr
                key={slot.id || index} // Fallback to index if slot.id is missing
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{slot.date}</td>
                <td className="py-3 px-6 text-left">{slot.startTime}</td>
                <td className="py-3 px-6 text-left">{slot.endTime}</td>
                <td className="py-3 px-6 text-center">
                  <NavLink to={`/admin/manage-slots/update-slots/${slot._id}`}>
                    <Button className="text-blue-600 hover:text-blue-800 font-medium mr-2">
                      Update
                    </Button>
                  </NavLink>
                  <Button
                    type="link"
                    onClick={() => showDeleteModal(slot.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>,
        ]}
      >
        <h3 className="text-lg">Are you sure you want to delete this slot?</h3>
      </Modal>
    </div>
  );
};

export default ManageSlot;