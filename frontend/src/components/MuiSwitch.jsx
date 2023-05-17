import { Box, FormControlLabel, Switch } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const MuiSwitch = ({ active, admin, setActiveChange, activeChange }) => {
  const [checked, setChecked] = useState(false);
  const { id } = useParams();

  const updateActive = async () => {
    const res = await fetch(`/api/admin/tickets/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${admin.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ active: !active }),
    });
    const json = await res.json();
    if (res.ok) {
      setActiveChange(!activeChange);
    } else {
      console.log('error');
      console.log(json);
    }
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    updateActive();
  };

  return (
    <Box>
      <FormControlLabel
        label={'Close Ticket'}
        control={<Switch />}
        checked={active ? true : false}
        onChange={handleChange}
      />
    </Box>
  );
};
