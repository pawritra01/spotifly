import { Computer, Devices, Smartphone, Tv } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItemButton,
  Popper,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { type Device } from "../../types/Device";
import deviceApi from "../../api/deviceApi";

const SELECTOR_ID = "device_selector_button";
export default function DeviceSelector() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? SELECTOR_ID : undefined;

  const syncDevices = useCallback(() => {
    deviceApi()
      .getDevices()
      .then((data) => {
        setDevices(data.devices);
      });
  }, []);

  useEffect(() => {
    if (open) {
      syncDevices();
    }
  }, [open, syncDevices]);

  const onSelectDevice = (deviceId: string) => {
    deviceApi().transferDevice(deviceId).then(syncDevices);
  };

  return (
    <>
      <IconButton id={id} onClick={handleClick}>
        <Devices />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.paper",
            minWidth: "240px",
          }}
        >
          <Typography color="white" variant="subtitle1">
            Connected Devices
          </Typography>
          {devices.map((item) => (
            <Device
              key={item.id}
              id={item.id}
              is_active={item.is_active}
              name={item.name}
              type={item.type}
              onSelect={onSelectDevice}
            />
          ))}
        </Box>
      </Popper>
    </>
  );
}

interface Props {
  id: string;
  type: string;
  name: string;
  is_active: boolean;
  onSelect: (deviceId: string) => void;
}
function Device({ id, type, name, is_active, onSelect }: Props) {
  const getIcon = () => {
    switch (type) {
      case "computer":
        return <Computer />;
      case "Smartphone":
        return <Smartphone />;
      case "TV":
        return <Tv />;
      default:
        return <Computer />;
    }
  };
  return (
    <ListItemButton
      onClick={() => onSelect(id)}
      sx={{
        display: "flex",
        gap: 2,
        color: is_active ? "green" : "white",
        padding: 2,
      }}
    >
      <Box>{getIcon()}</Box>
      <Typography variant="subtitle1">{name}</Typography>
    </ListItemButton>
  );
}
