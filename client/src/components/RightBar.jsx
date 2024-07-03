import { Box, Button, ButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import RecordModal from './modals/RecordModal';
import UploadModal from './modals/UploadModal';
import LiveMeetingModal from './modals/LiveMeetingModal';
import MicIcon from '@mui/icons-material/Mic';
import UploadIcon from '@mui/icons-material/Upload';
import TranscribeIcon from '@mui/icons-material/Transcribe';

const list = [
  {
    id: 1,
    name: 'Record audio',
    modal: <RecordModal />,
    icon: <MicIcon />,
  },
  {
    id: 2,
    name: 'Upload Audio/Video',
    modal: <UploadModal />,
    icon: <UploadIcon />,
  },
  {
    id: 3,
    name: 'Transcribe Live Meeting',
    modal: <LiveMeetingModal />,
    icon: <TranscribeIcon />,
  },
];

const RightBar = () => {
  const [openModalId, setOpenModalId] = useState(null);

  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  return (
    <>
      <ButtonGroup variant="contained" orientation="vertical" sx={{ minWidth: 280 }} disableElevation>
        {list.map((item) => (
          <Button startIcon={item.icon} key={item.id} sx={{ mb: 1.5 }} onClick={() => handleOpenModal(item.id)}>
            {item.name}
          </Button>
        ))}
      </ButtonGroup>

      {list.map(
        (item) =>
          openModalId === item.id && (
            <React.Fragment key={item.id}>
              {React.cloneElement(item.modal, { open: true, handleClose: handleCloseModal })}
            </React.Fragment>
          )
      )}
    </>
  );
};

export default RightBar;
