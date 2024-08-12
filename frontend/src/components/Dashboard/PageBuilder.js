import React, { useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

const ComponentTypes = {
  ROW: 'row',
  COLUMN: 'column',
  TEXT: 'text',
  IMAGE: 'image',
};

const DraggableComponent = ({ type, children }) => {
  const [, drag] = useDrag(() => ({
    type,
    item: { type },
  }));
  return (
    <Box ref={drag} sx={{ cursor: 'move', padding: 2, border: '1px solid #ccc', margin: '10px 0' }}>
      {children}
    </Box>
  );
};

const DropZone = ({ onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: Object.values(ComponentTypes),
    drop: (item) => onDrop(item.type),
  }));
  return <Box ref={drop} sx={{ minHeight: '300px', border: '2px dashed #ccc', padding: 2 }} />;
};

const PageBuilder = () => {
  const [components, setComponents] = useState([]);

  const handleDrop = (type) => {
    setComponents([...components, { type, id: components.length + 1 }]);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Page Builder
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Box width="30%">
            <Typography variant="h6">Available Components</Typography>
            <DraggableComponent type={ComponentTypes.ROW}>Row</DraggableComponent>
            <DraggableComponent type={ComponentTypes.COLUMN}>Column</DraggableComponent>
            <DraggableComponent type={ComponentTypes.TEXT}>Text</DraggableComponent>
            <DraggableComponent type={ComponentTypes.IMAGE}>Image</DraggableComponent>
          </Box>
          <Box width="65%">
            <Typography variant="h6">Page Layout</Typography>
            <DropZone onDrop={handleDrop} />
            <Box mt={2}>
              {components.map((component) => (
                <Box key={component.id} sx={{ padding: 2, border: '1px solid #ccc', margin: '10px 0' }}>
                  {component.type === ComponentTypes.ROW && <Typography>Row Component</Typography>}
                  {component.type === ComponentTypes.COLUMN && <Typography>Column Component</Typography>}
                  {component.type === ComponentTypes.TEXT && <Typography>Text Component</Typography>}
                  {component.type === ComponentTypes.IMAGE && <Typography>Image Component</Typography>}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Save Page
        </Button>
      </Box>
    </Container>
  );
};

export default PageBuilder;
