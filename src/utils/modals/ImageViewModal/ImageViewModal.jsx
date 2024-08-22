import { Modal, Typography } from "@mui/material";
import CrosssIconPopup from "../../../assets/CrosssIconPopup.svg"
import "./imageviewmodal.css"

const ImageViewModal = ({ isOpen, onClose }) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="modal-image-container" >
                <div className="modal-image-header">
                    <Typography variant="h5" className="MuiTypography-root text-styles">View Image</Typography>
                    <img src={CrosssIconPopup}
                        className="custom-image"
                        alt="crossIcon"
                        onClick={onClose}
                    />
                </div>

                <img src="https://img.freepik.com/free-vector/minimal-yellow-invoice-template-vector-design_1017-12070.jpg?w=360&t=st=1715175182~exp=1715175782~hmac=384ebe4da96caf08409f1bf1ee4ccf25496f88a4fcca5c9c2c1e0d663144d84d"
                    alt="Dummy Image"
                    style={{ width: '200px', height: '150px' }}
                />
            </div>
        </Modal>
    )


}
export default ImageViewModal;
