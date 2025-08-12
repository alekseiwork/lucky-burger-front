import React, { createContext, useState, ReactNode } from 'react';

interface SelectedItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderContextProps {
  selectedItems: SelectedItem[];
  addItem: (item: SelectedItem) => void;
  updateItem: (itemName: string, quantity: number) => void;
  removeItem: (itemName: string) => void;
  clearItems: () => void;
}

export const OrderContext = createContext<OrderContextProps | undefined>(
  undefined
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const addItem = (item: SelectedItem) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const updateItem = (itemName: string, quantity: number) => {
    setSelectedItems((prevItems) =>
      prevItems
        .map((item) => (item.name === itemName ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemName: string) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.name !== itemName)
    );
  };

  const clearItems = () => {
    setSelectedItems([]);
  };

  return (
    <OrderContext.Provider
      value={{ selectedItems, addItem, updateItem, removeItem, clearItems }}
    >
      {children}
    </OrderContext.Provider>
  );
};
