import React, { useState } from 'react';
import { Container, Button, Box, Typography, TextField } from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ComponentTypes = {
  SECTION: 'section',
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

const DropZone = ({ onDrop, children }) => {
  const [, drop] = useDrop(() => ({
    accept: Object.values(ComponentTypes),
    drop: (item) => onDrop(item),
  }));
  return (
    <Box ref={drop} sx={{ minHeight: '300px', border: '2px dashed #ccc', padding: 2 }}>
      {children}
    </Box>
  );
};

const PropertiesPanel = ({ selectedComponent, updateComponent }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Properties</Typography>
      {selectedComponent && (
        <>
          <TextField
            label="Background Color"
            value={selectedComponent.backgroundColor || ''}
            onChange={(e) => updateComponent({ ...selectedComponent, backgroundColor: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Padding"
            value={selectedComponent.padding || ''}
            onChange={(e) => updateComponent({ ...selectedComponent, padding: e.target.value })}
            fullWidth
            margin="normal"
          />
        </>
      )}
    </Box>
  );
};

const PageBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleDrop = (item) => {
    setComponents([...components, { ...item, id: components.length + 1 }]);
  };

  const updateComponent = (updatedComponent) => {
    setComponents(components.map((comp) => (comp.id === updatedComponent.id ? updatedComponent : comp)));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg">
        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Page Builder
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Box width="30%">
              <Typography variant="h6">Available Components</Typography>
              <DraggableComponent type={ComponentTypes.SECTION}>Section</DraggableComponent>
              <DraggableComponent type={ComponentTypes.ROW}>Row</DraggableComponent>
              <DraggableComponent type={ComponentTypes.COLUMN}>Column</DraggableComponent>
              <DraggableComponent type={ComponentTypes.TEXT}>Text</DraggableComponent>
              <DraggableComponent type={ComponentTypes.IMAGE}>Image</DraggableComponent>
            </Box>
            <Box width="40%">
              <Typography variant="h6">Page Layout</Typography>
              <DropZone onDrop={handleDrop}>
                {components.map((component) => (
                  <Box
                    key={component.id}
                    sx={{ padding: 2, border: '1px solid #ccc', margin: '10px 0' }}
                    onClick={() => setSelectedComponent(component)}
                  >
                    {component.type === ComponentTypes.SECTION && <Typography>Section Component</Typography>}
                    {component.type === ComponentTypes.ROW && <Typography>Row Component</Typography>}
                    {component.type === ComponentTypes.COLUMN && <Typography>Column Component</Typography>}
                    {component.type === ComponentTypes.TEXT && <Typography>Text Component</Typography>}
                    {component.type === ComponentTypes.IMAGE && <Typography>Image Component</Typography>}
                  </Box>
                ))}
              </DropZone>
            </Box>
            <Box width="25%">
              <PropertiesPanel selectedComponent={selectedComponent} updateComponent={updateComponent} />
            </Box>
          </Box>
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            Save Page
          </Button>
        </Box>
      </Container>
    </DndProvider>
  );
};

export default PageBuilder;
