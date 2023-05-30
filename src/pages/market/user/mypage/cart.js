import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Grid,
  Card,
  Select,
  MenuItem,
  Dialog,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Header } from "../component/header";

import { cartData } from "../testdata";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    setCartItems(cartData);
  }, []);

  const handleQuantityChange = (itemId, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: parseInt(value) } : item
      )
    );
  };

  const handleDelete = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleSelect = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const getTotalPrice = () => {
    if (!cartItems) return 0;
    return cartItems.reduce(
      (total, item) =>
        item.selected ? total + item.price * item.quantity : total,
      0
    );
  };
  const getTotalCount = () => {
    if (!cartItems) return 0;
    return cartItems.filter((item) => item.selected).length;
  };

  const QuantityInput = ({ value, targetId, setValue }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    return (
      <>
        {value >= 10 ? (
          <Box onClick={() => setOpen(true)}>
            <Select
              value={value}
              style={{
                pointerEvents: "none",
                touchAction: "none",
              }}
            >
              <MenuItem value={value}>{value}</MenuItem>
            </Select>
          </Box>
        ) : (
          <Select
            value={value}
            onChange={(event) => {
              if (event.target.value === 0) {
                setOpen(true);
              } else {
                setValue(targetId, event.target.value);
              }
            }}
          >
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
            <MenuItem value={0}>10+</MenuItem>
          </Select>
        )}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">수량 입력</Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                id="quantity"
                type="number"
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (inputValue > 100) {
                      alert("최대 수량은 100개 입니다.");
                      setValue(targetId, 100);
                      setOpen(false);
                    } else if (inputValue <= 0) {
                      setValue(targetId, 1);
                      setOpen(false);
                    } else {
                      setValue(targetId, inputValue);
                      setOpen(false);
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => {
                  if (inputValue > 100) {
                    alert("최대 수량은 100개 입니다.");
                    setValue(targetId, 100);
                    setOpen(false);
                  } else if (inputValue <= 0) {
                    setValue(targetId, 1);
                    setOpen(false);
                  } else {
                    setValue(targetId, inputValue);
                    setOpen(false);
                  }
                }}
              >
                확인
              </Button>
            </Box>
          </Box>
        </Dialog>
      </>
    );
  };

  const CartItem = ({ item }) => {
    return (
      <Card sx={{ mt: 2, p: 1 }}>
        <Grid container>
          <Grid item container xs={12}>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Checkbox
                checked={item.selected}
                onChange={() => handleSelect(item.id)}
              />
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <Typography variant="h6">{item.name}</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => handleDelete(item.id)}>
                <CancelIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }}
            >
              <Box
                component={"img"}
                src={item.imageUrl}
                alt={item.name}
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={6} sx={{}}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="body1" fontWeight={"bold"}>
                    {item.price * item.quantity} ITEM 포인트
                  </Typography>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}
                  >
                    <QuantityInput
                      value={item.quantity}
                      targetId={item.id}
                      setValue={handleQuantityChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={4}></Grid>
          </Grid>
        </Grid>
      </Card>
    );
  };

  const CartFooter = ({ total, count }) => {
    const navigate = useNavigate();
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 1,
          borderTop: "1px solid #e0e0e0",
          boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ mr: 2 }}>
          총 {total} ITEM 포인트
        </Typography>

        <Button
          onClick={() => {
            if (count === 0) {
              alert("상품을 선택해주세요.");
            } else {
              console.log("주문 시점 카트");
              console.log(cartItems);
              navigate("/market/mypage/order");
            }
          }}
          variant="contained"
          sx={{ mr: 1 }}
        >
          주문 ({count}개 항목)
        </Button>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <Header title={"장바구니"} />
      </Box>
      <Container sx={{ mt: 8, mb: 20 }}>
        {cartItems !== null && (
          <>
            <Grid container>
              {cartItems.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <CartItem
                    item={item}
                    handleQuantityChange={handleQuantityChange}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          zIndex: 1000,
          mb: 7,
        }}
      >
        <CartFooter total={getTotalPrice()} count={getTotalCount()} />
      </Box>
    </>
  );
};
