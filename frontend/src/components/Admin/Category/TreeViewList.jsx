import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import EditCategoryModal from './EditCategoryModal';
// Hàm TreeNode để hiển thị mỗi node
const TreeNode = ({ node, setShowAlert, setAlertSeverity, setAlertMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const toggleNode = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ border: "solid 0px #B6BBC4", width: "60%" }}>
      <Box>
        <Typography
          onClick={toggleNode}
          sx={{
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '4px',
            alignItems: "center",
            display: "flex",
            border: '1px solid #e0e0e0',
            cursor: 'pointer' // Đặt con trỏ tại điểm bấm
          }}
        >
          {node.children && (
            <span style={{ marginRight: '8px' }}>
              {isOpen ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
            </span>
          )}
          {node.name}
          <IconButton
            aria-label="delete"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNode(node);
              console.log(">>> node", node)
              setOpenModal(true);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Typography>
        {isOpen && node.children && (
          <Box sx={{ paddingLeft: "1rem" }}>
            <ul>
              {node.children.map((childNode) => (
                <li key={childNode.id}>
                  <TreeNode node={childNode}
                    setShowAlert={setShowAlert}
                    setAlertSeverity={setAlertSeverity}
                    setAlertMessage={setAlertMessage} />
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
      {openModal && (
        <EditCategoryModal
          node={selectedNode}
          onClose={handleCloseModal}
          setShowAlert={setShowAlert}
          setAlertSeverity={setAlertSeverity}
          setAlertMessage={setAlertMessage}
        />
      )}
    </Box>

  );
};

// Component chính TreeViewList
const TreeViewList = ({ data, setShowAlert, setAlertSeverity, setAlertMessage }) => {
  const buildTree = (items) => {
    const tree = [];
    const lookup = {};

    items.forEach((item) => {
      const { id, name, parentCategory } = item;
      lookup[id] = {
        id,
        name,
        children: lookup[id]?.children || []
      };

      const treeItem = lookup[id];

      if (parentCategory) {
        if (!lookup[parentCategory.id]) {
          lookup[parentCategory.id] = {
            id: parentCategory.id,
            name: parentCategory.name,
            children: []
          };
        }
        lookup[parentCategory.id].children.push(treeItem);
      } else {
        tree.push(treeItem);
      }
    });

    return tree;
  };
  const tree = buildTree(data);

  return (
    <ul>
      {tree.map((node) => (
        <li key={node.id}>
          <TreeNode
            node={node}
            setShowAlert={setShowAlert}
            setAlertSeverity={setAlertSeverity}
            setAlertMessage={setAlertMessage}
          />
        </li>
      ))}
    </ul>
  );
};

export default TreeViewList;
