// frontend/src/components/ComponentEditor.js
import React, { useState } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';

const ComponentEditor = ({ onSave }) => {
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    onSave({ type, content });
  };

  return (
    <Modal open onClose={() => {}}>
      <Box>
        <TextField value={type} onChange={(e) => setType(e.target.value)} placeholder="Component Type" />
        <TextField value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
        <Button onClick={handleSave}>Save</Button>
      </Box>
    </Modal>
  );
};

export default ComponentEditor;
