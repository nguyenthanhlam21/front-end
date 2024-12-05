import { useState } from "react";

const DelOrderStt = ({ onClose, onAdd }) => {
    const [reason, setReason] = useState(""); // State to hold the cancellation reason

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reason.trim()) {
            alert("Please provide a reason for cancellation.");
            return;
        }
        onAdd(reason); 
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit}>
                <div className={`bg-slate-50 p-5 rounded`}>
                    <h2 className="text-xl">Lý do hủy</h2>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className={`mt-2 w-full border p-2`}
                        placeholder="Nhập lý do hủy"
                    />
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-3 py-1 mr-2"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className={`bg-red-500 text-white px-3 py-1`}
                        >
                            Xác nhận hủy
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DelOrderStt;
